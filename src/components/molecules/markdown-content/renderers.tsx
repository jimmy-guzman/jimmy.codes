import NextImage from 'next/image'

import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react'

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export const renderers = {
  code: ({ children, className }: CodeProps): JSX.Element => (
    <code
      className={`${className} xs:whitespace-pre-wrap xs:!p-1 xs:text-[11px]`}
    >
      {children}
    </code>
  ),
  img: ({ src, alt }: ImgProps): JSX.Element | null => {
    if (!src) return null

    return (
      <NextImage
        className='rounded-lg'
        blurDataURL={src}
        src={src}
        alt={alt ?? ''}
        width={945}
        height={645}
        placeholder='blur'
        quality={65}
        sizes='100vw'
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    )
  },
}
