export type ReturnDefault = {
  label: string;
  periodLabel: string;
  asOf: string;
  sourceLabel: string;
  sourceUrl?: string;
  valuePct: number;
  isExampleOnly?: boolean;
};

// TODO: Replace example values with computed returns from real datasets.
export const returnDefaults: {
  stability: ReturnDefault;
  growth: ReturnDefault;
} = {
  stability: {
    label: "MSCI World",
    periodLabel: "annualized over last 20 years",
    asOf: "No data loaded",
    sourceLabel: "Example only",
    valuePct: 7,
    isExampleOnly: true
  },
  growth: {
    label: "Magnificent 7",
    periodLabel: "annualized over last 10 years",
    asOf: "No data loaded",
    sourceLabel: "Example only",
    valuePct: 10,
    isExampleOnly: true
  }
};
