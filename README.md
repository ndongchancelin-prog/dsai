# Maison Heka — Boutique en ligne

Boutique e-commerce pour Maison Heka : 17 recueils de rituels + 1 coffret
intégrale, en PDF, vendus et livrés automatiquement par email après
paiement.

Stack : Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Stripe ·
Supabase (Postgres + Storage) · Resend · Vercel.

## 1. Installer le projet

```bash
npm install
```

## 2. Configurer les variables d'environnement

Copie `.env.example` en `.env.local` et remplis chaque valeur :

```bash
cp .env.example .env.local
```

| Variable | Où la trouver |
| --- | --- |
| `STRIPE_SECRET_KEY` | Dashboard Stripe > Developers > API keys |
| `STRIPE_WEBHOOK_SECRET` | Créé à l'étape 4 ci-dessous |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Dashboard Stripe > Developers > API keys |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | Projet Supabase > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Projet Supabase > Settings > API (clé secrète, jamais exposée côté client) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Projet Supabase > Settings > API |
| `RESEND_API_KEY` | resend.com > API Keys |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` en local, ton domaine en prod |

## 3. Préparer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Ouvre l'éditeur SQL et exécute le contenu de `supabase/schema.sql`
   (crée la table `orders`).
3. Va dans **Storage > New bucket**, nomme-le `ebooks`, et laisse
   **"Public bucket" désactivé** (le bucket doit rester privé — c'est ce
   qui garantit que les PDF ne sont jamais accessibles sans achat).
4. Uploade les 17 recueils + le coffret dans ce bucket, avec exactement
   les noms de fichiers listés dans `lib/catalog.ts` (champ `pdf`), par
   exemple `pack-01-abondance-financiere.pdf`.

Les fichiers PDF eux-mêmes ne sont **jamais** commités dans ce repo.

## 4. Configurer le webhook Stripe

En local, utilise le [Stripe CLI](https://stripe.com/docs/stripe-cli) :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

La commande affiche un `whsec_...` à copier dans `STRIPE_WEBHOOK_SECRET`.

En production (sur Vercel), crée un endpoint webhook dans le Dashboard
Stripe pointant vers `https://ton-domaine.fr/api/webhook`, écoutant
l'événement `checkout.session.completed`, et copie le secret généré dans
les variables d'environnement Vercel.

## 5. Lancer le site en local

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## 6. Tester un achat (mode test)

1. Va sur une fiche produit, clique "Acheter".
2. Utilise une carte de test Stripe : `4242 4242 4242 4242`, une date
   future, n'importe quel CVC.
3. Après paiement, tu es redirigé vers `/merci` et un email de livraison
   (lien de téléchargement valable 72h) part via Resend.

## 7. Déployer sur Vercel

1. Pousse le repo sur GitHub (déjà fait si tu lis ceci depuis la branche
   de travail).
2. Importe le projet sur [vercel.com](https://vercel.com/new).
3. Renseigne toutes les variables d'environnement de l'étape 2 dans les
   réglages du projet Vercel (Production + Preview).
4. Une fois déployé, reconfigure le webhook Stripe pour pointer vers ton
   URL de production, et mets à jour `NEXT_PUBLIC_SITE_URL`.

## Structure du projet

```
app/                     Pages et routes API (App Router)
  recueils/               Catalogue + fiche produit
  coffret/                Page dédiée au coffret intégrale
  journal/                Blog
  api/checkout/           Création de la session Stripe Checkout
  api/webhook/            Réception du paiement, livraison
  mentions-legales/, cgv/, confidentialite/, retours/   Pages légales
components/               Design system (CornerBracketFrame, GoldMedallion, ...)
lib/                      Catalogue produits, clients Stripe/Supabase/Resend
supabase/schema.sql       Schéma de la table `orders`
```

## Décisions prises pendant la construction

- **Tailwind v4** : `create-next-app` a scaffoldé le projet en Tailwind
  v4 (config CSS native via `@theme`, pas de `tailwind.config.js`). Les
  couleurs et polices de la charte sont définies dans `app/globals.css`.
- **Clients Stripe/Supabase/Resend paresseux** : chaque client
  (`lib/stripe.ts`, `lib/supabase.ts`, `lib/resend.ts`) n'est instancié
  qu'au premier appel, pour que `npm run build` réussisse même sans clés
  API configurées (utile en CI ou en aperçu).
- **Panier** : le brief ne détaillait pas de panier multi-produits ; le
  parcours d'achat actuel est "un produit = un paiement" (le coffret
  inclus). Une extension panier est possible plus tard en étendant
  `BuyButton` et `/api/checkout` pour accepter plusieurs `slugs`.
- **Newsletter** : le formulaire en pied de page est prêt côté UI mais
  n'est pas encore branché à un fournisseur (à connecter, par exemple, à
  Resend Audiences).
- **Témoignages** : la section "Elles et ils en parlent" sur la page
  d'accueil utilise des textes de substitution ([à compléter]) en
  attendant de vrais retours clients.

## Garde-fous bien-être

Chaque fiche produit et le coffret affichent un disclaimer rappelant
qu'il s'agit de pratiques symboliques de bien-être, sans promesse de
résultat ni substitut à un accompagnement médical, psychologique ou de
sécurité réelle (voir `lib/catalog.ts`, champ `disclaimer`).
