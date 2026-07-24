import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/catalog";
import { recordOrder, createSignedDownloadUrl } from "@/lib/supabase";
import { sendDeliveryEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Configuration webhook manquante." },
      { status: 400 }
    );
  }

  const payload = await req.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Signature webhook invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email;
    const slugs = (session.metadata?.slugs ?? "").split(",").filter(Boolean);

    if (!email || slugs.length === 0) {
      console.error("Session Stripe sans email ou sans produits", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      const products = slugs
        .map(getProductBySlug)
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

      const links = await Promise.all(
        products.map(async (p) => ({
          titre: p.titre,
          url: await createSignedDownloadUrl(p.pdf),
        }))
      );

      await recordOrder({
        email,
        produits: slugs,
        stripe_session_id: session.id,
        statut: "paid",
      });

      await sendDeliveryEmail(email, links);

      await recordOrder({
        email,
        produits: slugs,
        stripe_session_id: session.id,
        statut: "delivered",
      });
    } catch (error) {
      console.error("Échec de la livraison de la commande:", error);
      // Stripe retente automatiquement les webhooks en échec.
      return NextResponse.json({ error: "Échec de livraison." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
