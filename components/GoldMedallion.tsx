import { ReactNode } from "react";

/** Round gold-rimmed medallion used to illustrate a product or ritual. */
export default function GoldMedallion({
  children,
  size = 96,
  className = "",
}: {
  children?: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full border border-or/60 flex items-center justify-center bg-nuit radial-gold ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-1.5 rounded-full border border-or/25" />
      <div className="relative text-or">{children}</div>
    </div>
  );
}
