import { useState } from "react";
import { Link } from "react-router-dom";
import { Tv, Play, Globe, Zap, Shield, Smartphone, Languages, Radio, Monitor, Wifi, Clock, ChevronRight, Menu, X, Star, TrendingUp, Users, Heart, Award, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import TvAnimation from "@/components/TvAnimation";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-secondary/[0.07] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[140px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[70%] left-[20%] w-[300px] h-[300px] rounded-full bg-secondary/[0.04] blur-[80px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2.5" aria-label="BharatTV Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--primary)/0.4)] animate-glow-pulse">B</div>
            <span className="text-xl font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>BharatTV</span>
          </a>
          <nav className="hidden gap-7 md:flex" aria-label="Main navigation">
            {["Features", "Channels", "How It Works", "Guide", "About", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest font-medium relative group cursor-pointer">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="/BharatTV.html">
              <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5 animate-gradient-shift">
                <Play className="h-3.5 w-3.5" /> Watch Now
              </Button>
            </a>
            <button
              className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in" aria-label="Mobile navigation">
            <div className="flex flex-col px-4 py-3 gap-1">
              {["Features", "Channels", "How It Works", "Guide", "About", "Contact"].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-muted transition-all uppercase tracking-widest font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative border-b border-border" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_40%),radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/0.12),transparent_40%),radial-gradient(circle_at_50%_80%,hsl(var(--accent)/0.1),transparent_40%)]" />
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:py-36">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium animate-fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              India's #1 Free Live TV Platform
            </div>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-[0_0_40px_hsl(var(--primary)/0.4),0_0_80px_hsl(var(--secondary)/0.2)] animate-float">
              <Tv className="h-10 w-10" />
            </div>
            <h1 id="hero-heading" className="mb-5 text-4xl font-extrabold tracking-wider md:text-5xl lg:text-6xl gradient-text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Watch 19,000+ Free Live<br />Indian TV Channels
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Stream live News, Sports, Entertainment, Movies, Music, Kids channels in Hindi, English, Tamil, Telugu, Bengali, Punjabi & more — <strong className="text-foreground">completely free</strong> with no signup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/BharatTV.html">
                <Button size="lg" className="gap-2 text-base bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground shadow-[0_4px_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.6)] hover:-translate-y-1 transition-all animate-gradient-shift">
                  <Play className="h-5 w-5" /> Start Watching Free
                </Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="gap-2 text-base border-border/50 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-1 transition-all backdrop-blur-sm">
                  Learn How It Works
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              {["No signup", "No downloads", "Works on all devices", "100% Free"].map(tag => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/50">
                  ✅ {tag}
                </span>
              ))}
            </div>
            <TvAnimation />
          </div>
        </section>

        {/* Stats Banner */}
        <section className="border-b border-border py-10 relative z-10" aria-label="Platform statistics">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 section-fade-up">
              {[
                { value: "19,000+", label: "Live Channels", icon: Tv },
                { value: "12+", label: "Languages", icon: Languages },
                { value: "9+", label: "Countries", icon: Globe },
                { value: "100%", label: "Free Forever", icon: Heart },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-5 rounded-2xl glass-card hover:-translate-y-1.5 transition-all duration-300 cursor-default group">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                  <div className="text-2xl font-extrabold md:text-3xl gradient-text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</div>
                  <div className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By / Social Proof */}
        <section className="border-b border-border py-8 relative z-10" aria-label="Social proof">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground text-xs">
              <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary/60" /> Trusted by thousands of viewers worldwide</div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-secondary/60" /> Growing every day</div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-accent/60" /> Open-source powered</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-b border-border py-16 md:py-24 relative z-10" aria-labelledby="features-heading">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="features-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Why Choose BharatTV?</h2>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              India's most comprehensive free live TV platform, designed to bring every Indian channel to your fingertips.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 section-fade-up">
              {[
                { icon: Globe, title: "19,000+ Channels", desc: "Access thousands of live channels from India and 9+ countries worldwide. From national broadcasters to regional favourites.", color: "from-primary to-accent" },
                { icon: Zap, title: "Instant Streaming", desc: "No buffering, no downloads, no apps to install. Simply click any channel and start watching immediately using HLS technology.", color: "from-secondary to-primary" },
                { icon: Shield, title: "100% Free & Safe", desc: "No registration, no credit card, no hidden charges. BharatTV is completely free and always will be.", color: "from-accent to-secondary" },
                { icon: Smartphone, title: "Works Everywhere", desc: "Mobile, tablet, laptop, desktop, smart TV — watch on any device with a modern web browser.", color: "from-primary to-secondary" },
                { icon: Languages, title: "12+ Languages", desc: "Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, Bhojpuri and more.", color: "from-accent to-primary" },
                { icon: Radio, title: "All Categories", desc: "News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional, Documentary — every genre covered.", color: "from-secondary to-accent" },
              ].map(({ icon: Icon, title, desc, color }) => (
                <article key={title} className="group rounded-2xl glass-card p-6 transition-all duration-400 hover:-translate-y-1.5 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-[0_4px_15px_hsl(var(--primary)/0.2)]`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10" aria-labelledby="how-heading">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="how-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>How BharatTV Works</h2>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              Getting started takes just seconds. Here's how you can watch your favourite Indian TV channels for free.
            </p>
            <div className="grid gap-8 md:grid-cols-3 section-fade-up">
              {[
                { step: "1", icon: Monitor, title: "Open BharatTV", desc: "Visit BharatTV from any device — phone, tablet, laptop, or desktop. No app downloads needed. Works in all modern browsers." },
                { step: "2", icon: Globe, title: "Browse & Search", desc: "Use our powerful search and filter system to find channels by name, language, country, or category. Filter by 12+ languages." },
                { step: "3", icon: Play, title: "Click & Watch", desc: "Click on any channel to start streaming instantly. Use theater mode for cinematic experience, or open in VLC for full control." },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="text-center group">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground text-2xl font-bold shadow-[0_0_30px_hsl(var(--primary)/0.3)] animate-glow-pulse" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {step}
                  </div>
                  <Icon className="mx-auto mb-3 h-8 w-8 text-primary/70 group-hover:text-primary transition-colors" />
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Channel Categories Section */}
        <section id="channels" className="border-b border-border py-16 md:py-24 relative z-10" aria-labelledby="channels-heading">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="channels-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Popular Channel Categories</h2>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              Thousands of channels organised into easy-to-browse categories. Cricket, Bollywood, regional news — we have it all.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 section-fade-up">
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
                  className="group rounded-2xl glass-card p-5 text-center transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="mb-3 text-4xl drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)] group-hover:scale-110 transition-transform">{emoji}</div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{examples}</div>
                </a>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="/BharatTV.html">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground shadow-[0_4px_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.6)] hover:-translate-y-1 transition-all animate-gradient-shift">
                  <Play className="h-4 w-4" /> Browse All 19,000+ Channels
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Supported Languages Section */}
        <section className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10" aria-labelledby="languages-heading">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="languages-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Watch TV in Your Language</h2>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              Every major Indian language supported. Find hundreds of channels in your mother tongue.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 section-fade-up">
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
                <div key={lang} className="rounded-xl glass-card p-4 text-center transition-all duration-300 hover:scale-105 cursor-default">
                  <div className="font-semibold text-sm">{lang}</div>
                  <div className="mt-1 text-xs font-medium gradient-text-primary">{channels} channels</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial: What Makes BharatTV Different */}
        <section className="border-b border-border py-16 md:py-24 relative z-10" aria-labelledby="editorial-heading">
          <div className="mx-auto max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium">
              <Award className="h-3.5 w-3.5" /> Editor's Spotlight
            </div>
            <h2 id="editorial-heading" className="mb-6 text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>What Makes BharatTV Different?</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                In a world where most streaming services hide behind paywalls, <strong className="text-foreground">BharatTV stands apart as a completely free, open-access platform</strong> for live Indian television. Whether you are an NRI missing home, a student wanting regional news, or a cricket fan looking for live sports — BharatTV delivers it all without asking for a single rupee.
              </p>
              <p>
                Unlike traditional cable TV or paid OTT platforms like Hotstar, SonyLIV, or JioCinema, BharatTV leverages the power of open-source technology. Our channel directory is sourced from the community-driven <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">iptv-org project</a>, which catalogues publicly available broadcast streams from around the globe.
              </p>
              <h3 className="text-lg font-semibold text-foreground pt-2">The Technology Behind the Streams</h3>
              <p>
                BharatTV uses <strong className="text-foreground">HLS (HTTP Live Streaming)</strong> technology — the same adaptive-bitrate protocol used by Netflix, YouTube, and Apple TV. HLS automatically adjusts video quality based on your internet speed, so you get the best possible picture whether you are on high-speed Wi-Fi or a 4G mobile connection in a rural area.
              </p>
              <p>
                Our built-in player supports multiple fallback sources per channel. If one stream source goes down, BharatTV automatically tries the next available URL. For advanced users, every channel includes a "Copy URL" option that works with VLC, mpv, or any HLS-compatible media player.
              </p>
              <h3 className="text-lg font-semibold text-foreground pt-2">Who Is BharatTV For?</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">The Indian Diaspora:</strong> Millions of Indians living abroad struggle to access their favourite news channels and entertainment shows. BharatTV bridges that gap.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Cord-cutters:</strong> People who have given up expensive cable subscriptions but still want live TV access.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Students & Budget viewers:</strong> Anyone who cannot afford ₹500-₹1500/month OTT subscriptions.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Language learners:</strong> People wanting immersive exposure to Hindi, Tamil, Telugu, or other Indian languages.</span></li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground pt-2">Our Commitment to Quality</h3>
              <p>
                We continuously update our channel database, remove dead streams, and add new sources. Our search and filter system lets you navigate thousands of channels effortlessly — by language, country, category, or channel name. The interface is built with performance in mind: lightweight, fast-loading, and accessible on low-end devices.
              </p>
            </div>
          </div>
        </section>

        {/* Viewing Guide Section */}
        <section id="guide" className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10" aria-labelledby="guide-heading">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="guide-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Complete Viewing Guide</h2>
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
                <article key={title} className="rounded-2xl glass-card p-6 transition-all duration-300 hover:border-l-primary border-l-[3px] border-l-transparent">
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
        <section id="about" className="border-b border-border py-16 md:py-24 relative z-10" aria-labelledby="about-heading">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="about-heading" className="mb-6 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>About BharatTV</h2>
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
        <section className="border-b border-border bg-muted/20 py-16 md:py-24 relative z-10" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="faq-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Frequently Asked Questions</h2>
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
                <details key={q} className="group rounded-2xl glass-card transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)]">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold list-none [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-b border-border py-16 md:py-24 relative z-10" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 id="contact-heading" className="mb-4 text-2xl font-bold md:text-3xl gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Get in Touch</h2>
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
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs px-3 py-1.5 border-border/50 hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5 transition-all backdrop-blur-sm">{label}</Button>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              For content removal requests, copyright concerns, or business inquiries, please reach out via our social media channels.
            </p>
          </div>
        </section>
      </main>

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
          <div className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center text-xs text-muted-foreground">
            <p className="font-semibold text-destructive">⚠️ Channel Availability Notice</p>
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
