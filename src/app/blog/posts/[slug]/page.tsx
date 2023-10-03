import type { Metadata } from 'next'

import { BlogPost } from '../../../../components/organisms'
import { getPostBySlug, getAllPosts } from '../../../../lib/api'

interface Props {
  params: { slug: string }
}

export const generateStaticParams = async (): Promise<
  {
    slug: string
  }[]
> => {
  const posts = await getAllPosts(['slug'])

  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, [
    'title',
    'description',
    'content',
    'imageUrl',
    'repoUrl',
    'publishDate',
  ])

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'website',
      title: post.title,
      description: post.description,
      url: `https://jimmy.codes/${params.slug}`,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  }
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const post = await getPostBySlug(params.slug, [
    'title',
    'description',
    'content',
    'imageUrl',
    'repoUrl',
    'publishDate',
  ])

  return <BlogPost {...post} />
}
