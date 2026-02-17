import { ingestAnalystActions } from "./pipelines/analyst-actions";
import { ingestCongressTrades } from "./pipelines/congress-trades";
import { ingestInsiderTrades } from "./pipelines/insider-trades";
import { ingestInstitutionalChanges } from "./pipelines/institutional-changes";
import { ingestMarketData } from "./pipelines/market-data";
import { ingestNews } from "@/jobs/news/ingestNews";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

export async function runIngestion() {
  if (USE_MOCK_DATA) {
    console.log("Mock ingestion enabled. Skipping external calls.");
    return;
  }

  await ingestMarketData();
  await ingestCongressTrades();
  await ingestInsiderTrades();
  await ingestInstitutionalChanges();
  await ingestAnalystActions();
  await ingestNews();
}
