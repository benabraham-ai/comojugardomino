/**
 * Migrates Sarah's HTML blog articles to MDX format for the new blog.
 *
 * Usage: npx tsx scripts/migrate-articles.ts
 */

import fs from "fs";
import path from "path";

const BLOG_ROOT = "/Users/macmini/projects/domino-platform/blog";
const OUTPUT_DIR = path.join(process.cwd(), "content", "posts");

// Collect all article HTML files
const articleDirs = [
  path.join(BLOG_ROOT, "blog", "articles"),
  path.join(BLOG_ROOT, "articles"),
];

interface Article {
  filename: string;
  filepath: string;
  html: string;
}

function findArticles(): Article[] {
  const articles: Article[] = [];
  for (const dir of articleDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html") && !f.includes("index") && !f.includes("template"));
    for (const file of files) {
      articles.push({
        filename: file,
        filepath: path.join(dir, file),
        html: fs.readFileSync(path.join(dir, file), "utf8"),
      });
    }
  }
  // Dedupe by filename (prefer blog/articles over articles/)
  const seen = new Map<string, Article>();
  for (const a of articles) {
    if (!seen.has(a.filename)) {
      seen.set(a.filename, a);
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.filename.localeCompare(b.filename));
}

function extractText(html: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

function extractTag(html: string): string {
  const match = html.match(/<span class="tag">([^<]+)<\/span>/i);
  return match ? match[1].trim() : "General";
}

function extractDate(html: string): string {
  const match = html.match(/<div class="date">([^<]+)<\/div>/i);
  if (!match) return "2026-03-23";
  // Parse "23 de marzo, 2026" format
  return "2026-03-23"; // All Sarah's articles are from March 23
}

function htmlToMdx(html: string): string {
  let content = html;

  // Extract just the article body
  const bodyMatch = content.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/article>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }

  // Remove date and tag spans (we put these in frontmatter)
  content = content.replace(/<div class="date">[^<]*<\/div>/g, "");
  content = content.replace(/<span class="tag">[^<]*<\/span>/g, "");

  // Convert headings
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "## $1");
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, "### $1");
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, "#### $1");

  // Convert paragraphs
  content = content.replace(/<p>([\s\S]*?)<\/p>/g, "$1\n\n");

  // Convert bold and italic
  content = content.replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**");
  content = content.replace(/<em>([\s\S]*?)<\/em>/g, "*$1*");

  // Convert links
  content = content.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)");

  // Convert blockquotes
  content = content.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (_, inner) => {
    return inner.trim().split("\n").map((line: string) => `> ${line.trim()}`).join("\n") + "\n\n";
  });

  // Convert unordered lists
  content = content.replace(/<ul>([\s\S]*?)<\/ul>/g, (_, inner) => {
    return inner.replace(/<li>([\s\S]*?)<\/li>/g, "- $1").trim() + "\n\n";
  });

  // Convert ordered lists
  let counter = 0;
  content = content.replace(/<ol>([\s\S]*?)<\/ol>/g, (_, inner) => {
    counter = 0;
    return inner.replace(/<li>([\s\S]*?)<\/li>/g, () => {
      counter++;
      return `${counter}. `;
    }).trim() + "\n\n";
  });

  // Convert tables to markdown
  content = content.replace(/<table>([\s\S]*?)<\/table>/g, (_, inner) => {
    const rows: string[][] = [];
    const rowMatches = inner.match(/<tr>([\s\S]*?)<\/tr>/g) || [];
    for (const row of rowMatches) {
      const cells = (row.match(/<t[hd]>([\s\S]*?)<\/t[hd]>/g) || []).map(
        (c: string) => c.replace(/<\/?t[hd]>/g, "").trim()
      );
      rows.push(cells);
    }
    if (rows.length === 0) return "";
    const header = `| ${rows[0].join(" | ")} |`;
    const separator = `| ${rows[0].map(() => "---").join(" | ")} |`;
    const body = rows.slice(1).map((r) => `| ${r.join(" | ")} |`).join("\n");
    return `${header}\n${separator}\n${body}\n\n`;
  });

  // Remove remaining HTML tags
  content = content.replace(/<img[^>]*>/g, "");
  content = content.replace(/<\/?[^>]+>/g, "");

  // Clean up whitespace
  content = content.replace(/\n{3,}/g, "\n\n");
  content = content.trim();

  return content;
}

function filenameToSlug(filename: string): string {
  return filename.replace(/^\d+-/, "").replace(/\.html$/, "");
}

function main() {
  const articles = findArticles();
  console.log(`Found ${articles.length} articles to migrate.\n`);

  let migrated = 0;

  for (const article of articles) {
    const title = extractText(article.html, "h2");
    const tag = extractTag(article.html);
    const slug = filenameToSlug(article.filename);
    const mdxContent = htmlToMdx(article.html);

    // Extract first paragraph as description
    const firstPara = mdxContent.split("\n\n").find(
      (p) => p.length > 20 && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("|") && !p.startsWith("-")
    ) || "";
    const description = firstPara.slice(0, 200).replace(/\*\*/g, "");

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "2026-03-23"
author: "Domino Live"
tags: ["${tag.toLowerCase()}"]
---`;

    const outputDir = path.join(OUTPUT_DIR, slug);
    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, "es.mdx");

    // Don't overwrite if already exists (keep our hand-written seed posts)
    if (fs.existsSync(outputFile)) {
      console.log(`  SKIP ${slug} (already exists)`);
      continue;
    }

    fs.writeFileSync(outputFile, `${frontmatter}\n\n${mdxContent}\n`);
    console.log(`  OK   ${slug} — "${title.slice(0, 50)}..."`);
    migrated++;
  }

  console.log(`\nMigrated ${migrated} articles. ${articles.length - migrated} skipped.`);
}

main();
