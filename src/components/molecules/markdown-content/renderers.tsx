import NextImage from 'next/image'

import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react'

type CodeElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>

type ImageElementProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export const renderers = {
  code: ({ children, className }: CodeElementProps): JSX.Element => (
    <code
      className={`${className} xs:whitespace-pre-wrap xs:!p-1 xs:text-[11px]`}
    >
      {children}
    </code>
  ),
  img: (image: ImageElementProps): JSX.Element | null => {
    if (!image.src) return null

    return (
      <NextImage
        className='rounded-lg'
        blurDataURL={image.src}
        src={image.src}
        alt={image.alt ?? ''}
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
