import Script from 'next/script'

import type { BaseHeadProps } from '../components/atoms'

import { BaseHead } from '../components/atoms'

interface PageLayoutProps {
  children: React.ReactNode
  metaData: BaseHeadProps
}

export const PageLayout = ({
  children,
  metaData,
}: PageLayoutProps): JSX.Element => {
  return (
    <>
      <BaseHead {...metaData} />
      <main>{children}</main>

      {process.env.NEXT_PUBLIC_FATHOM_KEY && (
        <Script
          src='https://wild-wind-innovate.jimmy.codes/script.js'
          data-site={process.env.NEXT_PUBLIC_FATHOM_KEY}
          strategy='afterInteractive'
        />
      )}
    </>
  )
}
