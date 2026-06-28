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

// Versicherungs-Sparten fürs Mega-Menü (Themen-Segmentierung, Branche-24).
export const sparten = [
  { icon: "🚗", title: "Kfz", desc: "Auto & Motorrad", href: "/versicherungen/kfz" },
  { icon: "🏠", title: "Hausrat", desc: "Zuhause schützen", href: "/versicherungen/hausrat" },
  { icon: "⚖️", title: "Haftpflicht", desc: "Privat & Familie", href: "/versicherungen/haftpflicht" },
  { icon: "🦷", title: "Zahn", desc: "Zusatzschutz", href: "/versicherungen/zahn" },
  { icon: "🛡️", title: "BU", desc: "Berufsunfähigkeit", href: "/versicherungen/bu" },
  { icon: "✈️", title: "Reise", desc: "Weltweit sorglos", href: "/versicherungen/reise" },
] as const;

// Hauptnavigation
export const mainNav = [
  { label: "So geht's", href: "/so-gehts" },
  { label: "Über uns", href: "/ueber-uns" },
] as const;
