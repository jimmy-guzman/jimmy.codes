export const Container = ({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <div className='max-w-7xl mx-auto mb-auto mt-8 px-4 py-6 md:px-6 lg:px-8'>
      {children}
    </div>
  )
}
