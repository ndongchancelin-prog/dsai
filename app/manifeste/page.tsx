import type { Metadata } from "next";
import GoldMedallion from "@/components/GoldMedallion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Le manifeste",
  description: site.manifesto,
};

export default function ManifestePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <div className="flex flex-col items-center text-center mb-16">
        <GoldMedallion size={96} className="mb-8">
          <span className="font-titres text-lg">☥</span>
        </GoldMedallion>
        <p className="eyebrow mb-4">Le manifeste</p>
        <h1 className="text-3xl md:text-4xl text-papyrus">
          {site.manifesto}
        </h1>
      </div>

      <div className="space-y-8 text-papyrus-doux font-corps text-lg leading-relaxed">
        <p>
          Maison Heka est née d&apos;une conviction simple : la sagesse de
          Kemet — l&apos;Égypte ancienne — n&apos;a jamais cessé de
          nous parler. Elle attend seulement d&apos;être réveillée, avec
          justesse et respect.
        </p>
        <p>
          <em>Heka</em>{" "}
          désigne, dans la pensée égyptienne, la force qui
          active la réalité par l&apos;intention. Ce n&apos;est pas un
          pouvoir surnaturel réservé à quelques initiés — c&apos;est une
          discipline du quotidien, faite de gestes, de mots et de silences
          choisis.
        </p>
        <p>
          Nous ne vendons pas des prédictions. Nous ne promettons ni
          richesse, ni amour garanti, ni guérison. Nous transmettons une
          reconnexion : à ton corps, à ton foyer, à tes racines, à ce qui
          est déjà là, en toi, avant même que tu ne le cherches.
        </p>
        <p>
          Chaque recueil est écrit comme on transmettrait un secret de
          famille — avec sobriété, avec âme, sans grandiloquence. Nos mots
          sont choisis en conscience : jamais de certitude, toujours une
          invitation.
        </p>
        <p>
          Si tu cherches une méthode miracle, ce n&apos;est pas ici. Si tu
          cherches un espace pour ralentir, t&apos;ancrer et te reconnecter
          à une sagesse plus ancienne que toi, alors bienvenue à la Maison.
        </p>
      </div>
    </div>
  );
}
