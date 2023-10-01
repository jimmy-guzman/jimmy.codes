export const Wrapper = ({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element => {
  return <div className='flex h-full min-h-screen flex-col '>{children}</div>
}
