interface BanksDetailPageProps {
  params: { id: string };
}

export default function BanksDetailPage({ params }: BanksDetailPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Bank Collection</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Collection detail for {params.id}.
        </p>
      </div>
    </main>
  );
}
