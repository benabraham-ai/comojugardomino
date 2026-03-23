"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/sobre" as const, label: t("about") },
  ];

  return (
    <header className="border-b border-madera/20 bg-hueso/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl text-cafecito">
          ComoJugarDomino
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-terracota ${
                pathname === link.href
                  ? "text-terracota font-semibold"
                  : "text-cafecito/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="https://domino-dev.benabraham.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-terracota text-hueso text-sm font-semibold rounded-lg hover:bg-terracota/90 transition-colors"
          >
            {t("play")}
          </a>
        </div>
      </div>
    </header>
  );
}
