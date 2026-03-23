import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });
  return {
    title: t("hero_title"),
    description: t("hero_subtitle"),
  };
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("home");
  const posts = getAllPosts(params.locale).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cafecito via-madera to-cafecito text-hueso">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-40 border-2 border-hueso rounded-lg rotate-12" />
          <div className="absolute bottom-10 right-20 w-20 h-40 border-2 border-hueso rounded-lg -rotate-6" />
          <div className="absolute top-1/2 left-1/2 w-20 h-40 border-2 border-hueso rounded-lg rotate-45" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-20 sm:py-28 relative">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
            {t("hero_title")}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-hueso/80 max-w-2xl leading-relaxed">
            {t("hero_subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://domino-dev.benabraham.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-terracota text-hueso font-semibold rounded-lg hover:bg-terracota/90 transition-colors"
            >
              {t("hero_cta")}
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-hueso/30 text-hueso font-semibold rounded-lg hover:bg-hueso/10 transition-colors"
            >
              {t("featured_view_all")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {posts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl">
              {t("featured_title")}
            </h2>
            <Link
              href="/blog"
              className="text-sm text-terracota hover:underline"
            >
              {t("featured_view_all")} &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
