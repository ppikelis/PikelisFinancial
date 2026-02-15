import { ActivityEvent, KPI, RatingSummary, Ticker } from "@/lib/types";

export const stockMock: Record<
  string,
  {
    ticker: Ticker;
    kpis: KPI[];
    ratings: RatingSummary[];
    activity: ActivityEvent[];
    relatedArticles: { slug: string; title: string }[];
  }
> = {
  AAPL: {
    ticker: {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 189.42,
      change: 1.28,
      changePercent: 0.68,
      trend: "up"
    },
    kpis: [
      { label: "Market Cap", value: "$2.95T" },
      { label: "P/E", value: "29.4x" },
      { label: "Revenue Growth", value: "6.1%" },
      { label: "Gross Margin", value: "44.3%" }
    ],
    ratings: [
      { label: "AI Rating", value: "Bullish", tone: "positive" },
      { label: "Analyst Consensus", value: "Buy", tone: "positive" },
      { label: "Author Sentiment", value: "Positive", tone: "positive" },
      { label: "Crowd Sentiment", value: "65% Bull", tone: "neutral" }
    ],
    activity: [
      {
        id: "act-1",
        type: "congress",
        entity: "Nancy Pelosi",
        action: "Buy",
        ticker: "AAPL",
        amount: "$50K-$100K",
        date: "Feb 13, 2026",
        confidence: "high"
      },
      {
        id: "act-2",
        type: "analyst",
        entity: "UBS",
        action: "Upgrade to Buy",
        ticker: "AAPL",
        date: "Feb 14, 2026",
        confidence: "medium"
      }
    ],
    relatedArticles: [
      { slug: "apple-buybacks-services", title: "Apple ramps buybacks..." }
    ]
  }
};
