import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import highlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkUnwrapImages from 'remark-unwrap-images'

import { renderers } from './renderers'

interface MarkdownContentProps {
  content: string
}

const autoLinkHeadingOpts = {
  properties: {
    'aria-hidden': 'true',
    'tabindex': '-1',
    'before': '#',
    'className': `relative before:content-[attr(before)] before:absolute before:right-0.5 before:text-gray-600 hover:before:text-accent before:font-light`,
  },
  behavior: 'prepend',
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      components={renderers}
      remarkPlugins={[remarkUnwrapImages]}
      rehypePlugins={[
        rehypeExternalLinks,
        highlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, autoLinkHeadingOpts],
      ]}
    >
      {content}
    </ReactMarkdown>
  )
}
