import type { Metadata } from 'next'

import { Wrapper, Container, Footer, Fathom } from '../components/atoms'
import { Navigation } from '../components/molecules'

import '../styles/global.css'

export const metadata: Metadata = {
  title: 'jimmy.codes',
  description: 'I code things',
  metadataBase: new URL('https://jimmy.codes'),
  openGraph: {
    type: 'website',
    title: 'jimmy.codes',
    description: 'I code things',
    url: 'https://jimmy.codes',
  },
  twitter: {
    title: 'jimmy.codes',
    description: 'I code things',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className='bg-oxford-blue'>
        <Fathom />
        <Wrapper>
          <Navigation />
          <Container>
            <main>{children}</main>
          </Container>
          <Footer />
        </Wrapper>
      </body>
    </html>
  )
}
