import { MDXRemote as MDXRemoteRSC } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-heading text-2xl mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-heading text-xl mt-6 mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-terracota pl-4 italic text-cafecito/70 my-4"
      {...props}
    />
  ),
};

export function MDXRemote({ source }: { source: string }) {
  return <MDXRemoteRSC source={source} components={components} />;
}
