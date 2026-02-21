import type { OnboardingAnswers, VersionId } from "@/features/wealth/types";

type RecommendationResult = {
  recommendedId: VersionId;
  reasons: string[];
};

const baseScores: Record<VersionId, number> = {
  "paycheck-to-power": 0,
  snowball: 0,
  everest: 0,
  "swiss-train": 0,
  "ai-assisted": 0
};

export function scoreRecommendation(
  answers: OnboardingAnswers
): RecommendationResult {
  const scores = { ...baseScores };
  const reasons: string[] = [];

  if (answers.location === "switzerland") {
    scores["swiss-train"] += 3;
    reasons.push("You selected Switzerland, so we surfaced the Swiss Train model.");
  }

  if (answers.timeHorizon === "10+") {
    scores.everest += 2;
    scores.snowball += 2;
    reasons.push("A 10+ year horizon fits long-term compounding metaphors.");
  }

  if (answers.timeHorizon === "3-10") {
    scores["paycheck-to-power"] += 1;
    scores.snowball += 1;
    reasons.push("A mid-term horizon favors steady, repeatable systems.");
  }

  if (answers.timeHorizon === "<3") {
    scores["swiss-train"] += 2;
    scores["paycheck-to-power"] += 1;
    reasons.push("A shorter horizon prioritizes stability and planning.");
  }

  if (answers.riskComfort === "cautious") {
    scores["swiss-train"] += 2;
    scores["paycheck-to-power"] += 1;
    reasons.push("Cautious risk comfort aligns with a calm, structured plan.");
  }

  if (answers.riskComfort === "balanced") {
    scores.snowball += 1;
    scores["paycheck-to-power"] += 1;
    reasons.push("Balanced risk fits steady progress metaphors.");
  }

  if (answers.riskComfort === "growth") {
    scores.everest += 2;
    scores.snowball += 1;
    reasons.push("Growth comfort favors longer-term momentum narratives.");
  }

  if (answers.likesAi) {
    scores["ai-assisted"] += 3;
    reasons.push("You opted into AI metaphors, so we boosted that version.");
  }

  const recommendedId = (Object.keys(scores) as VersionId[]).reduce(
    (best, current) => (scores[current] > scores[best] ? current : best),
    "paycheck-to-power"
  );

  if (reasons.length === 0) {
    reasons.push("We defaulted to a balanced, beginner-friendly pathway.");
  }

  return { recommendedId, reasons };
}
