import { Button } from "@/components/ui/button";
import { Download, Tv } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 text-foreground">
      <Tv className="h-16 w-16 text-primary" />
      <h1 className="text-3xl font-bold tracking-tight">BharatTV</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Watch Indian TV channels live. Download the single-file app and open it anywhere.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <a href="/BharatTV.html" download="BharatTV.html">
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download BharatTV.html
          </Button>
        </a>
        <a href="/BharatTV.html" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline">
            Open in Browser
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
