import { prisma } from "@/lib/db";
import { CongressDashboard, CongressTradeRow } from "@/components/CongressDashboard";
import { congressTradesMock, congressPerformanceMock } from "@/lib/mock";

export default async function CongressPage() {
  const useMock =
    process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
    process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

  let trades: CongressTradeRow[] = [];
  let performance = congressPerformanceMock;

  if (useMock) {
    trades = congressTradesMock;
  } else {
    const data = await prisma.congressTrade.findMany({
      orderBy: { tradeDate: "desc" },
      take: 200
    });
    trades = data.map((trade) => ({
      id: trade.id,
      politician: trade.politician,
      chamber: trade.chamber,
      ticker: trade.ticker,
      assetName: trade.assetName,
      tradeDate: trade.tradeDate.toISOString(),
      reportDate: trade.reportDate?.toISOString() ?? null,
      transactionType: trade.transactionType,
      amountMin: trade.amountMin,
      amountMax: trade.amountMax,
      ownerType: trade.ownerType,
      sourceUrl: trade.sourceUrl
    }));
    performance = {};
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Congress</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor congressional portfolios and trading activity.
        </p>
      </header>
      <CongressDashboard trades={trades} performance={performance} />
    </main>
  );
}
