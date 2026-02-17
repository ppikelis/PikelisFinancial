export interface StockTicker {
  symbol: string;
  name?: string;
}

export interface StockGroup {
  id: string;
  name: string;
  description: string;
  tickers: StockTicker[];
}

export const stockGroups: StockGroup[] = [
  {
    id: "mag-7",
    name: "MAG 7",
    description: "Mega-cap tech leaders shaping AI and platform ecosystems.",
    tickers: [
      { symbol: "NVDA" },
      { symbol: "MSFT", name: "Microsoft" },
      { symbol: "AAPL", name: "Apple" },
      { symbol: "GOOGL" },
      { symbol: "AMZN", name: "Amazon" },
      { symbol: "META", name: "Meta" },
      { symbol: "TSLA", name: "Tesla" }
    ]
  },
  {
    id: "ai-infrastructure",
    name: "AI infrastructure",
    description: "Semis, networking, and cloud backbone for AI workloads.",
    tickers: [
      { symbol: "AVGO" },
      { symbol: "TSM" },
      { symbol: "AMD" },
      { symbol: "ASML" },
      { symbol: "LRCX" },
      { symbol: "ANET", name: "Arista" },
      { symbol: "ARM" },
      { symbol: "EQIX", name: "Equinix" },
      { symbol: "VRT", name: "Vertiv" },
      { symbol: "MDB", name: "MongoDB" }
    ]
  },
  {
    id: "ai",
    name: "AI",
    description: "Application-layer and enabling software for AI adoption.",
    tickers: [
      { symbol: "PLTR", name: "Palantir" },
      { symbol: "INTC" },
      { symbol: "SNOW" },
      { symbol: "PATH" },
      { symbol: "SOUN" },
      { symbol: "BBAI" },
      { symbol: "AI" },
      { symbol: "LAES" },
      { symbol: "VERI" }
    ]
  },
  {
    id: "quantum-computing",
    name: "Quantum computing",
    description: "Early-stage quantum platforms and tooling.",
    tickers: [
      { symbol: "IONQ" },
      { symbol: "QBTS" },
      { symbol: "RGTI" },
      { symbol: "QUBT" },
      { symbol: "ARQQ" }
    ]
  },
  {
    id: "robotics",
    name: "Robotics",
    description: "Automation, sensing, and industrial systems leaders.",
    tickers: [
      { symbol: "BSX" },
      { symbol: "TER" },
      { symbol: "TDY" }
    ]
  },
  {
    id: "defence",
    name: "Defence",
    description: "Defense tech and aerospace innovators.",
    tickers: [
      { symbol: "RKLB" },
      { symbol: "AVAV" },
      { symbol: "KTOS" }
    ]
  },
  {
    id: "flying-taxis",
    name: "Flying taxis",
    description: "Urban air mobility and next-gen aviation bets.",
    tickers: [
      { symbol: "JOBY" },
      { symbol: "ACHR" },
      { symbol: "HON" }
    ]
  },
  {
    id: "nuclear",
    name: "Nuclear",
    description: "Next-gen nuclear power and fuel supply chain.",
    tickers: [
      { symbol: "CEG" },
      { symbol: "CCJ" },
      { symbol: "OKLO" },
      { symbol: "SMR" }
    ]
  }
];
