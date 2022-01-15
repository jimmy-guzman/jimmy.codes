import { truncate } from '../../utils'
import { Badge, Image, Link } from '../atoms'

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

export const BlogPostPreview = ({ post }: BlogPreviewProps): JSX.Element => {
  return (
    <article>
      <div className='w-full'>
        <div className='min-w-0 relative mb-6 flex flex-col break-words rounded bg-material-gray shadow-lg xl:mb-0'>
          <Image
            className='rounded-t'
            alt='Blog Post Cover'
            imageUrl={post.imageUrl}
            width={607}
            height={302.33}
          />
          <div className='flex-auto p-4'>
            <div className='flex flex-wrap'>
              <div className='max-w-full relative w-full flex-1 flex-grow'>
                <h2 className='text-xs font-bold uppercase text-hot-pink-400'>
                  {post.publishDate}
                </h2>
                <span className='text-xl font-semibold text-witch-haze-50'>
                  {post.title}
                </span>
              </div>
              <Link to={`blog/posts/${post.slug}`}>Read Post</Link>
            </div>
            <p className='mt-4 text-white'>{truncate(post.description, 100)}</p>
          </div>
          <div className='flex flex-wrap justify-center gap-2 pr-4 pl-4 pb-2'>
            {post.keywords.split(',').map((keyword) => (
              <Badge key={keyword}>{keyword.trim()}</Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
