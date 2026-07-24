import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="eyebrow mb-4">Informations</p>
      <h1 className="text-3xl text-papyrus mb-10">
        Politique de confidentialité
      </h1>
      <div className="space-y-8 text-papyrus-doux font-corps leading-relaxed">
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            1. Données collectées
          </h2>
          <p>
            Lors d&apos;une commande, nous collectons : ton adresse email et
            les produits achetés. Lors d&apos;une inscription à la
            newsletter, nous collectons ton adresse email.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            2. Base légale et finalité
          </h2>
          <p>
            Ces données sont traitées pour l&apos;exécution du contrat de
            vente (livraison du recueil par email) et, avec ton
            consentement, pour l&apos;envoi de notre newsletter.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            3. Destinataires et sous-traitants
          </h2>
          <p>
            Stripe (paiement), Supabase (stockage sécurisé des fichiers et
            des commandes) et Resend (envoi des emails) traitent tout ou
            partie de ces données en tant que sous-traitants, dans le cadre
            strict de la prestation fournie.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            4. Durée de conservation
          </h2>
          <p>
            Les données de commande sont conservées le temps nécessaire aux
            obligations légales et comptables. Tu peux demander la
            suppression de ton adresse email de notre newsletter à tout
            moment.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">5. Tes droits</h2>
          <p>
            Conformément au RGPD, tu disposes d&apos;un droit
            d&apos;accès, de rectification, d&apos;effacement et
            d&apos;opposition sur tes données. Pour l&apos;exercer, écris-nous
            à {site.email}.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">6. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires à
            son fonctionnement (panier, session de paiement). Aucun cookie
            publicitaire tiers n&apos;est déposé sans ton consentement.
          </p>
        </section>
      </div>
    </div>
  );
}
