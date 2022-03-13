import { Prose, Image, NextLink } from '../atoms'
import { MarkdownContent } from '../molecules'

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
        width={1472}
        height={732}
      />
      <header>
        <p>{publishDate}</p>
        <h1>{title}</h1>
        <p>
          <NextLink href='/'>Jimmy Guzman Moreno</NextLink>
        </p>
        <p />
      </header>
      <main>
        <MarkdownContent content={content} />
        <p>Thank you for reading ❤️</p>
      </main>
    </Prose>
  )
}
