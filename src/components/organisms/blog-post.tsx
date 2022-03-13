import { GithubIcon } from '../../icons'
import { Prose, Image, NextLink } from '../atoms'
import { MarkdownContent } from '../molecules'

import 'highlight.js/styles/base16/material.css'

interface BlogPostProps {
  content: string
  imageUrl: string
  publishDate: string
  repoUrl?: string
  title: string
}

export const BlogPost = ({
  content,
  imageUrl,
  publishDate,
  repoUrl,
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
        <div className='flex justify-between'>
          <p>{publishDate}</p>
          {repoUrl && (
            <p>
              <NextLink isExternal href={repoUrl}>
                <GithubIcon className='h-4 w-4 fill-white hover:fill-spring-green-250 md:h-6 md:w-6' />
              </NextLink>
            </p>
          )}
        </div>
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
