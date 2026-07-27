import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, Share2, ChevronRight } from "lucide-react";
import { getPostBySlug, formatDate, blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://bugbash-fullscreen-joy.lovable.app";

  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = `${post.title} — BharatTV Blog`;
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", post.excerpt);
    setMeta("og:title", post.title, "property");
    setMeta("og:description", post.excerpt, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", `${origin}/blog/${post.slug}`, "property");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${origin}/blog/${post.slug}`;
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = prevTitle; };
  }, [post, origin]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${origin}/blog/${post.slug}` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "BharatTV" },
    mainEntityOfPage: `${origin}/blog/${post.slug}`,
  };

  // Simple markdown-to-HTML (handles ##, ###, **, -, |, [links])
  const renderContent = (content: string) => {
    return content
      .trim()
      .split('\n')
      .map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={i} />;
        
        if (trimmed.startsWith('### ')) {
          return <h3 key={i} className="text-lg font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "'Orbitron', sans-serif" }}>{renderInline(trimmed.slice(4))}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={i} className="text-xl md:text-2xl font-bold mt-10 mb-4 gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>{renderInline(trimmed.slice(3))}</h2>;
        }
        if (trimmed.startsWith('#### ')) {
          return <h4 key={i} className="text-base font-bold mt-6 mb-2 text-primary">{renderInline(trimmed.slice(5))}</h4>;
        }
        if (trimmed.startsWith('- **')) {
          const parts = trimmed.slice(2);
          return <li key={i} className="ml-4 mb-2 text-muted-foreground list-disc">{renderInline(parts)}</li>;
        }
        if (trimmed.startsWith('- ')) {
          return <li key={i} className="ml-4 mb-1 text-muted-foreground list-disc">{renderInline(trimmed.slice(2))}</li>;
        }
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          if (trimmed.replace(/[|\-\s]/g, '') === '') return null; // separator row
          const cells = trimmed.split('|').filter(Boolean).map(c => c.trim());
          const isHeader = i > 0 && content.trim().split('\n')[content.trim().split('\n').findIndex((l) => l.trim() === trimmed) + 1]?.trim().startsWith('|---');
          if (isHeader) {
            return (
              <tr key={i} className="border-b border-border">
                {cells.map((cell, j) => <th key={j} className="px-3 py-2 text-left text-xs font-semibold text-primary">{cell}</th>)}
              </tr>
            );
          }
          return (
            <tr key={i} className="border-b border-border/50">
              {cells.map((cell, j) => <td key={j} className="px-3 py-2 text-xs text-muted-foreground">{cell}</td>)}
            </tr>
          );
        }
        return <p key={i} className="mb-4 text-muted-foreground leading-relaxed">{renderInline(trimmed)}</p>;
      });
  };

  const renderInline = (text: string) => {
    // Handle bold and links
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{linkMatch[1]}</a>;
      }
      return part;
    });
  };

  // Wrap table rows
  const contentElements = renderContent(post.content);
  const wrappedContent: React.ReactNode[] = [];
  let tableRows: React.ReactNode[] = [];

  contentElements.forEach((el, i) => {
    if (el && typeof el === 'object' && 'type' in el && el.type === 'tr') {
      tableRows.push(el);
    } else {
      if (tableRows.length > 0) {
        wrappedContent.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-border">
            <table className="w-full"><tbody>{tableRows}</tbody></table>
          </div>
        );
        tableRows = [];
      }
      wrappedContent.push(el);
    }
  });
  if (tableRows.length > 0) {
    wrappedContent.push(
      <div key="table-end" className="overflow-x-auto my-6 rounded-xl border border-border">
        <table className="w-full"><tbody>{tableRows}</tbody></table>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--primary)/0.4)]">B</div>
            <span className="text-xl font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>BharatTV</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest font-medium">Home</Link>
            <Link to="/blog" className="text-xs text-primary uppercase tracking-widest font-medium">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        {/* Breadcrumb */}
        <div className="mx-auto max-w-3xl px-4 pt-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="text-foreground truncate max-w-[220px] md:max-w-[400px]">{post.title}</li>
            </ol>
          </nav>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-3xl px-4 py-8 md:py-12">
          <div className="mb-8 section-fade-up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                <Tag className="h-3 w-3" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" /> {post.author}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-wider gradient-text-primary mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {post.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Published {formatDate(post.date)}</span>
              <button
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href }).catch(() => {})}
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                <Share2 className="h-3 w-3" /> Share
              </button>
            </div>
          </div>

          {/* Article emoji hero */}
          <div className="emoji flex items-center justify-center w-full h-32 md:h-40 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-border mb-10 text-6xl md:text-7xl animate-float">
            {post.image}
          </div>

          {/* Article Body */}
          <div className="prose-custom">
            {wrappedContent}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl glass-card p-6 md:p-8 text-center animate-border-glow border">
            <h3 className="text-lg font-bold mb-2 gradient-text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>Ready to Watch?</h3>
            <p className="text-muted-foreground text-sm mb-4">Start streaming 19,000+ Indian TV channels for free — no signup needed.</p>
            <a href="/BharatTV.html" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground text-sm font-medium px-6 py-2.5 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5">
              Start Watching Free
            </a>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold mb-6 gradient-text-cool" style={{ fontFamily: "'Orbitron', sans-serif" }}>Related Articles</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group glass-card rounded-xl p-4 transition-all duration-300 hover:border-primary/40">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{rp.image}</span>
                      <div>
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rp.readTime} · {formatDate(rp.date)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </article>
      </main>

      <footer className="border-t border-border bg-card/50 py-8 relative z-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BharatTV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
