import { GithubIcon } from '../../icons'
import { Prose, Image, NextLink } from '../atoms'
import { MarkdownContent } from '../molecules'

import 'highlight.js/styles/base16/material.css'

interface BlogPostProps {
  content: string
  imageUrl: string
  publishDate: string
  repoUrl?: string
  timestamp: Date
  title: string
}

export const BlogPost = ({
  content,
  imageUrl,
  publishDate,
  repoUrl,
  title,
  timestamp,
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
        <div className='flex items-center justify-between'>
          <time>{publishDate}</time>
          {repoUrl && (
            <NextLink isExternal href={repoUrl}>
              <GithubIcon className='h-4 w-4 fill-white hover:fill-spring-green-250 md:h-6 md:w-6' />
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
      </main>
      <div className='flex justify-end text-slate-400'>
        <time dateTime={timestamp.toISOString()}>
          Last updated on{' '}
          {timestamp.toLocaleDateString('en', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </Prose>
  )
}
