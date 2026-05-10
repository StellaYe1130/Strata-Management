import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Request received
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Thank you for your message
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          The strata management team will review your request and get back to you
          shortly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
