import type { Metadata } from "next";
import Link from "next/link";
import { categories, getRecueils } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Les recueils",
  description:
    "17 recueils de rituels inspirés de la sagesse de Kemet, pour l'abondance, la protection, l'amour, l'ancrage, les racines et les cycles lunaires.",
};

export default async function RecueilsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const recueils = getRecueils().filter(
    (p) => !categorie || p.categorie === categorie
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow mb-4">La pratique</p>
      <h1 className="text-3xl md:text-4xl text-papyrus mb-6">Les recueils</h1>
      <p className="text-papyrus-doux font-corps italic max-w-xl mb-12">
        Dix-sept recueils, chacun porteur de vingt rituels. Choisis celui qui
        parle à ce que tu traverses aujourd&apos;hui.
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/recueils"
          className={`eyebrow px-4 py-2 border ${
            !categorie
              ? "border-or text-or"
              : "border-ligne text-papyrus-doux hover:border-or/60"
          }`}
        >
          Tous
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/recueils?categorie=${c.id}`}
            className={`eyebrow px-4 py-2 border ${
              categorie === c.id
                ? "border-or text-or"
                : "border-ligne text-papyrus-doux hover:border-or/60"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recueils.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
