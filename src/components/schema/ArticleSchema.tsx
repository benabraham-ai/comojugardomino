interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  locale: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
  locale,
}: ArticleSchemaProps) {
  const baseUrl = "https://comojugardomino.com";
  
  // Construct the canonical URL matching actual site structure
  const articleUrl = `${baseUrl}/${locale}/blog/${slug}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image ? `${baseUrl}${image}` : `${baseUrl}/icon-dark.svg`,
    "author": {
      "@type": "Organization",
      "name": "ComoJugarDomino",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "ComoJugarDomino",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon-dark.svg`
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "inLanguage": locale === "es" ? "es" : "en"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
