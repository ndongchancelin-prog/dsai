export type Category = {
  id: string;
  name: string;
};

export type Product = {
  slug: string;
  titre: string;
  sousTitre: string;
  categorie: string;
  prix: number;
  pdf: string;
  highlight?: boolean;
  argument?: string;
  description?: string;
  contenu?: string[];
  disclaimer?: string;
};

export const currency = "EUR";

export const pricingDefaults = {
  recueilUnite: 9.9,
  coffret: 79.0,
};

export const categories: Category[] = [
  { id: "abondance", name: "Abondance & réussite" },
  { id: "protection", name: "Protection & purification" },
  { id: "amour", name: "Amour & relations" },
  { id: "ancrage", name: "Ancrage & bien-être intérieur" },
  { id: "racines", name: "Racines & ancêtres" },
  { id: "cycles", name: "Cycles & lune" },
];

const defaultDisclaimer =
  "Ce recueil propose des pratiques symboliques de bien-être et de développement personnel. Il ne constitue ni une promesse de résultat, ni un substitut à un accompagnement médical ou psychologique.";

const disclaimers: Record<string, string> = {
  apaisement:
    "Ces rituels favorisent la détente et l'ancrage. Ils ne remplacent pas un suivi médical ou psychologique en cas d'anxiété persistante.",
  ancetres:
    "Ces pratiques sont des actes symboliques d'hommage à la lignée. Elles ne prétendent à aucun contact avec les défunts.",
  protection:
    "Ces rituels sont des pratiques symboliques de reconnexion à soi. Ils ne remplacent pas les mesures de sécurité réelles.",
  "bouclier-energetique":
    "Ces rituels sont des pratiques symboliques de reconnexion à soi. Ils ne remplacent pas les mesures de sécurité réelles.",
};

export const products: Product[] = [
  {
    slug: "abondance-financiere",
    titre: "20 Rituels d'Abondance Financière",
    sousTitre: "Reprogramme ton rapport à l'argent, au rythme de Kemet.",
    categorie: "abondance",
    prix: 9.9,
    pdf: "pack-01-abondance-financiere.pdf",
  },
  {
    slug: "prosperite-travail",
    titre: "20 Rituels de Prospérité au Travail",
    sousTitre: "Fais de ton travail un lieu d'intention et de valeur.",
    categorie: "abondance",
    prix: 9.9,
    pdf: "pack-02-prosperite-travail.pdf",
  },
  {
    slug: "manifestation",
    titre: "20 Rituels de Manifestation",
    sousTitre: "Transforme tes intentions en réalité, au rythme de Kemet.",
    categorie: "abondance",
    prix: 9.9,
    pdf: "pack-03-manifestation.pdf",
  },
  {
    slug: "protection",
    titre: "20 Rituels de Protection",
    sousTitre: "Entoure-toi, ton foyer et ton énergie, à la manière de Kemet.",
    categorie: "protection",
    prix: 9.9,
    pdf: "pack-04-protection.pdf",
  },
  {
    slug: "purification",
    titre: "20 Rituels de Purification",
    sousTitre:
      "Nettoie ton corps, ton espace et ton esprit, à la manière de Kemet.",
    categorie: "protection",
    prix: 9.9,
    pdf: "pack-05-purification.pdf",
  },
  {
    slug: "bouclier-energetique",
    titre: "20 Rituels de Bouclier Énergétique",
    sousTitre:
      "Pour les âmes sensibles : garde ton énergie, où que tu ailles.",
    categorie: "protection",
    prix: 9.9,
    pdf: "pack-06-bouclier-energetique.pdf",
  },
  {
    slug: "amour-propre",
    titre: "20 Rituels d'Amour-Propre",
    sousTitre: "Deviens ton premier allié, avec la douceur de Kemet.",
    categorie: "amour",
    prix: 9.9,
    pdf: "pack-07-amour-propre.pdf",
  },
  {
    slug: "coeur",
    titre: "20 Rituels du Cœur",
    sousTitre: "Ouvre, soigne ou libère ton cœur, à la manière de Kemet.",
    categorie: "amour",
    prix: 9.9,
    pdf: "pack-08-coeur.pdf",
  },
  {
    slug: "pardon-liberation",
    titre: "20 Rituels de Pardon & Libération",
    sousTitre: "Dépose ce que tu portes, à la manière de Kemet.",
    categorie: "amour",
    prix: 9.9,
    pdf: "pack-09-pardon-liberation.pdf",
  },
  {
    slug: "apaisement",
    titre: "20 Rituels d'Apaisement",
    sousTitre:
      "Retrouve le calme dans les jours de surcharge, à la manière de Kemet.",
    categorie: "ancrage",
    prix: 9.9,
    pdf: "pack-10-apaisement.pdf",
  },
  {
    slug: "matin-soir",
    titre: "20 Rituels du Matin & du Soir",
    sousTitre:
      "Ouvre et referme tes journées avec intention, à la manière de Kemet.",
    categorie: "ancrage",
    prix: 9.9,
    pdf: "pack-11-matin-soir.pdf",
  },
  {
    slug: "confiance",
    titre: "20 Rituels de Confiance",
    sousTitre: "Redresse-toi et occupe ta place, à la manière de Kemet.",
    categorie: "ancrage",
    prix: 9.9,
    pdf: "pack-12-confiance.pdf",
  },
  {
    slug: "ancetres",
    titre: "20 Rituels des Ancêtres",
    sousTitre:
      "Honore ta lignée et puise dans tes racines, à la manière de Kemet.",
    categorie: "racines",
    prix: 9.9,
    pdf: "pack-13-ancetres.pdf",
  },
  {
    slug: "reconnexion",
    titre: "20 Rituels de Reconnexion",
    sousTitre:
      "Renoue avec toi, la nature et le sacré, à la manière de Kemet.",
    categorie: "racines",
    prix: 9.9,
    pdf: "pack-14-reconnexion.pdf",
  },
  {
    slug: "saisonniers-kemet",
    titre: "20 Rituels Saisonniers de Kemet",
    sousTitre: "Vis au rythme des saisons du Nil et des cycles de la nature.",
    categorie: "racines",
    prix: 9.9,
    pdf: "pack-15-saisonniers-kemet.pdf",
  },
  {
    slug: "nouvelle-pleine-lune",
    titre: "20 Rituels de Nouvelle & Pleine Lune",
    sousTitre: "Aligne tes intentions sur les cycles de la lune.",
    categorie: "cycles",
    prix: 9.9,
    pdf: "pack-16-nouvelle-pleine-lune.pdf",
  },
  {
    slug: "renouveau",
    titre: "20 Rituels de Renouveau",
    sousTitre: "Renais, transforme-toi, recommence, à la manière de Kemet.",
    categorie: "cycles",
    prix: 9.9,
    pdf: "pack-17-renouveau.pdf",
  },
  {
    slug: "coffret-integrale",
    titre: "L'Intégrale — 340 Rituels de Kemet",
    sousTitre: "Toute la sagesse de Maison Heka, réunie en un coffret.",
    categorie: "coffret",
    prix: 79.0,
    pdf: "maison-heka-coffret-integrale.pdf",
    highlight: true,
    argument: "79€ au lieu de 168€ à l'unité — plus de 50% d'économie.",
  },
].map((p) => ({
  ...p,
  disclaimer: disclaimers[p.slug] ?? defaultDisclaimer,
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorie: string): Product[] {
  return products.filter((p) => p.categorie === categorie);
}

export function getRecueils(): Product[] {
  return products.filter((p) => p.categorie !== "coffret");
}

export function getCoffret(): Product {
  const coffret = products.find((p) => p.slug === "coffret-integrale");
  if (!coffret) throw new Error("Coffret produit introuvable dans le catalogue");
  return coffret;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount);
}
