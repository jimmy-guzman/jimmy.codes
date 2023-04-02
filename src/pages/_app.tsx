import type { AppProps } from 'next/app'

import { Wrapper, Container, Footer } from '../components/atoms'
import { Navigation } from '../components/molecules'
import { useFathom } from '../hooks'

import '../styles/global.css'

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useFathom()

  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </Wrapper>
  )
}

export default MyApp
