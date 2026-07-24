import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Le journal",
  description:
    "Réflexions et éclairages sur la sagesse de Kemet, le bien-être et les rituels du quotidien.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow mb-4">Le journal</p>
      <h1 className="text-3xl md:text-4xl text-papyrus mb-12">
        Réflexions & transmissions
      </h1>
      <div className="space-y-10">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/journal/${a.slug}`}
            className="block border-t border-ligne pt-8 group"
          >
            <p className="eyebrow mb-3">
              {new Date(a.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h2 className="text-2xl text-papyrus mb-3 group-hover:text-or transition-colors">
              {a.titre}
            </h2>
            <p className="text-papyrus-doux font-corps italic">{a.extrait}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
