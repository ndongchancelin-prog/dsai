"use client";

import { useState } from "react";

export default function BuyButton({
  slugs,
  label = "Acheter",
  className = "",
}: {
  slugs: string[];
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Impossible de démarrer le paiement.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`eyebrow border border-or px-8 py-4 text-or hover:bg-or hover:text-obsidienne transition-colors disabled:opacity-50 ${className}`}
      >
        {loading ? "Un instant..." : label}
      </button>
      {error && <p className="text-ocre text-sm mt-3 font-corps">{error}</p>}
    </div>
  );
}
