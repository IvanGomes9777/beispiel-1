import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/*
          PLATZHALTER-HERO — nur als Kontext für die Navbar (Option B).
          Die finale Hero-Sektion folgt als nächster Schritt mit 5 eigenen Design-Optionen.
        */}
        <section className="relative grid min-h-[88svh] overflow-hidden">
          {/* dekorativer App-Mesh-Hintergrund */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -right-[8vw] -top-[12vw] h-[42vw] w-[42vw] rounded-full bg-[#bfe6ff] opacity-50 blur-[60px]" />
            <span className="absolute -bottom-[12vw] -left-[6vw] h-[34vw] w-[34vw] rounded-full bg-[#d6f5ee] opacity-50 blur-[60px]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col justify-center px-6 py-20 sm:px-8 lg:px-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d4e4ff] bg-[#eaf2ff] px-4 py-1.5 font-display text-[0.74rem] font-semibold text-brand-blue">
              🔎 Alle Sparten an einem Ort
            </span>
            <h1 className="mt-4 max-w-[15ch] font-display text-[clamp(2.4rem,1.4rem+5vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
              Dein Schutz —<br />
              <span className="text-grad">in einem Klick.</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-[clamp(1rem,0.95rem+0.4vw,1.2rem)] leading-relaxed text-slate">
              Von Kfz bis Berufsunfähigkeit: transparent vergleichen und digital
              abschließen. Wir zeigen ehrlich, welcher Marktausschnitt geprüft wurde.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl grad-coral px-5 py-3.5 font-display text-[0.95rem] font-semibold text-white shadow-coral transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
              >
                Jetzt beraten lassen <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="/versicherungen"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3.5 font-display text-[0.95rem] font-semibold text-ink transition-colors hover:border-brand-blue"
              >
                Sparten ansehen
              </a>
            </div>

            <p className="mt-12 font-display text-xs uppercase tracking-[0.2em] text-muted">
              ↓ Platzhalter-Hero · finale Hero-Sektion folgt
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
