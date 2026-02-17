export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  tickers: string[];
  themeIds: string[];
  source: string;
  sourceUrl: string;
  publishedAt: string;
  movePct?: number;
}

export interface NewsTheme {
  id: string;
  label: string;
}

const baseDate = new Date("2026-02-15T16:00:00Z");

function hoursAgo(hours: number) {
  const date = new Date(baseDate);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function moveFromSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return Math.round(((hash - 500) / 100) * 10) / 10;
}

const sources = [
  "Bloomberg",
  "CNBC",
  "Reuters",
  "WSJ",
  "TechCrunch",
  "The Information"
];

export const newsThemes: NewsTheme[] = [
  { id: "mag7", label: "MAG 7" },
  { id: "ai-infrastructure", label: "AI infrastructure" },
  { id: "ai", label: "AI" },
  { id: "quantum-computing", label: "Quantum computing" },
  { id: "robotics", label: "Robotics" },
  { id: "defence", label: "Defence" },
  { id: "flying-taxis", label: "Flying taxis" },
  { id: "nuclear", label: "Nuclear" }
];

const headlineTemplates = [
  "{{ticker}} rallies as demand accelerates across {{theme}}",
  "{{ticker}} unveils new roadmap, reshaping {{theme}} outlook",
  "{{ticker}} posts strong guidance, investors rotate into {{theme}}",
  "{{ticker}} expands partnerships to scale {{theme}} workloads",
  "{{ticker}} hits new milestone amid {{theme}} adoption",
  "{{ticker}} faces volatility as {{theme}} spending shifts",
  "Analysts highlight {{ticker}} as a core {{theme}} play",
  "{{ticker}} bets on efficiency to lead next {{theme}} cycle"
];

function buildNewsForTheme({
  themeId,
  themeLabel,
  tickers,
  crossThemeId
}: {
  themeId: string;
  themeLabel: string;
  tickers: string[];
  crossThemeId?: string;
}) {
  return headlineTemplates.map((template, index) => {
    const ticker = tickers[index % tickers.length];
    const headline = template
      .replace("{{ticker}}", ticker)
      .replace("{{theme}}", themeLabel);
    const id = `${themeId}-${index + 1}`;
    return {
      id,
      headline,
      summary:
        "Investors are tracking demand signals, capacity plans, and margin trends as momentum builds. Market participants are watching execution milestones closely.",
      tickers: [ticker],
      themeIds:
        index % 3 === 0 && crossThemeId
          ? [themeId, crossThemeId]
          : [themeId],
      source: sources[index % sources.length],
      sourceUrl: `https://news.example.com/${id}`,
      publishedAt: hoursAgo(index * 6 + tickers.length),
      movePct: moveFromSeed(id)
    };
  });
}

const mag7News = buildNewsForTheme({
  themeId: "mag7",
  themeLabel: "MAG 7",
  tickers: ["NVDA", "MSFT", "AAPL", "GOOGL", "AMZN", "META", "TSLA"],
  crossThemeId: "ai"
});

const aiInfrastructureNews = buildNewsForTheme({
  themeId: "ai-infrastructure",
  themeLabel: "AI infrastructure",
  tickers: ["AVGO", "TSM", "AMD", "ASML", "LRCX", "ANET", "ARM", "EQIX"],
  crossThemeId: "ai"
});

const aiNews = buildNewsForTheme({
  themeId: "ai",
  themeLabel: "AI",
  tickers: ["PLTR", "INTC", "SNOW", "PATH", "SOUN", "BBAI", "AI", "LAES"],
  crossThemeId: "mag7"
});

const quantumNews = buildNewsForTheme({
  themeId: "quantum-computing",
  themeLabel: "Quantum computing",
  tickers: ["IONQ", "QBTS", "RGTI", "QUBT", "ARQQ"],
  crossThemeId: "ai"
});

const roboticsNews = buildNewsForTheme({
  themeId: "robotics",
  themeLabel: "Robotics",
  tickers: ["BSX", "TER", "TDY"],
  crossThemeId: "ai-infrastructure"
});

const defenceNews = buildNewsForTheme({
  themeId: "defence",
  themeLabel: "Defence",
  tickers: ["RKLB", "AVAV", "KTOS"],
  crossThemeId: "ai"
});

const flyingTaxiNews = buildNewsForTheme({
  themeId: "flying-taxis",
  themeLabel: "Flying taxis",
  tickers: ["JOBY", "ACHR", "HON"],
  crossThemeId: "mag7"
});

const nuclearNews = buildNewsForTheme({
  themeId: "nuclear",
  themeLabel: "Nuclear",
  tickers: ["CEG", "CCJ", "OKLO", "SMR"],
  crossThemeId: "ai-infrastructure"
});

export const mockNews: NewsItem[] = [
  ...mag7News,
  ...aiInfrastructureNews,
  ...aiNews,
  ...quantumNews,
  ...roboticsNews,
  ...defenceNews,
  ...flyingTaxiNews,
  ...nuclearNews
].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
