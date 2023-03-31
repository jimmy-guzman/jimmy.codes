import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useFathom = (): void => {
  const router = useRouter()

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_FATHOM_KEY
    ) {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_KEY, {
        includedDomains: ['www.jimmy.codes', 'jimmy.codes'],
      })
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}
