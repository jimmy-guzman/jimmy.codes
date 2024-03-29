import 'highlight.js/styles/base16/material.css'

import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { BlogPostTimestamp } from '../atoms/blog-post-timestamp'
import { ExtLink } from '../atoms/ext-link'
import { Image } from '../atoms/image'
import { Prose } from '../atoms/prose'
import { Markdown } from '../molecules/markdown'

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
            <ExtLink to={repoUrl as `https://${string}.${string}`} isIcon>
              <SiGithub />
            </ExtLink>
          )}
        </div>
        <h1>{title}</h1>
        <p>
          <Link href='/'>Jimmy Guzman Moreno</Link>
        </p>
      </header>
      <main>
        <Markdown content={content} />
        <p>Thank you for reading ❤️</p>
        {timestamp && <BlogPostTimestamp timestamp={timestamp} />}
      </main>
    </Prose>
  )
}
