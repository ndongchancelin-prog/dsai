import { formatPrice } from "@/lib/catalog";

export default function PriceBadge({
  prix,
  className = "",
}: {
  prix: number;
  className?: string;
}) {
  return (
    <span
      className={`font-labels text-or-clair tracking-wide text-sm ${className}`}
    >
      {formatPrice(prix)}
    </span>
  );
}
