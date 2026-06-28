"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav, sparten, site } from "@/lib/site";

/**
 * Option B — Full-Width Navbar mit Mega-Menü.
 * Skills: emilkowalski (Motion), responsive-design, web-design-reviewer, impeccable.
 * - Scroll-State: verfestigt sich (Border + Schatten) ab 8px Scroll.
 * - Mega-Dropdown "Versicherungen": Hover (Desktop) + Klick/Keyboard (a11y).
 * - Mobile-Sheet mit aufklappbarer Sparten-Liste.
 * - prefers-reduced-motion respektiert.
 */
export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSpartenOpen, setSheetSpartenOpen] = useState(false);
  const reduce = useReducedMotion();
  const megaId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-State
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape schließt alles; Body-Scroll-Lock bei offenem Sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setSheetOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaDelayed = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const megaVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, pointerEvents: "none" },
    show: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[box-shadow,border-color,background] duration-500 ease-smooth ${
        solid
          ? "border-line bg-white shadow-soft supports-[backdrop-filter]:bg-white/85"
          : "border-transparent bg-white/95 supports-[backdrop-filter]:bg-white/80"
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3.5 sm:px-8 lg:px-16"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} Startseite`}>
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] grad text-[1rem] font-extrabold text-white shadow-soft font-display">
            P
          </span>
          <span className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">
            {site.name}
          </span>
        </Link>

        {/* Center nav (Desktop) */}
        <ul className="hidden items-center gap-7 lg:flex">
          {/* Mega-Trigger */}
          <li
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          >
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls={megaId}
              onClick={() => setMegaOpen((v) => !v)}
              className="group flex items-center gap-1.5 py-1.5 text-[0.92rem] font-medium text-slate transition-colors hover:text-ink"
            >
              Versicherungen
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  id={megaId}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={megaVariants}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-[calc(100%+14px)] w-[min(680px,90vw)] -translate-x-1/2 rounded-[18px] border border-line bg-white p-5 shadow-float"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMegaDelayed}
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {sparten.map((s) => (
                      <Link
                        key={s.title}
                        href={s.href}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-soft"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span
                          className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[#eaf2ff] text-[1.1rem]"
                          aria-hidden
                        >
                          {s.icon}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-display text-[0.88rem] font-semibold text-ink">
                            {s.title}
                          </span>
                          <span className="text-[0.74rem] leading-snug text-muted">
                            {s.desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="hidden items-center gap-2 rounded-xl grad-coral px-5 py-3 font-display text-[0.9rem] font-semibold text-white shadow-coral transition-transform duration-300 ease-smooth hover:-translate-y-0.5 sm:inline-flex"
          >
            Jetzt beraten lassen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          {/* Burger */}
          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-[11px] border border-line bg-white text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </nav>

      {/* Mobile-Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-white px-6 pb-8 pt-20 sm:px-10 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <Link
              href="/"
              onClick={() => setSheetOpen(false)}
              className="absolute left-6 top-6 flex items-center gap-2.5 sm:left-10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] grad font-display font-extrabold text-white">
                P
              </span>
              <span className="font-display text-xl font-bold text-ink">{site.name}</span>
            </Link>
            <button
              type="button"
              aria-label="Menü schließen"
              onClick={() => setSheetOpen(false)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-[11px] border border-line bg-white text-ink"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <nav aria-label="Mobile-Navigation" className="flex flex-col">
              {/* Versicherungen (aufklappbar) */}
              <button
                type="button"
                aria-expanded={sheetSpartenOpen}
                onClick={() => setSheetSpartenOpen((v) => !v)}
                className="flex items-center justify-between border-b border-line py-3 font-display text-2xl font-semibold text-ink"
              >
                Versicherungen
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ${sheetSpartenOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {sheetSpartenOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {sparten.map((s) => (
                      <li key={s.title}>
                        <Link
                          href={s.href}
                          onClick={() => setSheetOpen(false)}
                          className="flex items-center gap-3 py-3 pl-2 text-lg text-slate"
                        >
                          <span aria-hidden>{s.icon}</span>
                          <span>{s.title}</span>
                          <span className="text-sm text-muted">· {s.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSheetOpen(false)}
                  className="border-b border-line py-3 font-display text-2xl font-semibold text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/kontakt"
              onClick={() => setSheetOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl grad-coral px-5 py-4 font-display text-base font-semibold text-white shadow-coral"
            >
              Jetzt beraten lassen
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative py-1.5 text-[0.92rem] font-medium text-slate transition-colors hover:text-ink"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded grad transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
    </Link>
  );
}
