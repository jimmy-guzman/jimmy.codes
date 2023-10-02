import type { Metadata } from 'next'

import { Prose } from '../../components/atoms'
import { BlogPostPreview } from '../../components/molecules'
import { getAllPosts } from '../../lib/api'

export const metadata: Metadata = {
  title: 'Read articles written by me',
  description: 'The place where Jimmy talks about coding things',
  openGraph: {
    type: 'website',
    title: 'Read articles written by me',
    description: 'The place where Jimmy talks about coding things',
    url: 'https://jimmy.codes/blog',
  },
  twitter: {
    title: 'Read articles written by me',
    description: 'The place where Jimmy talks about coding things',
  },
}

export default async function Page(): Promise<JSX.Element> {
  const allPosts = await getAllPosts([
    'title',
    'publishDate',
    'slug',
    'name',
    'description',
    'keywords',
    'imageUrl',
  ])

  return (
    <>
      <Prose>
        <header>
          <h1>Read articles written by me</h1>
        </header>
      </Prose>
      <section className='no-prose'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {allPosts.map((post, index) => (
            <BlogPostPreview post={post} key={index} />
          ))}
        </div>
      </section>
    </>
  )
}
