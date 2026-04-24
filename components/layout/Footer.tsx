"use client";

import Link from "next/link";
import {
  STORE_NAME,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_HOURS,
  STORE_INSTAGRAM,
  STORE_FACEBOOK,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer style={{ background: "#052e16" }} className="mt-20 px-4 sm:px-6 pt-12 pb-7">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: "linear-gradient(135deg,#14532d,#16a34a)" }}
              >
                🌿
              </div>
              <span className="font-bold text-[15px] text-white">{STORE_NAME}</span>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Suplementos deportivos naturales para llevar tu rendimiento al siguiente nivel.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={STORE_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={STORE_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] mb-3" style={{ color: "#4ade80" }}>
              Tienda
            </p>
            <ul className="space-y-2">
              {[
                { label: "Catálogo", href: "/catalogo" },
                { label: "Preguntas Frecuentes", href: "/faq" },
                { label: "Términos y Condiciones", href: "/terminos" },
                { label: "Política de Privacidad", href: "/privacidad" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] mb-3" style={{ color: "#4ade80" }}>
              Contacto
            </p>
            <ul className="space-y-2">
              <li className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                📞{" "}
                <a
                  href={`https://wa.me/${STORE_PHONE.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {STORE_PHONE}
                </a>
              </li>
              <li className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                ✉️{" "}
                <a href={`mailto:${STORE_EMAIL}`} className="hover:text-white transition-colors">
                  {STORE_EMAIL}
                </a>
              </li>
              <li className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                🕐 {STORE_HOURS}
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos reservados.
          </span>
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Hecho con 💚
          </span>
        </div>
      </div>
    </footer>
  );
}
