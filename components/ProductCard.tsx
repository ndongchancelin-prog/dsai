import Link from "next/link";
import { Product } from "@/lib/catalog";
import GoldMedallion from "./GoldMedallion";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/recueils/${product.slug}`}
      className="group flex flex-col items-center text-center p-6 border border-ligne hover:border-or/60 transition-colors"
    >
      <GoldMedallion size={80} className="mb-5 group-hover:border-or transition-colors">
        <span className="font-titres text-xs">✦</span>
      </GoldMedallion>
      <h3 className="font-titres text-base text-papyrus mb-2">
        {product.titre}
      </h3>
      <p className="text-papyrus-doux text-sm font-corps italic mb-4 flex-1">
        {product.sousTitre}
      </p>
      <PriceBadge prix={product.prix} />
    </Link>
  );
}
