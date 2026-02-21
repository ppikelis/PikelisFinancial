"use client";

import { useMemo, useState } from "react";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

const ragUrl =
  process.env.NEXT_PUBLIC_RAG_URL ?? "http://localhost:8000";

const allSymbols = STOCK_GROUPS_ORDER.flatMap((group) =>
  STOCK_GROUPS[group].map((stock) => stock.symbol)
);

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Citation {
  symbol: string;
  formType: string;
  filingDate: string;
  secUrl: string;
  snippet: string;
}

export default function SecChatPage() {
  const [symbol, setSymbol] = useState(allSymbols[0] ?? "AAPL");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setQuestion("");

    const response = await fetch(`${ragUrl}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, question })
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    setCitations(data.citations ?? []);
    setLoading(false);
  };

  const handleReindex = async () => {
    await fetch(`${ragUrl}/reindex`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbols: [symbol] })
    });
  };

  const groupedSymbols = useMemo(
    () =>
      STOCK_GROUPS_ORDER.map((group) => ({
        group,
        symbols: STOCK_GROUPS[group].map((stock) => stock.symbol)
      })),
    []
  );

  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-lg font-semibold text-foreground">
          SEC Filings Chat
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Ask questions grounded in SEC filings for tracked stocks.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[260px_1fr_280px]">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Symbol
          </div>
          <select
            className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
          >
            {groupedSymbols.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.symbols.map((sym) => (
                  <option key={sym} value={sym}>
                    {sym}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {isDev ? (
            <button
              type="button"
              onClick={handleReindex}
              className="mt-4 w-full rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Re-index (dev)
            </button>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex h-[420px] flex-col gap-3 overflow-y-auto border border-border bg-background p-3 text-sm">
            {messages.length === 0 ? (
              <div className="text-muted-foreground">
                Ask a question about recent filings.
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-md px-3 py-2 ${
                    message.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-muted/30 text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              ))
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about risks, guidance, or KPIs..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAsk}
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-semibold text-foreground">Citations</div>
          <div className="mt-3 space-y-3 text-xs text-muted-foreground">
            {citations.length === 0 ? (
              <div>No citations yet.</div>
            ) : (
              citations.map((cite, index) => (
                <div key={`${cite.secUrl}-${index}`} className="rounded-md border border-border bg-background p-3">
                  <div className="font-semibold text-foreground">
                    {cite.symbol} · {cite.formType}
                  </div>
                  <div className="mt-1">{new Date(cite.filingDate).toLocaleDateString()}</div>
                  <a
                    href={cite.secUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-primary hover:underline"
                  >
                    Open filing
                  </a>
                  <div className="mt-2 text-[11px]">{cite.snippet}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
