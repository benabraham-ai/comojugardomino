import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-madera/20 bg-cafecito text-hueso/80 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading text-lg text-hueso">ComoJugarDomino</p>
            <p className="text-sm mt-1">{t("tagline")}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://domino-dev.benabraham.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-terracota text-hueso text-sm font-semibold rounded-lg hover:bg-terracota/90 transition-colors"
            >
              {t("play")}
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-hueso/10 text-center text-xs text-hueso/50">
          &copy; {year} ComoJugarDomino. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
