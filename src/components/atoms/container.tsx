export const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='mx-auto mb-auto mt-8 w-full max-w-7xl px-4 py-6 md:w-auto md:px-6 lg:px-8'>
      {children}
    </div>
  )
}
