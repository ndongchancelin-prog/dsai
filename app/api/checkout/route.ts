import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/catalog";
import { site } from "@/lib/site";

const bodySchema = z.object({
  slugs: z.array(z.string()).min(1),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const products = parsed.slugs.map(getProductBySlug);
  if (products.some((p) => !p)) {
    return NextResponse.json(
      { error: "Un ou plusieurs produits sont introuvables." },
      { status: 404 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: products.map((p) => ({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(p!.prix * 100),
          product_data: {
            name: p!.titre,
            description: p!.sousTitre,
          },
        },
      })),
      customer_email: parsed.email,
      metadata: {
        slugs: parsed.slugs.join(","),
      },
      success_url: `${site.url}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site.url}/recueils/${parsed.slugs[0]}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur création session Stripe:", error);
    return NextResponse.json(
      { error: "Impossible de démarrer le paiement pour le moment." },
      { status: 500 }
    );
  }
}
