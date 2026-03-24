"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/sobre" as const, label: t("about") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex items-center justify-center w-10 h-10 text-cream hover:text-pegue-red transition-colors duration-200"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out origin-center ${
              isOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-200 ease-out ${
              isOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out origin-center ${
              isOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-espresso/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Full-screen Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 transform transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Menu background */}
        <div className="absolute inset-0 bg-espresso" />

        {/* Menu content - centered */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`w-full text-center py-4 text-xl font-semibold tracking-wide rounded-xl transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-pegue-red bg-pegue-red/10"
                    : "text-cream hover:text-pegue-red hover:bg-cream/5"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div
            className="my-8 w-16 h-px bg-cream/20"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 75}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          />

          {/* Language Switcher */}
          <div
            className="flex items-center gap-3"
            style={{
              transitionDelay: isOpen ? `${(navLinks.length + 1) * 75}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            <span className="text-sm text-cream-muted">Idioma:</span>
            <LanguageSwitcher />
          </div>

          {/* CTA Button */}
          <div
            className="mt-10 w-full max-w-xs"
            style={{
              transitionDelay: isOpen ? `${(navLinks.length + 2) * 75}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            <Link
              href="/waitlist"
              onClick={closeMenu}
              className="block w-full text-center py-4 btn-coral text-white text-lg font-bold rounded-xl"
            >
              {t("play")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
