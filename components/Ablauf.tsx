"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Sektion 4 — So funktioniert's (Option G: Phone-Mockup App-Flow).
 * Interaktiv: Schritt anklicken → Screen wechselt. Auto-Advance (reduced-motion-safe),
 * stoppt bei Nutzer-Interaktion. Tablist-A11y. GEO: HowTo-Schema.
 */
const steps = [
  {
    n: 1,
    title: "Bedarf erfassen",
    desc: "Sag uns in 3 Minuten online, was dir wichtig ist — unverbindlich.",
  },
  {
    n: 2,
    title: "Unabhängig vergleichen",
    desc: "Wir prüfen den Marktausschnitt und erklären jede Option in Klartext.",
  },
  {
    n: 3,
    title: "Digital abschließen",
    desc: "Persönliche Beratung & papierloser Abschluss — wann immer es dir passt.",
  },
] as const;

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `In 3 Schritten zur passenden Versicherung mit ${site.name}`,
  step: steps.map((s) => ({
    "@type": "HowToStep",
    position: s.n,
    name: s.title,
    text: s.desc,
  })),
};

export default function Ablauf() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(1);
  const interacted = useRef(false);

  // Auto-Advance: läuft EINMAL 1→2→3 durch, dann Stopp (WCAG 2.2.2: keine
  // endlose Bewegung). Stoppt sofort bei Nutzer-Interaktion oder reduced-motion.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (interacted.current) {
        clearInterval(id);
        return;
      }
      setActive((a) => {
        if (a >= steps.length) {
          clearInterval(id);
          return a;
        }
        return a + 1;
      });
    }, 3200);
    return () => clearInterval(id);
  }, [reduce]);

  const choose = (n: number) => {
    interacted.current = true;
    setActive(n);
  };

  return (
    <section aria-labelledby="ablauf-heading" className="px-6 py-[clamp(3.4rem,7vw,6.5rem)] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[clamp(2.2rem,4vw,3.4rem)] max-w-[60ch]"
        >
          <p className="font-display text-[0.74rem] font-semibold uppercase tracking-wide text-brand-bluedeep">
            📱 Schritt für Schritt
          </p>
          <h2
            id="ablauf-heading"
            className="mt-2 font-display text-[clamp(1.9rem,1.2rem+2.8vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink"
          >
            Sieh, wie <span className="text-grad">einfach es ist.</span>
          </h2>
          <p className="mt-3 text-[clamp(1rem,0.95rem+0.2vw,1.14rem)] leading-relaxed text-slate">
            Tippe dich durch die Schritte — der Bildschirm zeigt, was dich erwartet.
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-center"
          >
            <div className="relative aspect-[300/610] w-[300px] max-w-[80vw] rounded-[42px] bg-[#0b1220] p-[13px] shadow-[0_40px_80px_-30px_rgba(15,73,153,.55)] ring-1 ring-white/10">
              <div className="absolute left-1/2 top-5 z-[3] h-[26px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-[#0b1220]" />
              <div
                role="tabpanel"
                aria-label={`Schritt ${active}: ${steps[active - 1].title}`}
                className="relative h-full overflow-hidden rounded-[30px] bg-soft"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -14 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col px-5 pb-5 pt-10"
                  >
                    <Screen step={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <div role="tablist" aria-label="Ablauf-Schritte" className="flex flex-col gap-3">
            {steps.map((s) => {
              const isActive = s.n === active;
              return (
                <button
                  key={s.n}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => choose(s.n)}
                  className={`flex gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ease-smooth ${
                    isActive
                      ? "border-transparent bg-white shadow-float"
                      : "border-line bg-white hover:border-brand-blue/40"
                  }`}
                >
                  <span
                    className={`grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] font-display text-base font-bold transition-colors duration-300 ${
                      isActive ? "grad text-white" : "bg-soft text-slate"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span>
                    <span className="block font-display text-[1.05rem] font-semibold text-ink">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-[0.88rem] leading-relaxed text-muted">
                      {s.desc}
                    </span>
                  </span>
                </button>
              );
            })}

            <a
              href="/kontakt"
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-xl grad-coral px-6 py-4 font-display text-base font-semibold text-white shadow-coral transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
            >
              Jetzt starten
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
    </section>
  );
}

/* --- Mini-App-Screens je Schritt --- */
function Screen({ step }: { step: number }) {
  if (step === 1) {
    return (
      <>
        <p className="font-display text-[0.9rem] font-bold text-ink">Was möchtest du absichern?</p>
        <p className="mb-4 text-[0.72rem] text-muted">Schritt 1 von 3 · unverbindlich</p>
        {["🚗 Auto & Motorrad", "🏠 Zuhause & Hausrat", "🛡️ Einkommen (BU)"].map((f) => (
          <div key={f} className="mb-2 flex h-[42px] items-center rounded-xl border border-line bg-white px-3 text-[0.8rem] text-slate">
            {f}
          </div>
        ))}
        <AppButton>Weiter</AppButton>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <p className="font-display text-[0.9rem] font-bold text-ink">Deine besten Optionen</p>
        <p className="mb-4 text-[0.72rem] text-muted">Schritt 2 von 3 · Marktausschnitt geprüft</p>
        <Option icon="⭐" title="Tarif Komfort" sub="Top-Leistung" best />
        <Option icon="💧" title="Tarif Basis" sub="günstig" />
        <Option icon="🛡️" title="Tarif Premium" sub="Rundum-Schutz" />
        <AppButton>Beraten lassen</AppButton>
      </>
    );
  }
  return (
    <>
      <div className="m-auto text-center">
        <div className="mx-auto mb-4 grid h-[84px] w-[84px] place-items-center rounded-full grad text-white shadow-[0_16px_34px_-10px_rgba(6,182,212,.7)]">
          <Check className="h-9 w-9" strokeWidth={3} aria-hidden />
        </div>
        <p className="font-display text-[0.95rem] font-bold text-ink">Geschafft!</p>
        <p className="mt-1 px-2 text-[0.72rem] text-muted">Papierlos abgeschlossen · Bestätigung per E-Mail</p>
      </div>
      <AppButton>Police ansehen</AppButton>
    </>
  );
}

function Option({ icon, title, sub, best }: { icon: string; title: string; sub: string; best?: boolean }) {
  return (
    <div
      className={`mb-2 flex items-center gap-3 rounded-xl border bg-white p-[0.7rem] text-[0.78rem] ${
        best ? "border-brand-turq shadow-[0_0_0_2px_rgba(6,182,212,.18)]" : "border-line"
      }`}
    >
      <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-[#eaf2ff] text-base" aria-hidden>
        {icon}
      </span>
      <span className="leading-tight">
        <b className="font-display font-semibold text-ink">{title}</b>
        <br />
        <span className="text-muted">{sub}</span>
      </span>
      {best && <span className="ml-auto font-bold text-brand-turqdeep">✓</span>}
    </div>
  );
}

function AppButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto rounded-xl grad-coral py-[0.7rem] text-center font-display text-[0.82rem] font-semibold text-white">
      {children}
    </div>
  );
}
