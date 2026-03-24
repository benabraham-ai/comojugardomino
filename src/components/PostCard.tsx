import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { PostMeta } from "@/lib/posts";
import { CATEGORY_META, type Category } from "@/lib/categories";
import { CategoryIcon, type CategoryIconName } from "@/components/icons";

export function PostCard({ post }: { post: PostMeta }) {
  const t = useTranslations("blog");
  const tCat = useTranslations("categories");
  const catMeta = CATEGORY_META[post.category as Category];

  return (
    <article className="group glass-card rounded-xl overflow-hidden transition-all duration-300">
      {post.image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {catMeta && (
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded ${catMeta.colorClass}`}>
              <CategoryIcon name={post.category as CategoryIconName} active size={12} />
              {tCat(post.category)}
            </span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-cream/5 text-cream-muted rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-bold text-lg text-cream group-hover:text-coral transition-colors mb-2 leading-snug">
            {post.title}
          </h2>
        </Link>
        <p className="text-cream-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-cream-muted">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-LA", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span>
            {post.readingTime} {t("min_read")}
          </span>
        </div>
      </div>
    </article>
  );
}
