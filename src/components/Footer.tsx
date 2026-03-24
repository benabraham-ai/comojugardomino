import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const contentLinks = [
    { href: "/blog" as const, label: t("links.blog") },
    { href: "/blog?category=reglas" as const, label: t("links.rules") },
    { href: "/blog?category=estrategia" as const, label: t("links.strategy") },
    { href: "/blog?category=cultura" as const, label: t("links.culture") },
  ];

  const resourceLinks = [
    { href: "/blog?category=reglas" as const, label: t("links.beginnerGuide") },
    { href: "/blog?category=variantes" as const, label: t("links.variants") },
    { href: "/blog?category=psicologia" as const, label: t("links.psychology") },
  ];

  const communityLinks = [
    { href: "/waitlist" as const, label: t("links.waitlist"), internal: true },
    { href: "#", label: "Discord", internal: false },
    { href: "#", label: "Instagram", internal: false },
    { href: "#", label: "YouTube", internal: false },
  ];

  return (
    <footer className="mt-16 bg-dark-deep border-t border-cream/10">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/icon-light.svg" alt="" className="w-8 h-8" />
              <span className="font-outfit font-extrabold text-xl">
                <span className="text-cream">domino</span>
                <span className="text-earth-olive-light">live</span>
                <span className="text-coral">.</span>
                <span className="text-cream-muted">com</span>
              </span>
            </div>
            <p className="text-cream font-semibold text-lg mb-2">
              {t("brandTagline")}
            </p>
            <p className="text-cream-muted text-sm leading-relaxed">
              {t("brandDescription")}
            </p>
          </div>

          {/* Column 2: Contenido */}
          <div>
            <h3 className="text-cream font-bold text-sm uppercase tracking-wider mb-4">
              {t("columns.content")}
            </h3>
            <ul className="space-y-3">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-muted text-sm hover:text-coral transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div>
            <h3 className="text-cream font-bold text-sm uppercase tracking-wider mb-4">
              {t("columns.resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream-muted text-sm hover:text-coral transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Comunidad */}
          <div>
            <h3 className="text-cream font-bold text-sm uppercase tracking-wider mb-4">
              {t("columns.community")}
            </h3>
            <ul className="space-y-3">
              {communityLinks.map((link) =>
                link.internal ? (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream-muted text-sm hover:text-coral transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream-muted text-sm hover:text-coral transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        className="w-3 h-3 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/5 bg-dark-deep">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-cream-muted text-xs order-2 sm:order-1">
              &copy; {year} DominoLive. {t("rights")}
            </p>

            {/* Center: Language Switcher */}
            <div className="order-1 sm:order-2">
              <LanguageSwitcher />
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 order-3">
              <a
                href="#"
                className="text-cream-muted text-xs hover:text-coral transition-colors"
              >
                {t("legal.privacy")}
              </a>
              <span className="text-cream/20">|</span>
              <a
                href="#"
                className="text-cream-muted text-xs hover:text-coral transition-colors"
              >
                {t("legal.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
