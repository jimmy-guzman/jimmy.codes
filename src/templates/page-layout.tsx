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
    </>
  )
}
