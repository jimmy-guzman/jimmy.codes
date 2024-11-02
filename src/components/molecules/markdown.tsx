import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import highlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";

import { renderers } from "./markdown.renderers";

interface MarkdownProps {
  content: string;
}

const autoLinkHeadingOpts = {
  behavior: "prepend",
  properties: {
    "aria-hidden": "true",
    "before": "#",
    "className": `relative before:content-[attr(before)] before:absolute before:right-0.5 before:text-gray-600 hover:before:text-accent before:font-light`,
    "tabindex": "-1",
  },
};

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={renderers}
      rehypePlugins={[
        rehypeExternalLinks,
        highlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, autoLinkHeadingOpts],
        rehypeUnwrapImages,
      ]}
    >
      {content}
    </ReactMarkdown>
  );
};
