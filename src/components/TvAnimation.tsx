import { useState, useEffect } from "react";
import { Play, ChevronRight } from "lucide-react";

const channels = [
  { name: "Aaj Tak", category: "News", color: "hsl(0, 80%, 55%)" },
  { name: "Star Plus", category: "Entertainment", color: "hsl(280, 70%, 55%)" },
  { name: "Sony MAX", category: "Movies", color: "hsl(210, 80%, 55%)" },
  { name: "DD Sports", category: "Sports", color: "hsl(140, 70%, 45%)" },
  { name: "MTV India", category: "Music", color: "hsl(330, 80%, 55%)" },
];

const steps = [
  "Browsing channels...",
  "Selecting channel...",
  "Loading stream...",
  "Now playing!",
];

const TvAnimation = () => {
  const [step, setStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          setIsPlaying(false);
          setActiveChannel((c) => (c + 1) % channels.length);
        }
        if (next === 3) setIsPlaying(true);
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const current = channels[activeChannel];

  return (
    <div className="relative mx-auto mt-12 max-w-md">
      {/* TV Frame */}
      <div className="rounded-2xl border-2 border-border bg-card/90 backdrop-blur-sm shadow-[0_0_60px_hsl(var(--primary)/0.15)] overflow-hidden">
        {/* TV Top Bar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest">BharatTV Player</span>
          <div className="w-12" />
        </div>

        {/* TV Screen */}
        <div className="relative aspect-video bg-gradient-to-br from-background to-muted/50 flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ background: `radial-gradient(ellipse at center, ${current.color}22, transparent 70%)` }}>
              {/* Simulated video playing */}
              <div className="relative">
                <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ background: current.color, boxShadow: `0 0 30px ${current.color}66` }}>
                  <Play className="h-7 w-7 text-white fill-white" />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: current.color }} />
              </div>
              <p className="mt-4 text-sm font-bold" style={{ color: current.color }}>{current.name}</p>
              <span className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">{current.category} • LIVE</span>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full animate-pulse" style={{ width: "60%", background: current.color }} />
                </div>
                <span className="text-[9px] text-muted-foreground font-mono">LIVE</span>
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="w-full h-full p-3 animate-fade-in">
              {/* Channel List */}
              <div className="space-y-1.5">
                {channels.map((ch, i) => (
                  <div
                    key={ch.name}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all duration-500 cursor-default ${
                      i === activeChannel
                        ? "bg-primary/15 border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
                        : "bg-muted/20 border border-transparent"
                    }`}
                  >
                    <div className="h-7 w-7 rounded-md flex items-center justify-center text-white font-bold text-[10px]" style={{ background: ch.color }}>
                      {ch.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${i === activeChannel ? "text-primary" : "text-foreground/70"}`}>{ch.name}</p>
                      <p className="text-[9px] text-muted-foreground">{ch.category}</p>
                    </div>
                    {i === activeChannel && (
                      <ChevronRight className="h-3.5 w-3.5 text-primary animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground font-mono tracking-wider">
          {steps[Math.min(step, 3)]}
        </p>
        <div className="flex justify-center gap-1.5 mt-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= Math.min(step, 3)
                  ? "w-5 bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvAnimation;
