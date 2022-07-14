import type React from 'react'

export const Prose = ({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <article className='prose dark:prose-invert md:prose-lg lg:prose-xl'>
      {children}
    </article>
  )
}
