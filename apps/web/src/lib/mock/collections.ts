import { Collection } from "@/lib/types";

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

export const themes: Collection[] = [
  {
    id: "mag-7",
    name: "Magnificent 7",
    description: "Mega-cap tech leaders defining the modern index core.",
    tickers: [
      { symbol: "NVDA", label: "NVIDIA" },
      { symbol: "MSFT", label: "Microsoft" },
      { symbol: "AAPL", label: "Apple" },
      { symbol: "GOOGL", label: "Alphabet" },
      { symbol: "AMZN", label: "Amazon" },
      { symbol: "META", label: "Meta" },
      { symbol: "TSLA", label: "Tesla" }
    ],
    previewPerformance: makePreview("mag-7")
  },
  {
    id: "ai-infrastructure",
    name: "AI infrastructure",
    description: "The hardware, networks, and platforms powering AI scale.",
    tickers: [
      { symbol: "AVGO", label: "Broadcom" },
      { symbol: "TSM", label: "TSMC" },
      { symbol: "AMD", label: "AMD" },
      { symbol: "ASML", label: "ASML" },
      { symbol: "LRCX", label: "Lam Research" },
      { symbol: "ANET", label: "Arista" },
      { symbol: "ARM", label: "Arm" },
      { symbol: "EQIX", label: "Equinix" },
      { symbol: "VRT", label: "Vertiv" },
      { symbol: "MDB", label: "MongoDB" }
    ],
    previewPerformance: makePreview("ai-infrastructure")
  },
  {
    id: "ai",
    name: "AI",
    description: "Software, platforms, and enablers riding the AI wave.",
    tickers: [
      { symbol: "PLTR", label: "Palantir" },
      { symbol: "INTC", label: "Intel" },
      { symbol: "SNOW", label: "Snowflake" },
      { symbol: "PATH", label: "UiPath" },
      { symbol: "SOUN", label: "SoundHound" },
      { symbol: "BBAI", label: "BigBear.ai" },
      { symbol: "AI", label: "C3.ai" },
      { symbol: "LAES", label: "SEALSQ" },
      { symbol: "VERI", label: "Veritone" }
    ],
    previewPerformance: makePreview("ai")
  },
  {
    id: "quantum-computing",
    name: "Quantum computing",
    description: "Early leaders in quantum hardware and software research.",
    tickers: [
      { symbol: "IONQ", label: "IonQ" },
      { symbol: "QBTS", label: "D-Wave" },
      { symbol: "RGTI", label: "Rigetti" },
      { symbol: "QUBT", label: "Quantum Computing" },
      { symbol: "ARQQ", label: "Arqit" }
    ],
    previewPerformance: makePreview("quantum")
  },
  {
    id: "robotics",
    name: "Robotics",
    description: "Automation and sensing platforms for next-gen robotics.",
    tickers: [
      { symbol: "BSX", label: "Boston Scientific" },
      { symbol: "TER", label: "Teradyne" },
      { symbol: "TDY", label: "Teledyne" }
    ],
    previewPerformance: makePreview("robotics")
  },
  {
    id: "defence",
    name: "Defence",
    description: "Defense tech and aerospace innovators.",
    tickers: [
      { symbol: "RKLB", label: "Rocket Lab" },
      { symbol: "AVAV", label: "AeroVironment" },
      { symbol: "KTOS", label: "Kratos" }
    ],
    previewPerformance: makePreview("defence")
  },
  {
    id: "flying-taxis",
    name: "Flying taxis",
    description: "eVTOL pioneers working toward urban air mobility.",
    tickers: [
      { symbol: "JOBY", label: "Joby" },
      { symbol: "ACHR", label: "Archer" },
      { symbol: "HON", label: "Honeywell" }
    ],
    previewPerformance: makePreview("flying-taxis")
  },
  {
    id: "nuclear",
    name: "Nuclear",
    description: "Nuclear energy leaders and next-gen reactor plays.",
    tickers: [
      { symbol: "CEG", label: "Constellation" },
      { symbol: "CCJ", label: "Cameco" },
      { symbol: "OKLO", label: "Oklo" },
      { symbol: "SMR", label: "NuScale" }
    ],
    previewPerformance: makePreview("nuclear")
  }
];

export const banks: Collection[] = [
  {
    id: "us-banks",
    name: "US Money Centers",
    description: "Systemically important banks and retail leaders.",
    tickers: [
      { symbol: "JPM", label: "JPMorgan" },
      { symbol: "BAC", label: "Bank of America" },
      { symbol: "C", label: "Citigroup" }
    ],
    previewPerformance: makePreview("banks-us")
  }
];

export const congress: Collection[] = [
  {
    id: "top-traders",
    name: "Top Congressional Traders",
    description: "Most active congressional portfolios.",
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
    description: "High-engagement investor personalities.",
    tickers: [
      { symbol: "TSLA", label: "Tesla" },
      { symbol: "PLTR", label: "Palantir" },
      { symbol: "COIN", label: "Coinbase" }
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
