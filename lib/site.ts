// Zentrale Platzhalter-Firmendaten (PLACEHOLDER).
// In Produktion mit echten Daten des Kunden befüllen — NICHTS erfinden (SEO-Guide §6, Branche-24-Recht).
export const site = {
  name: "POLICITY",
  legalName: "POLICITY GmbH (Platzhalter)",
  tagline: "Versicherung. Endlich einfach.",
  description:
    "Digitale Versicherungsberatung: transparent vergleichen, verständlich beraten, digital abschließen. Unabhängig und auf Augenhöhe.",
  url: "https://www.policity.de", // PLACEHOLDER-Domain
  email: "hallo@policity.de", // PLACEHOLDER
  phone: "+49 69 0000000", // PLACEHOLDER
  // § 34d GewO – Pflicht-Statusangaben (PLACEHOLDER, vom Kunden zu bestätigen)
  registerNote: "Versicherungsvermittler · Vermittlerregister-Nr. D-XXXX-XXXXX-XX (§ 34d GewO)",
  address: {
    street: "Musterstraße 1", // PLACEHOLDER
    postalCode: "60311", // PLACEHOLDER
    city: "Frankfurt am Main", // PLACEHOLDER
    country: "DE",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/placeholder",
    instagram: "https://www.instagram.com/placeholder",
  },
} as const;

// Versicherungs-Sparten (Themen-Segmentierung, Branche-24).
// desc = Kurzlabel (Mega-Menü) · blurb = answer-first Ein-Satz-Erklärung (Sparten-Sektion/GEO).
export const sparten = [
  {
    icon: "🛡️",
    title: "Berufsunfähigkeit",
    desc: "Einkommen absichern",
    blurb: "Dein wichtigster Schutz: sichert dein Einkommen, wenn die Gesundheit nicht mitspielt.",
    href: "/versicherungen/bu",
  },
  {
    icon: "🚗",
    title: "Kfz",
    desc: "Auto & Motorrad",
    blurb: "Fairer Schutz für Auto & Motorrad — transparent verglichen, schnell gewechselt.",
    href: "/versicherungen/kfz",
  },
  {
    icon: "🏠",
    title: "Hausrat",
    desc: "Zuhause schützen",
    blurb: "Hab und Gut zuhause — abgesichert gegen Feuer, Einbruch und Leitungswasser.",
    href: "/versicherungen/hausrat",
  },
  {
    icon: "⚖️",
    title: "Haftpflicht",
    desc: "Privat & Familie",
    blurb: "Der Alltags-Klassiker: schützt dich und deine Familie vor teuren Missgeschicken.",
    href: "/versicherungen/haftpflicht",
  },
  {
    icon: "🦷",
    title: "Zahn",
    desc: "Zusatzschutz",
    blurb: "Zusatzschutz für Zahnersatz, Prophylaxe und Kieferorthopädie.",
    href: "/versicherungen/zahn",
  },
  {
    icon: "✈️",
    title: "Reise",
    desc: "Weltweit sorglos",
    blurb: "Weltweit sorglos unterwegs — mit Auslandskrankenschutz, Storno und Gepäck.",
    href: "/versicherungen/reise",
  },
] as const;

// Hauptnavigation
export const mainNav = [
  { label: "So geht's", href: "/so-gehts" },
  { label: "Über uns", href: "/ueber-uns" },
] as const;
