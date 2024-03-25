'use client'
import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import useDimensions from 'react-cool-dimensions'

interface ImageProps
  extends Omit<
    NextImageProps,
    'blurDataURL' | 'layout' | 'placeholder' | 'quality' | 'sizes' | 'src'
  > {
  imageUrl: string
}

export const Image = ({ imageUrl, ...rest }: ImageProps) => {
  const { observe, width } = useDimensions<HTMLDivElement | null>()

  return (
    <div ref={observe}>
      <NextImage
        {...rest}
        blurDataURL={imageUrl}
        src={imageUrl}
        placeholder='blur'
        quality={65}
        sizes={`${Math.round(width)}px`}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
