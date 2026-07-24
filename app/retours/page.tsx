import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de retour" };

export default function RetoursPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="eyebrow mb-4">Informations</p>
      <h1 className="text-3xl text-papyrus mb-10">Politique de retour</h1>
      <div className="space-y-8 text-papyrus-doux font-corps leading-relaxed">
        <section>
          <p>
            Les recueils vendus sur {site.name} sont des contenus numériques
            (fichiers PDF) livrés immédiatement après paiement, par lien de
            téléchargement envoyé par email.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            Renonciation au droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L221-28, 13° du Code de la
            consommation, le droit de rétractation de 14 jours ne
            s&apos;applique pas à la fourniture d&apos;un contenu numérique
            non fourni sur un support matériel dont l&apos;exécution a
            commencé après accord préalable exprès du consommateur, qui a
            également renoncé expressément à son droit de rétractation.
          </p>
          <p className="mt-4">
            Concrètement : au moment de ta commande, tu coches une case
            confirmant que tu souhaites recevoir ton recueil immédiatement
            et que tu renonces, en conséquence, à ton droit de
            rétractation dès le téléchargement du fichier.
          </p>
        </section>
        <section>
          <h2 className="text-papyrus font-titres text-lg mb-2">
            Un souci avec ton fichier ?
          </h2>
          <p>
            Si le lien ne fonctionne pas, si le fichier est corrompu ou si
            tu n&apos;as pas reçu ton email, écris-nous à {site.email} : nous
            te renverrons ton recueil sans délai.
          </p>
        </section>
      </div>
    </div>
  );
}
