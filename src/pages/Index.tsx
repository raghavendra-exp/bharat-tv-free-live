import { Tv, Play, Globe, Zap, Shield, Smartphone, Languages, Radio, Monitor, Wifi, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-secondary/[0.05] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--primary)/0.4)]">B</div>
            <span className="text-xl font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>BharatTV</span>
          </a>
          <nav className="hidden gap-7 md:flex">
            {["Features", "Channels", "How It Works", "Guide", "About", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest font-medium relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="/BharatTV.html">
            <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5">
              <Play className="h-3.5 w-3.5" /> Watch Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.12),transparent_40%),radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/0.1),transparent_40%),radial-gradient(circle_at_50%_80%,hsl(var(--accent)/0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:py-36">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-[0_0_40px_hsl(var(--primary)/0.4),0_0_80px_hsl(var(--secondary)/0.2)] animate-[float_4s_ease-in-out_infinite]">
            <Tv className="h-10 w-10" />
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-wider md:text-5xl lg:text-6xl" style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(90deg, hsl(192 100% 50%), hsl(270 80% 65%), hsl(340 90% 60%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Watch 19,000+ Free Live<br />Indian TV Channels
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Stream live News, Sports, Entertainment, Movies, Music, Kids channels in Hindi, English, Tamil, Telugu, Bengali, Punjabi & more — completely free with no signup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/BharatTV.html">
              <Button size="lg" className="gap-2 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_4px_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.6)] hover:-translate-y-1 transition-all">
                <Play className="h-5 w-5" /> Start Watching Free
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="gap-2 text-base border-border/50 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-1 transition-all backdrop-blur-sm">
                Learn How It Works
              </Button>
            </a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            ✅ No signup &nbsp;·&nbsp; ✅ No downloads &nbsp;·&nbsp; ✅ Works on all devices
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-b border-border py-10 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { value: "19,000+", label: "Live Channels" },
              { value: "12+", label: "Languages" },
              { value: "9+", label: "Countries" },
              { value: "100%", label: "Free Forever" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center p-5 rounded-2xl bg-card/80 border border-border backdrop-blur-sm hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className="text-2xl font-extrabold md:text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</div>
                <div className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Why Choose BharatTV?</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            India's most comprehensive free live TV platform, designed to bring every Indian channel to your fingertips.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, title: "19,000+ Channels", desc: "Access thousands of live channels from India and 9+ countries worldwide. From national broadcasters to regional favourites.", color: "from-primary to-accent" },
              { icon: Zap, title: "Instant Streaming", desc: "No buffering, no downloads, no apps to install. Simply click any channel and start watching immediately using HLS technology.", color: "from-secondary to-primary" },
              { icon: Shield, title: "100% Free & Safe", desc: "No registration, no credit card, no hidden charges. BharatTV is completely free and always will be.", color: "from-accent to-secondary" },
              { icon: Smartphone, title: "Works Everywhere", desc: "Mobile, tablet, laptop, desktop, smart TV — watch on any device with a modern web browser.", color: "from-primary to-secondary" },
              { icon: Languages, title: "12+ Languages", desc: "Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, Bhojpuri and more.", color: "from-accent to-primary" },
              { icon: Radio, title: "All Categories", desc: "News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional, Documentary — every genre covered.", color: "from-secondary to-accent" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group rounded-2xl border border-border bg-card/80 p-6 transition-all duration-400 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.15)] hover:-translate-y-1 hover:border-primary/30 backdrop-blur-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} bg-opacity-10 border border-primary/20`}>
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>How BharatTV Works</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Getting started takes just seconds. Here's how you can watch your favourite Indian TV channels for free.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", icon: Monitor, title: "Open BharatTV", desc: "Visit BharatTV from any device — phone, tablet, laptop, or desktop. No app downloads needed. Works in all modern browsers." },
              { step: "2", icon: Globe, title: "Browse & Search", desc: "Use our powerful search and filter system to find channels by name, language, country, or category. Filter by 12+ languages." },
              { step: "3", icon: Play, title: "Click & Watch", desc: "Click on any channel to start streaming instantly. Use theater mode for cinematic experience, or open in VLC for full control." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold shadow-[0_0_30px_hsl(var(--primary)/0.3)] animate-pulse" style={{ fontFamily: "'Orbitron', sans-serif", animationDuration: '3s' }}>
                  {step}
                </div>
                <Icon className="mx-auto mb-3 h-8 w-8 text-primary/70" />
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Categories Section */}
      <section id="channels" className="border-b border-border py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Popular Channel Categories</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Thousands of channels organised into easy-to-browse categories. Cricket, Bollywood, regional news — we have it all.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { emoji: "📰", name: "News", examples: "Aaj Tak, NDTV, Republic, India Today" },
              { emoji: "⚽", name: "Sports", examples: "Cricket, Football, IPL, Kabaddi" },
              { emoji: "🎬", name: "Entertainment", examples: "Star Plus, Zee TV, Colors, Sony" },
              { emoji: "🎵", name: "Music", examples: "MTV India, 9XM, B4U Music, Zing" },
              { emoji: "🧒", name: "Kids", examples: "Cartoon Network, Pogo, Nick, Disney" },
              { emoji: "📚", name: "Education", examples: "Discovery, Nat Geo, History" },
              { emoji: "🕉️", name: "Devotional", examples: "Aastha, Sanskar, Peace of Mind" },
              { emoji: "🎥", name: "Movies", examples: "Bollywood, Tamil, Telugu, Bengali" },
            ].map(({ emoji, name, examples }) => (
              <a
                key={name}
                href="/BharatTV.html"
                className="group rounded-2xl border border-border bg-card/80 p-5 text-center transition-all duration-300 hover:shadow-[0_12px_40px_hsl(var(--primary)/0.2)] hover:-translate-y-1.5 hover:border-primary/40 backdrop-blur-sm"
              >
                <div className="mb-3 text-4xl drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]">{emoji}</div>
                <div className="font-semibold text-sm">{name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{examples}</div>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/BharatTV.html">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_4px_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.6)] hover:-translate-y-1 transition-all">
                <Play className="h-4 w-4" /> Browse All 19,000+ Channels
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Watch TV in Your Language</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Every major Indian language supported. Find hundreds of channels in your mother tongue.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { lang: "Hindi", channels: "5,000+" },
              { lang: "English", channels: "3,000+" },
              { lang: "Tamil", channels: "1,200+" },
              { lang: "Telugu", channels: "1,000+" },
              { lang: "Bengali", channels: "800+" },
              { lang: "Punjabi", channels: "500+" },
              { lang: "Marathi", channels: "400+" },
              { lang: "Gujarati", channels: "350+" },
              { lang: "Kannada", channels: "500+" },
              { lang: "Malayalam", channels: "600+" },
              { lang: "Urdu", channels: "400+" },
              { lang: "Bhojpuri", channels: "200+" },
            ].map(({ lang, channels }) => (
              <div key={lang} className="rounded-xl border border-border bg-card/80 p-4 text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-105 backdrop-blur-sm cursor-default">
                <div className="font-semibold text-sm">{lang}</div>
                <div className="mt-1 text-xs font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{channels} channels</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Viewing Guide Section */}
      <section id="guide" className="border-b border-border py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Complete Viewing Guide</h2>
          <p className="mb-10 text-center text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the best BharatTV experience.
          </p>
          <div className="space-y-5">
            {[
              { icon: Monitor, title: "Watching on Desktop or Laptop", content: ["For the best experience, open BharatTV in Chrome or Firefox. Use Theater Mode for an immersive, distraction-free experience.", "Keyboard shortcuts: F for fullscreen, T for theater mode, M to mute/unmute, Esc to close, / to search."] },
              { icon: Smartphone, title: "Watching on Mobile & Tablet", content: ["BharatTV is fully responsive. The interface adapts to your screen size with a clean grid layout optimised for touch.", "Pro tip: Add BharatTV to your home screen on Android or iOS for an app-like experience without installing anything."] },
              { icon: Wifi, title: "Troubleshooting Stream Issues", content: ["If a channel isn't loading, refresh and retry. Try the VLC button to bypass browser limitations, or 'Open in New Tab' for direct streaming.", "BharatTV automatically tries alternate sources for better reliability."] },
              { icon: Clock, title: "Best Times to Watch", content: ["Indian TV follows IST (UTC+5:30). Prime time: 8-11 PM IST. News peaks at 9 AM, 1 PM, 6 PM, 9 PM IST. Cricket: 2 PM or 7 PM IST."] },
            ].map(({ icon: Icon, title, content }) => (
              <article key={title} className="rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:border-l-primary border-l-[3px] border-l-transparent hover:shadow-[0_4px_30px_hsl(var(--primary)/0.1)] backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  {title}
                </h3>
                {content.map((p, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>About BharatTV</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">BharatTV</strong> is India's largest free live TV streaming platform, offering over 19,000 channels. Founded by Raghav, a tech enthusiast passionate about making Indian media accessible worldwide.</p>
            <p>Our mission: <strong className="text-foreground">make Indian television accessible to everyone, everywhere — for free.</strong></p>
            <p>BharatTV aggregates publicly available IPTV streams from the open-source <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">iptv-org</a> project. We do not host any video content.</p>
          </div>
          <div className="mt-6 text-center">
            <a href="/about.html" className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1">
              Read full About page <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Frequently Asked Questions</h2>
          <p className="mb-10 text-center text-muted-foreground">Answers to common questions about BharatTV</p>
          <div className="space-y-4">
            {[
              { q: "Is BharatTV really free?", a: "Yes, 100% free. No subscriptions, no hidden fees, no credit card required. We support the platform through non-intrusive advertisements." },
              { q: "Do I need to create an account?", a: "No. Start watching immediately — no signup, no login, no personal information needed." },
              { q: "What devices does BharatTV work on?", a: "Any device with a modern browser — Android, iPhone, iPad, Windows, Mac. Compatible with Chrome, Firefox, Edge, Safari, Opera, and Brave." },
              { q: "What languages are available?", a: "12+ languages: Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, and Bhojpuri." },
              { q: "Why is a channel not working?", a: "Streams may be temporarily unavailable or geo-restricted. Try refreshing, using VLC, or opening in a new tab. BharatTV auto-tries multiple sources." },
              { q: "Is it legal?", a: "BharatTV aggregates publicly available streams from the open-source iptv-org project. We don't host any content." },
              { q: "Can I watch outside India?", a: "Yes! BharatTV is designed for the Indian diaspora worldwide. Most channels work globally." },
              { q: "How do I use Theater Mode?", a: "Click Theater Mode or press 'T'. Press 'F' for fullscreen, 'M' to mute/unmute, 'Esc' to close the player." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-border bg-card/80 p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)] backdrop-blur-sm">
                <h3 className="mb-2 font-semibold">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl" style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, hsl(230 50% 95%), hsl(192 100% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Get in Touch</h2>
          <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
            Questions, feedback, or suggestions? Reach out through our social channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "▶ YouTube", url: "https://www.youtube.com/@raghav_begins" },
              { label: "📸 Instagram", url: "https://www.instagram.com/raghav3o" },
              { label: "👍 Facebook", url: "https://m.facebook.com/profile.php?id=100091519152590" },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-border/50 hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5 transition-all backdrop-blur-sm">{label}</Button>
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            For content removal requests, copyright concerns, or business inquiries, please reach out via our social media channels.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 py-12 border-t border-border relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">B</div>
                <span className="font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>BharatTV</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                India's #1 free live TV streaming platform. 19,000+ channels, 12+ languages, 9+ countries — completely free.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[["Watch TV", "/BharatTV.html"], ["Features", "#features"], ["How It Works", "#how-it-works"], ["Guide", "#guide"], ["About", "#about"], ["Contact", "#contact"]].map(([name, url]) => (
                  <li key={name}><a href={url} className="hover:text-primary transition-colors">{name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/privacy-policy.html" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service.html" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/about.html" className="hover:text-primary transition-colors">About BharatTV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>Follow Us</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="https://www.youtube.com/@raghav_begins" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a></li>
                <li><a href="https://www.instagram.com/raghav3o" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://m.facebook.com/profile.php?id=100091519152590" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-center text-xs text-yellow-200/80">
            <p className="font-semibold text-yellow-300">⚠️ Channel Availability Notice</p>
            <p className="mt-1">Many channels may fail because their source streams are dead, geo-restricted to India, or the source URLs have changed. This is an inherent limitation of the <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">iptv-org</a> data source — not a bug in the player.</p>
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} BharatTV. All rights reserved. Made with ❤️ by Raghav.</p>
            <p className="mt-1">
              Channel data sourced from <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">iptv-org</a>. BharatTV does not host any video content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
