export const BlogPostTimestamp = ({ timestamp }: { timestamp: Date }) => {
  return (
    <div className='flex justify-center text-sm italic text-slate-400 md:justify-end md:text-base'>
      <time dateTime={timestamp.toISOString()}>
        Last updated on{' '}
        {timestamp.toLocaleDateString('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </div>
  )
}
