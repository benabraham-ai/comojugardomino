import { MDXRemote as MDXRemoteRSC } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

/**
 * Rewrites known game/app URLs to the waitlist page.
 * This ensures any link Sarah writes pointing to domino-dev,
 * dominolive, or the root "/" CTA gets funneled to /waitlist.
 */
const WAITLIST_DOMAINS = [
  "domino-dev.benabraham.ai",
  "dominolive.com",
  "www.dominolive.com",
  "playdominolive.com",
];

function rewriteHref(href: string | undefined): string {
  if (!href) return "#";
  try {
    const url = new URL(href, "https://comojugardomino.com");
    if (WAITLIST_DOMAINS.includes(url.hostname)) {
      return "/waitlist";
    }
  } catch {
    // relative URL — leave as-is
  }
  return href;
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-extrabold text-2xl mt-8 mb-3 text-cream" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-bold text-xl mt-6 mb-2 text-cream" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-orange pl-4 italic text-cream-muted my-4"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse text-sm text-cream"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-wood text-cream font-bold" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-cream/20 even:bg-white/5" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left border border-cream/20" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 border border-cream/20" {...props} />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={rewriteHref(href)} {...props} />
  ),
};

export function MDXRemote({ source }: { source: string }) {
  return (
    <MDXRemoteRSC
      source={source}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={components}
    />
  );
}
