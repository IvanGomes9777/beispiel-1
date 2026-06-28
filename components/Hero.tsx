"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";

/**
 * Hero (Sektion 2) — Video-Background.
 * Video-Vault-Guide: muted/loop/playsInline/autoPlay, Overlay für Lesbarkeit,
 * prefers-reduced-motion → Video pausiert, dunkler Gradient bleibt als Fallback.
 * Landing-Page-Skill: answer-first Headline · Mechanismus-Subline · 1 Primär-CTA · Proof-Signal.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (reduce && videoRef.current) videoRef.current.pause();
  }, [reduce]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative grid min-h-[92svh] overflow-hidden bg-ink">
      {/* Video-Background (self-hosted = DSGVO/CSP 'self') */}
      {!reduce && (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay-Gradienten: Lesbarkeit + Verlauf in die helle Folgesektion */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(9,14,26,.86) 0%, rgba(9,14,26,.62) 45%, rgba(9,14,26,.35) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-soft" />

      {/* Inhalt */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col justify-center px-6 py-24 sm:px-8 lg:px-16"
      >
        {/* Proof-Signal als Eyebrow */}
        <motion.div
          variants={item}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-display text-[0.78rem] font-medium text-white backdrop-blur-sm"
        >
          <span className="flex items-center gap-0.5 text-amber-300" aria-hidden>
            <Star className="h-3.5 w-3.5 fill-amber-300" />
            <Star className="h-3.5 w-3.5 fill-amber-300" />
            <Star className="h-3.5 w-3.5 fill-amber-300" />
            <Star className="h-3.5 w-3.5 fill-amber-300" />
            <Star className="h-3.5 w-3.5 fill-amber-300" />
          </span>
          4,9 · über 50.000 Kund:innen vertrauen uns
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,1.4rem+5.4vw,5.6rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
        >
          Versicherung, die{" "}
          <span className="text-grad">endlich einfach</span> ist.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[46ch] text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)] leading-relaxed text-white/85"
        >
          Vergleiche transparent, verstehe jede Police in Klartext und schließe
          digital ab — mit persönlicher Beratung, wann immer du sie brauchst.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-xl grad-coral px-6 py-4 font-display text-base font-semibold text-white shadow-coral transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
          >
            Jetzt kostenlos beraten lassen
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/so-gehts"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-display text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            So funktioniert&rsquo;s
          </Link>
        </motion.div>

        {/* Trust-Cluster */}
        <motion.ul
          variants={item}
          className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.85rem] font-medium text-white/80"
        >
          <li className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-turq" aria-hidden /> 100&nbsp;% unabhängig &amp; transparent
          </li>
          <li className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-turq" aria-hidden /> In 3&nbsp;Minuten startklar
          </li>
          <li className="inline-flex items-center gap-2">
            <Star className="h-4 w-4 text-brand-turq" aria-hidden /> TÜV-geprüfter Service
          </li>
        </motion.ul>
      </motion.div>

      {/* Scroll-Cue */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70">
        <span className="font-display text-[0.66rem] uppercase tracking-[0.3em]">Scrollen</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
