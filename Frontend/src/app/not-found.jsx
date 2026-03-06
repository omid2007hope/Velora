import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-24 text-amber-950">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border-2 border-amber-950 bg-orange-100 px-8 py-16 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-base text-amber-900 sm:text-lg">
          The page you requested does not exist or may have been removed from
          the current Velora catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-amber-950 px-6 py-3 text-sm font-semibold text-orange-50 transition hover:bg-amber-900"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-amber-950 px-6 py-3 text-sm font-semibold transition hover:bg-orange-200"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}
