import Head from 'next/head'

export interface BaseHeadProps {
  description: string
  permalink: string
  title: string
}

export const BaseHead = ({
  title,
  description,
  permalink,
}: BaseHeadProps): JSX.Element => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width' />
      <link rel='icon' type='image/x-icon' href='/favicon.ico' />

      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={permalink} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='https://astro.build/social.jpg?v=1' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={permalink} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta
        property='twitter:image'
        content='https://astro.build/social.jpg?v=1'
      />
    </Head>
  )
}
