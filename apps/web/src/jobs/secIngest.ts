import { prisma } from "@/lib/db";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";
import { CIK_MAP } from "@/lib/data/cikMap";
import { fetchCompanySubmissions } from "@/server/sec/fetchCompanySubmissions";
import { fetchFilingText } from "@/server/sec/fetchFilingText";
import { extractSections } from "@/server/sec/sectionParser";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

const MAX_FILINGS = 50;

const parseSymbolsArg = () => {
  const arg = process.argv.find((value) => value.startsWith("--symbols"));
  if (!arg) return null;
  const [, list] = arg.split("=");
  if (!list) return null;
  return list
    .split(",")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean);
};

export async function runSecIngest() {
  if (USE_MOCK_DATA) {
    console.log("Mock mode enabled. Skipping SEC ingestion.");
    return;
  }

  const job = await prisma.jobRun.create({
    data: {
      jobName: "secIngest",
      startedAt: new Date(),
      status: "running",
      logs: ""
    }
  });

  const logs: string[] = [];

  try {
    const selectedSymbols = parseSymbolsArg();
    for (const group of STOCK_GROUPS_ORDER) {
      for (const stock of STOCK_GROUPS[group]) {
        const symbol = stock.symbol;
        if (selectedSymbols && !selectedSymbols.includes(symbol)) {
          continue;
        }
        const cik = CIK_MAP[symbol];

        if (!cik) {
          logs.push(`CIK missing for ${symbol}`);
          continue;
        }

        const filings = await fetchCompanySubmissions(cik);
        const latest = filings.slice(0, MAX_FILINGS);
        logs.push(`Fetched ${latest.length} filings for ${symbol}`);

        for (const filing of latest) {
          const upserted = await prisma.secFiling.upsert({
            where: {
              symbol_accessionNumber: {
                symbol,
                accessionNumber: filing.accessionNumber
              }
            },
            update: {
              formType: filing.formType,
              filingDate: new Date(filing.filingDate),
              reportDate: filing.reportDate ? new Date(filing.reportDate) : null,
              primaryDoc: filing.primaryDoc,
              secUrl: "",
              cik
            },
            create: {
              symbol,
              cik,
              accessionNumber: filing.accessionNumber,
              formType: filing.formType,
              filingDate: new Date(filing.filingDate),
              reportDate: filing.reportDate ? new Date(filing.reportDate) : null,
              primaryDoc: filing.primaryDoc,
              secUrl: "",
              createdAt: new Date()
            }
          });

          if (upserted.textContent) {
            continue;
          }

          try {
            const textResult = await fetchFilingText({
              cik,
              accessionNoDashes: filing.accessionNumberNoDashes,
              primaryDoc: filing.primaryDoc
            });

            await prisma.secFiling.update({
              where: { id: upserted.id },
              data: {
                secUrl: textResult.secUrl,
                textContent: textResult.textContent,
                title: textResult.title,
                rawHtmlPath: textResult.rawHtmlPath ?? null
              }
            });

            if (
              textResult.textContent &&
              (filing.formType === "10-K" || filing.formType === "10-Q")
            ) {
              const sections = extractSections(textResult.textContent);
              if (sections.length > 0) {
                await prisma.secFilingSection.deleteMany({
                  where: { filingId: upserted.id }
                });
                await prisma.secFilingSection.createMany({
                  data: sections.map((section) => ({
                    filingId: upserted.id,
                    sectionName: section.sectionName,
                    text: section.text
                  }))
                });
              }
            }
          } catch (error) {
            await prisma.secFiling.update({
              where: { id: upserted.id },
              data: {
                secUrl: upserted.secUrl || "",
                textContent: upserted.textContent
              }
            });
            logs.push(
              `Text extraction failed for ${symbol} ${filing.accessionNumber}: ${String(error)}`
            );
          }
        }
      }
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

runSecIngest().catch((error) => {
  console.error(error);
  process.exit(1);
});
