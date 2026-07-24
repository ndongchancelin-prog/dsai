import type { Metadata } from "next";
import Link from "next/link";
import GoldMedallion from "@/components/GoldMedallion";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false },
};

export default function MerciPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-28 text-center flex flex-col items-center">
      <GoldMedallion size={100} className="mb-8">
        <span className="font-titres text-lg">✦</span>
      </GoldMedallion>
      <p className="eyebrow mb-4">Commande confirmée</p>
      <h1 className="text-3xl md:text-4xl text-papyrus mb-6">
        Merci pour ta confiance
      </h1>
      <p className="text-papyrus-doux font-corps italic text-lg mb-4">
        Ton recueil t&apos;attend déjà. Le lien de téléchargement vient de
        t&apos;être envoyé par email — vérifie aussi tes courriers
        indésirables si besoin.
      </p>
      <p className="text-papyrus-doux font-corps text-sm mb-10">
        Le lien reste valide 72 heures. En cas de souci, réponds simplement à
        cet email et nous te renverrons ton recueil.
      </p>
      <Link
        href="/recueils"
        className="eyebrow border border-or px-6 py-3 text-or hover:bg-or hover:text-obsidienne transition-colors"
      >
        Poursuivre la pratique
      </Link>
    </div>
  );
}
