import { JSDOM } from "jsdom";
import { fetchText, getArchiveUrl } from "./secClient";

export interface FilingTextResult {
  textContent: string | null;
  title: string | null;
  secUrl: string;
  rawHtmlPath?: string;
}

const stripText = (html: string) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  doc.querySelectorAll("script, style, noscript").forEach((node) => node.remove());
  doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((node) => {
    const text = node.textContent?.trim();
    if (text) {
      node.textContent = `\n${text}\n`;
    }
  });
  const text = doc.body?.textContent ?? "";
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized;
};

export async function fetchFilingText({
  cik,
  accessionNoDashes,
  primaryDoc
}: {
  cik: string;
  accessionNoDashes: string;
  primaryDoc: string;
}): Promise<FilingTextResult> {
  const cikInt = String(Number.parseInt(cik, 10));
  const secUrl = getArchiveUrl(cikInt, accessionNoDashes, primaryDoc);
  const { text: html, cachePath } = await fetchText(secUrl);
  const text = stripText(html);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
  const MAX_CHARS = 2 * 1024 * 1024;
  const truncated =
    text.length > MAX_CHARS ? `${text.slice(0, MAX_CHARS)} TRUNCATED` : text;

  return {
    textContent: truncated,
    title,
    secUrl,
    rawHtmlPath: cachePath
  };
}
