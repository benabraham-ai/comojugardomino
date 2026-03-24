import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
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
      <h1 className="font-extrabold text-3xl sm:text-4xl mb-6 text-cream">{t("title")}</h1>
      <p className="text-lg leading-relaxed text-cream-secondary mb-8">
        {t("description")}
      </p>

      <div className="bg-gradient-to-r from-pegue-red to-ficha-gold rounded-xl p-8">
        <h2 className="font-extrabold text-2xl mb-3 text-espresso">Domino Live</h2>
        <p className="text-espresso/80 mb-6">
          {t("play_cta")}
        </p>
        <Link
          href="/waitlist"
          className="inline-flex items-center px-6 py-3 bg-espresso text-cream font-bold rounded-lg hover:bg-dark-raised transition-colors"
        >
          Domino Live &rarr;
        </Link>
      </div>
    </div>
  );
}
