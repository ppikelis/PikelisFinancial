"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  allocationSimulatorSchema,
  type AllocationSimulatorValues
} from "@/components/planning/allocationSimulatorSchema";
import { safeGetJson, safeSetJson } from "@/features/wealth/storage";
import { returnDefaults } from "@/lib/assumptions/returnDefaults";

const STORAGE_KEY = "finadvisor-allocation-simulator";

const defaultValues: AllocationSimulatorValues = {
  initialAmount: 1000,
  monthlyContribution: 250,
  years: 20,
  stabilityAllocationPct: 70,
  stabilityReturnPct: returnDefaults.stability.valuePct,
  growthReturnPct: returnDefaults.growth.valuePct,
  contributionIncreasePct: 0
};

type YearRow = {
  year: number;
  contributed: number;
  stability: number;
  growth: number;
  total: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const inputNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});

const formatCurrency = (value: number) => currencyFormatter.format(value);
const formatCompact = (value: number) => compactFormatter.format(value);

const chartColors = {
  total: "#eab308",
  stability: "#94a3b8",
  growth: "#6366f1"
};

function computeSeries(values: AllocationSimulatorValues) {
  const stabilityAlloc = Math.min(
    Math.max(values.stabilityAllocationPct / 100, 0),
    1
  );
  const growthAlloc = 1 - stabilityAlloc;
  const stabilityRate =
    Math.pow(1 + values.stabilityReturnPct / 100, 1 / 12) - 1;
  const growthRate = Math.pow(1 + values.growthReturnPct / 100, 1 / 12) - 1;

  let stability = values.initialAmount * stabilityAlloc;
  let growth = values.initialAmount * growthAlloc;
  let totalContributed = values.initialAmount;
  let monthlyContribution = values.monthlyContribution;

  const rows: YearRow[] = [
    {
      year: 0,
      contributed: totalContributed,
      stability,
      growth,
      total: stability + growth
    }
  ];

  for (let year = 1; year <= values.years; year += 1) {
    if (values.contributionIncreasePct > 0) {
      monthlyContribution =
        monthlyContribution * (1 + values.contributionIncreasePct / 100);
    }

    for (let month = 1; month <= 12; month += 1) {
      stability = Math.max(0, stability * (1 + stabilityRate));
      growth = Math.max(0, growth * (1 + growthRate));

      const stabilityContribution = monthlyContribution * stabilityAlloc;
      const growthContribution = monthlyContribution * growthAlloc;
      stability += stabilityContribution;
      growth += growthContribution;
      totalContributed += monthlyContribution;
    }

    rows.push({
      year,
      contributed: totalContributed,
      stability,
      growth,
      total: stability + growth
    });
  }

  return {
    rows
  };
}

function TooltipContent({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload?: { contributed?: number };
  }>;
  label?: number;
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload.reduce<Record<string, number>>((acc, item) => {
    if (item.dataKey) {
      acc[item.dataKey] = item.value;
    }
    return acc;
  }, {});
  const contributed = payload[0]?.payload?.contributed;

  return (
    <div className="rounded-md border border-border bg-card p-3 text-xs text-muted-foreground shadow">
      <div className="text-foreground">Year {label}</div>
      <div>Total: {formatCurrency(data.total || 0)}</div>
      <div>Stability: {formatCurrency(data.stability || 0)}</div>
      <div>Growth: {formatCurrency(data.growth || 0)}</div>
      <div>
        Contributed:{" "}
        {typeof contributed === "number"
          ? formatCurrency(contributed)
          : "—"}
      </div>
    </div>
  );
}

export function AllocationSimulator() {
  const [values, setValues] = useState<AllocationSimulatorValues>(defaultValues);
  const [textValues, setTextValues] = useState({
    initialAmount: inputNumberFormatter.format(defaultValues.initialAmount),
    monthlyContribution: inputNumberFormatter.format(
      defaultValues.monthlyContribution
    ),
    stabilityReturnPct: String(defaultValues.stabilityReturnPct),
    growthReturnPct: String(defaultValues.growthReturnPct)
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AllocationSimulatorValues, string>>
  >({});

  useEffect(() => {
    const stored = safeGetJson<AllocationSimulatorValues>(STORAGE_KEY);
    if (!stored) {
      return;
    }
    const parsed = allocationSimulatorSchema.safeParse(stored);
    if (parsed.success) {
      setValues(parsed.data);
      setTextValues((prev) => ({
        ...prev,
        initialAmount: inputNumberFormatter.format(parsed.data.initialAmount),
        monthlyContribution: inputNumberFormatter.format(
          parsed.data.monthlyContribution
        ),
        stabilityReturnPct: String(parsed.data.stabilityReturnPct),
        growthReturnPct: String(parsed.data.growthReturnPct)
      }));
    }
  }, []);

  useEffect(() => {
    safeSetJson(STORAGE_KEY, values);
  }, [values]);

  const isValid =
    allocationSimulatorSchema.safeParse(values).success &&
    Object.values(errors).every((error) => !error);

  const computed = useMemo(() => {
    if (!isValid) {
      return null;
    }
    return computeSeries(values);
  }, [values, isValid]);

  const series = computed?.rows ?? [];
  const lastRow = series[series.length - 1];
  const midRow = series[Math.floor(series.length / 2)];

  const parseCurrencyInput = (value: string) =>
    Number(value.replace(/,/g, ""));

  const handleCurrencyChange =
    (field: "initialAmount" | "monthlyContribution") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      setTextValues((prev) => ({ ...prev, [field]: raw }));
      if (raw.trim() === "") {
        setErrors((prev) => ({ ...prev, [field]: "Required" }));
        return;
      }
      const parsed = parseCurrencyInput(raw);
      if (!Number.isFinite(parsed) || parsed < 0) {
        setErrors((prev) => ({ ...prev, [field]: "Enter a valid amount." }));
        return;
      }
      setValues((prev) => ({ ...prev, [field]: parsed }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleCurrencyBlur =
    (field: "initialAmount" | "monthlyContribution") => () => {
      const raw = textValues[field];
      if (raw.trim() === "") {
        return;
      }
      const parsed = parseCurrencyInput(raw);
      if (!Number.isFinite(parsed) || parsed < 0) {
        return;
      }
      setTextValues((prev) => ({
        ...prev,
        [field]: inputNumberFormatter.format(parsed)
      }));
    };

  const percentMax: Record<
    | "stabilityAllocationPct"
    | "stabilityReturnPct"
    | "growthReturnPct"
    | "contributionIncreasePct",
    number
  > = {
    stabilityAllocationPct: 100,
    stabilityReturnPct: 20,
    growthReturnPct: 25,
    contributionIncreasePct: 10
  };

  const handlePercentChange =
    (
      field:
        | "stabilityAllocationPct"
        | "stabilityReturnPct"
        | "growthReturnPct"
        | "contributionIncreasePct"
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      if (raw.trim() === "") {
        setErrors((prev) => ({ ...prev, [field]: "Required" }));
        setValues((prev) => ({ ...prev, [field]: 0 }));
        return;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed < 0) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Enter a valid percentage."
        }));
        return;
      }
      if (parsed > percentMax[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: `Must be ${percentMax[field]}% or less.`
        }));
        setValues((prev) => ({ ...prev, [field]: parsed }));
        return;
      }
      setValues((prev) => ({ ...prev, [field]: parsed }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const stabilityPct = Math.min(Math.max(values.stabilityAllocationPct, 0), 100);
  const growthPct = 100 - stabilityPct;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm font-semibold text-foreground">
          Investment Simulator
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Illustration only. Not a prediction. Returns vary. Assumes constant
          returns. No taxes/fees/inflation.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3 text-xs text-muted-foreground">
            <label className="space-y-1">
              <span>Initial amount</span>
              <input
                aria-label="Initial amount"
                type="text"
                min={0}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={textValues.initialAmount}
                onChange={handleCurrencyChange("initialAmount")}
                onBlur={handleCurrencyBlur("initialAmount")}
              />
              {errors.initialAmount && (
                <span className="text-[11px] text-red-400">
                  {errors.initialAmount}
                </span>
              )}
            </label>
            <label className="space-y-1">
              <span>Monthly contribution</span>
              <input
                aria-label="Monthly contribution"
                type="text"
                min={0}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={textValues.monthlyContribution}
                onChange={handleCurrencyChange("monthlyContribution")}
                onBlur={handleCurrencyBlur("monthlyContribution")}
              />
              {errors.monthlyContribution && (
                <span className="text-[11px] text-red-400">
                  {errors.monthlyContribution}
                </span>
              )}
            </label>
            <label className="space-y-1">
              <span>Years</span>
              <select
                aria-label="Years"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={values.years}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    years: Number(event.target.value)
                  }))
                }
              >
                {[1, 2, 3].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
                {[4, 5, 6, 7, 8, 9, 10].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
                {[10, 15, 20, 25, 30].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
              {errors.years && (
                <span className="text-[11px] text-red-400">{errors.years}</span>
              )}
            </label>
            <label className="space-y-1">
              <span>Stability allocation (%)</span>
              <input
                aria-label="Stability allocation percentage"
                type="number"
                min={0}
                max={100}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={values.stabilityAllocationPct}
                onChange={handlePercentChange("stabilityAllocationPct")}
              />
              <div className="text-[11px] text-muted-foreground">
                Growth allocation: {growthPct}%
              </div>
              {errors.stabilityAllocationPct && (
                <span className="text-[11px] text-red-400">
                  {errors.stabilityAllocationPct}
                </span>
              )}
            </label>
            <label className="space-y-1">
              <span>Stability return % (illustrative assumption)</span>
              <input
                aria-label="Stability return percentage"
                type="number"
                min={0}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={textValues.stabilityReturnPct}
                onChange={(event) => {
                  setTextValues((prev) => ({
                    ...prev,
                    stabilityReturnPct: event.target.value
                  }));
                  handlePercentChange("stabilityReturnPct")(event);
                }}
              />
              {errors.stabilityReturnPct && (
                <span className="text-[11px] text-red-400">
                  {errors.stabilityReturnPct}
                </span>
              )}
            </label>
            <label className="space-y-1">
              <span>Growth return % (illustrative assumption)</span>
              <input
                aria-label="Growth return percentage"
                type="number"
                min={0}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={textValues.growthReturnPct}
                onChange={(event) => {
                  setTextValues((prev) => ({
                    ...prev,
                    growthReturnPct: event.target.value
                  }));
                  handlePercentChange("growthReturnPct")(event);
                }}
              />
              {errors.growthReturnPct && (
                <span className="text-[11px] text-red-400">
                  {errors.growthReturnPct}
                </span>
              )}
            </label>
            <div className="text-[11px] text-muted-foreground">
              {returnDefaults.stability.isExampleOnly ||
              returnDefaults.growth.isExampleOnly ? (
                "Defaults used: Examples only (no data source loaded)."
              ) : (
                <>
                  Defaults used: Stability default: {returnDefaults.stability.label},{" "}
                  {returnDefaults.stability.periodLabel} (
                  {returnDefaults.stability.sourceLabel}, as of{" "}
                  {returnDefaults.stability.asOf}). Growth default:{" "}
                  {returnDefaults.growth.label},{" "}
                  {returnDefaults.growth.periodLabel} (
                  {returnDefaults.growth.sourceLabel}, as of{" "}
                  {returnDefaults.growth.asOf}).
                </>
              )}
            </div>
            <label className="space-y-1">
              <span>Contribution increase per year (%)</span>
              <input
                aria-label="Contribution increase per year percentage"
                type="number"
                min={0}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={values.contributionIncreasePct}
                onChange={handlePercentChange("contributionIncreasePct")}
              />
              {errors.contributionIncreasePct && (
                <span className="text-[11px] text-red-400">
                  {errors.contributionIncreasePct}
                </span>
              )}
            </label>
          </div>

          <div className="space-y-4">
            {!isValid ? (
              <div className="rounded-lg border border-border bg-background p-4 text-xs text-muted-foreground">
                Add valid values above to see the chart.
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="text-xs text-muted-foreground">
                    Final portfolio value
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatCurrency(lastRow.total)}
                  </div>
                  <div className="mt-2 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <div>Total contributed: {formatCurrency(lastRow.contributed)}</div>
                    <div>
                      Estimated growth:{" "}
                      {formatCurrency(lastRow.total - lastRow.contributed)}
                    </div>
                    <div>Stability bucket: {formatCurrency(lastRow.stability)}</div>
                    <div>Growth bucket: {formatCurrency(lastRow.growth)}</div>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} />
                      <YAxis tickFormatter={(v) => formatCompact(Number(v))} />
                      <Tooltip content={<TooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke={chartColors.total}
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="stability"
                        stroke={chartColors.stability}
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke={chartColors.growth}
                        strokeWidth={2}
                        strokeDasharray="2 4"
                        dot={false}
                      />
                      <ReferenceDot
                        x={lastRow.year}
                        y={lastRow.total}
                        r={3}
                        fill={chartColors.total}
                        stroke="none"
                        label={{
                          position: "right",
                          value: formatCompact(lastRow.total),
                          fill: chartColors.total
                        }}
                      />
                      <ReferenceDot
                        x={midRow.year}
                        y={midRow.total}
                        r={3}
                        fill={chartColors.total}
                        stroke="none"
                        label={{
                          position: "top",
                          value: formatCompact(midRow.total),
                          fill: chartColors.total
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="table">
                    <AccordionTrigger>Show yearly table</AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 max-h-64 overflow-auto">
                        <table className="w-full border-collapse text-xs text-muted-foreground">
                          <thead className="text-muted-foreground">
                            <tr>
                              <th className="py-1 text-left">Year</th>
                              <th className="py-1 text-right">Contributed</th>
                              <th className="py-1 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {series.map((row) => (
                              <tr key={row.year} className="border-t border-border">
                                <td className="py-1 text-left">{row.year}</td>
                                <td className="py-1 text-right">
                                  {formatCurrency(row.contributed)}
                                </td>
                                <td className="py-1 text-right">
                                  {formatCurrency(row.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="text-[11px] text-muted-foreground">
                  Educational only. Not financial advice. Not a prediction.
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
