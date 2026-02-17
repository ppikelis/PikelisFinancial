export type NewsSourceType = "rss" | "api" | "site";

export interface NewsSourceConfig {
  id: string;
  name: string;
  type: NewsSourceType;
  url: string;
  rssUrl?: string;
  enabled: boolean;
  allowFullText: boolean;
}

export const newsSources: NewsSourceConfig[] = [
  {
    id: "globe-newswire",
    name: "GlobeNewswire",
    type: "rss",
    url: "https://www.globenewswire.com",
    rssUrl: "https://www.globenewswire.com/rss",
    enabled: true,
    allowFullText: false
  },
  {
    id: "businesswire",
    name: "Business Wire",
    type: "rss",
    url: "https://www.businesswire.com",
    rssUrl: "https://www.businesswire.com/rss/home/?rss=G1QFDERJXkJeEFxWXg==",
    enabled: false,
    allowFullText: false
  }
];
