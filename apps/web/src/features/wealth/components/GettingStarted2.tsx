"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LabelValueRow } from "@/components/ui/label-value-row";
import { AllocationSimulator } from "@/components/planning/AllocationSimulator";
import { safeGetJson, safeSetJson } from "@/features/wealth/storage";
import type { GoalId } from "@/features/wealth/types";
import { WEALTH_GOALS } from "@/features/wealth/goals";

const GOAL_STORAGE_KEY = "finadvisor-wealth-goal-2";

const goalIdSchema = z.enum([
  "safety",
  "lifestyle",
  "retirement",
  "children",
  "growth"
]);

function CoreSatelliteSplit({
  stablePct,
  higherPotentialPct
}: {
  stablePct: string;
  higherPotentialPct: string;
}) {
  const parseRange = (value: string) => {
    const cleaned = value.replace("%", "").replace(/\s/g, "");
    const parts = cleaned.split(/[–-]/).map((item) => Number(item));
    const minRaw = Number.isFinite(parts[0]) ? parts[0] : 0;
    const maxRaw = Number.isFinite(parts[1]) ? parts[1] : minRaw;
    const min = Math.min(Math.max(minRaw, 0), 100);
    const max = Math.min(Math.max(maxRaw, min), 100);
    return { min, max };
  };
  const stableRange = parseRange(stablePct);
  const higherRange = parseRange(higherPotentialPct);

  const RangeBar = ({
    label,
    range,
    rightLabel
  }: {
    label: string;
    range: { min: number; max: number };
    rightLabel: string;
  }) => (
    <div>
      <LabelValueRow label={label} value={rightLabel} className="text-xs" />
      <div
        className="mt-2 relative h-2 w-full rounded-full bg-slate-700 dark:bg-slate-800"
        title={`Educational range: ${rightLabel}`}
      >
        <div
          className="absolute top-0 h-2 rounded-full bg-yellow-500"
          style={{ left: `${range.min}%`, width: `${range.max - range.min}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );

  return (
    <div className="mt-3 rounded-md border border-border bg-background p-3">
      <RangeBar
        label="Stability"
        range={stableRange}
        rightLabel={stablePct}
      />
      <div className="mt-3">
        <RangeBar
          label="Growth"
          range={higherRange}
          rightLabel={higherPotentialPct}
        />
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        Educational ranges. Not recommendations.
      </div>
    </div>
  );
}

export function GettingStarted2() {
  const [selectedGoalId, setSelectedGoalId] = useState<GoalId>("safety");

  useEffect(() => {
    const storedGoal = safeGetJson<GoalId>(GOAL_STORAGE_KEY);
    const parsedGoal = goalIdSchema.safeParse(storedGoal);
    if (parsedGoal.success) {
      setSelectedGoalId(parsedGoal.data);
    }
  }, []);

  useEffect(() => {
    safeSetJson(GOAL_STORAGE_KEY, selectedGoalId);
  }, [selectedGoalId]);

  const activeGoal =
    WEALTH_GOALS.find((goal) => goal.id === selectedGoalId) ||
    WEALTH_GOALS[0];

  const horizonType =
    activeGoal.id === "safety" || activeGoal.horizon.startsWith("0–3")
      ? "short"
      : activeGoal.id === "lifestyle"
        ? "mid"
        : "long";
  const isShort = horizonType === "short";
  const isMid = horizonType === "mid";

  const stabilityRange = isShort ? "90–100%" : "70–90%";
  const growthRange = isShort ? "0–10%" : "10–30%";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-foreground">Goals</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            First build stability. Then aim for growth.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Start with a stable base. Add a smaller part for higher growth ideas.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-sm font-semibold text-foreground">
                What are you building toward?
              </div>
              <p className="text-xs text-muted-foreground">
                Pick one goal. We’ll show a simple plan for it.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              {WEALTH_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={cn(
                    "rounded-lg border border-border bg-background p-3 text-left text-xs transition",
                    selectedGoalId === goal.id
                      ? "border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="text-sm font-semibold text-foreground">
                    {goal.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {goal.tagline}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-foreground">
              {activeGoal.title}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeGoal.emotionalStatement}
            </p>

            <div className="mt-4 grid gap-4 text-xs text-muted-foreground">
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Real-life examples
                </div>
                <ul className="mt-2 space-y-1">
                  {activeGoal.realLifeExamples.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Time horizon
                </div>
                <div className="mt-1">{activeGoal.horizon}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Simple saving approach
                </div>
                <ul className="mt-2 space-y-1">
                  {activeGoal.savingApproach.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  What fits here (ETFs vs Stocks)
                </div>
                <div className="mt-2 space-y-2">
                  {activeGoal.investmentFit.core.map((item) => (
                    <LabelValueRow key={item} label={item} />
                  ))}
                  {activeGoal.investmentFit.satellite?.map((item) => (
                    <LabelValueRow key={item} label={item} />
                  ))}
                  {activeGoal.investmentFit.avoid?.map((item) => (
                    <LabelValueRow key={item} label={`Avoid ${item}`} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Common mistakes
                </div>
                <ul className="mt-2 space-y-1">
                  {activeGoal.mistakes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Why this matters
                </div>
                <div className="mt-1">{activeGoal.whyMatters}</div>
              </div>
            </div>

          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-foreground">
                Strategic Asset Alloation
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {isShort
                  ? "Focus on stability first."
                  : "Start with stability. Add growth if time allows."}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="text-xs font-semibold text-foreground">
                    Stability
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <li>• Cash</li>
                    <li>• ETFs</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use this for your safety money and your long-term base.
                  </p>
                </div>
                {isShort ? (
                  <div className="rounded-lg border border-dashed border-border bg-background p-4 text-xs text-muted-foreground">
                    <div className="text-xs font-semibold text-foreground">
                      Growth (later)
                    </div>
                    <p className="mt-2">Not for money needed soon.</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="text-xs font-semibold text-foreground">
                      Growth
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• Themes</li>
                      <li>• Single stocks</li>
                      <li>• Congress</li>
                      <li>• Influencers</li>
                    </ul>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Use this for ideas. It can move more — up and down. Only
                      invest money you won’t need soon.
                    </p>
                  </div>
                )}
              </div>
              <CoreSatelliteSplit
                stablePct={stabilityRange}
                higherPotentialPct={growthRange}
              />
              <div className="mt-3 text-xs text-muted-foreground">
                Keep ideas smaller. Keep the base larger.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <AllocationSimulator />

      <Card>
        <CardContent className="p-4 text-center text-xs text-muted-foreground">
        This content is educational and not financial advice.
        </CardContent>
      </Card>
    </main>
  );
}
