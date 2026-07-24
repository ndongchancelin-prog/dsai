import Link from "next/link";
import { categories } from "@/lib/catalog";
import GoldMedallion from "./GoldMedallion";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/recueils?categorie=${c.id}`}
          className="group flex flex-col items-center text-center gap-4 p-8 border border-ligne hover:border-or/60 transition-colors"
        >
          <GoldMedallion size={64} className="group-hover:border-or transition-colors">
            <span className="font-titres text-xs">✦</span>
          </GoldMedallion>
          <span className="font-titres text-sm text-papyrus">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
