import { prisma } from "@/lib/db";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

const QUIVER_API_KEY = process.env.QUIVER_API_KEY;
const QUIVER_CONGRESS_URL =
  process.env.QUIVER_CONGRESS_URL ??
  "https://api.quiverquant.com/beta/congresstrading";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

const curatedTickers = new Set(
  STOCK_GROUPS_ORDER.flatMap((group) =>
    STOCK_GROUPS[group].map((stock) => stock.symbol)
  )
);

const parseAmountRange = (value?: string) => {
  if (!value) return { min: null, max: null };
  const numbers = value
    .replace(/[^0-9\-]/g, "")
    .split("-")
    .map((val) => Number.parseInt(val, 10))
    .filter((val) => !Number.isNaN(val));
  if (numbers.length === 1) {
    return { min: numbers[0], max: numbers[0] };
  }
  return { min: numbers[0] ?? null, max: numbers[1] ?? null };
};

export async function runCongressIngest() {
  if (USE_MOCK_DATA) {
    console.log("Mock mode enabled. Skipping Congress ingestion.");
    return;
  }
  if (!QUIVER_API_KEY) {
    throw new Error("QUIVER_API_KEY is required.");
  }

  const job = await prisma.jobRun.create({
    data: {
      jobName: "congressIngest",
      startedAt: new Date(),
      status: "running",
      logs: ""
    }
  });

  const logs: string[] = [];

  try {
    const response = await fetch(QUIVER_CONGRESS_URL, {
      headers: {
        Authorization: `Token ${QUIVER_API_KEY}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Quiver API error ${response.status}`);
    }

    const trades = (await response.json()) as Array<Record<string, string>>;
    logs.push(`Fetched ${trades.length} trades from Quiver`);

    for (const trade of trades) {
      const ticker = (trade.Ticker ?? trade.ticker ?? "").toUpperCase();
      if (!curatedTickers.has(ticker)) {
        continue;
      }

      const politician = trade.Representative ?? trade.Politician ?? "Unknown";
      const chamber = trade.Chamber ?? trade.chamber ?? "Unknown";
      const assetName = trade.AssetName ?? trade.assetName ?? "";
      const transactionType = trade.Transaction ?? trade.transactionType ?? "";
      const tradeDateValue = trade.TradeDate ?? trade.tradeDate;
      const reportDateValue = trade.ReportDate ?? trade.reportDate;
      const ownerType = trade.Owner ?? trade.ownerType ?? "";
      const sourceUrl = trade.Source ?? trade.sourceUrl ?? "https://www.quiverquant.com";
      const amountRange = trade.Amount ?? trade.amount ?? trade.Range;
      const { min, max } = parseAmountRange(amountRange);

      if (!tradeDateValue) {
        continue;
      }

      await prisma.congressTrade.upsert({
        where: {
          politician_tradeDate_ticker_transactionType_reportDate: {
            politician,
            tradeDate: new Date(tradeDateValue),
            ticker,
            transactionType,
            reportDate: reportDateValue ? new Date(reportDateValue) : null
          }
        },
        update: {
          chamber,
          assetName,
          reportDate: reportDateValue ? new Date(reportDateValue) : null,
          amountMin: min,
          amountMax: max,
          ownerType,
          sourceUrl
        },
        create: {
          politician,
          chamber,
          ticker,
          assetName,
          tradeDate: new Date(tradeDateValue),
          reportDate: reportDateValue ? new Date(reportDateValue) : null,
          transactionType,
          amountMin: min,
          amountMax: max,
          ownerType,
          sourceUrl
        }
      });
    }

    await prisma.jobRun.update({
      where: { id: job.id },
      data: {
        status: "success",
        endedAt: new Date(),
        logs: logs.join("\n")
      }
    });
  } catch (error) {
    await prisma.jobRun.update({
      where: { id: job.id },
      data: {
        status: "failed",
        endedAt: new Date(),
        logs: `${logs.join("\n")}\n${String(error)}`
      }
    });
    throw error;
  }
}

runCongressIngest().catch((error) => {
  console.error(error);
  process.exit(1);
});
