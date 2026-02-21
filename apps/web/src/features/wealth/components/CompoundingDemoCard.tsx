"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { safeGetJson, safeSetJson } from "@/features/wealth/storage";

const STORAGE_KEY = "finadvisor-compounding-demo-v2";

const demoSchema = z.object({
  monthlyContribution: z.number().min(0).max(100000),
  years: z.number().min(1).max(60),
  annualReturnPct: z.number().min(0).max(20),
  initialAmount: z.number().min(0).max(10000000)
});

type DemoValues = z.infer<typeof demoSchema>;

const defaultValues: DemoValues = {
  monthlyContribution: 250,
  years: 20,
  annualReturnPct: 6,
  initialAmount: 0
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function computeBalances(values: DemoValues) {
  const months = values.years * 12;
  const monthlyRate = Math.pow(1 + values.annualReturnPct / 100, 1 / 12) - 1;
  let balance = values.initialAmount;
  const yearly: number[] = [];

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + values.monthlyContribution;
    if (month % 12 === 0) {
      yearly.push(balance);
    }
  }

  const totalContributed =
    values.initialAmount + values.monthlyContribution * months;
  const growth = balance - totalContributed;

  return {
    endingBalance: balance,
    totalContributed,
    growth,
    yearly
  };
}

function Sparkline({ points }: { points: number[] }) {
  if (points.length === 0) {
    return null;
  }
  const width = 180;
  const height = 64;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((value, index) => {
    const x = (index / (points.length - 1 || 1)) * (width - 8) + 4;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      />
    </svg>
  );
}

export function CompoundingDemoCard() {
  const [values, setValues] = useState<DemoValues>(defaultValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DemoValues, string>>
  >({});

  useEffect(() => {
    const stored = safeGetJson<DemoValues>(STORAGE_KEY);
    if (!stored) {
      return;
    }
    const parsed = demoSchema.safeParse(stored);
    if (parsed.success) {
      setValues(parsed.data);
    }
  }, []);

  useEffect(() => {
    safeSetJson(STORAGE_KEY, values);
  }, [values]);

  const results = useMemo(() => computeBalances(values), [values]);

  const handleChange =
    (field: keyof DemoValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      const nextValue = raw === "" ? 0 : Number(raw);
      const next = { ...values, [field]: nextValue };
      const parsed = demoSchema.safeParse(next);
      if (parsed.success) {
        setValues(parsed.data);
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      } else {
        const issue = parsed.error.issues.find((item) => item.path[0] === field);
        setValues(next);
        setErrors((prev) => ({
          ...prev,
          [field]: issue?.message || "Enter a valid value."
        }));
      }
    };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="text-sm font-semibold">Compounding demo</div>
      <p className="mt-1 text-xs text-muted-foreground">
        Illustration only. Not a prediction. Returns vary.
      </p>

      <div className="mt-4 grid gap-3 text-xs text-muted-foreground">
        <label className="space-y-1">
          <span>Initial amount</span>
          <input
            aria-label="Initial amount"
            type="number"
            min={0}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            value={values.initialAmount}
            onChange={handleChange("initialAmount")}
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
            type="number"
            min={0}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            value={values.monthlyContribution}
            onChange={handleChange("monthlyContribution")}
          />
          {errors.monthlyContribution && (
            <span className="text-[11px] text-red-400">
              {errors.monthlyContribution}
            </span>
          )}
        </label>
        <label className="space-y-1">
          <span>Years</span>
          <input
            aria-label="Years"
            type="number"
            min={1}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            value={values.years}
            onChange={handleChange("years")}
          />
          {errors.years && (
            <span className="text-[11px] text-red-400">{errors.years}</span>
          )}
        </label>
        <label className="space-y-1">
          <span>Annual return pct (illustrative assumption)</span>
          <input
            aria-label="Annual return percentage"
            type="number"
            min={0}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            value={values.annualReturnPct}
            onChange={handleChange("annualReturnPct")}
          />
          {errors.annualReturnPct && (
            <span className="text-[11px] text-red-400">
              {errors.annualReturnPct}
            </span>
          )}
        </label>
      </div>

      <div className="mt-5 rounded-lg border border-border bg-background p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Simulated balance</span>
          <span className="text-sm font-semibold text-foreground">
            {numberFormatter.format(results.endingBalance)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Total contributed</span>
          <span>{numberFormatter.format(results.totalContributed)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Illustrative growth</span>
          <span>{numberFormatter.format(results.growth)}</span>
        </div>
        <div className="mt-4 rounded-md border border-dashed border-border p-3 text-muted-foreground">
          <Sparkline points={results.yearly} />
        </div>
      </div>
    </section>
  );
}
