import { Collection } from "@/lib/types";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

const seededRandom = (seed: number) => {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const generateSeries = (seed: string, startDate: string, days: number, drift: number) => {
  const rand = seededRandom(
    seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  );
  const points = [];
  let value = 100;
  const start = new Date(startDate);

  for (let i = 0; i < days; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const noise = (rand() - 0.5) * 1.8;
    value += drift + noise;
    if (value < 5) value = 5;
    points.push({
      date: date.toISOString().slice(0, 10),
      value: Number(value.toFixed(2))
    });
  }

  return points;
};

const baseStart = "2021-01-01";
const days = 1200;

const makePreview = (seed: string) => ({
  basketSeries: generateSeries(`${seed}-basket`, baseStart, days, 0.1),
  benchmarkSeries: generateSeries("SPY", baseStart, days, 0.06),
  startDate: baseStart
});

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const themeDescriptions: Record<string, string> = {
  MAG7: "Mega-cap tech leaders defining the modern index core.",
  "AI Infrastructure": "The hardware, networks, and platforms powering AI scale.",
  Nuclear: "Nuclear energy leaders and next-gen reactor plays.",
  "Quantum Computing": "Early leaders in quantum hardware and software research.",
  "Flying Taxis": "eVTOL pioneers working toward urban air mobility."
};

export const themes: Collection[] = STOCK_GROUPS_ORDER.map((groupName) => ({
  id: slugify(groupName),
  name: groupName === "MAG7" ? "Magnificent 7" : groupName,
  description:
    themeDescriptions[groupName] ?? "Curated coverage from our universe.",
  tickers: STOCK_GROUPS[groupName].map((ticker) => ({
    symbol: ticker.symbol,
    label: ticker.name
  })),
  previewPerformance: makePreview(slugify(groupName))
}));

export const banks: Collection[] = [
  {
    id: "us-banks",
    name: "Curated Coverage",
    description: "Coverage tied to the curated stock universe.",
    tickers: [
      { symbol: "AAPL", label: "Apple" },
      { symbol: "MSFT", label: "Microsoft" },
      { symbol: "NVDA", label: "NVIDIA" }
    ],
    previewPerformance: makePreview("banks-us")
  }
];

export const congress: Collection[] = [
  {
    id: "top-traders",
    name: "Top Congressional Traders",
    description: "Most active congressional portfolios within coverage.",
    tickers: [
      { symbol: "AAPL", label: "Apple" },
      { symbol: "NVDA", label: "NVIDIA" },
      { symbol: "MSFT", label: "Microsoft" }
    ],
    previewPerformance: makePreview("congress-top")
  }
];

export const influencers: Collection[] = [
  {
    id: "finfluencers",
    name: "Top Finfluencers",
    description: "High-engagement personalities in the curated universe.",
    tickers: [
      { symbol: "TSLA", label: "Tesla" },
      { symbol: "AMZN", label: "Amazon" },
      { symbol: "META", label: "Meta" }
    ],
    previewPerformance: makePreview("influencers")
  }
];

export const opinions: Collection[] = [
  {
    id: "bullish-calls",
    name: "Bullish Calls",
    description: "Most positive analyst and author conviction.",
    tickers: [
      { symbol: "AMZN", label: "Amazon" },
      { symbol: "META", label: "Meta" },
      { symbol: "AVGO", label: "Broadcom" }
    ],
    previewPerformance: makePreview("opinions")
  }
];
