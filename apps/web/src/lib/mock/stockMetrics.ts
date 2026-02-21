import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export interface StockMetricSnapshot {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  marketCap: number;
  pe: number;
  forwardPe: number;
  peg: number;
  priceToSales: number;
  evEbitda: number;
  priceToBook: number;
  revenueGrowth: number;
  epsGrowth: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number;
  roic: number;
  debtToEquity: number;
  currentRatio: number;
  freeCashFlow: number;
  nextEarningsDate: string;
  analystRating: "Buy" | "Hold" | "Sell";
  priceTarget: number;
}

const baseDate = new Date("2026-03-05T13:00:00Z");

const seeded = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const ratingFromSeed = (rand: () => number) => {
  const value = rand();
  if (value > 0.66) return "Buy";
  if (value > 0.33) return "Hold";
  return "Sell";
};

const marketCapBase: Record<string, number> = {
  MAG7: 1200,
  "AI Infrastructure": 250,
  Nuclear: 50,
  "Quantum Computing": 8,
  "Flying Taxis": 6
};

export const stockMetricsMock: StockMetricSnapshot[] = STOCK_GROUPS_ORDER.flatMap(
  (groupName) => {
    const baseCap = marketCapBase[groupName] ?? 40;
    return STOCK_GROUPS[groupName].map((stock, index) => {
      const rand = seeded(`${groupName}-${stock.symbol}`);
      const price = Number((20 + rand() * 380).toFixed(2));
      const changePct = Number(((rand() - 0.5) * 6).toFixed(2));
      const marketCap = Number((baseCap + rand() * baseCap * 0.6).toFixed(1));
      const pe = Number((10 + rand() * 35).toFixed(1));
      const forwardPe = Number((8 + rand() * 30).toFixed(1));
      const peg = Number((0.6 + rand() * 2.4).toFixed(2));
      const priceToSales = Number((2 + rand() * 12).toFixed(2));
      const evEbitda = Number((6 + rand() * 20).toFixed(1));
      const priceToBook = Number((2 + rand() * 9).toFixed(2));
      const revenueGrowth = Number(((rand() - 0.2) * 35).toFixed(1));
      const epsGrowth = Number(((rand() - 0.15) * 40).toFixed(1));
      const grossMargin = Number((35 + rand() * 35).toFixed(1));
      const operatingMargin = Number((12 + rand() * 22).toFixed(1));
      const netMargin = Number((8 + rand() * 20).toFixed(1));
      const roe = Number((10 + rand() * 25).toFixed(1));
      const roic = Number((8 + rand() * 20).toFixed(1));
      const debtToEquity = Number((0.2 + rand() * 1.6).toFixed(2));
      const currentRatio = Number((0.8 + rand() * 2.2).toFixed(2));
      const freeCashFlow = Number((2 + rand() * 35).toFixed(1));
      const earningsOffset = 7 + Math.round(rand() * 90) + index * 2;
      const earningsDate = new Date(baseDate);
      earningsDate.setDate(baseDate.getDate() + earningsOffset);

      return {
        symbol: stock.symbol,
        name: stock.name ?? stock.symbol,
        price,
        changePct,
        marketCap,
        pe,
        forwardPe,
        peg,
        priceToSales,
        evEbitda,
        priceToBook,
        revenueGrowth,
        epsGrowth,
        grossMargin,
        operatingMargin,
        netMargin,
        roe,
        roic,
        debtToEquity,
        currentRatio,
        freeCashFlow,
        nextEarningsDate: earningsDate.toISOString(),
        analystRating: ratingFromSeed(rand),
        priceTarget: Number((price * (1 + rand() * 0.35)).toFixed(2))
      };
    });
  }
);
