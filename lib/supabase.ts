import { createClient, SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Server-only client using the service role key. Never import this from
 * client components — it bypasses Row Level Security.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants. Ajoute-les dans tes variables d'environnement."
      );
    }
    adminClient = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}

export const EBOOKS_BUCKET = "ebooks";
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 72; // 72h

/** Generates a short-lived signed download URL for a PDF in the private ebooks bucket. */
export async function createSignedDownloadUrl(pdfObjectName: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from(EBOOKS_BUCKET)
    .createSignedUrl(pdfObjectName, SIGNED_URL_TTL_SECONDS);

  if (error || !data) {
    throw new Error(
      `Impossible de générer l'URL signée pour ${pdfObjectName}: ${error?.message}`
    );
  }
  return data.signedUrl;
}

export type OrderStatus = "pending" | "paid" | "delivered" | "failed";

export type OrderRecord = {
  email: string;
  produits: string[]; // slugs
  stripe_session_id: string;
  statut: OrderStatus;
};

export async function recordOrder(order: OrderRecord) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("orders").upsert(
    {
      email: order.email,
      produits: order.produits,
      stripe_session_id: order.stripe_session_id,
      statut: order.statut,
    },
    { onConflict: "stripe_session_id" }
  );
  if (error) {
    throw new Error(`Impossible d'enregistrer la commande: ${error.message}`);
  }
}
