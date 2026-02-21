import type { WealthVersion } from "@/features/wealth/types";

export const WEALTH_VERSIONS_2: WealthVersion[] = [
  {
    id: "paycheck-to-power",
    title: "From Paycheck to Power",
    tagline: "A calm system that turns income into long-term options.",
    steps: [
      {
        title: "Income",
        text: "Income is the engine. Keep it consistent and visible.",
        example: "Example: automate transfers on payday."
      },
      {
        title: "Save",
        text: "Savings protect the plan from surprises.",
        example: "Example: an emergency fund cushions short-term shocks."
      },
      {
        title: "Invest",
        text: "Invest with a strategic mix that fits your time horizon.",
        example: "Example: diversified allocation balances risk and return."
      },
      {
        title: "Compound",
        text: "Time does the heavy lifting when you stay consistent.",
        example: "Example: dollar-cost averaging reduces timing stress."
      },
      {
        title: "Freedom",
        text: "Freedom means flexibility, not perfection.",
        example: "Example: longer horizons soften short-term volatility."
      }
    ],
    key_rules: [
      "Use dollar-cost averaging for steady contributions.",
      "Match asset allocation to risk comfort and time horizon.",
      "Risk and return move together; avoid chasing quick gains.",
      "Keep an emergency fund before taking investment risk.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Panic selling after a drawdown.",
      "Trying to time the market instead of staying consistent.",
      "Skipping the emergency fund and selling at the wrong time.",
      "Overconcentrating in one stock or theme.",
      "Ignoring fees and tax impact."
    ],
    chart_hint: {
      title: "Chart idea: Calm staircase",
      description:
        "A steady path that rises as contributions and compounding add up."
    }
  },
  {
    id: "snowball",
    title: "Your Money’s Snowball",
    tagline: "Small starts, disciplined momentum.",
    steps: [
      {
        title: "Income",
        text: "Each paycheck adds a new layer.",
        example: "Example: route a fixed slice into savings first."
      },
      {
        title: "Save",
        text: "Savings keep the base intact when life shifts.",
        example: "Example: emergency fund before investing."
      },
      {
        title: "Invest",
        text: "A diversified mix keeps the snowball rolling.",
        example: "Example: strategic asset allocation reduces concentration."
      },
      {
        title: "Compound",
        text: "Momentum builds when returns stay invested.",
        example: "Example: dollar-cost averaging keeps pace through cycles."
      },
      {
        title: "Freedom",
        text: "Momentum creates options and resilience.",
        example: "Example: longer horizons reduce the impact of noise."
      }
    ],
    key_rules: [
      "Dollar-cost averaging smooths entry points.",
      "Strategic asset allocation balances growth and stability.",
      "Risk and return are linked; choose the level you can hold.",
      "Time horizon matters more than headlines.",
      "Emergency funds prevent forced selling.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Stopping contributions after negative news.",
      "Market timing instead of steady investing.",
      "Taking risk without a cash buffer.",
      "Chasing recent winners.",
      "Overlooking taxes and fees."
    ],
    chart_hint: {
      title: "Chart idea: Snowball curve",
      description: "A curve that steepens gradually as compounding builds."
    }
  },
  {
    id: "everest",
    title: "Climbing the Everest of Wealth",
    tagline: "Preparation, pacing, and steady altitude gain.",
    steps: [
      {
        title: "Income",
        text: "Income is base camp. It funds the climb.",
        example: "Example: stabilize cash flow before extra risk."
      },
      {
        title: "Save",
        text: "Savings are supplies for weather and delays.",
        example: "Example: emergency fund for unexpected costs."
      },
      {
        title: "Invest",
        text: "Pick a route with planned risk.",
        example: "Example: diversified allocation aligned to your horizon."
      },
      {
        title: "Compound",
        text: "Small gains stack when you keep moving.",
        example: "Example: dollar-cost averaging supports steady progress."
      },
      {
        title: "Freedom",
        text: "The summit is optionality, not speed.",
        example: "Example: long horizons reduce short-term pressure."
      }
    ],
    key_rules: [
      "Dollar-cost averaging reduces timing risk.",
      "Strategic asset allocation supports the full journey.",
      "Risk and return rise together; pace the climb.",
      "Time horizon defines how steep the path can be.",
      "Emergency funds prevent forced retreats.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Panic selling on a steep drop.",
      "Chasing short-term performance.",
      "Underestimating volatility for higher returns.",
      "Skipping the emergency fund.",
      "Ignoring taxes and fees."
    ],
    chart_hint: {
      title: "Chart idea: Altitude path",
      description: "A rising path with small dips and steady progress."
    }
  },
  {
    id: "swiss-train",
    title: "Swiss Train Model: Slow, Reliable, On Time",
    tagline: "A plan built for consistency and control.",
    steps: [
      {
        title: "Income",
        text: "Income is the timetable. Keep it dependable.",
        example: "Example: automate a fixed transfer."
      },
      {
        title: "Save",
        text: "Savings are the safety checks.",
        example: "Example: emergency fund before investing."
      },
      {
        title: "Invest",
        text: "Investing follows the route map: balanced and planned.",
        example: "Example: diversified allocation with clear risk limits."
      },
      {
        title: "Compound",
        text: "Small, steady gains arrive on schedule.",
        example: "Example: dollar-cost averaging keeps rhythm."
      },
      {
        title: "Freedom",
        text: "On-time progress builds flexibility.",
        example: "Example: longer horizons reduce sudden detours."
      }
    ],
    key_rules: [
      "Dollar-cost averaging supports reliability over time.",
      "Strategic asset allocation keeps the plan balanced.",
      "Risk and return are connected; prioritize stability if needed.",
      "Time horizon sets the timetable for each goal.",
      "Emergency funds protect against unexpected delays.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Changing course after every market move.",
      "Skipping the emergency fund.",
      "Overconcentrating in a single asset.",
      "Trying to move too fast for your horizon.",
      "Ignoring tax and fee drag."
    ],
    chart_hint: {
      title: "Chart idea: Timetable line",
      description: "A smooth line with gentle bumps and steady slope."
    }
  },
  {
    id: "ai-assisted",
    title: "AI-Assisted Wealth Plan",
    tagline: "Use tools to organize, not to predict.",
    steps: [
      {
        title: "Income",
        text: "Start with clear cash flow and categories.",
        example: "Example: group income sources for visibility."
      },
      {
        title: "Save",
        text: "Build a buffer before taking risk.",
        example: "Example: emergency fund coverage."
      },
      {
        title: "Invest",
        text: "Align allocation to your time horizon and comfort.",
        example: "Example: diversified allocation for balance."
      },
      {
        title: "Compound",
        text: "Automation keeps contributions steady.",
        example: "Example: dollar-cost averaging via scheduled inputs."
      },
      {
        title: "Freedom",
        text: "Clarity and consistency create options.",
        example: "Example: review goals on a steady cadence."
      }
    ],
    key_rules: [
      "Dollar-cost averaging reduces the urge to time entries.",
      "Strategic asset allocation is the core, not predictions.",
      "Risk and return are linked; stay within your comfort.",
      "Time horizon sets the strategy, not headlines.",
      "Emergency funds protect the plan in downturns.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Relying on forecasts instead of a plan.",
      "Panic selling during volatility.",
      "Chasing recent winners.",
      "Skipping emergency cash.",
      "Ignoring taxes and fees."
    ],
    chart_hint: {
      title: "Chart idea: Plan vs noise",
      description: "A steady plan line against a noisy reference line."
    }
  }
];
