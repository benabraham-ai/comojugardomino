import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
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
        tags: data.tags ?? [],
        image: data.image,
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
    tags: data.tags ?? [],
    image: data.image,
    series: data.series,
    readingTime: Math.ceil(stats.minutes).toString(),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory);
}
