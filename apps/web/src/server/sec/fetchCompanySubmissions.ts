import { fetchJson, getSubmissionsUrl } from "./secClient";

interface SubmissionResponse {
  filings?: {
    recent?: {
      accessionNumber?: string[];
      filingDate?: string[];
      reportDate?: string[];
      form?: string[];
      primaryDocument?: string[];
    };
  };
}

export interface CompanyFiling {
  accessionNumber: string;
  accessionNumberNoDashes: string;
  formType: string;
  filingDate: string;
  reportDate?: string;
  primaryDoc: string;
}

const padCik = (cik: string) => cik.padStart(10, "0");

export async function fetchCompanySubmissions(cik: string): Promise<CompanyFiling[]> {
  const data = await fetchJson<SubmissionResponse>(getSubmissionsUrl(padCik(cik)));
  const recent = data.filings?.recent;
  if (!recent) {
    return [];
  }

  const filings: CompanyFiling[] = [];
  const count = recent.accessionNumber?.length ?? 0;

  for (let i = 0; i < count; i += 1) {
    const accessionNumber = recent.accessionNumber?.[i];
    const formType = recent.form?.[i];
    const filingDate = recent.filingDate?.[i];
    const primaryDoc = recent.primaryDocument?.[i];

    if (!accessionNumber || !formType || !filingDate || !primaryDoc) {
      continue;
    }

    filings.push({
      accessionNumber,
      accessionNumberNoDashes: accessionNumber.replace(/-/g, ""),
      formType,
      filingDate,
      reportDate: recent.reportDate?.[i],
      primaryDoc
    });
  }

  return filings;
}
