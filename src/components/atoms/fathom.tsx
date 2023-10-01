'use client'

import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

function TrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env['NEXT_PUBLIC_FATHOM_KEY']
    ) {
      load(process.env['NEXT_PUBLIC_FATHOM_KEY'], {
        includedDomains: ['www.jimmy.codes', 'jimmy.codes'],
      })
    }
  }, [])

  useEffect(() => {
    if (!pathname) return

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    })
  }, [pathname, searchParams])

  return null
}

export function Fathom(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  )
}
