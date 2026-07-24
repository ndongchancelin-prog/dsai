export type Article = {
  slug: string;
  titre: string;
  extrait: string;
  date: string;
  contenu: string[];
};

export const articles: Article[] = [
  {
    slug: "quest-ce-que-heka",
    titre: "Qu'est-ce que Heka ? La magie du quotidien selon Kemet",
    extrait:
      "Dans l'Égypte ancienne, Heka n'était ni un tour de magie ni une prédiction. C'était la force qui active la réalité par l'intention.",
    date: "2026-01-12",
    contenu: [
      "Dans la pensée de Kemet — l'Égypte ancienne —, Heka est à la fois une divinité et un principe : la force fondamentale qui permet à la parole et à l'intention de façonner le réel. Avant les dieux eux-mêmes, disent certains textes, il y avait Heka.",
      "Ce n'est pas de la magie de spectacle. Il n'y a ni tour de passe-passe, ni promesse de miracle. Heka est une discipline : elle demande de la présence, de la répétition, et une intention claire. C'est un savoir-faire du quotidien — allumer une lampe, prononcer un mot, poser un geste — répété avec constance jusqu'à ce qu'il devienne une seconde nature.",
      "Les prêtres et prêtresses de Kemet pratiquaient Heka dans les temples comme dans les foyers. Protection du seuil de la maison, purification avant un repas, rituel du matin pour ouvrir la journée avec justesse : la magie du quotidien n'était pas réservée à une élite, elle irriguait toute la vie sociale.",
      "Chez Maison Heka, nous nous inspirons de cette idée sans prétendre la reconstituer à l'identique. Nous ne proposons pas un rite religieux, mais une pratique symbolique de bien-être : des gestes courts, une intention posée, un moment pour toi. Rien de plus, rien de moins qu'une reconnexion.",
      "Heka ne prédit rien. Elle active ce qui est déjà en toi — ta capacité à choisir, à te recentrer, à avancer avec plus de clarté. C'est tout le sens de nos recueils : te transmettre des rituels, pas des certitudes.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
