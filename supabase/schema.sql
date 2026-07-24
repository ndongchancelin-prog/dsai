-- Maison Heka — schéma Supabase
-- À exécuter dans l'éditeur SQL de ton projet Supabase.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  produits text[] not null,
  stripe_session_id text not null unique,
  statut text not null check (statut in ('pending', 'paid', 'delivered', 'failed')),
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (email);

-- Row Level Security : seule la clé "service role" (utilisée côté serveur
-- uniquement, dans /api/webhook) peut lire/écrire cette table.
alter table public.orders enable row level security;

-- Aucune policy publique n'est créée : par défaut, RLS bloque tout accès
-- client. Le service role bypass RLS, ce qui est le comportement voulu ici.

-- Bucket de stockage privé pour les PDF (à créer une fois, via le Dashboard
-- Supabase > Storage > New bucket > nom "ebooks", "Public bucket" DÉSACTIVÉ).
-- Uploade ensuite les 17 recueils + le coffret dans ce bucket, avec les noms
-- de fichiers exacts listés dans lib/catalog.ts (champ "pdf").
