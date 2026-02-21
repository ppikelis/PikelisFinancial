export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Magic link authentication (placeholder).
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card p-6">
        <label className="text-sm">Email</label>
        <input
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="you@domain.com"
        />
        <button className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
          Send magic link
        </button>
      </div>
    </main>
  );
}
