export const Prose = ({ children }: { children?: React.ReactNode }) => {
  return (
    <article className='prose dsy-prose lg:prose-lg dark:prose-invert'>
      {children}
    </article>
  )
}
