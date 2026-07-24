import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="eyebrow mb-4">Informations</p>
      <h1 className="text-3xl text-papyrus mb-10">
        Conditions générales de vente
      </h1>
      <div className="space-y-8 text-papyrus-doux font-corps leading-relaxed">
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">1. Objet</h2>
          <p>
            Les présentes conditions générales de vente (CGV) régissent les
            ventes de recueils numériques (fichiers PDF) réalisées sur le
            site {site.name}, édité par [à compléter].
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">2. Produits</h2>
          <p>
            Les produits vendus sont des fichiers numériques (PDF) livrés
            par voie électronique. Aucun support physique n&apos;est
            expédié.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">3. Prix et paiement</h2>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises. Le
            paiement s&apos;effectue en ligne, de façon sécurisée, via notre
            prestataire Stripe. La commande n&apos;est validée qu&apos;après
            confirmation du paiement.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">4. Livraison</h2>
          <p>
            Après confirmation du paiement, un email contenant un ou
            plusieurs liens de téléchargement sécurisés (valables 72 heures)
            est envoyé à l&apos;adresse renseignée lors de la commande.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            5. Droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L221-28 du Code de la
            consommation, le droit de rétractation ne peut être exercé pour
            les contenus numériques fournis sur un support immatériel dont
            l&apos;exécution a commencé après accord préalable exprès du
            consommateur et renoncement exprès à son droit de rétractation.
            Voir notre{" "}
            <a href="/retours" className="text-or underline">
              politique de retour
            </a>{" "}
            pour le détail.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            6. Responsabilité
          </h2>
          <p>
            Nos recueils proposent des pratiques symboliques de bien-être et
            de développement personnel. Ils ne constituent ni un avis
            médical, ni une garantie de résultat.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">7. Litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de
            litige, une solution amiable sera recherchée avant toute action
            judiciaire.
          </p>
        </section>
      </div>
    </div>
  );
}
