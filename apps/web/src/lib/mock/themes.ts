import { Theme } from "@/lib/types";

export const themesMock: Theme[] = [
  {
    id: "mag-7",
    name: "Magnificent 7",
    description: "Mega-cap tech leaders defining the modern index core.",
    tickers: [
      { symbol: "NVDA" },
      { symbol: "MSFT", label: "Microsoft" },
      { symbol: "AAPL", label: "Apple" },
      { symbol: "GOOGL" },
      { symbol: "AMZN", label: "Amazon" },
      { symbol: "META", label: "Meta" },
      { symbol: "TSLA", label: "Tesla" }
    ]
  },
  {
    id: "ai-infrastructure",
    name: "AI infrastructure",
    description: "The hardware, networks, and platforms powering AI scale.",
    tickers: [
      { symbol: "AVGO" },
      { symbol: "TSM" },
      { symbol: "AMD" },
      { symbol: "ASML" },
      { symbol: "LRCX" },
      { symbol: "ANET", label: "Arista" },
      { symbol: "ARM" },
      { symbol: "EQIX", label: "Equinix" },
      { symbol: "VRT", label: "Vertiv" },
      { symbol: "MDB", label: "MongoDB" }
    ]
  },
  {
    id: "ai",
    name: "AI",
    description: "Software, platforms, and enablers riding the AI wave.",
    tickers: [
      { symbol: "PLTR", label: "Palantir" },
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
    description: "Early leaders in quantum hardware and software research.",
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
    description: "Automation and sensing platforms for next-gen robotics.",
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
    description: "eVTOL pioneers working toward urban air mobility.",
    tickers: [
      { symbol: "JOBY" },
      { symbol: "ACHR" },
      { symbol: "HON" }
    ]
  },
  {
    id: "nuclear",
    name: "Nuclear",
    description: "Nuclear energy leaders and next-gen reactor plays.",
    tickers: [
      { symbol: "CEG" },
      { symbol: "CCJ" },
      { symbol: "OKLO" },
      { symbol: "SMR" }
    ]
  }
];
