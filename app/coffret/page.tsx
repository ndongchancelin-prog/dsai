import type { Metadata } from "next";
import { categories, getCoffret, getRecueils, formatPrice, pricingDefaults } from "@/lib/catalog";
import GoldMedallion from "@/components/GoldMedallion";
import BuyButton from "@/components/BuyButton";
import CornerBracketFrame from "@/components/CornerBracketFrame";
import WellbeingDisclaimer from "@/components/WellbeingDisclaimer";

export const metadata: Metadata = {
  title: "Le coffret intégrale",
  description:
    "340 rituels, 17 recueils, toute la sagesse de Maison Heka réunie en un seul coffret.",
};

export default function CoffretPage() {
  const coffret = getCoffret();
  const recueils = getRecueils();
  const totalUnite = recueils.length * pricingDefaults.recueilUnite;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      <GoldMedallion size={140} className="mx-auto mb-8">
        <span className="font-titres text-xl">✦</span>
      </GoldMedallion>
      <p className="eyebrow mb-4">L&apos;intégrale</p>
      <h1 className="text-4xl md:text-5xl text-papyrus mb-6">
        340 Rituels de Kemet
      </h1>
      <p className="text-papyrus-doux font-corps italic text-lg max-w-2xl mx-auto mb-10">
        {coffret.sousTitre} 17 recueils, un seul geste.
      </p>

      <CornerBracketFrame className="border border-or/40 inline-block mb-12">
        <p className="text-papyrus-doux font-corps line-through text-lg">
          {formatPrice(totalUnite)}
        </p>
        <p className="font-titres text-4xl text-or-clair mb-2">
          {formatPrice(coffret.prix)}
        </p>
        <p className="eyebrow mb-6">{coffret.argument}</p>
        <BuyButton slugs={[coffret.slug]} label={`Recevoir le coffret — ${formatPrice(coffret.prix)}`} />
      </CornerBracketFrame>

      <div className="text-left mb-16">
        <p className="eyebrow mb-6 text-center">Sommaire des 6 catégories</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="border border-ligne p-6">
              <p className="font-titres text-papyrus mb-2">{c.name}</p>
              <ul className="text-sm text-papyrus-doux font-corps space-y-1">
                {recueils
                  .filter((p) => p.categorie === c.id)
                  .map((p) => (
                    <li key={p.slug}>— {p.titre}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-left max-w-xl mx-auto">
        <WellbeingDisclaimer text="Ce coffret rassemble des pratiques symboliques de bien-être et de développement personnel. Il ne remplace aucun accompagnement médical, psychologique ou de sécurité réelle." />
      </div>
    </div>
  );
}
