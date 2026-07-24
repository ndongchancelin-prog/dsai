import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ligne bg-obsidienne/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-titres text-lg tracking-wide text-papyrus">
          {site.name}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-papyrus-doux hover:text-or transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/coffret"
          className="eyebrow border border-or px-4 py-2 text-or hover:bg-or hover:text-obsidienne transition-colors"
        >
          Le coffret
        </Link>
      </div>
    </header>
  );
}
