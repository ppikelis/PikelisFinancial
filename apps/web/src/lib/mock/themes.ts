import { Theme } from "@/lib/types";

export const themesMock: Theme[] = [
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    id: "robotics",
    name: "Robotics",
    description: "Automation and sensing platforms for next-gen robotics.",
    tickers: [
      { symbol: "BSX", label: "Boston Scientific" },
      { symbol: "TER", label: "Teradyne" },
      { symbol: "TDY", label: "Teledyne" }
    ]
  },
  {
    id: "defence",
    name: "Defence",
    description: "Defense tech and aerospace innovators.",
    tickers: [
      { symbol: "RKLB", label: "Rocket Lab" },
      { symbol: "AVAV", label: "AeroVironment" },
      { symbol: "KTOS", label: "Kratos" }
    ]
  },
  {
    id: "flying-taxis",
    name: "Flying taxis",
    description: "eVTOL pioneers working toward urban air mobility.",
    tickers: [
      { symbol: "JOBY", label: "Joby" },
      { symbol: "ACHR", label: "Archer" },
      { symbol: "HON", label: "Honeywell" }
    ]
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
    ]
  }
];
