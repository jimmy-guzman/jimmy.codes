import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import highlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkUnwrapImages from 'remark-unwrap-images'

import { Prose, Image } from '../atoms'
import { Author } from '../molecules'
import { renderers } from './renderers'

import 'highlight.js/styles/base16/material.css'

interface BlogPostProps {
  content: string
  imageUrl: string
  publishDate: string
  title: string
}

export const BlogPost = ({
  content,
  imageUrl,
  publishDate,
  title,
}: BlogPostProps): JSX.Element => {
  return (
    <Prose>
      <Image
        className='rounded-lg'
        alt='Blog Post Cover'
        imageUrl={imageUrl}
        width={1214}
        height={604}
      />
      <header>
        <p>{publishDate}</p>
        <h1>{title}</h1>
        <Author name='Jimmy Guzman Moreno' href='/' />
      </header>
      <main>
        <ReactMarkdown
          components={renderers}
          remarkPlugins={[remarkUnwrapImages]}
          rehypePlugins={[
            rehypeExternalLinks,
            highlight,
            rehypeSlug,
            rehypeAutolinkHeadings,
          ]}
        >
          {content}
        </ReactMarkdown>
        <p>Thank you for reading ❤️</p>
      </main>
    </Prose>
  )
}
