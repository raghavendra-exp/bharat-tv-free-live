/**
 * Build-time prerender for the blog routes.
 *
 * Emits dist/blog/index.html and dist/blog/<slug>/index.html, each a copy of the
 * SPA shell with per-page <title>, meta description, canonical, og:* / twitter:*
 * and JSON-LD baked into the static HTML. Social crawlers (LinkedIn, Slack,
 * Facebook) don't execute JS, so this is what makes per-page previews correct.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { build as esbuild } from "esbuild";

const SITE_URL = "https://bugbash-fullscreen-joy.lovable.app";
// Guardrail: publishing rejects very large outputs. Keep the emitted page count small.
const MAX_PRERENDER_PAGES = 500;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function loadPosts(root) {
  const result = await esbuild({
    entryPoints: [path.join(root, "src/data/blogPosts.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  const code = result.outputFiles[0].text;
  const mod = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  return mod.blogPosts ?? [];
}

function replaceHead(html, tags) {
  let out = html;

  const swap = (regex, replacement) => {
    if (regex.test(out)) out = out.replace(regex, replacement);
    else out = out.replace("</head>", `    ${replacement}\n  </head>`);
  };

  swap(/<title>[\s\S]*?<\/title>/, `<title>${tags.title}</title>`);
  swap(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${tags.description}">`,
  );
  swap(
    /<link\s+rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${tags.url}">`,
  );
  swap(
    /<meta\s+property="og:type"[^>]*>/,
    `<meta property="og:type" content="${tags.type}">`,
  );
  swap(
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${tags.title}">`,
  );
  swap(
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${tags.description}">`,
  );
  swap(
    /<meta\s+property="og:url"[^>]*>/,
    `<meta property="og:url" content="${tags.url}">`,
  );
  swap(
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${tags.title}">`,
  );
  swap(
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${tags.description}">`,
  );

  if (tags.jsonLd?.length) {
    const scripts = tags.jsonLd
      .map(
        (data) =>
          `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
      )
      .join("\n    ");
    out = out.replace("</head>", `    ${scripts}\n  </head>`);
  }

  return out;
}

async function emit(outDir, routePath, html) {
  const dir = path.join(outDir, routePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html, "utf8");
}

export async function prerenderBlog({ root, outDir }) {
  const shellPath = path.join(outDir, "index.html");
  const shell = await readFile(shellPath, "utf8");
  const posts = (await loadPosts(root)).slice(0, MAX_PRERENDER_PAGES - 1);

  // /blog listing
  const listingTitle = "BharatTV Blog — Free Indian TV Streaming Guides & Updates";
  const listingDescription =
    "Guides, tips and product updates on streaming 19,000+ free live Indian TV channels — news, sports, movies, reality TV and more.";
  await emit(
    outDir,
    "blog",
    replaceHead(shell, {
      title: escapeHtml(listingTitle),
      description: escapeHtml(listingDescription),
      url: `${SITE_URL}/blog`,
      type: "website",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: listingTitle,
          description: listingDescription,
          url: `${SITE_URL}/blog`,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          ],
        },
      ],
    }),
  );

  // /blog/<slug>
  for (const post of posts) {
    const url = `${SITE_URL}/blog/${post.slug}`;
    await emit(
      outDir,
      path.join("blog", post.slug),
      replaceHead(shell, {
        title: escapeHtml(`${post.title} — BharatTV Blog`),
        description: escapeHtml(post.excerpt),
        url,
        type: "article",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            datePublished: post.date,
            articleSection: post.category,
            publisher: { "@type": "Organization", name: "BharatTV", url: `${SITE_URL}/` },
            mainEntityOfPage: url,
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ],
      }),
    );
  }

  return posts.length + 1;
}

export function prerenderBlogPlugin() {
  return {
    name: "prerender-blog",
    apply: "build",
    async closeBundle() {
      const root = process.cwd();
      const outDir = path.join(root, "dist");
      try {
        const count = await prerenderBlog({ root, outDir });
        this.info?.(`prerendered ${count} blog page(s)`);
        console.log(`[prerender-blog] wrote ${count} static blog page(s)`);
      } catch (error) {
        console.error("[prerender-blog] failed:", error);
        throw error;
      }
    },
  };
}
