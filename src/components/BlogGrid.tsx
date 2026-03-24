"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { CategoryFilter } from "./CategoryFilter";

interface Props {
  posts: PostMeta[];
  categoryCounts: Record<string, number>;
}

export function BlogGrid({ posts, categoryCounts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      <CategoryFilter
        counts={categoryCounts}
        active={activeCategory}
        onSelect={setActiveCategory}
        total={posts.length}
      />

      {filtered.length === 0 ? (
        <p className="text-muted py-8">No articles in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
