import { AboutMe } from '../../components/molecules'
import { PageLayout } from '../../templates'

const metaData = {
  title: 'About Me',
  description: 'An overview of my engineering story',
  permalink: 'https://jimmy.codes/about',
}

// eslint-disable-next-line max-lines-per-function
const About = (): JSX.Element => {
  return (
    <PageLayout metaData={metaData}>
      <section>
        <AboutMe title={metaData.title} />
      </section>
    </PageLayout>
  )
}

export default About
