export type RatioFormatType = "x" | "percent" | "usd";

export type RatioKey =
  | "pe_ttm"
  | "forward_pe"
  | "ps"
  | "ev_ebitda"
  | "pb"
  | "gross_margin"
  | "operating_margin"
  | "net_margin"
  | "roe"
  | "roic"
  | "debt_equity"
  | "current_ratio"
  | "fcf_ttm"
  | "revenue_growth_yoy"
  | "eps_growth_yoy";

export interface RatioMeta {
  key: RatioKey;
  label: string;
  formatType: RatioFormatType;
  group: "Valuation" | "Growth" | "Profitability" | "Financial Health";
}

export const ratioMeta: RatioMeta[] = [
  { key: "pe_ttm", label: "P/E (TTM)", formatType: "x", group: "Valuation" },
  {
    key: "forward_pe",
    label: "Forward P/E",
    formatType: "x",
    group: "Valuation"
  },
  { key: "ps", label: "Price/Sales", formatType: "x", group: "Valuation" },
  { key: "ev_ebitda", label: "EV/EBITDA", formatType: "x", group: "Valuation" },
  { key: "pb", label: "Price/Book", formatType: "x", group: "Valuation" },
  {
    key: "revenue_growth_yoy",
    label: "Revenue Growth YoY",
    formatType: "percent",
    group: "Growth"
  },
  {
    key: "eps_growth_yoy",
    label: "EPS Growth YoY",
    formatType: "percent",
    group: "Growth"
  },
  {
    key: "gross_margin",
    label: "Gross Margin",
    formatType: "percent",
    group: "Profitability"
  },
  {
    key: "operating_margin",
    label: "Operating Margin",
    formatType: "percent",
    group: "Profitability"
  },
  {
    key: "net_margin",
    label: "Net Margin",
    formatType: "percent",
    group: "Profitability"
  },
  { key: "roe", label: "ROE", formatType: "percent", group: "Profitability" },
  { key: "roic", label: "ROIC", formatType: "percent", group: "Profitability" },
  {
    key: "debt_equity",
    label: "Debt/Equity",
    formatType: "x",
    group: "Financial Health"
  },
  {
    key: "current_ratio",
    label: "Current Ratio",
    formatType: "x",
    group: "Financial Health"
  },
  {
    key: "fcf_ttm",
    label: "Free Cash Flow (TTM)",
    formatType: "usd",
    group: "Financial Health"
  }
];
