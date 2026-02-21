export type StockGroupName =
  | "MAG7"
  | "AI Infrastructure"
  | "Nuclear"
  | "Quantum Computing"
  | "Flying Taxis";

export interface StockDefinition {
  symbol: string;
  name?: string;
}

export const STOCK_GROUPS: Record<StockGroupName, StockDefinition[]> = {
  MAG7: [
    { symbol: "NVDA", name: "NVIDIA" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "AAPL", name: "Apple" },
    { symbol: "GOOGL", name: "Alphabet" },
    { symbol: "AMZN", name: "Amazon" },
    { symbol: "META", name: "Meta" },
    { symbol: "TSLA", name: "Tesla" }
  ],

  "AI Infrastructure": [
    { symbol: "AVGO" },
    { symbol: "TSM" },
    { symbol: "AMD" },
    { symbol: "ASML" },
    { symbol: "LRCX" },
    { symbol: "ANET" },
    { symbol: "ARM" },
    { symbol: "EQIX" },
    { symbol: "VRT" },
    { symbol: "MDB" }
  ],

  Nuclear: [
    { symbol: "CEG" },
    { symbol: "CCJ" },
    { symbol: "OKLO" },
    { symbol: "SMR" }
  ],

  "Quantum Computing": [
    { symbol: "IONQ" },
    { symbol: "QBTS" },
    { symbol: "RGTI" },
    { symbol: "QUBT" },
    { symbol: "ARQQ" }
  ],

  "Flying Taxis": [
    { symbol: "JOBY" },
    { symbol: "ACHR" },
    { symbol: "HON" }
  ]
};

export const STOCK_GROUPS_ORDER = Object.keys(
  STOCK_GROUPS
) as StockGroupName[];

export const ALL_STOCKS = STOCK_GROUPS_ORDER.flatMap(
  (group) => STOCK_GROUPS[group]
);
