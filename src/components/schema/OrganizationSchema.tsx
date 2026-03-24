export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ComoJugarDomino",
    "url": "https://comojugardomino.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://comojugardomino.com/icon-dark.svg"
    },
    "sameAs": [],
    "description": "Aprende a jugar dominó venezolano con guías, estrategias y cultura del juego latinoamericano."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
