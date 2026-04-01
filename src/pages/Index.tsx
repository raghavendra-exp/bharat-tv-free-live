import { Tv, Play, Globe, Zap, Shield, Smartphone, Languages, Radio, BookOpen, Mail, Monitor, Wifi, Clock, Star, ChevronRight, Users, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">B</div>
            <span className="text-lg font-bold tracking-tight">BharatTV</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#channels" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Channels</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Guide</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <a href="/BharatTV.html">
            <Button size="sm" className="gap-1.5">
              <Play className="h-3.5 w-3.5" /> Watch Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-32">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Tv className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Watch 19,000+ Free Live<br />Indian TV Channels
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Stream live News, Sports, Entertainment, Movies, Music, Kids channels in Hindi, English, Tamil, Telugu, Bengali, Punjabi & more — completely free with no signup.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/BharatTV.html">
              <Button size="lg" className="gap-2 text-base">
                <Play className="h-5 w-5" /> Start Watching Free
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                Learn How It Works
              </Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            ✅ No signup &nbsp;·&nbsp; ✅ No downloads &nbsp;·&nbsp; ✅ Works on all devices
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-b border-border bg-primary/5 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "19,000+", label: "Live Channels" },
              { value: "12+", label: "Languages" },
              { value: "9+", label: "Countries" },
              { value: "100%", label: "Free Forever" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-primary md:text-3xl">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Why Choose BharatTV?</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            BharatTV is India's most comprehensive free live TV platform, designed to bring every Indian channel to your fingertips — no matter where you are in the world.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, title: "19,000+ Channels", desc: "Access thousands of live channels from India and 9+ countries worldwide. From national broadcasters to regional favourites, we have the most extensive collection anywhere on the internet." },
              { icon: Zap, title: "Instant Streaming", desc: "No buffering, no downloads, no apps to install. Simply click any channel and start watching immediately in your web browser using HLS streaming technology." },
              { icon: Shield, title: "100% Free & Safe", desc: "No registration, no credit card, no hidden charges. BharatTV is completely free and always will be. We believe Indian TV should be accessible to everyone." },
              { icon: Smartphone, title: "Works Everywhere", desc: "Mobile, tablet, laptop, desktop, smart TV — watch on any device with a modern web browser. Responsive design adapts perfectly to every screen size." },
              { icon: Languages, title: "12+ Languages", desc: "Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, Bhojpuri and more. Content in every major Indian language." },
              { icon: Radio, title: "All Categories", desc: "News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional, Documentary, Lifestyle, Travel, Science and Technology — every genre covered." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">How BharatTV Works</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Getting started with BharatTV takes just seconds. Here's how you can watch your favourite Indian TV channels for free.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", icon: Monitor, title: "Open BharatTV", desc: "Visit BharatTV from any device — phone, tablet, laptop, or desktop. No app downloads or installations needed. Works in Chrome, Firefox, Safari, Edge, and all modern browsers." },
              { step: "2", icon: Globe, title: "Browse & Search", desc: "Use our powerful search and filter system to find channels by name, language, country, or category. Filter by Hindi, Tamil, Telugu, English or any of 12+ languages. Browse News, Sports, Entertainment, and more." },
              { step: "3", icon: Play, title: "Click & Watch", desc: "Simply click on any channel to start streaming instantly. Our HLS player delivers smooth, buffer-free playback. Use theater mode for a cinematic experience, or open in VLC for full control." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
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
      <section id="channels" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Popular Channel Categories</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            BharatTV organises thousands of channels into easy-to-browse categories. Whether you want to catch the latest cricket match, watch Bollywood movies, or tune into regional news — we have it all.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { emoji: "📰", name: "News", examples: "Aaj Tak, NDTV, Republic, India Today, ABP News, Zee News" },
              { emoji: "⚽", name: "Sports", examples: "Cricket, Football, IPL, Kabaddi, Wrestling, Hockey" },
              { emoji: "🎬", name: "Entertainment", examples: "Star Plus, Zee TV, Colors, Sony, SET Max" },
              { emoji: "🎵", name: "Music", examples: "MTV India, 9XM, B4U Music, Zing, VH1 India" },
              { emoji: "🧒", name: "Kids", examples: "Cartoon Network, Pogo, Nick, Disney, Hungama" },
              { emoji: "📚", name: "Education", examples: "Discovery, Nat Geo, History, Science Channel" },
              { emoji: "🕉️", name: "Devotional", examples: "Aastha, Sanskar, Peace of Mind, Divya" },
              { emoji: "🎥", name: "Movies", examples: "Bollywood, Tamil, Telugu, Bengali, Marathi films" },
            ].map(({ emoji, name, examples }) => (
              <a
                key={name}
                href="/BharatTV.html"
                className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-2 text-3xl">{emoji}</div>
                <div className="font-semibold text-sm">{name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{examples}</div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/BharatTV.html">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" /> Browse All 19,000+ Channels
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Watch TV in Your Language</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            BharatTV supports every major Indian language. Whether you speak Hindi, Tamil, Telugu, or any other regional language, you'll find hundreds of channels in your mother tongue.
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
              <div key={lang} className="rounded-lg border border-border bg-card p-3 text-center">
                <div className="font-semibold text-sm">{lang}</div>
                <div className="mt-1 text-xs text-primary font-medium">{channels} channels</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Viewing Guide Section */}
      <section id="guide" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Complete Viewing Guide</h2>
          <p className="mb-10 text-center text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to get the best experience from BharatTV.
          </p>
          <div className="space-y-8">
            <article className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Watching on Desktop or Laptop
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For the best viewing experience on a computer, simply open BharatTV in your web browser. We recommend using Google Chrome or Mozilla Firefox for optimal HLS stream playback. Use our <strong>Theater Mode</strong> feature for an immersive, distraction-free viewing experience — it expands the video player to fill most of your screen while keeping the channel list accessible.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Keyboard shortcuts:</strong> Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">F</kbd> for fullscreen, <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">T</kbd> for theater mode, <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">M</kbd> to mute/unmute, <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Esc</kbd> to close the player, and <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">/</kbd> to focus the search bar.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Watching on Mobile & Tablet
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                BharatTV is fully responsive and works great on smartphones and tablets. Open your mobile browser (Chrome, Safari, or Firefox) and navigate to BharatTV. The interface automatically adapts to your screen size, showing channels in a clean grid layout optimised for touch interaction.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Pro tip:</strong> On Android, you can add BharatTV to your home screen for quick access — tap the browser menu and select "Add to Home screen". On iOS, tap the Share button in Safari and choose "Add to Home Screen". This gives you an app-like experience without installing anything.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                Troubleshooting Stream Issues
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If a channel isn't loading, here are some things to try: First, refresh the page and try again — some streams need a second attempt. If the channel still doesn't work, it may be temporarily offline or geo-restricted in your region.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can also try opening the stream in <strong>VLC Media Player</strong> by clicking the VLC button — this bypasses browser limitations. Another option is the "Open in New Tab" button, which loads the raw stream URL directly. If a channel has multiple stream sources, BharatTV automatically tries alternate sources for better reliability.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Best Times to Watch
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Indian TV channels follow IST (Indian Standard Time, UTC+5:30). Prime time entertainment shows typically air between 8 PM – 11 PM IST. News channels broadcast 24/7 with peak bulletins at 9 AM, 1 PM, 6 PM, and 9 PM IST. Sports channels carry live matches as per their schedules — cricket matches often start at 2 PM or 7 PM IST. For Indians abroad, adjust these times to your local timezone for the best viewing schedule.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">About BharatTV</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">BharatTV</strong> is India's largest free live TV streaming platform, offering over 19,000 channels from India and across the globe. Founded by Raghav, a tech enthusiast passionate about making Indian media accessible worldwide, BharatTV has grown to serve thousands of viewers daily.
            </p>
            <p>
              Our mission is simple: <strong className="text-foreground">make Indian television accessible to everyone, everywhere — for free.</strong> Whether you're an Indian living abroad missing your favourite news channel, a sports fan wanting to catch live cricket, a parent looking for safe kids' content, or simply looking for entertainment in your regional language — BharatTV has you covered.
            </p>
            <p>
              BharatTV aggregates publicly available IPTV streams from the open-source <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">iptv-org</a> project and presents them in a clean, user-friendly interface. We do not host or store any video content — we simply provide an organised, searchable platform to discover and watch publicly available live streams.
            </p>
            <p>
              BharatTV supports 12+ Indian languages including Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, and Bhojpuri. Our channels span every category — News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional, Documentary, Lifestyle, Travel, and Science. We also include channels from USA, UK, Canada, UAE, Pakistan, Bangladesh, Nepal, and Australia.
            </p>
            <p>
              The platform features a powerful search engine, multi-level filtering (by language, country, and category), dark and light themes, theater mode for immersive viewing, keyboard shortcuts for power users, and a responsive design that works seamlessly on every device from smartphones to desktop monitors.
            </p>
          </div>
          <div className="mt-6 text-center">
            <a href="/about.html" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Read full About page <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
          <p className="mb-10 text-center text-muted-foreground">
            Answers to common questions about using BharatTV
          </p>
          <div className="space-y-5">
            {[
              { q: "Is BharatTV really free?", a: "Yes, BharatTV is 100% free. There are no subscriptions, no hidden fees, and no credit card required. We support our platform through non-intrusive advertisements. We believe Indian television should be accessible to everyone regardless of their financial situation." },
              { q: "Do I need to create an account or sign up?", a: "No. You can start watching immediately — no signup, no login, no personal information needed. Simply open BharatTV in your browser and start browsing channels. We respect your privacy and don't collect any personal data." },
              { q: "What devices does BharatTV work on?", a: "BharatTV works on any device with a modern web browser — Android phones, iPhones, iPads, Android tablets, Windows laptops, MacBooks, and desktop computers. It's compatible with Chrome, Firefox, Edge, Safari, Opera, and Brave. You can also use VLC Media Player to watch streams." },
              { q: "What languages are available on BharatTV?", a: "We support 12+ Indian languages: Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, and Bhojpuri. We also have channels in international languages from countries like USA, UK, Canada, and UAE." },
              { q: "Why is a channel not working or buffering?", a: "Some streams may be temporarily unavailable due to source issues, or they may be geo-restricted in your region. Try refreshing the page, using the VLC option, or opening in a new tab. BharatTV automatically tries multiple stream sources for each channel. If a channel is consistently unavailable, it may have been taken offline by the broadcaster." },
              { q: "Is it legal to watch channels on BharatTV?", a: "BharatTV aggregates publicly available IPTV streams from the open-source iptv-org project. We do not host, store, or redistribute any video content ourselves. All streams are sourced from public URLs available on the internet. We promptly respond to any content removal requests from rights holders." },
              { q: "Can I watch BharatTV outside India?", a: "Yes! BharatTV is specifically designed for the Indian diaspora worldwide. Whether you're in the USA, UK, Canada, Australia, UAE, or anywhere else, you can access most channels. Some channels may have geo-restrictions imposed by the broadcaster, but the vast majority work globally." },
              { q: "How do I use Theater Mode or fullscreen?", a: "Click the Theater Mode button (or press 'T' on your keyboard) to expand the video player for an immersive experience. Press 'F' for fullscreen mode. Use 'M' to mute/unmute, and 'Esc' to close the player. These keyboard shortcuts make navigation quick and efficient." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 font-semibold">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Get in Touch</h2>
          <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you. Reach out through any of our social channels and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/@raghav_begins" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">▶ YouTube</Button>
            </a>
            <a href="https://www.instagram.com/raghav3o" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">📸 Instagram</Button>
            </a>
            <a href="https://m.facebook.com/profile.php?id=100091519152590" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">👍 Facebook</Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            For content removal requests, copyright concerns, or business inquiries, please reach out via our social media channels above.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">B</div>
                <span className="font-bold">BharatTV</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                India's #1 free live TV streaming platform. Watch 19,000+ channels in 12+ languages from 9+ countries — completely free, no signup required.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/BharatTV.html" className="hover:text-foreground transition-colors">Watch TV</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#guide" className="hover:text-foreground transition-colors">Viewing Guide</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/privacy-policy.html" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service.html" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="/about.html" className="hover:text-foreground transition-colors">About BharatTV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="https://www.youtube.com/@raghav_begins" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">YouTube</a></li>
                <li><a href="https://www.instagram.com/raghav3o" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="https://m.facebook.com/profile.php?id=100091519152590" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} BharatTV. All rights reserved. Made with ❤️ by Raghav.</p>
            <p className="mt-1">
              Channel data sourced from the <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">iptv-org</a> open-source project. BharatTV does not host any video content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;