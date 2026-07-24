import { Resend } from "resend";
import { site } from "./site";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error(
        "RESEND_API_KEY manquant. Ajoute-le dans tes variables d'environnement."
      );
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

function deliveryEmailHtml(links: { titre: string; url: string }[]) {
  const items = links
    .map(
      (l) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #EDE4D2;">
          <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:17px;color:#15120C;">${l.titre}</p>
          <a href="${l.url}" style="display:inline-block;padding:10px 20px;background:#C9A24B;color:#0B0B0B;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Télécharger le recueil</a>
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="background:#EDE4D2;padding:40px 16px;font-family:Georgia,serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #C9A24B;padding:32px;">
      <p style="font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;font-size:12px;color:#B5651D;margin:0 0 16px;">Maison Heka</p>
      <h1 style="font-family:Georgia,serif;font-size:22px;color:#15120C;margin:0 0 16px;">Ton recueil est prêt ✦</h1>
      <p style="color:#15120C;font-size:15px;line-height:1.6;">Merci pour ta confiance. La sagesse de Kemet t'attend, à ton rythme.</p>
      <table width="100%" style="border-collapse:collapse;margin:16px 0;">${items}</table>
      <p style="color:#B7AE99;font-size:13px;line-height:1.6;">Ce(s) lien(s) reste(nt) valide(s) 72 heures. Passé ce délai, réponds simplement à cet email et nous te renverrons ton recueil.</p>
      <p style="color:#15120C;font-size:15px;margin-top:24px;">Avec gratitude,<br/>L'équipe Maison Heka</p>
    </div>
  </div>`;
}

export async function sendDeliveryEmail(
  to: string,
  items: { titre: string; url: string }[]
) {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: `${site.name} <${site.email}>`,
    to,
    subject: "Ton recueil Maison Heka est prêt ✦",
    html: deliveryEmailHtml(items),
  });
  if (error) {
    throw new Error(`Échec de l'envoi de l'email de livraison: ${error.message}`);
  }
}
