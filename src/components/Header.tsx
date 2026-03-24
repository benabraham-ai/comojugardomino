"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navLinks = [
    { href: "/" as const, label: t("home"), exact: true },
    { href: "/blog" as const, label: t("blog"), exact: false },
    { href: "/sobre" as const, label: t("about"), exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="glass-navbar sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/icon-light.svg" alt="" className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="font-outfit font-800 text-lg">
            <span className="text-cream">domino</span>
            <span className="text-caribe-teal">live</span>
            <span className="text-pegue-red">.</span>
            <span className="text-cream-muted">com</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-all hover:text-pegue-red ${
                isActive(link.href, link.exact)
                  ? "text-pegue-red"
                  : "text-cream-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/waitlist"
            className="inline-flex items-center px-4 py-2 btn-coral text-white text-sm font-bold rounded-lg"
          >
            {t("play")}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}
