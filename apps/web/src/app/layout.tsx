import "./globals.css";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
    <html lang="en" data-theme="seeking-alpha">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-card">
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
            <ThemeSwitcher />
          </div>
          <div className="border-t border-border bg-background">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm">
              <nav className="flex flex-wrap gap-4">
                <a className="text-muted-foreground hover:text-foreground" href="/">
                  Home
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/stocks/AAPL">
                  Stock
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/articles/apple-buybacks-services">
                  Article
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/entities/pelosi">
                  Entity
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/activity">
                  Activity
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/watchlist">
                  Watchlist
                </a>
                <a className="text-muted-foreground hover:text-foreground" href="/pricing">
                  Pricing
                </a>
              </nav>
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
