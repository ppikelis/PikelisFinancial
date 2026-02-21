import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export type RatioPoint = { date: string; value: number | null };

export type RatioHistory = {
  pe_ttm: RatioPoint[];
  forward_pe: RatioPoint[];
  ps: RatioPoint[];
  ev_ebitda: RatioPoint[];
  pb: RatioPoint[];
  gross_margin: RatioPoint[];
  operating_margin: RatioPoint[];
  net_margin: RatioPoint[];
  roe: RatioPoint[];
  roic: RatioPoint[];
  debt_equity: RatioPoint[];
  current_ratio: RatioPoint[];
  fcf_ttm: RatioPoint[];
  revenue_growth_yoy: RatioPoint[];
  eps_growth_yoy: RatioPoint[];
};

const seeded = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const generateQuarterlyDates = (quarters = 24) => {
  const dates: string[] = [];
  const start = new Date("2020-01-01T00:00:00Z");
  for (let i = 0; i < quarters; i += 1) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i * 3);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates;
};

const maybeNull = (value: number, rand: () => number) =>
  rand() > 0.92 ? null : value;

const buildSeries = (
  dates: string[],
  base: number,
  volatility: number,
  rand: () => number
) =>
  dates.map((date) => ({
    date,
    value: maybeNull(
      Number((base + (rand() - 0.5) * volatility).toFixed(2)),
      rand
    )
  }));

const buildPercentSeries = (
  dates: string[],
  base: number,
  volatility: number,
  rand: () => number
) =>
  dates.map((date) => ({
    date,
    value: maybeNull(
      Number((base + (rand() - 0.5) * volatility).toFixed(1)),
      rand
    )
  }));

const buildRatioHistory = (symbol: string): RatioHistory => {
  const rand = seeded(symbol);
  const dates = generateQuarterlyDates(24);

  return {
    pe_ttm: buildSeries(dates, 22 + rand() * 8, 8, rand),
    forward_pe: buildSeries(dates, 18 + rand() * 6, 6, rand),
    ps: buildSeries(dates, 6 + rand() * 3, 3, rand),
    ev_ebitda: buildSeries(dates, 12 + rand() * 6, 6, rand),
    pb: buildSeries(dates, 5 + rand() * 2.5, 2.5, rand),
    gross_margin: buildPercentSeries(dates, 48 + rand() * 12, 8, rand),
    operating_margin: buildPercentSeries(dates, 20 + rand() * 10, 7, rand),
    net_margin: buildPercentSeries(dates, 14 + rand() * 8, 6, rand),
    roe: buildPercentSeries(dates, 18 + rand() * 10, 8, rand),
    roic: buildPercentSeries(dates, 14 + rand() * 8, 6, rand),
    debt_equity: buildSeries(dates, 0.6 + rand() * 0.8, 0.6, rand),
    current_ratio: buildSeries(dates, 1.4 + rand() * 0.6, 0.5, rand),
    fcf_ttm: buildSeries(dates, 8 + rand() * 6, 5, rand),
    revenue_growth_yoy: buildPercentSeries(dates, 12 + rand() * 10, 10, rand),
    eps_growth_yoy: buildPercentSeries(dates, 15 + rand() * 12, 12, rand)
  };
};

const ratioHistoryBySymbol = STOCK_GROUPS_ORDER.reduce((acc, groupName) => {
  STOCK_GROUPS[groupName].forEach((stock) => {
    acc[stock.symbol] = buildRatioHistory(stock.symbol);
  });
  return acc;
}, {} as Record<string, RatioHistory>);

export function getRatioHistory(symbol: string): RatioHistory {
  return (
    ratioHistoryBySymbol[symbol] ?? {
      pe_ttm: [],
      forward_pe: [],
      ps: [],
      ev_ebitda: [],
      pb: [],
      gross_margin: [],
      operating_margin: [],
      net_margin: [],
      roe: [],
      roic: [],
      debt_equity: [],
      current_ratio: [],
      fcf_ttm: [],
      revenue_growth_yoy: [],
      eps_growth_yoy: []
    }
  );
}
