import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export interface PricePoint {
  date: string;
  price: number;
}

const seeded = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const generateSeries = (symbol: string) => {
  const rand = seeded(symbol);
  const points: PricePoint[] = [];
  const start = new Date("2023-01-01T00:00:00Z");
  let price = 40 + rand() * 160;

  for (let i = 0; i < 900; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const drift = (rand() - 0.4) * 1.5;
    price = Math.max(5, price + drift);
    points.push({
      date: date.toISOString(),
      price: Number(price.toFixed(2))
    });
  }

  return points;
};

export const stockPriceSeriesMock: Record<string, PricePoint[]> =
  STOCK_GROUPS_ORDER.reduce((acc, groupName) => {
    STOCK_GROUPS[groupName].forEach((stock) => {
      acc[stock.symbol] = generateSeries(stock.symbol);
    });
    return acc;
  }, {} as Record<string, PricePoint[]>);
