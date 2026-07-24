import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/** Lazily instantiated so the app can build/boot without STRIPE_SECRET_KEY set. */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY manquant. Ajoute-le dans tes variables d'environnement."
      );
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}
