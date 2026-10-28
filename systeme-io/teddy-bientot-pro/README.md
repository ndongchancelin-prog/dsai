# Teddy Academy - Capture e-book « Bientôt pro »

Calque d'animation des deux pages du tunnel Systeme.io « Teddy Academy - Capture e-book Bientôt pro ».

Le connecteur Systeme.io ne peut pas écrire le code d'un bloc « HTML brut », ni la source d'une image.
Ces deux étapes se font à la main dans l'éditeur.

## 1. Coller le calque d'animation

| Page | Bloc | Fichier |
| --- | --- | --- |
| Page de capture | bloc « HTML brut » en haut de la colonne de gauche du hero | `capture-motion.html` |
| Page de remerciement | bloc « HTML brut » en haut de la page | `merci-motion.html` |

Dans l'éditeur : clic sur le bloc HTML brut, puis colle tout le contenu du fichier, puis enregistre.

Le script repère les éléments par leur texte : « BIENTÔT PRO », « Recevoir mon guide gratuit » et « Mentions légales ».
Si tu changes un de ces textes, change aussi la constante correspondante en haut du script.

## 2. Remplacer les images

| Emplacement | Image |
| --- | --- |
| Page de capture, colonne de droite du hero (image générée provisoire) | `hero_hand_ebook` |
| Page de capture, section Teddy, photo de gauche (vide) | `teddy_photo_1` |
| Page de capture, section Teddy, photo de droite (vide) | `teddy_photo_2` |
| Page de remerciement, au-dessus du titre (vide) | `ebook_cover` |

Le fondu des bords du hero (masque radial) est appliqué automatiquement par le calque : ne mets ni bordure ni ombre sur l'image.

## Ce que fait le calque

- Titre : lettres qui montent une par une, puis un reflet doré toutes les 8 s.
- Sous-titre, accroche et formulaire : montée ligne par ligne, 150 ms d'écart.
- Image du hero : fondu, zoom de 0,96 à 1, respiration lente (8 s), lueur dorée qui pulse, parallaxe souris (bureau) ou défilement (mobile).
- 18 particules dorées discrètes dans le hero.
- Champs en verre sombre, anneau doré au focus. Bouton doré avec reflet toutes les 4 s, élévation au survol, pression au clic, chargement puis coche dorée à l'envoi.
- Sections révélées au défilement (24 px, 600 ms). Photos de Teddy qui arrivent de chaque côté.
- Bandeau final en dégradé marine vers indigo avec lumière dorée. Son bouton fait défiler jusqu'au formulaire et met le focus sur « Prénom ».
- Mobile : titre et sous-titre, puis l'image, puis le formulaire.
- `prefers-reduced-motion` : plus de respiration, parallaxe, reflets ni particules, seulement des fondus.
