import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "about",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("about");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl mb-6">{t("title")}</h1>
      <p className="text-lg leading-relaxed text-cafecito/80 mb-8">
        {t("description")}
      </p>

      <div className="bg-gradient-to-br from-cafecito to-madera rounded-xl p-8 text-hueso">
        <h2 className="font-heading text-2xl mb-3">Domino Live</h2>
        <p className="text-hueso/80 mb-6">
          {t("play_cta")}
        </p>
        <a
          href="https://domino-dev.benabraham.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-terracota text-hueso font-semibold rounded-lg hover:bg-terracota/90 transition-colors"
        >
          Domino Live &rarr;
        </a>
      </div>
    </div>
  );
}
