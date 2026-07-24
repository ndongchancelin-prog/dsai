import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductBySlug, getRecueils, formatPrice } from "@/lib/catalog";
import GoldMedallion from "@/components/GoldMedallion";
import PriceBadge from "@/components/PriceBadge";
import WellbeingDisclaimer from "@/components/WellbeingDisclaimer";
import BuyButton from "@/components/BuyButton";
import CornerBracketFrame from "@/components/CornerBracketFrame";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getRecueils().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.titre,
    description: product.sousTitre,
    openGraph: { title: product.titre, description: product.sousTitre },
  };
}

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.categorie === "coffret") notFound();

  const categoryName = categories.find((c) => c.id === product.categorie)?.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.titre,
    description: product.sousTitre,
    category: categoryName,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.prix,
      availability: "https://schema.org/InStock",
      url: `${site.url}/recueils/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center text-center mb-12">
        <GoldMedallion size={120} className="mb-8">
          <span className="font-titres text-lg">✦</span>
        </GoldMedallion>
        <p className="eyebrow mb-3">{categoryName}</p>
        <h1 className="text-3xl md:text-4xl text-papyrus mb-4">
          {product.titre}
        </h1>
        <p className="text-papyrus-doux font-corps italic text-lg max-w-xl mb-6">
          {product.sousTitre}
        </p>
        <PriceBadge prix={product.prix} className="text-lg mb-8" />
        <BuyButton slugs={[product.slug]} label={`Acheter — ${formatPrice(product.prix)}`} />
      </div>

      <CornerBracketFrame className="border border-ligne mb-10">
        <p className="eyebrow mb-4">Ce que contient le recueil</p>
        <ul className="grid sm:grid-cols-2 gap-3 text-papyrus-doux font-corps">
          <li>— 20 rituels détaillés, prêts à pratiquer</li>
          <li>— Une introduction sur la symbolique du thème</li>
          <li>— Des intentions à formuler pas à pas</li>
          <li>— Un format PDF soigné, à garder à vie</li>
        </ul>
      </CornerBracketFrame>

      <div className="mb-10">
        <WellbeingDisclaimer text={product.disclaimer!} />
      </div>
    </div>
  );
}
