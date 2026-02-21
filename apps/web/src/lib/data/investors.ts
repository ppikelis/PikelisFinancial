export interface InvestorProfile {
  id: string;
  name: string;
  type: "person" | "institution";
  focus: string;
  trackedTickers: string[];
}

export const INVESTORS: InvestorProfile[] = [
  {
    id: "pelosi",
    name: "Nancy Pelosi",
    type: "person",
    focus: "High-profile congressional trades within curated coverage.",
    trackedTickers: ["AAPL", "NVDA", "MSFT"]
  },
  {
    id: "ai-research-desk",
    name: "AI Research Desk",
    type: "institution",
    focus: "Semiconductor and platform exposure across MAG7 + AI infra.",
    trackedTickers: ["NVDA", "MSFT", "GOOGL", "AVGO", "ASML", "TSM"]
  },
  {
    id: "nuclear-transition-fund",
    name: "Nuclear Transition Fund",
    type: "institution",
    focus: "Grid reliability and next-gen nuclear buildout.",
    trackedTickers: ["CEG", "CCJ", "OKLO", "SMR"]
  }
];
