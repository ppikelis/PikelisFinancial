import { Article } from "@/lib/types";

export const articleMock: Record<string, Article> = {
  "apple-buybacks-services": {
    slug: "apple-buybacks-services",
    title: "Apple ramps buybacks as services momentum builds",
    summary:
      "Apple expands its capital return plan while services growth offsets slower hardware cycles.",
    author: "Morgan Lee",
    publishedAt: "Feb 15, 2026",
    tickers: ["AAPL"],
    paywalled: true,
    preview: [
      "Apple announced an expanded buyback program paired with modest guidance.",
      "Services revenue continues to stabilize margins even as hardware slows."
    ],
    content: [
      "Apple announced an expanded buyback program paired with modest guidance.",
      "Services revenue continues to stabilize margins even as hardware slows.",
      "We outline bull, base, and bear cases for the next two quarters."
    ],
    sources: [
      { label: "Company release", url: "#", timestamp: "Feb 15, 08:12 AM" },
      { label: "Earnings call", url: "#", timestamp: "Feb 15, 10:30 AM" }
    ],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "nvidia-ai-demand": {
    slug: "nvidia-ai-demand",
    title: "NVIDIA demand stays resilient as AI capex expands",
    summary:
      "Enterprise and hyperscale orders keep momentum strong, supporting margins into the second half.",
    author: "Riley Chen",
    publishedAt: "2026-02-14T14:30:00Z",
    tickers: ["NVDA"],
    paywalled: false,
    preview: ["GPU lead times remain healthy as cloud spend accelerates."],
    content: [
      "Orders from hyperscale customers continued to surprise on the upside.",
      "We outline catalysts and risks ahead of the next earnings update."
    ],
    sources: [{ label: "Company update", url: "#", timestamp: "Feb 14, 2:05 PM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "meta-ads-rebound": {
    slug: "meta-ads-rebound",
    title: "Meta ad pricing improves alongside engagement gains",
    summary:
      "Improved targeting and Reels monetization are helping pricing stabilize.",
    author: "Sam Torres",
    publishedAt: "2026-02-13T18:10:00Z",
    tickers: ["META"],
    paywalled: false,
    preview: ["CPMs stabilized as ad load increased modestly."],
    content: [
      "Meta reported sequential improvements in ad pricing.",
      "We examine what this means for margins and FY26 guidance."
    ],
    sources: [{ label: "Earnings call", url: "#", timestamp: "Feb 13, 6:10 PM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "broadcom-ai-networking": {
    slug: "broadcom-ai-networking",
    title: "Broadcom networking wins extend AI infrastructure cycle",
    summary:
      "Custom silicon and networking wins keep backlog elevated into FY26.",
    author: "Morgan Lee",
    publishedAt: "2026-02-12T16:00:00Z",
    tickers: ["AVGO"],
    paywalled: false,
    preview: ["Backlog visibility improved thanks to hyperscale demand."],
    content: [
      "Broadcom outlined stronger-than-expected demand for custom chips.",
      "We assess competitive positioning against peers."
    ],
    sources: [{ label: "Company release", url: "#", timestamp: "Feb 12, 3:55 PM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "oklo-regulatory-path": {
    slug: "oklo-regulatory-path",
    title: "Oklo outlines regulatory milestones for advanced reactors",
    summary:
      "Management highlighted near-term licensing steps and pilot timelines.",
    author: "Priya Patel",
    publishedAt: "2026-02-11T12:45:00Z",
    tickers: ["OKLO"],
    paywalled: false,
    preview: ["Regulatory progress remains the key swing factor."],
    content: [
      "Oklo expects preliminary approvals by late 2026.",
      "We outline potential catalysts and funding requirements."
    ],
    sources: [{ label: "Company update", url: "#", timestamp: "Feb 11, 12:30 PM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "ionq-roadmap-update": {
    slug: "ionq-roadmap-update",
    title: "IonQ raises its roadmap targets after hardware upgrades",
    summary:
      "Improved fidelity targets and partnerships support long-term adoption.",
    author: "Jordan Lee",
    publishedAt: "2026-02-10T09:30:00Z",
    tickers: ["IONQ"],
    paywalled: false,
    preview: ["Customer pilots broadened across enterprise segments."],
    content: [
      "IonQ expanded its multi-year roadmap for trapped-ion systems.",
      "We examine how the changes could affect revenue timing."
    ],
    sources: [{ label: "Company release", url: "#", timestamp: "Feb 10, 9:05 AM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "joby-certification-progress": {
    slug: "joby-certification-progress",
    title: "Joby details certification milestones ahead of test flights",
    summary:
      "FAA engagement remains constructive, with test flight cadence improving.",
    author: "Alex Kim",
    publishedAt: "2026-02-09T15:05:00Z",
    tickers: ["JOBY"],
    paywalled: false,
    preview: ["Certification remains the key gating factor for commercialization."],
    content: [
      "Joby highlighted the next set of certification milestones.",
      "We highlight what investors should monitor this quarter."
    ],
    sources: [{ label: "Company update", url: "#", timestamp: "Feb 9, 2:50 PM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  },
  "amd-ai-pipeline": {
    slug: "amd-ai-pipeline",
    title: "AMD expands AI pipeline with new accelerator roadmap",
    summary:
      "New accelerator SKUs and OEM wins broaden pipeline visibility.",
    author: "Taylor Nguyen",
    publishedAt: "2026-02-08T11:40:00Z",
    tickers: ["AMD"],
    paywalled: false,
    preview: ["Pipeline strength supports incremental share gains."],
    content: [
      "AMD emphasized growing traction with hyperscale customers.",
      "We highlight the key competitive dynamics for 2026."
    ],
    sources: [{ label: "Earnings call", url: "#", timestamp: "Feb 8, 11:15 AM" }],
    disclosures: ["Not investment advice.", "Author has no position."]
  }
};
