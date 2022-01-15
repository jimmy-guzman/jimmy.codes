export const Wrapper = ({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <div className='flex h-full min-h-screen flex-col bg-gray-800'>
      {children}
    </div>
  )
}
