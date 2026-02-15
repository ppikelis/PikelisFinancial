import { Article } from "@/lib/types";

export const articleMock: Record<string, Article> = {
  "apple-buybacks-services": {
    slug: "apple-buybacks-services",
    title: "Apple ramps buybacks as services momentum builds",
    summary:
      "Apple expands its capital return plan while services growth offsets slower hardware cycles.",
    author: "Morgan Lee",
    publishedAt: "Feb 15, 2026",
    tickers: ["AAPL"],
    paywalled: true,
    preview: [
      "Apple announced an expanded buyback program paired with modest guidance.",
      "Services revenue continues to stabilize margins even as hardware slows."
    ],
    content: [
      "Apple announced an expanded buyback program paired with modest guidance.",
      "Services revenue continues to stabilize margins even as hardware slows.",
      "We outline bull, base, and bear cases for the next two quarters."
    ],
    sources: [
      { label: "Company release", url: "#", timestamp: "Feb 15, 08:12 AM" },
      { label: "Earnings call", url: "#", timestamp: "Feb 15, 10:30 AM" }
    ],
    disclosures: ["Not investment advice.", "Author has no position."]
  }
};
