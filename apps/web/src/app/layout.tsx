import "./globals.css";
import { NavLink } from "@/components/NavLink";

export const metadata = {
  title: "FinAdvisor",
  description: "Finance content + investor activity platform"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const useMock =
    process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";
  return (
    <html lang="en" data-theme="zacks">
      <body className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                FA
              </div>
              <div className="text-sm font-semibold">FinAdvisor</div>
              <div className="text-xs text-muted-foreground">
                {useMock ? "Mock data enabled" : "Live data"}
              </div>
            </div>
          </div>
          <div className="border-t border-border bg-background">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <NavLink href="/" label="Home" />
                <NavLink href="/getting-started" label="Investing" exact />
                <NavLink
                  href="/getting-started-2"
                  label="Goals"
                  exact
                />
                <NavLink href="/news" label="News" />
                <NavLink href="/etfs" label="ETFs" />
                <NavLink href="/stocks" label="Stocks" />
                <NavLink href="/themes" label="Theme" />
                <NavLink href="/banks" label="Banks" />
                <NavLink href="/congress" label="Congress" />
                <NavLink href="/influencers" label="Influencers" />
                <NavLink href="/opinions" label="Opinions" />
                <NavLink href="/watchlist" label="Watchlist" />
                <NavLink href="/pricing" label="Pricing" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-56 rounded-md border border-border bg-card px-3 py-1 text-xs"
                  placeholder="Search tickers or entities"
                />
                <button className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">
                  Search
                </button>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
