import { Prose } from '../../components/atoms'
import { BlogPostPreview } from '../../components/molecules'
import { getAllPosts } from '../../lib/api'
import { PageLayout } from '../../templates'

type Post = Record<
  | 'description'
  | 'imageUrl'
  | 'keywords'
  | 'name'
  | 'publishDate'
  | 'slug'
  | 'title',
  string
>

interface BlogProps {
  allPosts: Post[]
}

const metaData = {
  title: 'Read articles written by me',
  description: 'The place where Jimmy talks about coding things',
  permalink: 'https://jimmy.codes/blog',
}

const Blog = ({ allPosts }: BlogProps): JSX.Element => {
  return (
    <PageLayout metaData={metaData}>
      <Prose>
        <header>
          <h1>{metaData.title}</h1>
        </header>
      </Prose>
      <section className='no-prose'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {allPosts.map((post, index) => (
            <BlogPostPreview post={post} key={index} />
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default Blog

export const getStaticProps = (): {
  props: {
    allPosts: Post[]
  }
} => {
  const allPosts = getAllPosts([
    'title',
    'publishDate',
    'slug',
    'name',
    'description',
    'keywords',
    'imageUrl',
  ] as const)

  return {
    props: { allPosts },
  }
}
