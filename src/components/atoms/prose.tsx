export const Prose = ({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <article className='prose md:prose-lg lg:prose-xl dark:prose-invert'>
      {children}
    </article>
  )
}
