import { truncate } from '../../utils'
import { Badge, Image, NextLink } from '../atoms'

interface BlogPreviewProps {
  post: {
    description: string
    imageUrl: string
    keywords: string
    publishDate: string
    slug: string
    title: string
  }
}

export const BlogPostPreview = ({ post }: BlogPreviewProps) => {
  return (
    <article className='dsy-card shadow-xl'>
      <Image
        className='rounded-t-xl'
        alt='Blog Post Cover'
        imageUrl={post.imageUrl}
        width={607}
        height={302.33}
      />
      <div className='dsy-card-body'>
        <span>{post.publishDate}</span>
        <h2 className='dsy-card-title'>{post.title}</h2>
        <p>{truncate(post.description, 100)}</p>
        <div className='dsy-card-actions'>
          {post.keywords.split(',').map((keyword) => (
            <Badge key={keyword}>{keyword.trim()}</Badge>
          ))}
        </div>
        <div className='dsy-card-actions justify-end'>
          <NextLink
            className='dsy-btn dsy-btn-primary dsy-btn-sm'
            href={`/blog/posts/${post.slug}`}
          >
            Read Post
          </NextLink>
        </div>
      </div>
    </article>
  )
}
