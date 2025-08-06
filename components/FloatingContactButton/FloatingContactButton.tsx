"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, PhoneCall } from "lucide-react";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start space-y-2">
      {/* Sekundarne opcije - vidi se samo kad je otvoreno */}
      {open && (
        <div className="flex flex-col items-start space-y-2 animate-fade-in-up">
          {/* Poziv - automatski poziva broj */}
          <a
            href="tel:+381641234567"
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow transition"
            aria-label="Pozovi"
          >
            <PhoneCall size={20} />
          </a>

          {/* Kontakt stranica */}
          <Link
            href="/kontakt"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow transition"
            aria-label="Kontakt stranica"
          >
            <Mail size={20} />
          </Link>
        </div>
      )}

      {/* Glavno dugme - prikazano uvek */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition-all"
        aria-label="Otvori kontakt opcije"
      >
        <Phone size={24} />
      </button>
    </div>
  );
}
