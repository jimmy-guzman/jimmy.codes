import { BlogPost } from '../../../components/organisms'
import { getAllPosts, getPostBySlug } from '../../../lib/api'
import { PageLayout } from '../../../templates'

interface Params {
  params: {
    slug: string
  }
}

type Post = Record<
  'content' | 'description' | 'imageUrl' | 'publishDate' | 'title',
  string
>

interface PostProps {
  permalink: string
  post: Post
}

const Post = ({ post, permalink }: PostProps): JSX.Element => {
  return (
    <PageLayout
      metaData={{ title: post.title, description: post.description, permalink }}
    >
      <BlogPost {...post} />
    </PageLayout>
  )
}

export default Post

export const getStaticProps = ({
  params,
}: Params): {
  props: PostProps
} => {
  const post = getPostBySlug(params.slug, [
    'title',
    'description',
    'publishDate',
    'content',
    'imageUrl',
  ] as const)

  return {
    props: {
      post,
      permalink: `https://jimmy.codes/${params.slug}`,
    },
  }
}

export const getStaticPaths = (): {
  fallback: boolean
  paths: {
    params: {
      slug: string
    }
  }[]
} => {
  const posts = getAllPosts(['slug'] as const)

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
