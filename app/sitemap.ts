import type { MetadataRoute } from "next";
import { getRecueils } from "@/lib/catalog";
import { articles } from "@/lib/journal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/recueils",
    "/coffret",
    "/manifeste",
    "/journal",
    "/mentions-legales",
    "/cgv",
    "/confidentialite",
    "/retours",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  // Le coffret a sa propre page dédiée (/coffret), déjà listée ci-dessus —
  // il n'a pas de fiche sous /recueils/[slug].
  const productRoutes = getRecueils().map((p) => ({
    url: `${site.url}/recueils/${p.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${site.url}/journal/${a.slug}`,
    lastModified: a.date,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
