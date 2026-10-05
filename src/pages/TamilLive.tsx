import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Play, MapPin, Tv } from "lucide-react";
import { TAMIL_HUB, tamilChannels, tamilCities, getCity } from "@/data/tamilCities";

const SITE = "https://bharat-tv-free-live.lovable.app";
const PLAYER = "/BharatTV.html?lang=tam";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
};

const TamilLive = () => {
  const { city: slug } = useParams<{ city: string }>();
  const city = slug ? getCity(slug) : undefined;
  if (slug && !city) return <Navigate to="/tamil-live-tv" replace />;

  const title = city
    ? `Tamil Live TV in ${city.name} — Free Tamil Channels Online | BharatTV`
    : TAMIL_HUB.title;
  const description = city ? city.intro : TAMIL_HUB.description;
  const url = city ? `${SITE}/tamil-live-tv/${city.slug}` : `${SITE}/tamil-live-tv`;

  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("keywords", city ? `tamil live tv ${city.name.toLowerCase()}, ${city.name.toLowerCase()} news live, ${TAMIL_HUB.keywords}` : TAMIL_HUB.keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    let c = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
    c.href = url;
  }, [title, description, url, city]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          {city ? <><Link to="/tamil-live-tv" className="hover:text-primary">Tamil Live TV</Link> › <span>{city.name}</span></> : <span>Tamil Live TV</span>}
        </nav>

        <h1 className="mb-3 text-3xl font-bold md:text-5xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
          <span className="gradient-text-primary">
            {city ? `Tamil Live TV in ${city.name}` : "Tamil Live TV — Free & Online"}
          </span>
        </h1>
        {city && <p className="mb-2 text-xl text-accent">{city.tamil} தமிழ் நேரலை டிவி</p>}
        <p className="mb-6 max-w-3xl text-lg text-muted-foreground">{description}</p>

        <a href={PLAYER} className="mb-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
          <Play className="h-5 w-5" /> Watch Tamil TV live now
        </a>

        {city && (
          <section className="glass-card mb-8 rounded-xl p-6">
            <h2 className="mb-3 text-xl font-semibold">What {city.name} viewers watch</h2>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {city.local.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Tv className="h-5 w-5 text-primary" /> Popular Tamil channels live</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {tamilChannels.map((ch) => (
              <a key={ch} href={`/BharatTV.html?q=${encodeURIComponent(ch)}`} className="glass-card rounded-lg p-3 text-sm transition">
                {ch} <span className="text-muted-foreground">live</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><MapPin className="h-5 w-5 text-secondary" /> Tamil live TV by city</h2>
          <div className="flex flex-wrap gap-2">
            {tamilCities.map((c) => (
              <Link key={c.slug} to={`/tamil-live-tv/${c.slug}`}
                className={`rounded-full border px-4 py-2 text-sm transition hover:border-primary ${c.slug === slug ? "border-primary text-primary" : "border-border"}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-xl p-6 text-muted-foreground">
          <h2 className="mb-2 text-lg font-semibold text-foreground">How to watch Tamil TV live free</h2>
          <p>Open BharatTV, pick the Tamil language filter and tap any channel. Streams work on Android, iPhone, laptops and smart TVs with no signup or subscription. Install BharatTV from your browser to open Tamil news live in one tap.</p>
        </section>
      </div>
    </main>
  );
};

export default TamilLive;
