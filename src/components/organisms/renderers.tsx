import NextImage from 'next/image'
import { DetailedHTMLProps, ImgHTMLAttributes, PropsWithChildren } from 'react'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

export const renderers = {
  code: ({
    children,
    className,
  }: PropsWithChildren<CodeProps>): JSX.Element => (
    <code
      className={`${className} xs:whitespace-pre-wrap xs:!p-1 xs:text-[11px]`}
    >
      {children}
    </code>
  ),
  img: (
    image: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ): JSX.Element | null => {
    if (!image.src) return null

    return (
      <NextImage
        className='rounded-lg'
        blurDataURL={image.src}
        src={image.src}
        alt={image.alt}
        layout='responsive'
        width={945}
        height={645}
        placeholder='blur'
        quality={65}
      />
    )
  },
}
