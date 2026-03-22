import { Tv, Play, Globe, Zap, Shield, Smartphone, Languages, Radio, BookOpen, Mail } from "lucide-react";
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
            <a href="#features">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                Learn More
              </Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            ✅ No signup &nbsp;·&nbsp; ✅ No downloads &nbsp;·&nbsp; ✅ Works on all devices
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Why Choose BharatTV?</h2>
          <p className="mb-12 text-center text-muted-foreground">
            India's most comprehensive free live TV platform
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, title: "19,000+ Channels", desc: "Access thousands of live channels from India and 9+ countries worldwide." },
              { icon: Zap, title: "Instant Streaming", desc: "No buffering, no downloads. Click and watch instantly in your browser." },
              { icon: Shield, title: "100% Free & Safe", desc: "No registration, no credit card, no hidden charges. Completely free forever." },
              { icon: Smartphone, title: "Works Everywhere", desc: "Mobile, tablet, laptop, desktop — watch on any device with a browser." },
              { icon: Languages, title: "12+ Languages", desc: "Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati & more." },
              { icon: Radio, title: "All Categories", desc: "News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional & more." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Categories Section */}
      <section id="channels" className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Popular Channel Categories</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Browse channels by your favourite category
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { emoji: "📰", name: "News", examples: "Aaj Tak, NDTV, Republic" },
              { emoji: "⚽", name: "Sports", examples: "Cricket, Football, IPL" },
              { emoji: "🎬", name: "Entertainment", examples: "Star Plus, Zee TV, Colors" },
              { emoji: "🎵", name: "Music", examples: "MTV, 9XM, B4U Music" },
              { emoji: "🧒", name: "Kids", examples: "Cartoon Network, Pogo" },
              { emoji: "📚", name: "Education", examples: "Discovery, Nat Geo" },
              { emoji: "🕉️", name: "Devotional", examples: "Aastha, Sanskar" },
              { emoji: "🎥", name: "Movies", examples: "Bollywood, Regional" },
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
                <Play className="h-4 w-4" /> Browse All Channels
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">About BharatTV</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">BharatTV</strong> is India's largest free live TV streaming platform, offering over 19,000 channels from India and across the globe. Our mission is to make Indian television accessible to everyone, everywhere — for free.
            </p>
            <p>
              Whether you're an Indian living abroad missing your favourite news channel, a sports fan wanting to catch live cricket, or simply looking for entertainment in your regional language — BharatTV has you covered. We aggregate publicly available IPTV streams and present them in a clean, easy-to-use interface.
            </p>
            <p>
              BharatTV supports 12+ Indian languages including Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, and Bhojpuri. Our channels span every category — News, Sports, Entertainment, Movies, Music, Kids, Education, Devotional, Documentary, Lifestyle, Travel, and Science.
            </p>
            <p>
              Built with ❤️ by <strong className="text-foreground">Raghav</strong>. Channel data sourced from the open-source <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">iptv-org</a> project.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Is BharatTV really free?", a: "Yes, BharatTV is 100% free. There are no subscriptions, no hidden fees, and no credit card required. We support our platform through non-intrusive advertisements." },
              { q: "Do I need to create an account?", a: "No. You can start watching immediately — no signup, no login, no personal information needed." },
              { q: "What devices does BharatTV work on?", a: "BharatTV works on any device with a modern web browser — smartphones, tablets, laptops, and desktop computers. It supports Chrome, Firefox, Edge, Safari, and more." },
              { q: "What languages are available?", a: "We support 12+ Indian languages including Hindi, English, Tamil, Telugu, Bengali, Punjabi, Marathi, Gujarati, Kannada, Malayalam, Urdu, and Bhojpuri." },
              { q: "Why is a channel not working?", a: "Some streams may be temporarily unavailable or geo-restricted. Try refreshing, or use the VLC/New Tab option. We continuously update stream sources to ensure maximum availability." },
              { q: "Is BharatTV legal?", a: "BharatTV aggregates publicly available IPTV streams from the open-source iptv-org project. We do not host any content ourselves. All streams are sourced from public URLs available on the internet." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 font-semibold">{q}</h3>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Contact Us</h2>
          <p className="mb-8 text-muted-foreground">
            Have questions, feedback, or suggestions? Reach out through our social channels.
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
              <p className="text-xs text-muted-foreground">
                India's #1 free live TV streaming platform. 19,000+ channels, 12+ languages, zero cost.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/BharatTV.html" className="hover:text-foreground transition-colors">Watch TV</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/privacy-policy.html" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service.html" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="/about.html" className="hover:text-foreground transition-colors">About</a></li>
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
              Channel data from <a href="https://github.com/iptv-org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">iptv-org</a> open-source project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
