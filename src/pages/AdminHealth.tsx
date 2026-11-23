import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Row = {
  channel_id: string;
  channel_name: string | null;
  viewers_now: number;
  starts: number;
  ok: number;
  fails: number;
  buffer_events: number;
  buffer_ms: number;
  avg_start_ms: number | null;
  last_seen: string;
};

type StatusLabel = "Healthy" | "Unstable" | "Failing";
type StatusFilter = "All" | StatusLabel;

const status = (row: Row) => {
  const attempts = row.ok + row.fails;
  const successRate = attempts ? row.ok / attempts : 0;
  if (attempts && successRate < 0.5) {
    return { label: "Failing" as const, className: "bg-destructive text-destructive-foreground" };
  }
  if (successRate < 0.85 || row.buffer_events > Math.max(3, row.ok * 2)) {
    return { label: "Unstable" as const, className: "bg-secondary text-secondary-foreground" };
  }
  return { label: "Healthy" as const, className: "bg-primary text-primary-foreground" };
};

const languages = [
  ["", "Choose later"],
  ["en", "English"],
  ["hi", "Hindi"],
  ["ta", "Tamil"],
  ["te", "Telugu"],
  ["bn", "Bengali"],
  ["pa", "Punjabi"],
  ["mr", "Marathi"],
  ["gu", "Gujarati"],
  ["kn", "Kannada"],
  ["ml", "Malayalam"],
  ["ur", "Urdu"],
  ["bho", "Bhojpuri"],
];

const AdminHealth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [hours, setHours] = useState(24);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileLanguage, setProfileLanguage] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [loading, setLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const requestInFlight = useRef(false);

  useEffect(() => {
    document.title = "Stream Health Dashboard — BharatTV Admin";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(null);
      setRows([]);
      setDashboardError("");
      setAuthMessage("");
    });

    void supabase.auth.getUser().then(({ data, error }) => {
      setUser(error ? null : data.user);
      setReady(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
      robots.remove();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setProfileName("");
      setProfileLanguage("");
      return;
    }
    let active = true;
    void supabase
      .from("profiles")
      .select("display_name, preferred_language")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setProfileName(data?.display_name ?? "");
        setProfileLanguage(data?.preferred_language ?? "");
      });
    return () => {
      active = false;
    };
  }, [user]);

  const load = useCallback(async () => {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setLoading(true);
    setDashboardError("");
    try {
      const { data, error } = await supabase.rpc("stream_health_summary", { _hours: hours });
      if (error) {
        if (error.message.toLowerCase().includes("not authorized") || error.code === "42501") {
          setIsAdmin(false);
          setRows([]);
        } else {
          setDashboardError("Channel health could not be refreshed. Please try again.");
        }
        return;
      }
      setIsAdmin(true);
      setRows((data as Row[]) ?? []);
      setLastUpdated(new Date());
    } catch {
      setDashboardError("Channel health could not be refreshed. Please try again.");
    } finally {
      requestInFlight.current = false;
      setLoading(false);
    }
  }, [hours]);

  useEffect(() => {
    if (!user) return;
    void load();
    const timer = window.setInterval(() => void load(), 15_000);
    return () => window.clearInterval(timer);
  }, [user, load]);

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthMessage("");
    setAuthBusy(true);
    try {
      if (mode === "signup") {
        const name = displayName.trim();
        if (!name) {
          setAuthMessage("Add a display name to create your account.");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/health`,
            data: {
              display_name: name,
              preferred_language: preferredLanguage || null,
            },
          },
        });
        if (error) {
          setAuthMessage(error.message);
        } else if (!data.session) {
          setAuthMessage("Account created. Check your email to confirm it before signing in.");
        } else {
          setAuthMessage("Account created. Your access is being checked.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) setAuthMessage("Email or password didn’t match. Please try again.");
      }
    } catch {
      setAuthMessage("We couldn’t complete that request. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  };

  const shown = useMemo(() => {
    const query = filter.trim().toLowerCase();
    return rows.filter((row) => {
      const name = (row.channel_name ?? row.channel_id).toLowerCase();
      const matchesName = !query || name.includes(query);
      const matchesStatus = statusFilter === "All" || status(row).label === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [filter, rows, statusFilter]);

  if (!ready) return null;

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <section className="glass-card w-full max-w-md space-y-5 rounded-xl p-6 md:p-8" aria-labelledby="auth-heading">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">BharatTV</p>
              <h1 id="auth-heading" className="text-xl font-bold">
                {mode === "signin" ? "Admin sign in" : "Create an account"}
              </h1>
            </div>
          </div>

          <form className="space-y-4" onSubmit={submitAuth}>
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="profile-name" className="text-sm font-medium">Display name</label>
                  <Input
                    id="profile-name"
                    autoComplete="name"
                    maxLength={80}
                    required
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="profile-language" className="text-sm font-medium">Viewing language <span className="text-muted-foreground">(optional)</span></label>
                  <select
                    id="profile-language"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={preferredLanguage}
                    onChange={(event) => setPreferredLanguage(event.target.value)}
                  >
                    {languages.map(([value, label]) => <option key={value || "later"} value={value}>{label}</option>)}
                  </select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
              <Input
                id="admin-password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {authMessage && <p className="text-sm text-muted-foreground" role="status" aria-live="polite">{authMessage}</p>}
            <Button className="w-full" type="submit" disabled={authBusy}>
              {authBusy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="border-t border-border pt-4 text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setAuthMessage("");
              }}
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already registered? Sign in"}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">Administrator access is limited to the verified account selected for this dashboard.</p>
          </div>
        </section>
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center text-foreground">
        <ShieldCheck className="h-10 w-10 text-destructive" aria-hidden="true" />
        <div className="max-w-md space-y-2">
          <h1 className="text-xl font-semibold">Admin access isn’t active for this account</h1>
          <p className="text-sm text-muted-foreground">Sign in with the selected email and confirm its inbox. New accounts never grant themselves administrator access.</p>
          <p className="text-xs text-muted-foreground">Signed in as {user.email ?? "your account"}</p>
        </div>
        <Button variant="outline" onClick={() => void supabase.auth.signOut()}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" /> Sign out
        </Button>
      </main>
    );
  }

  const totalViewers = rows.reduce((total, row) => total + Number(row.viewers_now), 0);
  const failing = rows.filter((row) => status(row).label === "Failing").length;
  const unstable = rows.filter((row) => status(row).label === "Unstable").length;
  const statusFilters: StatusFilter[] = ["All", "Healthy", "Unstable", "Failing"];

  return (
    <main className="min-h-screen bg-background p-4 text-foreground md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">BharatTV operations</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>Stream health — live</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {profileName || user.email}{profileLanguage ? ` · ${profileLanguage.toUpperCase()}` : ""}
              {lastUpdated ? ` · Updated ${lastUpdated.toLocaleTimeString()}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 24, 168].map((period) => (
              <Button key={period} size="sm" variant={hours === period ? "default" : "outline"} onClick={() => setHours(period)}>
                {period === 1 ? "1 hour" : period === 24 ? "24 hours" : "7 days"}
              </Button>
            ))}
            <Button size="icon" variant="outline" aria-label="Refresh channel health" title="Refresh now" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => void supabase.auth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" /> Sign out
            </Button>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Channel health summary">
          {[
            ["Watching now", totalViewers],
            ["Channels reporting", rows.length],
            ["Failing", failing],
            ["Unstable", unstable],
          ].map(([label, value]) => (
            <div key={label} className="glass-card rounded-xl p-4">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
            </div>
          ))}
        </section>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input className="max-w-sm" aria-label="Filter channels" placeholder="Search channels…" value={filter} onChange={(event) => setFilter(event.target.value)} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter channels by health status">
            {statusFilters.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={statusFilter === item ? "default" : "outline"}
                aria-pressed={statusFilter === item}
                onClick={() => setStatusFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {dashboardError && <p className="mb-3 text-sm text-destructive" role="alert">{dashboardError}</p>}
        <div className="glass-card overflow-x-auto rounded-xl">
          <table className="w-full min-w-[760px] text-sm" aria-label="Per-channel stream health">
            <thead className="text-left text-muted-foreground">
              <tr>
                {["Channel", "Status", "Watching", "Success", "Fails", "Buffering", "Avg start", "Last seen"].map((heading) => (
                  <th key={heading} scope="col" className="p-3 font-medium">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((row) => {
                const current = status(row);
                const attempts = row.ok + row.fails;
                return (
                  <tr key={row.channel_id} className="border-t border-border">
                    <th scope="row" className="max-w-64 truncate p-3 text-left font-medium">{row.channel_name || row.channel_id}</th>
                    <td className="p-3"><span className={`rounded-full px-2 py-1 text-xs ${current.className}`}>{current.label}</span></td>
                    <td className="p-3 tabular-nums">{row.viewers_now}</td>
                    <td className="p-3 tabular-nums">{attempts ? `${Math.round((row.ok / attempts) * 100)}%` : "—"}</td>
                    <td className="p-3 tabular-nums">{row.fails}</td>
                    <td className="p-3 tabular-nums">{row.buffer_events}× / {(row.buffer_ms / 1000).toFixed(1)}s</td>
                    <td className="p-3 tabular-nums">{row.avg_start_ms ? `${(row.avg_start_ms / 1000).toFixed(1)}s` : "—"}</td>
                    <td className="p-3 text-muted-foreground">{new Date(row.last_seen).toLocaleTimeString()}</td>
                  </tr>
                );
              })}
              {!shown.length && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    {loading ? "Loading channel health…" : rows.length ? "No channels match these filters." : "No playback events in this period yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Viewer counts include active streams with a recent heartbeat. Data refreshes every 15 seconds.</p>
      </div>
    </main>
  );
};

export default AdminHealth;