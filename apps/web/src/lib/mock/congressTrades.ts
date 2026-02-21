import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export interface CongressTradeItem {
  id: string;
  politician: string;
  chamber: "House" | "Senate";
  ticker: string;
  assetName: string;
  tradeDate: string;
  reportDate: string;
  transactionType: "Buy" | "Sell";
  amountMin: number;
  amountMax: number;
  ownerType: "Self" | "Spouse" | "Child";
  sourceUrl: string;
}

export interface CongressPerformancePoint {
  date: string;
  value: number;
}

const allTickers = STOCK_GROUPS_ORDER.flatMap((group) =>
  STOCK_GROUPS[group].map((stock) => stock.symbol)
);

const baseDate = new Date("2026-02-01T00:00:00Z");

const seeded = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const politicians = [
  { name: "Nancy Pelosi", chamber: "House" as const },
  { name: "Josh Gottheimer", chamber: "House" as const },
  { name: "Tommy Tuberville", chamber: "Senate" as const },
  { name: "Debbie Stabenow", chamber: "Senate" as const }
];

export const congressTradesMock: CongressTradeItem[] = Array.from(
  { length: 40 },
  (_, index) => {
    const politician = politicians[index % politicians.length];
    const ticker = allTickers[index % allTickers.length];
    const rand = seeded(`${politician.name}-${ticker}-${index}`);
    const tradeDate = new Date(baseDate);
    tradeDate.setDate(baseDate.getDate() + index * 2);
    const reportDate = new Date(tradeDate);
    reportDate.setDate(tradeDate.getDate() + 10);
    const amountMin = Math.round(1000 + rand() * 10000);
    const amountMax = amountMin + Math.round(5000 + rand() * 20000);

    return {
      id: `trade-${index + 1}`,
      politician: politician.name,
      chamber: politician.chamber,
      ticker,
      assetName: `${ticker} Holdings`,
      tradeDate: tradeDate.toISOString(),
      reportDate: reportDate.toISOString(),
      transactionType: rand() > 0.5 ? "Buy" : "Sell",
      amountMin,
      amountMax,
      ownerType: rand() > 0.8 ? "Spouse" : "Self",
      sourceUrl: "https://www.quiverquant.com"
    };
  }
);

export const congressPerformanceMock: Record<string, CongressPerformancePoint[]> =
  politicians.reduce((acc, politician) => {
    const rand = seeded(politician.name);
    const points: CongressPerformancePoint[] = [];
    let value = 100;
    const start = new Date("2024-01-01T00:00:00Z");
    for (let i = 0; i < 240; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      value += (rand() - 0.45) * 0.8;
      points.push({
        date: date.toISOString().slice(0, 10),
        value: Number(value.toFixed(2))
      });
    }
    acc[politician.name] = points;
    return acc;
  }, {} as Record<string, CongressPerformancePoint[]>);
