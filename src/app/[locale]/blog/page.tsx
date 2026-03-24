import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts, getCategoryCounts } from "@/lib/posts";
import { BlogGrid } from "@/components/BlogGrid";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  const posts = getAllPosts(params.locale);
  const categoryCounts = getCategoryCounts(params.locale);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-cream-muted mb-3">
          {posts.length} {t("articles")}
        </p>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-cream">
          {t("title")}
        </h1>
        <p className="mt-3 text-cream-muted text-lg">{t("subtitle")}</p>
      </header>

      <BlogGrid posts={posts} categoryCounts={categoryCounts} />
    </div>
  );
}
