import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/buildinginfo", label: "Building" },
  { href: "/insuranceinfo", label: "Insurance" },
  { href: "/maintenanceinfo", label: "Maintenance" },
  { href: "/residents", label: "Residents" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-slate-950 text-sm font-bold text-white">
            SM
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight text-slate-950">
              Strata Management
            </span>
            <span className="block text-xs font-medium text-slate-500">
              123 Apartment Committee
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
