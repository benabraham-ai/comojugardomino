import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { MDXRemote } from "@/components/MDXRemote";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://comojugardomino.com";

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
      images: post.image ? [{
        url: `${baseUrl}${post.image}`,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [`${baseUrl}${post.image}`] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  setRequestLocale(params.locale);
  const post = getPostBySlug(params.slug, params.locale);
  if (!post) notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  const baseUrl = "https://comojugardomino.com";
  const breadcrumbItems = [
    { name: "Inicio", url: `${baseUrl}/${params.locale}` },
    { name: "Blog", url: `${baseUrl}/${params.locale}/blog` },
    { name: post.title, url: `${baseUrl}/${params.locale}/blog/${params.slug}` },
  ];

  return (
    <>
      {/* Schema.org Structured Data */}
      <ArticleSchema
        title={post.title}
        description={post.description}
        image={post.image}
        datePublished={post.date}
        dateModified={post.date}
        slug={params.slug}
        locale={params.locale}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="text-sm text-pegue-red hover:text-ficha-gold transition-colors mb-6 inline-block"
        >
          &larr; {t("back_to_blog")}
        </Link>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-8 max-h-80 object-cover"
        />
      )}

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-pegue-red/10 text-pegue-red rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl leading-tight text-cream">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-cream-muted">
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

      <div className="prose prose-domino prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
      </article>
    </>
  );
}
