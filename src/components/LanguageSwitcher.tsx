"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "es" ? "en" : "es";
  const label = locale === "es" ? "EN" : "ES";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="glass-button px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-md hover:text-cream transition-all text-cream-muted"
      aria-label={`Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
    >
      {label}
    </button>
  );
}
