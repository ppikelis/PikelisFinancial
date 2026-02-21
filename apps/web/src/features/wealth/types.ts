export type WealthStepTitle =
  | "Income"
  | "Save"
  | "Invest"
  | "Compound"
  | "Freedom";

export type WealthStep = {
  title: WealthStepTitle;
  text: string;
  example?: string;
};

export type WealthVersion = {
  id: VersionId;
  title: string;
  tagline: string;
  steps: WealthStep[];
  key_rules: string[];
  mistakes: string[];
  chart_hint: { title: string; description: string };
};

export type VersionId =
  | "paycheck-to-power"
  | "snowball"
  | "everest"
  | "swiss-train"
  | "ai-assisted";

export type TimeHorizon = "<3" | "3-10" | "10+";
export type RiskComfort = "cautious" | "balanced" | "growth";
export type LocationContext = "switzerland" | "global";

export type OnboardingAnswers = {
  timeHorizon?: TimeHorizon;
  riskComfort?: RiskComfort;
  location?: LocationContext;
  likesAi?: boolean;
};

export type GoalId =
  | "safety"
  | "lifestyle"
  | "retirement"
  | "children"
  | "growth";

export type GoalAllocation = {
  cashBonds: string;
  equities: string;
  alternatives?: string;
  notes: string;
};

export type CoreSatellite = {
  corePct: string;
  satellitePct: string;
  coreFocus: string[];
  satelliteFocus: string[];
  notes: string;
};

export type WealthGoal = {
  id: GoalId;
  title: string;
  tagline: string;
  emotionalStatement: string;
  realLifeExamples: string[];
  horizon: string;
  savingApproach: string[];
  investmentFit: {
    core: string[];
    satellite?: string[];
    avoid?: string[];
  };
  mistakes: string[];
  whyMatters: string;
  allocation: GoalAllocation;
  coreSatellite: CoreSatellite;
};
