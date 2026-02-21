export type MarketAssumption = {
  meanReturnPct: number | null;
  volPct: number | null;
  sourceLabel: string;
  periodLabel: string;
  asOf: string;
};

export const marketAssumptions: {
  stability: MarketAssumption;
  growth: MarketAssumption;
} = {
  stability: {
    meanReturnPct: null,
    volPct: null,
    sourceLabel: "",
    periodLabel: "",
    asOf: ""
  },
  growth: {
    meanReturnPct: null,
    volPct: null,
    sourceLabel: "",
    periodLabel: "",
    asOf: ""
  }
};
