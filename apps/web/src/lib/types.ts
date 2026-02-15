export type ActivityType = "congress" | "insider" | "institutional" | "analyst";

export interface SourceLink {
  label: string;
  url: string;
  timestamp: string;
}

export interface Ticker {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  trend: "up" | "down" | "flat";
}

export interface KPI {
  label: string;
  value: string;
}

export interface RatingSummary {
  label: string;
  value: string;
  tone: "positive" | "neutral" | "negative";
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  tickers: string[];
  content: string[];
  preview?: string[];
  paywalled?: boolean;
  sources: SourceLink[];
  disclosures: string[];
}

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  entity: string;
  action: string;
  ticker: string;
  amount?: string;
  date: string;
  confidence: "low" | "medium" | "high";
}

export interface AlertRule {
  id: string;
  type:
    | "congress_trade"
    | "insider_buy"
    | "analyst_rating_change"
    | "article_mention";
  enabled: boolean;
  params: Record<string, string | number>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SubscriptionStatus {
  plan: "free" | "premium";
  status: "active" | "trialing" | "inactive";
}

export interface Entity {
  id: string;
  name: string;
  type: "person" | "institution" | "analyst";
  bio: string;
  holdings: { ticker: string; shares: string; value: string }[];
  trades: { ticker: string; action: string; amount: string; date: string }[];
}

export interface HomePayload {
  trending: Ticker[];
  articles: Article[];
  activity: ActivityEvent[];
}
