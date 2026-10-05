import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Row = {
  channel_id: string; channel_name: string | null; viewers_now: number; starts: number; ok: number;
  fails: number; buffer_events: number; buffer_ms: number; avg_start_ms: number | null; last_seen: string;
};

const status = (r: Row) => {
  const tries = r.ok + r.fails;
  const rate = tries ? r.ok / tries : 0;
  if (tries && rate < 0.5) return { label: "Failing", cls: "bg-destructive text-destructive-foreground" };
  if (rate < 0.85 || r.buffer_events > Math.max(3, r.ok * 2)) return { label: "Unstable", cls: "bg-secondary text-secondary-foreground" };
  return { label: "Healthy", cls: "bg-primary text-primary-foreground" };
};

const AdminHealth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [hours, setHours] = useState(24);
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [msg, setMsg] = useState(""); const [filter, setFilter] = useState("");

  useEffect(() => {
    document.title = "Stream Health — BharatTV Admin";
    const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m);
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => { sub.subscription.unsubscribe(); m.remove(); };
  }, []);

  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc("stream_health_summary", { _hours: hours });
    if (error) { setIsAdmin(false); return; }
    setIsAdmin(true); setRows((data as Row[]) ?? []);
  }, [hours]);

  useEffect(() => {
    if (!session) return;
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [session, load]);

  const auth = async (signup: boolean) => {
    setMsg("");
    const { error } = signup
      ? await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: `${window.location.origin}/admin/health` } })
      : await supabase.auth.signInWithPassword({ email, password: pw });
    setMsg(error ? error.message : signup ? "Check your email to confirm your account." : "");
  };

  if (!ready) return null;

  if (!session) return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="glass-card w-full max-w-sm space-y-3 rounded-xl p-6">
        <h1 className="text-xl font-bold">Admin sign in</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => auth(false)}>Sign in</Button>
          <Button variant="outline" onClick={() => auth(true)}>Sign up</Button>
        </div>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </div>
    </main>
  );

  if (isAdmin === false) return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-4 text-center">
      <p>This account doesn't have admin access.</p>
      <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
    </main>
  );

  const shown = rows.filter((r) => (r.channel_name ?? r.channel_id).toLowerCase().includes(filter.toLowerCase()));
  const totViewers = rows.reduce((s, r) => s + Number(r.viewers_now), 0);
  const failing = rows.filter((r) => status(r).label === "Failing").length;
  const unstable = rows.filter((r) => status(r).label === "Unstable").length;

  return (
    <main className="min-h-screen bg-background p-4 text-foreground md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>Stream health — live</h1>
          <div className="flex gap-2">
            {[1, 24, 168].map((h) => (
              <Button key={h} size="sm" variant={hours === h ? "default" : "outline"} onClick={() => setHours(h)}>
                {h === 1 ? "1 hour" : h === 24 ? "24 hours" : "7 days"}
              </Button>
            ))}
            <Button size="sm" variant="ghost" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["Watching now", totViewers], ["Channels played", rows.length], ["Failing", failing], ["Unstable", unstable]].map(([k, v]) => (
            <div key={k} className="glass-card rounded-xl p-4"><div className="text-sm text-muted-foreground">{k}</div><div className="text-2xl font-bold">{v}</div></div>
          ))}
        </div>
        <Input className="mb-4 max-w-xs" placeholder="Filter channels…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div className="glass-card overflow-x-auto rounded-xl">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>{["Channel", "Status", "Watching", "Success", "Fails", "Buffering", "Avg start", "Last seen"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {shown.map((r) => {
                const s = status(r); const tries = r.ok + r.fails;
                return (
                  <tr key={r.channel_id} className="border-t border-border">
                    <td className="p-3 font-medium">{r.channel_name || r.channel_id}</td>
                    <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs ${s.cls}`}>{s.label}</span></td>
                    <td className="p-3">{r.viewers_now}</td>
                    <td className="p-3">{tries ? Math.round((r.ok / tries) * 100) + "%" : "—"}</td>
                    <td className="p-3">{r.fails}</td>
                    <td className="p-3">{r.buffer_events}× / {(r.buffer_ms / 1000).toFixed(1)}s</td>
                    <td className="p-3">{r.avg_start_ms ? (r.avg_start_ms / 1000).toFixed(1) + "s" : "—"}</td>
                    <td className="p-3 text-muted-foreground">{new Date(r.last_seen).toLocaleTimeString()}</td>
                  </tr>
                );
              })}
              {!shown.length && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">No playback yet in this period.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Refreshes every 15 seconds. "Watching" counts viewers active in the last 90 seconds.</p>
      </div>
    </main>
  );
};

export default AdminHealth;
