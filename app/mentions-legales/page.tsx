import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="eyebrow mb-4">Informations</p>
      <h1 className="text-3xl text-papyrus mb-10">Mentions légales</h1>
      <div className="space-y-8 text-papyrus-doux font-corps leading-relaxed">
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">Éditeur du site</h2>
          <p>
            {site.name}
            <br />
            Statut juridique : [à compléter]
            <br />
            Numéro SIREN/SIRET : [à compléter]
            <br />
            Adresse du siège social : [à compléter]
            <br />
            Directeur de la publication : [à compléter]
            <br />
            Contact : {site.email}
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">Hébergement</h2>
          <p>
            Hébergeur : Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA
            91789, États-Unis.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur {site.name} (textes,
            visuels, recueils PDF, éléments graphiques) est protégé par le
            droit d&apos;auteur. Toute reproduction ou diffusion non
            autorisée est interdite.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">Médiation</h2>
          <p>
            En cas de litige, le client peut recourir à une médiation
            conventionnelle. Coordonnées du médiateur : [à compléter].
          </p>
        </section>
      </div>
    </div>
  );
}
