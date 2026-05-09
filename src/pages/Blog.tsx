import { Link } from "react-router-dom";
import { ArrowRight, Clock, User, Tag, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { blogPosts, formatDate } from "@/data/blogPosts";

const Blog = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://bugbash-fullscreen-joy.lovable.app";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
    ],
  };
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="BharatTV Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--primary)/0.4)]">B</div>
            <span className="text-xl font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>BharatTV</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest font-medium">Home</Link>
            <Link to="/blog" className="text-xs text-primary uppercase tracking-widest font-medium">Blog</Link>
            <a href="/BharatTV.html" className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground text-sm font-medium px-4 py-2 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5">
              Watch Now
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="text-foreground">Blog</li>
            </ol>
          </nav>
        </div>
        {/* Hero */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center section-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide">BharatTV Blog</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider gradient-text-primary mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Streaming Insights & Guides
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tips, guides, and news about free Indian TV streaming — helping you get the most out of BharatTV and stay connected to Indian entertainment.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <Link to={`/blog/${blogPosts[0].slug}`} className="group block">
              <article className="glass-card rounded-2xl p-6 md:p-10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-4xl md:text-5xl animate-float">
                    {blogPosts[0].image}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        <Sparkles className="h-3 w-3" /> Featured
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3" /> {blogPosts[0].category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {blogPosts[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" /> {blogPosts[0].author} · {formatDate(blogPosts[0].date)}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* All Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-8 gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              All Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                  <article className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_hsl(var(--accent)/0.12)]">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 text-2xl">
                        {post.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{post.category}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <User className="h-3 w-3 inline mr-1" />{post.author} · {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 relative z-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BharatTV. All rights reserved. Made with ❤️ by Raghav.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="/privacy-policy.html" className="hover:text-primary transition-colors">Privacy</a>
            <a href="/terms-of-service.html" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
