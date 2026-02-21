const SEC_BASE = "https://data.sec.gov";
const SEC_ARCHIVES = "https://www.sec.gov/Archives/edgar/data";
const MIN_INTERVAL_MS = 500;
const MAX_RETRIES = 4;
const JSON_CACHE_TTL = 1000 * 60 * 60 * 24;
const HTML_CACHE_TTL = 1000 * 60 * 60 * 24 * 30;

let queue = Promise.resolve();
let lastRequestTime = 0;

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const getUserAgent = () => {
  const agent = process.env.SEC_USER_AGENT;
  if (!agent) {
    throw new Error("SEC_USER_AGENT is required for SEC requests.");
  }
  return agent;
};

const rateLimitedFetch = (url: string, init?: RequestInit) => {
  queue = queue.then(async () => {
    const now = Date.now();
    const wait = Math.max(0, MIN_INTERVAL_MS - (now - lastRequestTime));
    if (wait > 0) {
      await delay(wait);
    }
    lastRequestTime = Date.now();
    return fetch(url, init);
  });
  return queue;
};

async function fetchWithRetry(url: string, init?: RequestInit) {
  let attempt = 0;
  while (attempt <= MAX_RETRIES) {
    try {
      const response = await rateLimitedFetch(url, init);
      if (!response.ok) {
        throw new Error(`SEC fetch failed (${response.status}) for ${url}`);
      }
      return response;
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      const backoff = 500 * Math.pow(2, attempt);
      await delay(backoff);
      attempt += 1;
    }
  }
  throw new Error(`SEC fetch failed for ${url}`);
}

import { readCache, writeCache } from "./cache";

export async function fetchJson<T>(url: string): Promise<T> {
  const cached = await readCache("json", url, JSON_CACHE_TTL);
  if (cached?.content) {
    return JSON.parse(cached.content) as T;
  }

  const response = await fetchWithRetry(url, {
    headers: {
      "User-Agent": getUserAgent(),
      "Accept-Encoding": "gzip, deflate",
      Accept: "application/json"
    }
  });
  const jsonText = await response.text();
  await writeCache("json", url, jsonText);
  return JSON.parse(jsonText) as T;
}

export async function fetchText(url: string): Promise<{ text: string; cachePath: string }> {
  const cached = await readCache("html", url, HTML_CACHE_TTL);
  if (cached?.content && cached.path) {
    return { text: cached.content, cachePath: cached.path };
  }

  const response = await fetchWithRetry(url, {
    headers: {
      "User-Agent": getUserAgent(),
      "Accept-Encoding": "gzip, deflate",
      Accept: "text/html"
    }
  });
  const htmlText = await response.text();
  const cachePath = await writeCache("html", url, htmlText);
  return { text: htmlText, cachePath };
}

export function getSubmissionsUrl(cikPadded: string) {
  return `${SEC_BASE}/submissions/CIK${cikPadded}.json`;
}

export function getArchiveUrl(cikInt: string, accessionNoDashes: string, primaryDoc: string) {
  return `${SEC_ARCHIVES}/${cikInt}/${accessionNoDashes}/${primaryDoc}`;
}
