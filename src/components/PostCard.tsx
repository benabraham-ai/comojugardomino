import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  const t = useTranslations("blog");

  return (
    <article className="group border border-madera/15 rounded-xl p-6 bg-white hover:shadow-lg hover:border-terracota/30 transition-all">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-verde/10 text-verde rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="font-heading text-xl text-cafecito group-hover:text-terracota transition-colors mb-2">
          {post.title}
        </h2>
      </Link>
      <p className="text-cafecito/70 text-sm leading-relaxed mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-xs text-cafecito/50">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("es-LA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>
          {post.readingTime} {t("min_read")}
        </span>
      </div>
    </article>
  );
}
