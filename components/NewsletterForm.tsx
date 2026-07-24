"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: brancher sur un provider newsletter (Resend Audiences, etc.)
        setStatus("sent");
      }}
    >
      <input
        type="email"
        required
        placeholder="Ton adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent border border-ligne px-4 py-3 text-papyrus placeholder:text-papyrus-doux font-corps focus:outline-none focus:border-or"
      />
      <button
        type="submit"
        className="eyebrow border border-or px-6 py-3 text-or hover:bg-or hover:text-obsidienne transition-colors"
      >
        {status === "sent" ? "Merci ✦" : "S'inscrire"}
      </button>
    </form>
  );
}
