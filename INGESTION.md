# Ingestion Architecture

## Job Framework
- **Phase 1**: local job runner with scripts in `apps/web/src/jobs`.
- **Phase 2**: move to pg-boss (Postgres-backed) for schedules + retries.

## Pipelines
1. **Market data**: prices + fundamentals
2. **Congress trades**
3. **Insider trades (Form 4)**
4. **Institutional 13F changes**
5. **Analyst actions** (manual upload initially)

## Normalization
- All activity becomes `ActivityEvent` with `type`, `ticker`, `entity`, `action`, `occurredAt`.
- Source provenance attached via `Source` + `retrievedAt`.

## Deduplication / Idempotency
- Use composite keys: `sourceId + externalId` or `ticker + entity + occurredAt + action`.
- Upserts with Prisma `upsert` or `create` + `skipDuplicates`.

## Example Job Handlers
Implemented in:
```
apps/web/src/jobs/ingest/*
```

## Prisma Upsert Pattern (example)
```ts
await prisma.source.upsert({
  where: { url },
  update: { retrievedAt: new Date() },
  create: { url, publisher, retrievedAt: new Date() }
});
```

## Run Locally
```
cd apps/web
npm run jobs:ingest
```
