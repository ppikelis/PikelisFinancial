import { ActivityEvent } from "@/lib/types";

export const activityMock: ActivityEvent[] = [
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
    type: "insider",
    entity: "CFO",
    action: "Buy",
    ticker: "AAPL",
    amount: "12,500 shares",
    date: "Feb 10, 2026",
    confidence: "medium"
  },
  {
    id: "act-3",
    type: "institutional",
    entity: "Vanguard",
    action: "Increase",
    ticker: "MSFT",
    amount: "+1.2M shares",
    date: "Feb 09, 2026",
    confidence: "medium"
  },
  {
    id: "act-4",
    type: "analyst",
    entity: "UBS",
    action: "Upgrade to Buy",
    ticker: "AAPL",
    date: "Feb 14, 2026",
    confidence: "high"
  }
];
