import { useState, useEffect } from 'react'

export const useMatchMedia = (query: string): boolean => {
  const [isMatching, setIsMatching] = useState(false)

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    if (matchMedia.matches !== isMatching) {
      setIsMatching(matchMedia.matches)
    }

    const listener = () => {
      setIsMatching(matchMedia.matches)
    }

    matchMedia.addEventListener('change', listener)

    return () => matchMedia.removeEventListener('change', listener)
  }, [isMatching, query])

  return isMatching
}
