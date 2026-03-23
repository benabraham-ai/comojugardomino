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
      className="px-2 py-1 text-sm font-semibold border border-madera/30 rounded hover:bg-madera/10 transition-colors"
      aria-label={`Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
    >
      {label}
    </button>
  );
}
