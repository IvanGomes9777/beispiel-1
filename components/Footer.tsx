import Link from "next/link";
import { site } from "@/lib/site";

// Footer mit Pflicht-Rechtslinks auf JEDER Seite (Compliance-Guide §10, Branche-24).
const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Erstinformation / Statusangaben", href: "/erstinformation" },
  { label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] grad font-display font-extrabold text-white">
                P
              </span>
              <span className="font-display text-xl font-bold text-ink">{site.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
            {/* § 34d GewO Pflicht-Statusangabe */}
            <p className="mt-4 text-xs leading-relaxed text-slate">{site.registerNote}</p>
          </div>

          <nav aria-label="Rechtliches" className="flex flex-col gap-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Rechtliches
            </span>
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-slate transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.legalName}. Alle Angaben Platzhalter — vor Live-Gang durch echte Daten ersetzen.
        </div>
      </div>
    </footer>
  );
}
