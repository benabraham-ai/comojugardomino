"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon, type CategoryIconName } from "@/components/icons";

interface Props {
  counts: Record<string, number>;
  active: string | null;
  onSelect: (category: string | null) => void;
  total: number;
}

export function CategoryFilter({ counts, active, onSelect, total }: Props) {
  const t = useTranslations("categories");
  const tBlog = useTranslations("blog");

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect(null)}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
          active === null
            ? "btn-coral text-white"
            : "glass-button text-cream-secondary hover:text-cream"
        }`}
      >
        <CategoryIcon name="todos" active={active === null} size={16} />
        {tBlog("all")} ({total})
      </button>
      {CATEGORIES.map((cat) => {
        const count = counts[cat] ?? 0;
        if (count === 0) return null;
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(isActive ? null : cat)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isActive
                ? "btn-coral text-white"
                : "glass-button text-cream-secondary hover:text-cream"
            }`}
          >
            <CategoryIcon name={cat as CategoryIconName} active={isActive} size={16} />
            {t(cat)} ({count})
          </button>
        );
      })}
    </div>
  );
}
