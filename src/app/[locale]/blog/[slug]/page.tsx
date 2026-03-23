import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { MDXRemote } from "@/components/MDXRemote";
import type { Metadata } from "next";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ["es", "en"];
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug, params.locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  setRequestLocale(params.locale);
  const post = getPostBySlug(params.slug, params.locale);
  if (!post) notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-sm text-terracota hover:underline mb-6 inline-block"
      >
        &larr; {t("back_to_blog")}
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-verde/10 text-verde rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl leading-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-cafecito/50">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(
              params.locale === "es" ? "es-LA" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </time>
          <span>
            {post.readingTime} {t("min_read")}
          </span>
          <span>{post.author}</span>
        </div>
      </header>

      <div className="prose prose-domino max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
