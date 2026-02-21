export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-lg font-semibold">Page not found</div>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you’re looking for does not exist.
        </p>
      </div>
    </main>
  );
}
