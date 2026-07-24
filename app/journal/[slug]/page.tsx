import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/journal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.extrait,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.extrait,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name },
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="eyebrow mb-4">
        {new Date(article.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="text-3xl md:text-4xl text-papyrus mb-10">
        {article.titre}
      </h1>
      <div className="space-y-6 text-papyrus-doux font-corps text-lg leading-relaxed">
        {article.contenu.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-16 border-t border-ligne pt-10 text-center">
        <p className="text-papyrus-doux font-corps italic mb-6">
          Envie de poursuivre la pratique ?
        </p>
        <Link
          href="/recueils"
          className="eyebrow border border-or px-6 py-3 text-or hover:bg-or hover:text-obsidienne transition-colors"
        >
          Découvrir les recueils
        </Link>
      </div>
    </div>
  );
}
