import NextImage from 'next/image'
import useDimensions from 'react-cool-dimensions'

import type { ImageProps as NextImageProps } from 'next/image'

interface ImageProps
  extends Omit<
    NextImageProps,
    'blurDataURL' | 'layout' | 'placeholder' | 'quality' | 'sizes' | 'src'
  > {
  imageUrl: string
}

export const Image = ({ imageUrl, ...rest }: ImageProps): JSX.Element => {
  const { observe, width } = useDimensions<HTMLDivElement | null>()

  return (
    <div ref={observe}>
      <NextImage
        {...rest}
        blurDataURL={imageUrl}
        src={imageUrl}
        layout='responsive'
        sizes={`${Math.round(width)}px`}
        placeholder='blur'
        quality={65}
      />
    </div>
  )
}
