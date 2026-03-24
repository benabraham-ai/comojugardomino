# Blog Publishing Guide — comojugardomino.com

The blog at comojugardomino.com is powered by a Next.js static site at `~/projects/comojugardomino`. Here's how to publish new articles.

## Creating a New Article

1. **Create the MDX file:**

```
~/projects/comojugardomino/content/posts/<slug>/es.mdx
```

The slug should be lowercase, hyphenated, descriptive (e.g., `domino-para-ninos`, `historia-del-doble-nueve`).

2. **Frontmatter format (required):**

```mdx
---
title: "Your Article Title Here"
description: "1-2 sentence summary for SEO and card previews"
date: "2026-03-24"
author: "Domino Live"
category: "estrategia"
tags: ["avanzado", "conteo"]
image: "/images/your-thumbnail.png"
---
```

3. **Categories — pick exactly ONE:**

| Category | Use for |
|----------|---------|
| `reglas` | How to play, rules, beginner guides |
| `estrategia` | Tactics, counting, positioning, advanced play |
| `cultura` | History, traditions, community, tournaments |
| `psicologia` | Reading opponents, bluffing, mental game |
| `variantes` | Regional variants (Cuban, Dominican, Puerto Rican, Venezuelan) |

4. **Tags — pick 1-3 from this list:**

`principiantes`, `avanzado`, `parejas`, `tutorial`, `conteo`, `dobles`, `tranca`, `capicua`, `apertura`, `defensa`, `comunicacion`, `venezuela`, `cuba`, `dominicana`, `puerto-rico`, `caribe`, `torneos`, `supersticiones`, `fichas`

You can add new tags freely, but new categories require a code change.

## Adding Thumbnail Images

1. **Save the image to:**

```
~/projects/comojugardomino/public/images/<filename>.png
```

Naming convention: `2026-03-24-<slug>.png` (date + article slug)

2. **Reference it in frontmatter:**

```yaml
image: "/images/2026-03-24-domino-para-ninos.png"
```

The image will appear as:
- Hero image at the top of the article page
- Thumbnail on the blog index card
- Open Graph image when shared on social media

## Writing the Content

Write in MDX (markdown). Supported formatting:
- `## Heading 2` and `### Heading 3` for sections
- `**bold**` and `*italic*`
- `> blockquote` for callouts
- `[link text](url)` for links
- Tables, ordered/unordered lists
- **IMPORTANT:** Escape curly braces as `\{` and `\}` — MDX treats `{}` as JavaScript

Always end articles with a CTA linking to Domino Live:

```markdown
**[Juega ahora en Domino Live](https://domino-dev.benabraham.ai)**
```

## Publishing (Build & Deploy)

After adding content and images, run:

```bash
cd ~/projects/comojugardomino
pnpm build
pm2 restart blog-server
```

The site is served as static HTML via PM2 (`blog-server` on port 3003) through the Cloudflare tunnel. No push needed — just build and restart.

## Brand Voice Reminders

- **Directo.** No fluff, no filler.
- **Orgulloso.** Domino is real strategy. Treat it with respect.
- **Modern tone.** This is NOW, not nostalgia.
- Spanish primary, English version optional (`en.mdx` in same folder)
- Never use script/cursive fonts in images
- Dark backgrounds preferred for thumbnails

## File Structure

```
~/projects/comojugardomino/
├── content/
│   └── posts/
│       └── <slug>/
│           ├── es.mdx    ← Spanish (required)
│           └── en.mdx    ← English (optional)
├── public/
│   └── images/
│       └── 2026-03-24-<slug>.png
└── docs/
    └── PUBLISHING-GUIDE.md  ← This file
```
