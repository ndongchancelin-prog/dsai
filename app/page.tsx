import Link from "next/link";
import GoldMedallion from "@/components/GoldMedallion";
import CategoryGrid from "@/components/CategoryGrid";
import CornerBracketFrame from "@/components/CornerBracketFrame";
import NewsletterForm from "@/components/NewsletterForm";
import { getCoffret, formatPrice, pricingDefaults, getRecueils } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function Home() {
  const coffret = getCoffret();
  const recueils = getRecueils();
  const totalUnite = recueils.length * pricingDefaults.recueilUnite;

  return (
    <div>
      {/* Hero */}
      <section className="relative radial-gold border-b border-ligne">
        <div className="mx-auto max-w-4xl px-6 py-28 md:py-40 flex flex-col items-center text-center">
          <GoldMedallion size={96} className="mb-8">
            <span className="font-titres text-lg">☥</span>
          </GoldMedallion>
          <p className="eyebrow mb-5">Maison Heka</p>
          <h1 className="text-4xl md:text-6xl text-papyrus leading-tight mb-6">
            {site.tagline}
          </h1>
          <p className="text-papyrus-doux font-corps italic text-lg max-w-xl mb-10">
            {site.manifesto}
          </p>
          <Link
            href="/coffret"
            className="eyebrow border border-or px-8 py-4 text-or hover:bg-or hover:text-obsidienne transition-colors"
          >
            Découvrir le coffret intégrale
          </Link>
        </div>
      </section>

      {/* Qu'est-ce que Heka */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow mb-4">La notion</p>
        <h2 className="text-3xl text-papyrus mb-6">Qu&apos;est-ce que Heka ?</h2>
        <p className="text-papyrus-doux font-corps italic text-lg leading-relaxed">
          Dans l&apos;Égypte ancienne, Heka désigne la force qui active la
          réalité par l&apos;intention. Ni magie de spectacle, ni prédiction —
          une discipline intérieure, transmise de génération en génération.
          Chaque recueil Maison Heka en est un fragment, mis à ta portée.
        </p>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-ligne">
        <p className="eyebrow mb-4 text-center">La pratique</p>
        <h2 className="text-3xl text-papyrus mb-12 text-center">
          Six chemins, un même rythme
        </h2>
        <CategoryGrid />
      </section>

      {/* Coffret highlight */}
      <section className="border-t border-ligne">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="eyebrow mb-4">Le coffret</p>
          <h2 className="text-3xl md:text-4xl text-papyrus mb-6">
            L&apos;intégrale — 340 rituels
          </h2>
          <p className="text-papyrus-doux font-corps italic text-lg max-w-xl mx-auto mb-10">
            {coffret.sousTitre}
          </p>
          <CornerBracketFrame className="border border-or/40 inline-block">
            <p className="text-papyrus-doux font-corps line-through">
              {formatPrice(totalUnite)}
            </p>
            <p className="font-titres text-3xl text-or-clair mb-2">
              {formatPrice(coffret.prix)}
            </p>
            <p className="eyebrow mb-6">{coffret.argument}</p>
            <Link
              href="/coffret"
              className="eyebrow border border-or px-6 py-3 text-or hover:bg-or hover:text-obsidienne transition-colors"
            >
              Voir le coffret
            </Link>
          </CornerBracketFrame>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="border-t border-ligne">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="eyebrow mb-12 text-center">Elles et ils en parlent</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                texte:
                  "Un rituel simple, mais qui m'a vraiment aidée à poser mes intentions le matin.",
                nom: "— Témoignage à venir",
              },
              {
                texte:
                  "La qualité d'écriture est rare. On sent une vraie transmission, pas du marketing.",
                nom: "— Témoignage à venir",
              },
              {
                texte:
                  "Le coffret est devenu mon compagnon du soir. Sobre, beau, apaisant.",
                nom: "— Témoignage à venir",
              },
            ].map((t, i) => (
              <div key={i} className="border border-ligne p-8">
                <p className="text-papyrus-doux font-corps italic mb-4">
                  &laquo; {t.texte} &raquo;
                </p>
                <p className="eyebrow text-xs">{t.nom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-ligne">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center flex flex-col items-center">
          <p className="eyebrow mb-4">Le journal de Heka</p>
          <h2 className="text-2xl text-papyrus mb-4">
            Reçois un rituel par email, chaque nouvelle lune.
          </h2>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
