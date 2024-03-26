import 'highlight.js/styles/base16/material.css'

import { SiGithub } from '@icons-pack/react-simple-icons'

import { BlogPostTimestamp, Image, NextLink, Prose } from '../atoms'
import { MarkdownContent } from '../molecules'

interface BlogPostProps {
  content: string
  imageUrl: string
  publishDate: string
  repoUrl?: string
  timestamp: Date | null
  title: string
}

export const BlogPost = ({
  content,
  imageUrl,
  publishDate,
  repoUrl,
  title,
  timestamp,
}: BlogPostProps) => {
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
        <div className='flex items-center justify-between'>
          <time>{publishDate}</time>
          {repoUrl && (
            <NextLink
              isExternal
              href={repoUrl}
              className='dsy-btn dsy-btn-circle'
            >
              <SiGithub />
            </NextLink>
          )}
        </div>
        <h1>{title}</h1>
        <p>
          <NextLink href='/'>Jimmy Guzman Moreno</NextLink>
        </p>
      </header>
      <main>
        <MarkdownContent content={content} />
        <p>Thank you for reading ❤️</p>
        {timestamp && <BlogPostTimestamp timestamp={timestamp} />}
      </main>
    </Prose>
  )
}
