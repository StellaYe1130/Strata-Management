import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Strata Management for 123 Apartment.</p>
        <div className="flex flex-wrap gap-4 font-medium">
          <Link href="/contact" className="hover:text-slate-950">
            Request help
          </Link>
          <Link href="/Committee.pdf" target="_blank" className="hover:text-slate-950">
            Committee PDF
          </Link>
          <Link href="/login" className="hover:text-slate-950">
            Resident login
          </Link>
        </div>
      </div>
    </footer>
  );
}
