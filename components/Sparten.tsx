"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sparten, site } from "@/lib/site";

/**
 * Sektion 3 — Sparten (Option B: klassische 3er-Cards).
 * Skills: emilkowalski (Stagger-Reveal), responsive-design (auto-fit Grid),
 * landing-page (answer-first Blurbs), taste, web-design-reviewer.
 * GEO: ItemList-Schema mit allen Sparten als Service-Angebot.
 */
export default function Sparten() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Versicherungssparten",
    itemListElement: sparten.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.blurb,
        provider: { "@id": `${site.url}/#organization` },
        url: `${site.url}${s.href}`,
      },
    })),
  };

  return (
    <section
      aria-labelledby="sparten-heading"
      className="px-6 py-[clamp(3rem,7vw,6rem)] sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[clamp(1.8rem,4vw,3rem)] max-w-[60ch]"
        >
          <p className="font-display text-[0.74rem] font-semibold uppercase tracking-wide text-brand-bluedeep">
            Unsere Bereiche
          </p>
          <h2
            id="sparten-heading"
            className="mt-2 font-display text-[clamp(1.8rem,1.2rem+2.6vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink"
          >
            Klar gegliedert, <span className="text-grad">schnell gefunden.</span>
          </h2>
          <p className="mt-3 text-[clamp(1rem,0.95rem+0.2vw,1.12rem)] leading-relaxed text-slate">
            Jede Sparte in einem Satz erklärt — du weißt sofort, ob sie zu dir passt.
            Wir zeigen transparent den geprüften Marktausschnitt.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]"
        >
          {sparten.map((s) => (
            <motion.li key={s.title} variants={card}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-[18px] border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-float"
              >
                <span
                  className="grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-[#eaf2ff] text-[1.7rem] transition-colors duration-300 group-hover:bg-[linear-gradient(135deg,#1d6ff2,#06b6d4)]"
                  aria-hidden
                >
                  {s.icon}
                </span>
                <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-1 mb-4 text-[0.9rem] leading-relaxed text-muted">
                  {s.blurb}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[0.86rem] font-semibold text-brand-bluedeep">
                  Mehr erfahren
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </section>
  );
}
