export type WealthStepTitle =
  | "Income"
  | "Save"
  | "Invest"
  | "Compound"
  | "Freedom";

export type WealthVersion = {
  id: string;
  title: string;
  tagline: string;
  steps: {
    title: WealthStepTitle;
    text: string;
    example?: string;
  }[];
  key_rules: string[];
  mistakes: string[];
  chart_hint: { title: string; description: string };
};

export const wealthVersions: WealthVersion[] = [
  {
    id: "paycheck-to-power",
    title: "From Paycheck to Power",
    tagline: "Turn steady income into steady progress.",
    steps: [
      {
        title: "Income",
        text: "Your paycheck is the engine. It funds every next step.",
        example: "Example: automate a transfer the day you get paid."
      },
      {
        title: "Save",
        text: "Save first so life shocks do not derail the plan.",
        example: "Example: build an emergency fund before taking risk."
      },
      {
        title: "Invest",
        text: "Invest with a mix of assets to balance risk and return.",
        example: "Example: choose a diversified allocation."
      },
      {
        title: "Compound",
        text: "Small gains stack over time when you stay invested.",
        example: "Example: regular contributions support dollar-cost averaging."
      },
      {
        title: "Freedom",
        text: "Freedom is options: time, flexibility, and resilience.",
        example: "Example: longer time horizons reduce pressure."
      }
    ],
    key_rules: [
      "Automate your investing.",
      "Keep a cash buffer before taking risk.",
      "Use broad ETFs instead of picking winners.",
      "Invest regularly, even when headlines are loud.",
      "Stay invested for the long term."
    ],
    mistakes: [
      "Stopping when markets drop.",
      "Trying to time the perfect entry.",
      "Investing money you need soon.",
      "Buying too many single stocks.",
      "Changing the plan too often."
    ],
    chart_hint: {
      title: "Chart idea: Steady staircase",
      description:
        "A step-like line showing income, savings, and investing building slowly over time."
    }
  },
  {
    id: "snowball",
    title: "Your Money’s Snowball",
    tagline: "Small starts, bigger momentum.",
    steps: [
      {
        title: "Income",
        text: "Each paycheck is a new scoop of snow.",
        example: "Example: route a fixed slice into savings."
      },
      {
        title: "Save",
        text: "Pack the base so it does not melt under pressure.",
        example: "Example: emergency fund before investing."
      },
      {
        title: "Invest",
        text: "Roll it downhill with a diversified path.",
        example: "Example: diversified allocation supports stability."
      },
      {
        title: "Compound",
        text: "The snowball grows as returns add to returns.",
        example: "Example: dollar-cost averaging keeps the roll steady."
      },
      {
        title: "Freedom",
        text: "Bigger momentum gives you choices and resilience.",
        example: "Example: long time horizons smooth volatility."
      }
    ],
    key_rules: [
      "Dollar-cost averaging builds the snowball in all market seasons.",
      "Strategic asset allocation keeps balance as the snowball grows.",
      "Risk and return are linked; smoother paths mean slower growth.",
      "Time horizon matters more than short-term noise.",
      "Emergency funds prevent selling at the wrong time.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Stopping contributions after a bad headline.",
      "Switching strategies too often.",
      "Taking on more risk than you can tolerate.",
      "Skipping cash buffers and selling investments to pay bills.",
      "Ignoring tax drag and fees."
    ],
    chart_hint: {
      title: "Chart idea: Growing snowball",
      description:
        "A curve that starts small and gradually steepens to show compounding."
    }
  },
  {
    id: "everest",
    title: "Climbing the Everest of Wealth",
    tagline: "Prepare, pace, and keep climbing.",
    steps: [
      {
        title: "Income",
        text: "Income is your base camp. It powers the climb.",
        example: "Example: stabilize income before higher risk."
      },
      {
        title: "Save",
        text: "Savings are your supplies for storms and delays.",
        example: "Example: emergency fund for unexpected costs."
      },
      {
        title: "Invest",
        text: "Choose a route with planned risk and steady progress.",
        example: "Example: allocate across asset classes."
      },
      {
        title: "Compound",
        text: "Altitude gains stack over time when you keep moving.",
        example: "Example: consistent contributions with dollar-cost averaging."
      },
      {
        title: "Freedom",
        text: "The summit is flexibility and optionality, not speed.",
        example: "Example: longer horizons reduce pressure."
      }
    ],
    key_rules: [
      "Use dollar-cost averaging to reduce timing risk.",
      "Strategic asset allocation balances risk for the whole climb.",
      "Risk and return rise together; pace yourself.",
      "Time horizon defines which paths are realistic.",
      "Emergency funds keep you from retreating mid-climb.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Panic selling during a steep drop.",
      "Trying to time the market before every step.",
      "Carrying too much risk without a buffer.",
      "Overestimating short-term results.",
      "Ignoring taxes and fees on the route."
    ],
    chart_hint: {
      title: "Chart idea: Altitude gain",
      description:
        "A mountain-style chart with small dips and a steady upward trend."
    }
  },
  {
    id: "swiss-train",
    title: "Swiss Train Model: Slow, Reliable, On Time",
    tagline: "Consistency beats surprises.",
    steps: [
      {
        title: "Income",
        text: "Income is the schedule. Keep it regular.",
        example: "Example: automate a savings transfer."
      },
      {
        title: "Save",
        text: "Savings are the safety checks before each ride.",
        example: "Example: emergency fund first."
      },
      {
        title: "Invest",
        text: "Investing is the route map: balanced and predictable.",
        example: "Example: diversified allocation for stability."
      },
      {
        title: "Compound",
        text: "Small, steady gains arrive on time.",
        example: "Example: dollar-cost averaging keeps the schedule."
      },
      {
        title: "Freedom",
        text: "On-time progress creates flexibility and confidence.",
        example: "Example: long horizons reduce sudden detours."
      }
    ],
    key_rules: [
      "Dollar-cost averaging keeps progress steady over time.",
      "Strategic asset allocation supports reliability in different markets.",
      "Risk and return are connected; smoother rides mean slower speed.",
      "Time horizon is the timetable for each goal.",
      "Emergency funds protect against unexpected delays.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Changing tracks after every short-term move.",
      "Skipping maintenance: no emergency fund.",
      "Overloading a single asset or sector.",
      "Trying to sprint instead of staying consistent.",
      "Ignoring tax and fee drag."
    ],
    chart_hint: {
      title: "Chart idea: Timetable line",
      description:
        "A smooth, gradual line with small bumps to show steady progress."
    }
  },
  {
    id: "ai-assisted",
    title: "AI-Assisted Wealth Plan",
    tagline: "Use tools to organize, not to predict.",
    steps: [
      {
        title: "Income",
        text: "Start with a clear view of cash flow.",
        example: "Example: categorize income sources."
      },
      {
        title: "Save",
        text: "Set a baseline buffer before taking investment risk.",
        example: "Example: emergency fund coverage."
      },
      {
        title: "Invest",
        text: "Use a strategic allocation that matches your time horizon.",
        example: "Example: diversify across asset classes."
      },
      {
        title: "Compound",
        text: "Automation keeps contributions steady over time.",
        example: "Example: dollar-cost averaging via scheduled buys."
      },
      {
        title: "Freedom",
        text: "Clarity and consistency give you more options.",
        example: "Example: review goals on a yearly cadence."
      }
    ],
    key_rules: [
      "Dollar-cost averaging reduces the pressure to time entries.",
      "Strategic asset allocation is the core, not predictions.",
      "Risk and return are linked; know your comfort level.",
      "Match investments to time horizon, not headlines.",
      "Emergency funds keep plans intact during shocks.",
      "Taxes matter; for example, Pillar 3a exists in Switzerland."
    ],
    mistakes: [
      "Relying on predictions instead of a plan.",
      "Panic selling when markets move quickly.",
      "Chasing recent winners and ignoring diversification.",
      "Skipping emergency cash and selling at the wrong time.",
      "Forgetting tax impact and fees."
    ],
    chart_hint: {
      title: "Chart idea: Plan vs noise",
      description:
        "Two lines: a steady plan line and a noisy market line."
    }
  }
];
