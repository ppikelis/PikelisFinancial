import { Theme } from "@/lib/types";
import { themesMock } from "@/lib/mock/themes";

export interface ThemeStrategy {
  themeId: Theme["id"];
  about: string;
  startDate: string;
  prices: Record<string, { date: string; value: number }[]>;
  spy: { date: string; value: number }[];
  equityCurve?: { date: string; value: number }[];
  benchmarkCurve?: { date: string; value: number }[];
}

const seededRandom = (seed: number) => {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const generatePrices = (symbol: string, startDate: string, days: number, drift: number) => {
  const rand = seededRandom(
    symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  );
  const points = [];
  let value = 100 + rand() * 20;
  const start = new Date(startDate);

  for (let i = 0; i < days; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const noise = (rand() - 0.5) * 2;
    value += drift + noise;
    if (value < 10) value = 10;
    points.push({
      date: date.toISOString().slice(0, 10),
      value: Number(value.toFixed(2))
    });
  }

  return points;
};

const baseStart = "2021-01-01";
const days = 1200;

const aboutByTheme: Record<string, string> = {
  mag7: "Blue-chip tech strategy focused on durable cash flow and AI exposure.",
  "ai-infrastructure": "Infrastructure picks that benefit from AI capex cycles.",
  "quantum-computing": "Early-stage quantum innovators with long-duration optionality.",
  "flying-taxis": "Urban air mobility pioneers with pre-revenue risk.",
  nuclear: "Nuclear energy leaders and SMR innovators."
};

export const themeStrategiesMock: ThemeStrategy[] = themesMock.map((theme) => {
  const prices: Record<string, { date: string; value: number }[]> = {};
  theme.tickers.forEach((ticker, index) => {
    prices[ticker.symbol] = generatePrices(ticker.symbol, baseStart, days, 0.08 + index * 0.01);
  });

  const spy = generatePrices("SPY", baseStart, days, 0.06);

  return {
    themeId: theme.id,
    about: aboutByTheme[theme.id] ?? theme.description,
    startDate: baseStart,
    prices,
    spy
  };
});
