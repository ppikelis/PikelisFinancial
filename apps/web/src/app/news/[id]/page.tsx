import ReactMarkdown from "react-markdown";
import { mockNewsArticles } from "@/lib/mock";

interface NewsDetailPageProps {
  params: { id: string };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = mockNewsArticles.find((item) => item.slug === params.id);

  if (!article) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">News Detail</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Article not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {article.tickers.map((ticker) => (
            <span
              key={ticker}
              className="rounded-full border border-border px-2 py-0.5 font-semibold text-foreground"
            >
              {ticker}
            </span>
          ))}
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
        </div>
      </header>

      <section className="rounded-xl border border-border bg-card p-6">
        <ReactMarkdown className="prose max-w-none text-sm text-foreground">
          {article.bodyMarkdown}
        </ReactMarkdown>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold text-foreground">Sources</div>
        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          {article.sourceUrls.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              {url}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
