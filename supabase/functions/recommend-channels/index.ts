import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured." }, 500);
    const { query, channels } = await req.json();
    if (typeof query !== "string" || !query.trim() || query.length > 300) return json({ error: "Please describe what you want to watch (max 300 characters)." }, 400);
    if (!Array.isArray(channels) || !channels.length) return json({ error: "Channel list is still loading — try again in a moment." }, 400);
    const list = channels.slice(0, 600).map((c: any) => `${String(c.id).slice(0, 80)}|${String(c.n).slice(0, 80)}|${String(c.c ?? "").slice(0, 60)}|${String(c.l ?? "").slice(0, 40)}`).join("\n");
    const ids = new Set(channels.map((c: any) => String(c.id)));

    let runId: string | undefined;
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: async (input, init) => {
        const h = new Headers(init?.headers);
        if (runId) h.set("X-Lovable-AIG-Run-ID", runId);
        const r = await fetch(input, { ...init, headers: h });
        runId ??= r.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
        if (!r.ok) {
          const t = await r.clone().text();
          console.error("gateway", r.status, t.slice(0, 300));
          (globalThis as any).__gwStatus = r.status;
        }
        return r;
      },
    });
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system:
        "You recommend live TV channels. Only pick ids from the provided list (format: id|name|categories|languages; language codes like hin=Hindi, tam=Tamil, tel=Telugu, eng=English, ben=Bengali, mar=Marathi, kan=Kannada, mal=Malayalam, pan=Punjabi, guj=Gujarati). Reply with ONLY JSON: {\"summary\": string (one short sentence), \"recommendations\": [{\"id\": string, \"reason\": string (max 12 words)}]} with at most 8 items, best first. Empty array if nothing fits.",
      prompt: `Viewer request: ${query}\n\nChannels:\n${list}`,
      abortSignal: req.signal,
      providerOptions: {
        openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
      },
    });
    let text = "";
    try {
      text = await result.text;
    } catch (e) {
      const s = (globalThis as any).__gwStatus;
      if (s === 429) return json({ error: "Too many requests right now — please try again in a minute." }, 429);
      if (s === 402) return json({ error: "AI credits have run out for this site. Please try again later." }, 402);
      console.error(e);
      return json({ error: "The AI couldn't respond right now. Please try again." }, 502);
    }
    const m = text.match(/\{[\s\S]*\}/);
    let parsed: any = {};
    try { parsed = m ? JSON.parse(m[0]) : {}; } catch { parsed = {}; }
    const recs = (Array.isArray(parsed.recommendations) ? parsed.recommendations : [])
      .filter((r: any) => r && ids.has(String(r.id)))
      .slice(0, 8)
      .map((r: any) => ({ id: String(r.id), reason: String(r.reason ?? "").slice(0, 120) }));
    return json({ summary: String(parsed.summary ?? "").slice(0, 200), recommendations: recs });
  } catch (e) {
    console.error(e);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
