import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const prevTitle = document.title;
    document.title = "Page Not Found — BharatTV";
    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = desc?.content;
    if (desc) desc.content = "The page you're looking for doesn't exist on BharatTV. Head back home to watch free live Indian TV.";
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.href;
    if (canonical) canonical.href = `${window.location.origin}${location.pathname}`;
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prevRobots = robots?.content;
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    robots.content = "noindex";
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc !== undefined) desc.content = prevDesc;
      if (canonical && prevCanonical) canonical.href = prevCanonical;
      if (robots) { if (prevRobots !== undefined) robots.content = prevRobots; else robots.remove(); }
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
