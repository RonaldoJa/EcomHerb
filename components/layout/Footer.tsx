import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
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
    <footer className="bg-[#faf9f7] border-t border-[#dad4c8] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="rounded-[40px] border border-[#dad4c8] bg-white p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-10"
          style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}>

          {/* Brand + About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm font-bold">
                {STORE_NAME.charAt(0)}
              </span>
              <span className="font-semibold text-lg text-black">{STORE_NAME}</span>
            </div>
            <p className="text-[15px] text-[#55534e] leading-relaxed">
              Llevamos los mejores productos directamente a ti. Calidad garantizada, atención personalizada y el proceso de compra más sencillo posible.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href={STORE_INSTAGRAM} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl border border-[#dad4c8] hover:border-black hover:bg-[#faf9f7] transition-colors clay-btn-hover">
                {/* Instagram icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href={STORE_FACEBOOK} target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-xl border border-[#dad4c8] hover:border-black hover:bg-[#faf9f7] transition-colors clay-btn-hover">
                {/* Facebook icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[1.08px] text-[#9f9b93]">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[15px] text-[#55534e]">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#9f9b93]" />
                <a href={`mailto:${STORE_EMAIL}`} className="hover:text-black transition-colors">
                  {STORE_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[15px] text-[#55534e]">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#9f9b93]" />
                <a href={`https://wa.me/${STORE_PHONE.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="hover:text-black transition-colors">
                  {STORE_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[15px] text-[#55534e]">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#9f9b93]" />
                <span>{STORE_HOURS}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[1.08px] text-[#9f9b93]">
              Información
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Términos y Condiciones", href: "/terminos" },
                { label: "Política de Privacidad", href: "/privacidad" },
                { label: "Preguntas Frecuentes", href: "/faq" },
                { label: "Catálogo", href: "/catalogo" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-[15px] text-[#55534e] hover:text-black transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-[#9f9b93] mt-8">
          © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
