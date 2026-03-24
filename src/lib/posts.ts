import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const thumbnailsDirectory = path.join(process.cwd(), "public", "images", "thumbnails", "articles");
const DEFAULT_THUMBNAIL = "/images/thumbnails/examples/thumb-el-que-sabe.png";

/**
 * Get the thumbnail image path for a post.
 * Uses El Chivo custom thumbnails if available, otherwise falls back to default.
 */
function getPostThumbnail(slug: string): string {
  const thumbnailPath = path.join(thumbnailsDirectory, `${slug}.png`);
  if (fs.existsSync(thumbnailPath)) {
    return `/images/thumbnails/articles/${slug}.png`;
  }
  return DEFAULT_THUMBNAIL;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  series?: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(locale: string): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const slugs = fs.readdirSync(postsDirectory);

  const posts = slugs
    .map((slug) => {
      const filePath = path.join(postsDirectory, slug, `${locale}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "Domino Live",
        category: data.category ?? "estrategia",
        tags: data.tags ?? [],
        image: getPostThumbnail(slug),
        series: data.series,
        readingTime: Math.ceil(stats.minutes).toString(),
      } satisfies PostMeta;
    })
    .filter((post) => post !== null) as PostMeta[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const filePath = path.join(postsDirectory, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Domino Live",
    category: data.category ?? "estrategia",
    tags: data.tags ?? [],
    image: getPostThumbnail(slug),
    series: data.series,
    readingTime: Math.ceil(stats.minutes).toString(),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory);
}

export function getCategoryCounts(locale: string): Record<string, number> {
  const posts = getAllPosts(locale);
  const counts: Record<string, number> = {};
  for (const post of posts) {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
  }
  return counts;
}

export function getAllTags(locale: string): { tag: string; count: number }[] {
  const posts = getAllPosts(locale);
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
