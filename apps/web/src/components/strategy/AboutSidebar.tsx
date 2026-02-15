import { Card, CardContent } from "@/components/ui/card";

interface AboutSidebarProps {
  description: string;
  startDate: string;
  cagr: number;
  return30d: number;
  return1y: number;
}

export function AboutSidebar({
  description,
  startDate,
  cagr,
  return30d,
  return1y
}: AboutSidebarProps) {
  return (
    <Card className="rounded-sm border-border">
      <CardContent className="space-y-5 p-6">
        <div>
          <div className="text-sm font-semibold">About</div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-y border-border py-4 text-xs">
          <div>
            <div className="text-muted-foreground">Backtest start</div>
            <div className="mt-1 text-sm font-semibold">{startDate}</div>
          </div>
          <div>
            <div className="text-muted-foreground">CAGR (Total)</div>
            <div className="mt-1 text-sm font-semibold text-primary">{cagr}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Return (30d)</div>
            <div className="mt-1 text-sm font-semibold">{return30d}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Return (1Y)</div>
            <div className="mt-1 text-sm font-semibold">{return1y}%</div>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full rounded-sm bg-primary px-3 py-2 text-xs text-primary-foreground">
            + Add to Watchlist
          </button>
          <button
            className="w-full rounded-sm border border-border px-3 py-2 text-xs text-muted-foreground"
            disabled
          >
            Copytrade Strategy (coming soon)
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
