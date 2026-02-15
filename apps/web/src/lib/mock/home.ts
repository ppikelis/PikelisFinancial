import { HomePayload } from "@/lib/types";

export const homeMock: HomePayload = {
  trending: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 189.42,
      change: 1.28,
      changePercent: 0.68,
      trend: "up"
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 473.11,
      change: 6.2,
      changePercent: 1.33,
      trend: "up"
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 341.07,
      change: -0.44,
      changePercent: -0.13,
      trend: "flat"
    }
  ],
  articles: [
    {
      slug: "apple-buybacks-services",
      title: "Apple ramps buybacks as services momentum builds",
      summary:
        "Apple expands its capital return plan while services growth offsets slower hardware cycles.",
      author: "Morgan Lee",
      publishedAt: "Feb 15, 2026",
      tickers: ["AAPL"],
      content: [
        "Apple announced an expanded buyback program paired with modest guidance.",
        "Services revenue continues to stabilize margins even as hardware slows."
      ],
      sources: [
        {
          label: "Company release",
          url: "#",
          timestamp: "Feb 15, 08:12 AM"
        }
      ],
      disclosures: ["Not investment advice."]
    }
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
  ]
};
