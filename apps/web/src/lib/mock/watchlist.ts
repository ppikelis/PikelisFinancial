export const watchlistMock = {
  items: ["AAPL", "NVDA", "MSFT"],
  rules: [
    { id: "r1", type: "congress_trade", enabled: true, params: { entity: "Pelosi" } },
    { id: "r2", type: "insider_buy", enabled: true, params: { minUsd: 50000 } },
    { id: "r3", type: "analyst_rating_change", enabled: true, params: { action: "upgrade" } },
    { id: "r4", type: "article_mention", enabled: true, params: { ticker: "AAPL" } }
  ],
  notifications: [
    {
      id: "n1",
      title: "Congress trade",
      message: "Nancy Pelosi bought AAPL ($50K-$100K).",
      createdAt: "Feb 15, 09:12 AM",
      read: false
    },
    {
      id: "n2",
      title: "Analyst upgrade",
      message: "UBS upgraded AAPL to Buy.",
      createdAt: "Feb 14, 11:08 AM",
      read: true
    }
  ]
};
