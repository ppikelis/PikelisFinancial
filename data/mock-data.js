const mockData = {
  blueprints: {
    b1: {
      id: "b1",
      name: "Seeking Alpha Style",
      tagline: "Crowdsourced research with quant overlays.",
      tickers: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 189.42,
          change: 1.38,
          trend: "Up",
          metrics: {
            marketCap: "2.95T",
            pe: "29.4x",
            revenueGrowth: "6.1%",
            grossMargin: "44.3%",
            dividendYield: "0.5%"
          },
          trendingScore: 92,
          quantRating: "Strong Buy"
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corp.",
          price: 473.11,
          change: 2.91,
          trend: "Up",
          metrics: {
            marketCap: "1.17T",
            pe: "38.7x",
            revenueGrowth: "54.2%",
            grossMargin: "74.0%",
            dividendYield: "0.0%"
          },
          trendingScore: 88,
          quantRating: "Buy"
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corp.",
          price: 341.07,
          change: -0.44,
          trend: "Flat",
          metrics: {
            marketCap: "2.55T",
            pe: "31.1x",
            revenueGrowth: "12.5%",
            grossMargin: "68.9%",
            dividendYield: "0.7%"
          },
          trendingScore: 84,
          quantRating: "Hold"
        }
      ],
      articles: [
        {
          id: "1",
          title: "Apple ramps buybacks as services momentum builds",
          summary:
            "Apple expands its capital return plan while services growth offsets slower hardware cycles.",
          author: "Morgan Lee (Contributor)",
          date: "Feb 15, 2026",
          tickers: ["AAPL"],
          content: [
            "Apple announced an expanded buyback program paired with modest guidance.",
            "Services revenue continues to stabilize margins even as hardware slows.",
            "Our base case assumes steady iPhone demand into the next cycle."
          ],
          disclosures:
            "The author does not hold positions in the securities mentioned."
        },
        {
          id: "2",
          title: "NVIDIA demand signal stays hot into next quarter",
          summary:
            "Data center spending remains resilient, keeping GPU demand elevated.",
          author: "Priya Shah (Contributor)",
          date: "Feb 15, 2026",
          tickers: ["NVDA"],
          content: [
            "AI infrastructure budgets remain intact heading into Q2.",
            "Supply chain tightness persists for high-end accelerators.",
            "We see upside risk to current consensus estimates."
          ],
          disclosures: "The author may have exposure via index funds."
        }
      ],
      activities: {
        congressTrades: [
          {
            id: "ct-1",
            actor: "Rep. Nancy P.",
            action: "Buy",
            ticker: "AAPL",
            size: "$50K-$100K",
            date: "Feb 13, 2026",
            impact: "+2.1% since trade"
          }
        ],
        analystRatings: [
          {
            id: "ar-1",
            firm: "UBS",
            action: "Upgrade",
            ticker: "AAPL",
            rating: "Buy",
            target: "$210",
            date: "Feb 14, 2026"
          }
        ],
        institutionalChanges: [
          {
            id: "ic-1",
            firm: "Vanguard",
            action: "Increase",
            ticker: "AAPL",
            stake: "+1.2M shares",
            date: "Feb 10, 2026"
          }
        ]
      }
    },
    b2: {
      id: "b2",
      name: "Motley Fool Style",
      tagline: "Newsletter picks and long-term conviction.",
      tickers: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 189.42,
          change: 0.74,
          trend: "Up",
          metrics: {
            marketCap: "2.95T",
            pe: "29.4x",
            revenueGrowth: "6.1%",
            grossMargin: "44.3%",
            dividendYield: "0.5%"
          },
          trendingScore: 91,
          newsletterPick: "Top Pick"
        },
        {
          symbol: "META",
          name: "Meta Platforms",
          price: 312.24,
          change: 1.05,
          trend: "Up",
          metrics: {
            marketCap: "801B",
            pe: "22.1x",
            revenueGrowth: "9.4%",
            grossMargin: "79.3%",
            dividendYield: "0.0%"
          },
          trendingScore: 86,
          newsletterPick: "Starter"
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          price: 211.62,
          change: -1.12,
          trend: "Down",
          metrics: {
            marketCap: "672B",
            pe: "47.8x",
            revenueGrowth: "18.2%",
            grossMargin: "24.6%",
            dividendYield: "0.0%"
          },
          trendingScore: 83,
          newsletterPick: "Watch"
        }
      ],
      articles: [
        {
          id: "1",
          title: "3 high-conviction picks for long-term investors",
          summary:
            "Our latest newsletter picks focus on durable moats and patient compounding.",
          author: "Stock Advisor Team",
          date: "Feb 15, 2026",
          tickers: ["AAPL", "META", "TSLA"],
          content: [
            "We favor businesses with enduring customer loyalty and scale.",
            "Our picks emphasize long-term margin expansion and pricing power.",
            "Expect volatility, but focus on the multi-year thesis."
          ],
          disclosures: "This newsletter is for educational purposes only."
        },
        {
          id: "2",
          title: "Why we are holding through near-term noise",
          summary:
            "Patience remains key as fundamentals stay intact.",
          author: "Avery Chen",
          date: "Feb 15, 2026",
          tickers: ["AAPL", "META"],
          content: [
            "We focus on core business durability over headline volatility.",
            "Our thesis remains intact across the next 3-5 years.",
            "Portfolio weighting remains unchanged."
          ],
          disclosures: "No conflicts disclosed."
        }
      ],
      activities: {
        congressTrades: [
          {
            id: "ct-1",
            actor: "Rep. James T.",
            action: "Buy",
            ticker: "AAPL",
            size: "$15K-$50K",
            date: "Feb 12, 2026",
            impact: "+0.6% since trade"
          }
        ],
        analystRatings: [
          {
            id: "ar-1",
            firm: "Barclays",
            action: "Upgrade",
            ticker: "META",
            rating: "Overweight",
            target: "$350",
            date: "Feb 14, 2026"
          }
        ],
        institutionalChanges: [
          {
            id: "ic-1",
            firm: "Capital Group",
            action: "Increase",
            ticker: "AAPL",
            stake: "+500K shares",
            date: "Feb 10, 2026"
          }
        ]
      }
    },
    b3: {
      id: "b3",
      name: "Zacks Style",
      tagline: "Earnings estimates, revisions, and rankings.",
      tickers: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 189.42,
          change: 1.05,
          trend: "Up",
          metrics: {
            marketCap: "2.95T",
            pe: "29.4x",
            revenueGrowth: "6.1%",
            grossMargin: "44.3%",
            dividendYield: "0.5%"
          },
          trendingScore: 90,
          zacksRank: "2 - Buy"
        },
        {
          symbol: "ADBE",
          name: "Adobe Inc.",
          price: 552.12,
          change: 0.42,
          trend: "Up",
          metrics: {
            marketCap: "261B",
            pe: "30.7x",
            revenueGrowth: "10.2%",
            grossMargin: "88.4%",
            dividendYield: "0.0%"
          },
          trendingScore: 87,
          zacksRank: "1 - Strong Buy"
        },
        {
          symbol: "PEP",
          name: "PepsiCo",
          price: 168.44,
          change: -0.12,
          trend: "Flat",
          metrics: {
            marketCap: "231B",
            pe: "23.2x",
            revenueGrowth: "5.3%",
            grossMargin: "54.1%",
            dividendYield: "2.7%"
          },
          trendingScore: 82,
          zacksRank: "3 - Hold"
        }
      ],
      articles: [
        {
          id: "1",
          title: "Earnings revisions improve outlook for software leaders",
          summary:
            "Estimate upgrades lift ranking momentum across large-cap software.",
          author: "Zacks Research",
          date: "Feb 15, 2026",
          tickers: ["ADBE"],
          content: [
            "Estimate revisions turned positive after management guidance.",
            "Ranking momentum improved over the last 30 days.",
            "We monitor surprise history for the next report."
          ],
          disclosures: "Past performance is not indicative of future results."
        },
        {
          id: "2",
          title: "Rank upgrades highlight defensive compounders",
          summary:
            "Stable earnings visibility is driving rank upgrades.",
          author: "Zacks Research",
          date: "Feb 14, 2026",
          tickers: ["PEP"],
          content: [
            "Estimate stability supports higher ranking in staples.",
            "Earnings surprise trends remain favorable.",
            "We track revisions into the next quarter."
          ],
          disclosures: "This report is for informational purposes only."
        }
      ],
      activities: {
        congressTrades: [
          {
            id: "ct-1",
            actor: "Sen. Alex G.",
            action: "Buy",
            ticker: "LMT",
            size: "$100K-$250K",
            date: "Feb 13, 2026",
            impact: "+1.8% since trade"
          },
          {
            id: "ct-2",
            actor: "Rep. Dana K.",
            action: "Buy",
            ticker: "XOM",
            size: "$50K-$100K",
            date: "Feb 11, 2026",
            impact: "+0.3% since trade"
          }
        ],
        analystRatings: [
          {
            id: "ar-1",
            firm: "Raymond James",
            action: "Initiate",
            ticker: "LMT",
            rating: "Outperform",
            target: "$470",
            date: "Feb 12, 2026"
          }
        ],
        institutionalChanges: [
          {
            id: "ic-1",
            firm: "State Street",
            action: "Increase",
            ticker: "XOM",
            stake: "+1.5M shares",
            date: "Feb 09, 2026"
          }
        ]
      }
    },
    b4: {
      id: "b4",
      name: "Quiver Quant Style",
      tagline: "Alternative data, trades, and government signals.",
      tickers: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 189.42,
          change: 0.88,
          trend: "Up",
          metrics: {
            marketCap: "2.95T",
            pe: "29.4x",
            revenueGrowth: "6.1%",
            grossMargin: "44.3%",
            dividendYield: "0.5%"
          },
          trendingScore: 89,
          altSignal: "Congress Buy Cluster"
        },
        {
          symbol: "PLTR",
          name: "Palantir",
          price: 24.88,
          change: 2.4,
          trend: "Up",
          metrics: {
            marketCap: "53B",
            pe: "56.4x",
            revenueGrowth: "17.4%",
            grossMargin: "79.1%",
            dividendYield: "0.0%"
          },
          trendingScore: 85,
          altSignal: "Gov Contract Win"
        },
        {
          symbol: "RTX",
          name: "RTX Corp.",
          price: 94.21,
          change: -0.21,
          trend: "Flat",
          metrics: {
            marketCap: "125B",
            pe: "20.2x",
            revenueGrowth: "5.4%",
            grossMargin: "21.8%",
            dividendYield: "2.2%"
          },
          trendingScore: 82,
          altSignal: "Insider Cluster"
        }
      ],
      articles: [
        {
          id: "1",
          title: "Congress trades spotlight tech exposure uptick",
          summary:
            "Congressional disclosures highlight increased tech exposure.",
          author: "Quiver Desk",
          date: "Feb 15, 2026",
          tickers: ["AAPL", "PLTR"],
          content: [
            "Disclosures show incremental tech exposure increases.",
            "We map activity to subsequent price movement.",
            "Policy calendars may shape near-term volatility."
          ],
          disclosures: "Alternative data is sourced from public filings."
        },
        {
          id: "2",
          title: "Defense contractors see new contract momentum",
          summary:
            "Contract wins are clustering among key defense names.",
          author: "Kira Boyd",
          date: "Feb 14, 2026",
          tickers: ["RTX"],
          content: [
            "Contract disclosures point to new multi-year awards.",
            "We monitor backlog changes across top contractors.",
            "Follow-on insider trades remain a key watch item."
          ],
          disclosures: "Not investment advice."
        }
      ],
      activities: {
        congressTrades: [
          {
            id: "ct-1",
            actor: "Rep. Rowan S.",
            action: "Buy",
            ticker: "CRM",
            size: "$15K-$50K",
            date: "Feb 12, 2026",
            impact: "+0.5% since trade"
          }
        ],
        analystRatings: [
          {
            id: "ar-1",
            firm: "JPMorgan",
            action: "Upgrade",
            ticker: "AAPL",
            rating: "Overweight",
            target: "$215",
            date: "Feb 15, 2026"
          },
          {
            id: "ar-2",
            firm: "Citi",
            action: "Upgrade",
            ticker: "CRM",
            rating: "Buy",
            target: "$285",
            date: "Feb 14, 2026"
          }
        ],
        institutionalChanges: [
          {
            id: "ic-1",
            firm: "Fidelity",
            action: "Increase",
            ticker: "ORCL",
            stake: "+600K shares",
            date: "Feb 10, 2026"
          }
        ]
      }
    },
    b5: {
      id: "b5",
      name: "TipRanks Style",
      tagline: "Analyst rankings, insider trades, and sentiment.",
      tickers: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 189.42,
          change: 1.12,
          trend: "Up",
          metrics: {
            marketCap: "2.95T",
            pe: "29.4x",
            revenueGrowth: "6.1%",
            grossMargin: "44.3%",
            dividendYield: "0.5%"
          },
          trendingScore: 90,
          analystConsensus: "Strong Buy"
        },
        {
          symbol: "NFLX",
          name: "Netflix",
          price: 512.66,
          change: 1.44,
          trend: "Up",
          metrics: {
            marketCap: "228B",
            pe: "32.8x",
            revenueGrowth: "12.3%",
            grossMargin: "41.2%",
            dividendYield: "0.0%"
          },
          trendingScore: 86,
          analystConsensus: "Buy"
        },
        {
          symbol: "JPM",
          name: "JPMorgan Chase",
          price: 182.22,
          change: -0.32,
          trend: "Down",
          metrics: {
            marketCap: "522B",
            pe: "12.8x",
            revenueGrowth: "4.9%",
            grossMargin: "29.5%",
            dividendYield: "2.4%"
          },
          trendingScore: 81,
          analystConsensus: "Hold"
        }
      ],
      articles: [
        {
          id: "1",
          title: "Analyst consensus stays bullish on Apple",
          summary:
            "Top analysts maintain bullish views with raised targets.",
          author: "TipRanks Desk",
          date: "Feb 15, 2026",
          tickers: ["AAPL"],
          content: [
            "Consensus targets imply continued upside.",
            "Analyst accuracy rankings remain above peer median.",
            "Insider activity has been net neutral."
          ],
          disclosures: "Analyst opinions are informational only."
        },
        {
          id: "2",
          title: "Streaming coverage leans positive despite churn risks",
          summary:
            "Analysts cite margin resilience as a key driver.",
          author: "TipRanks Desk",
          date: "Feb 14, 2026",
          tickers: ["NFLX"],
          content: [
            "Price target revisions skew higher in recent notes.",
            "Sentiment tracking remains net positive.",
            "We monitor insider selling cadence."
          ],
          disclosures: "No investment advice provided."
        }
      ],
      activities: {
        congressTrades: [
          {
            id: "ct-1",
            actor: "Rep. Taylor W.",
            action: "Buy",
            ticker: "JPM",
            size: "$15K-$50K",
            date: "Feb 11, 2026",
            impact: "+0.1% since trade"
          }
        ],
        analystRatings: [
          {
            id: "ar-1",
            firm: "Wells Fargo",
            action: "Upgrade",
            ticker: "NFLX",
            rating: "Overweight",
            target: "$570",
            date: "Feb 13, 2026"
          }
        ],
        institutionalChanges: [
          {
            id: "ic-1",
            firm: "T. Rowe Price",
            action: "Increase",
            ticker: "AAPL",
            stake: "+350K shares",
            date: "Feb 09, 2026"
          }
        ]
      }
    }
  }
};
