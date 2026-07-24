import Link from "next/link";
import { categories } from "@/lib/catalog";
import { footerLegalLinks, site } from "@/lib/site";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-ligne mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <p className="font-titres text-lg text-papyrus">{site.name}</p>
          <p className="text-papyrus-doux font-corps italic max-w-sm">
            {site.tagline}
          </p>
          <NewsletterForm />
        </div>
        <div>
          <p className="eyebrow mb-4">Catégories</p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/recueils?categorie=${c.id}`}
                  className="text-papyrus-doux hover:text-or transition-colors font-corps"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Informations</p>
          <ul className="space-y-2">
            {footerLegalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-papyrus-doux hover:text-or transition-colors font-corps"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ligne">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-papyrus-doux/70 font-labels tracking-wide">
          © {new Date().getFullYear()} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
