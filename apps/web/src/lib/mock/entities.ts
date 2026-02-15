import { Entity } from "@/lib/types";

export const entityMock: Record<string, Entity> = {
  pelosi: {
    id: "pelosi",
    name: "Nancy Pelosi",
    type: "person",
    bio: "Public official with disclosed equity trades.",
    holdings: [
      { ticker: "AAPL", shares: "15,000", value: "$2.8M" },
      { ticker: "NVDA", shares: "8,500", value: "$4.0M" }
    ],
    trades: [
      { ticker: "AAPL", action: "Buy", amount: "$50K-$100K", date: "Feb 13" },
      { ticker: "NVDA", action: "Buy", amount: "$100K-$250K", date: "Feb 10" }
    ]
  }
};
