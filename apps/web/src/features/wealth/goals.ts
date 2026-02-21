import type { WealthGoal } from "@/features/wealth/types";

export const WEALTH_GOALS: WealthGoal[] = [
  {
    id: "safety",
    title: "Financial Safety & Stability",
    tagline: "I don’t want stress.",
    emotionalStatement: "I don’t want financial stress.",
    realLifeExamples: [
      "You lose your job",
      "Your car breaks down",
      "A medical or rent surprise",
      "Income feels unstable"
    ],
    horizon: "0–3 years",
    savingApproach: [
      "Automatic monthly transfer",
      "Build 3–6 months of expenses",
      "Keep it separate",
      "Keep it boring"
    ],
    investmentFit: {
      core: ["Cash", "Short-term bond ETFs"],
      avoid: ["Individual stocks", "Themes"]
    },
    mistakes: ["Investing emergency money", "Chasing yield"],
    whyMatters: "Safety first. Growth second.",
    allocation: {
      cashBonds: "80–100% cash/short-duration bonds",
      equities: "0–20% equities if timing allows",
      notes:
        "Avoid equity exposure if funds are needed within 2–3 years. Example: CHF 4,000/month in expenses → CHF 12,000–24,000 target (illustrative only)."
    },
    coreSatellite: {
      corePct: "100%",
      satellitePct: "0%",
      coreFocus: ["Cash ETFs", "Short-duration bond ETFs"],
      satelliteFocus: [],
      notes:
        "Keep the higher potential portion smaller and aligned with your time horizon."
    }
  },
  {
    id: "lifestyle",
    title: "Lifestyle Purchases",
    tagline: "I want options.",
    emotionalStatement: "I want options.",
    realLifeExamples: [
      "Saving for a home down payment in 5 years",
      "Renovation",
      "Wedding",
      "Sabbatical",
      "Starting a small business"
    ],
    horizon: "2–7 years",
    savingApproach: [
      "Dedicated goal bucket",
      "Monthly auto-invest",
      "Gradually reduce risk as the date approaches"
    ],
    investmentFit: {
      core: ["Broad equity ETFs", "Bond ETFs"],
      satellite: ["Small allocation to themes or single stocks if 5+ years"],
      avoid: ["High volatility close to goal"]
    },
    mistakes: [
      "Panic selling during year 3",
      "Not reducing risk before the purchase date"
    ],
    whyMatters: "You don’t want market swings to delay life plans.",
    allocation: {
      cashBonds: "40–70% bonds",
      equities: "30–60% global equities if 5+ years",
      notes:
        "De-risk as the goal date approaches. Example: CHF 1,000/month for 5 years (illustrative only)."
    },
    coreSatellite: {
      corePct: "70–90%",
      satellitePct: "0–30%",
      coreFocus: ["Broad ETFs", "Bond ETFs"],
      satelliteFocus: ["Limited themes", "Single stocks if horizon allows"],
      notes:
        "Keep the higher potential portion smaller and aligned with your time horizon."
    }
  },
  {
    id: "retirement",
    title: "Retirement & Long-Term Independence",
    tagline: "I want freedom.",
    emotionalStatement: "I want freedom.",
    realLifeExamples: [
      "Investing CHF 500/month for 30 years (illustrative only)",
      "Building financial independence",
      "Supplementing a pension",
      "Swiss Pillar 3a (informational only)"
    ],
    horizon: "10–40 years",
    savingApproach: [
      "Dollar-cost averaging monthly",
      "Automate contributions",
      "Stay invested"
    ],
    investmentFit: {
      core: ["Broad global ETFs (80–90%)"],
      satellite: ["High-quality single stocks", "Long-term themes (10–20%)"]
    },
    mistakes: [
      "Market timing",
      "Selling during downturns",
      "Underinvesting out of fear"
    ],
    whyMatters: "Compounding works over decades.",
    allocation: {
      cashBonds: "10–30% cash/bonds",
      equities: "70–90% global equities",
      notes: "More equities when far away; rebalance periodically."
    },
    coreSatellite: {
      corePct: "80–90%",
      satellitePct: "10–20%",
      coreFocus: ["Broad global ETFs"],
      satelliteFocus: ["High-quality single stocks", "Long-term themes"],
      notes:
        "Keep the higher potential portion smaller and aligned with your time horizon."
    }
  },
  {
    id: "children",
    title: "Children & Education",
    tagline: "I want security for my family.",
    emotionalStatement: "I want security for my family.",
    realLifeExamples: [
      "University in 15 years",
      "Support for a first home",
      "Intergenerational planning"
    ],
    horizon: "5–20 years",
    savingApproach: [
      "Separate account per child",
      "Growth-focused early",
      "Reduce risk about 5 years before the milestone"
    ],
    investmentFit: {
      core: ["Mostly ETFs"],
      satellite: ["Minimal single-stock exposure"]
    },
    mistakes: [
      "Being too conservative early",
      "Emotional stock attachment"
    ],
    whyMatters: "Time allows growth — but deadlines require discipline.",
    allocation: {
      cashBonds: "20–40% cash/bonds when far out",
      equities: "60–80% equities when far out",
      notes: "De-risk around 5 years before the milestone."
    },
    coreSatellite: {
      corePct: "80–95%",
      satellitePct: "5–20%",
      coreFocus: ["Broad ETFs"],
      satelliteFocus: ["Minimal themes or stocks"],
      notes:
        "Keep the higher potential portion smaller and aligned with your time horizon."
    }
  },
  {
    id: "growth",
    title: "Wealth Expansion / Capital Growth",
    tagline: "I want meaningful growth.",
    emotionalStatement: "I want meaningful growth.",
    realLifeExamples: [
      "You already have safety + retirement covered",
      "You want exposure to AI, energy, or innovation",
      "You want higher growth potential"
    ],
    horizon: "10+ years",
    savingApproach: [
      "Stable & Higher Potential structure",
      "Regular contributions to diversified core",
      "Smaller allocation to themes or stocks"
    ],
    investmentFit: {
      core: ["Broad global ETFs (60–80%)"],
      satellite: ["Thematic ETFs", "Individual stocks (20–40%)"]
    },
    mistakes: [
      "Overconcentration",
      "Trend chasing",
      "Overtrading"
    ],
    whyMatters: "Growth requires structure, not speculation.",
    allocation: {
      cashBonds: "5–30% cash/bonds",
      equities: "70–95% equities",
      alternatives: "5–20% alternatives if appropriate",
      notes: "Global diversification and rebalancing rules matter."
    },
    coreSatellite: {
      corePct: "60–80%",
      satellitePct: "20–40%",
      coreFocus: ["Broad ETFs"],
      satelliteFocus: ["Themes", "Single stocks"],
      notes:
        "Keep the higher potential portion smaller and aligned with your time horizon."
    }
  }
];
