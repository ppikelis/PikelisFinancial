export interface NewsThemeDefinition {
  id: string;
  label: string;
  tickers: string[];
}

export const newsThemeDefinitions: NewsThemeDefinition[] = [
  {
    id: "mag7",
    label: "MAG 7",
    tickers: ["NVDA", "MSFT", "AAPL", "GOOGL", "AMZN", "META", "TSLA"]
  },
  {
    id: "ai-infrastructure",
    label: "AI infrastructure",
    tickers: ["AVGO", "TSM", "AMD", "ASML", "LRCX", "ANET", "ARM", "EQIX", "VRT", "MDB"]
  },
  {
    id: "ai",
    label: "AI",
    tickers: ["PLTR", "INTC", "SNOW", "PATH", "SOUN", "BBAI", "AI", "LAES", "VERI"]
  },
  {
    id: "quantum-computing",
    label: "Quantum computing",
    tickers: ["IONQ", "QBTS", "RGTI", "QUBT", "ARQQ"]
  },
  {
    id: "robotics",
    label: "Robotics",
    tickers: ["BSX", "TER", "TDY"]
  },
  {
    id: "defence",
    label: "Defence",
    tickers: ["RKLB", "AVAV", "KTOS"]
  },
  {
    id: "flying-taxis",
    label: "Flying taxis",
    tickers: ["JOBY", "ACHR", "HON"]
  },
  {
    id: "nuclear",
    label: "Nuclear",
    tickers: ["CEG", "CCJ", "OKLO", "SMR"]
  }
];

export const newsTickerUniverse = Array.from(
  new Set(newsThemeDefinitions.flatMap((theme) => theme.tickers))
);
