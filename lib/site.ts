export const site = {
  name: "Maison Heka",
  tagline: "La sagesse de tes ancêtres, transmise avec âme.",
  manifesto:
    "Nous ne vendons pas des prédictions, nous transmettons une reconnexion.",
  taglines: [
    "La sagesse de Kemet, à portée de rituel.",
    "Reconnecte-toi à ce qui est déjà là.",
    "340 rituels pour une vie plus alignée.",
  ],
  email: "maisonhekadigital@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://maisonheka.fr",
};

export const nav = [
  { href: "/recueils", label: "Recueils" },
  { href: "/coffret", label: "Le coffret" },
  { href: "/manifeste", label: "Le manifeste" },
  { href: "/journal", label: "Le journal" },
];

export const footerLegalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/retours", label: "Politique de retour" },
];
