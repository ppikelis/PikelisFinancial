Create an ingestion architecture.



We will start with mock data, then swap in real sources later.

Design:

\- Jobs framework (e.g., BullMQ + Redis OR pg-boss OR Inngest)

\- Pipelines for:

&nbsp; 1) Market data (prices + fundamentals)

&nbsp; 2) Congress trades

&nbsp; 3) Insider trades (SEC Form 4)

&nbsp; 4) Institutional 13F changes

&nbsp; 5) Analyst actions (placeholder pipeline with manual upload initially)

\- Normalization into ActivityEvent

\- Deduplication + idempotency keys

\- Provenance: attach Source records and retrieved\_at timestamps



Deliver:

\- Job definitions + example handlers (even if mocked)

\- DB upsert patterns in Prisma

\- A “run locally” guide

