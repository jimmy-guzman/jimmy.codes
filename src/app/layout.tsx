import '../styles/global.css'

import type { Metadata } from 'next'

import { Container, Fathom, Footer, Wrapper } from '../components/atoms'
import { Navigation } from '../components/molecules'

export const metadata = {
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
} satisfies Metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
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
