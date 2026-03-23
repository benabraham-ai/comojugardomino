import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("blog");
  const posts = getAllPosts(params.locale);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="font-heading text-3xl sm:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-cafecito/70 text-lg">{t("subtitle")}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-cafecito/50">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
