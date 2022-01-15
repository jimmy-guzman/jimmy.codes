import { Introduction } from '../components/molecules'
import { PageLayout } from '../templates'

const metaData = {
  title: 'jimmy.codes',
  description: 'I code things',
  permalink: 'https://jimmy.codes',
}

const Home = (): JSX.Element => {
  return (
    <PageLayout metaData={metaData}>
      <section>
        <Introduction />
      </section>
    </PageLayout>
  )
}

export default Home
