---
title: How I Originally Built This Site
publishDate: 2022-03-13
updatedDate: 2025-07-07
description: An overview of how jimmy.codes was built with modern technologies and services.
keywords:
  [
    nextjs,
    react,
    typescript,
    markdown,
    vercel,
    blogfolio,
    astro,
    tailwindcss,
    cloudinary,
    fathom,
    github-actions,
    react-markdown,
  ]
---

At the beginning of 2022, I decided I wanted to start blogging about coding. So in order to blog I needed a platform. I've also wanted to build a new portfolio under [jimmy.codes](/). This all led to building this blogfolio. The goal for this was simplicity, performance and content powered by markdown. As a disclaimer, this is more of an overview rather than a how to guide.

## Table of Contents

- [Technology Overview](#technology-overview)
  - [Next.js vs Astro](#nextjs-vs-astro)
  - [Markdown Content](#markdown-content)
  - [Image Optimization](#image-optimization)
- [CI/CD Overview](#cicd-overview)
  - [Pull Requests](#pull-requests)
  - [Deployments](#deployments)
- [Analytics](#analytics)
- [Conclusion](#conclusion)

## Technology Overview

Here are the main technologies:

- [Next.js](https://nextjs.org/): A React hybrid static & server rendering framework
- [React](https://reactjs.org/): Powers the UI
- [TypeScript](https://www.typescriptlang.org/): Provides types syntax for JavaScript
- [pnpm](https://pnpm.io/): A fast and efficient package manager
- [Cypress](https://www.cypress.io/): A JavaScript Testing Framework used for e2e tests
- [Jest](https://jestjs.io/): A JavaScript Testing Framework used for unit tests
- [Testing Library](https://testing-library.com/): Testing utilities built around good testing practices
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework
- [react-markdown](https://remarkjs.github.io/react-markdown/): Component to render markdown powered by the [unified](https://unifiedjs.com/)
- [react-cool-dimensions](https://react-cool-dimensions.netlify.app/): Performant react hook to measure size and handle responsiveness

Here are the services:

- [GitHub Actions](https://github.com/features/actions): GitHub hosted CI/CD service
- [Vercel](https://vercel.com/): Deployment with developer experience and performance in mind
- [Cloudinary](https://cloudinary.com/): Image hosting and optimization service
- [Fathom](https://usefathom.com/): Privacy focused analytics service
- [Cypress Dashboard](https://www.cypress.io/dashboard): Record and view cypress tests service

### Next.js vs Astro

I first started with [astro](https://astro.build/) because for this use case it made perfect sense, so what is [astro](https://astro.build/)?

> Astro is a new kind of static site builder for the modern web. Powerful developer experience meets lightweight output.

With features such as:

- less javascript in the output
- automatic partial hydration
- the ability to leverage popular frameworks to build components
- render pages from markdown

This meant that it was perfect to build a simple performant blogfolio while still using [React](https://reactjs.org/). But it's still in [beta](https://github.com/withastro/astro#project-status), so it's lacking features such as easy image optimization, bug-free developer experience tooling, build customization, and [others](https://github.com/withastro/astro/issues/1222). Still, I'm very optimistic about Astro's future and who knows, I might refactor this site to use Astro in the future.

Due to Astro lacking the features I mentioned, I went with the popular and proven framework, [Next.js](https://nextjs.org/).

### Markdown Content

Since [Next.js](https://nextjs.org/) does not come with [out-the-box Markdown support like Astro](https://docs.astro.build/en/guides/markdown-content/) we have to roll our own. Next.js gives us a [great example](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript#a-statically-generated-blog-example-using-nextjs-markdown-and-typescript) powered by [remark](https://github.com/gnab/remark#remark)(like Astro) of how to do this but I wanted to leverage Next.js's [image component](https://nextjs.org/docs/basic-features/image-optimization) which gives features such as:

- improved performance by serving the correct size with modern image formats
- visual stability by preventing [Cumulative Layout Shift](https://nextjs.org/learn/seo/web-performance/cls)
- faster page loads by loading only when the viewport is entered with blur placeholders
- image resizing on demand

To accomplish this I went with [react-markdown](https://remarkjs.github.io/react-markdown/) due to it's [components feature](https://remarkjs.github.io/react-markdown/#components), i.e

```tsx
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const renderers = {
  img: (
    image: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    if (!image.src) return null;

    return (
      <Image
        className="rounded-lg"
        blurDataURL={image.src}
        src={image.src}
        alt={image.alt}
        layout="responsive"
        width={945}
        height={645}
        placeholder="blur"
        quality={65}
      />
    );
  },
};

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return <ReactMarkdown components={renderers}>{content}</ReactMarkdown>;
};
```

This allows replacing an image displayed with markdown, such as:

```md
![Image](sample.jpg)
```

With `<Image />` from `next/image` for optimization.

In addition, since React Markdown still leverages [unified](https://unifiedjs.com/) extensive plugin system. I took advantage by adding features such as:

- Code Blocks Syntax Highlighting with [rehype-highlight](https://github.com/rehypejs/rehype-highlight#rehype-highlight)
- Autolinked Headings with [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings#rehype-autolink-headings) and [rehype-slug](https://github.com/rehypejs/rehype-slug#rehype-slug)
- Automatic External Links with [rehype-external-links](https://github.com/rehypejs/rehype-external-links#rehype-external-links)

Which easily is accomplished by using `<ReactMarkdown />`'s `remarkPlugins` and `rehypePlugins` props, i.e

```tsx
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkUnwrapImages from "remark-unwrap-images";

import "highlight.js/styles/base16/material.css";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      components={renderers}
      remarkPlugins={[remarkUnwrapImages]}
      rehypePlugins={[
        rehypeExternalLinks,
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
      ]}
    >
      {content}
    </ReactMarkdown>
  );
};
```

### Image Optimization

I already mentioned Next.js's [image component](https://nextjs.org/docs/basic-features/image-optimization) but alongside [Cloudinary](https://cloudinary.com/) features such as:

- performant hosting
- transformations with no visual degradation
- automatically generate variants

And [react-cool-dimensions](https://react-cool-dimensions.netlify.app/) to dynamically change `sizes`, i.e

```tsx
import Image, { ImageProps } from "next/image";
import useDimensions from "react-cool-dimensions";

const ResponsiveImage = ({
  src,
  ...rest
}: Omit<ImageProps, "layout" | "sizes">) => {
  const { observe, width } = useDimensions<HTMLDivElement | null>();

  return (
    <div ref={observe}>
      <Image {...rest} layout="responsive" sizes={`${Math.round(width)}px`} />
    </div>
  );
};
```

We get performant and high quality images at every size!

## CI/CD Overview

![CI CD Flow Diagram image](https://res.cloudinary.com/jimmycodes/image/upload/c_scale,h_645,q_65,w_945/v1646186077/jimmy.codes/jimmy-codes-cicd.webp)

The entire CI/CD pipeline is powered by [GitHub Actions](https://github.com/features/actions) with [Vercel](https://vercel.com/) driving the deployment aspect.

### Pull Requests

When a pull request happens [Vercel](https://vercel.com/features/previews) immediately starts deploying the site under a preview url which allows for immediate visibility, automated tests and quick collaboration.

While that is happening [GitHub Actions](https://github.com/features/actions) is doing a couple things:

- runs [eslint](https://eslint.org/) with [my own config](https://github.com/jimmy-guzman/eslint-config-jimmy-guzman#readme) to analyze code quality
- runs [commitlint](https://commitlint.js.org/#/) to validate commit conventions
- runs [typescript](https://www.typescriptlang.org/) to validate types
- runs [prettier](https://prettier.io/) to validate code style
- runs [cspell](http://cspell.org/) to check
- runs [Jest](https://jestjs.io/) for unit tests

These code quality checks fall under this projects' [status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) which prevents a pull requests from merging if they are not passing.

### Deployments

Like I mentioned previously, deployments happen during pull requests under a preview url, but they also happen with any **push** to **master** which deploys to production. **master** is [protected](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) so any change needs to go through a pull request. In order words, a successful pull request must be made to release to production.

#### Automation Testing

Any time there's a successful deployment, [Cypress](https://www.cypress.io/) tests are executed with the base url from [Vercel](https://vercel.com). Once those automated tests finish, they are uploaded to the [Cypress Dashboard](https://www.cypress.io/dashboard). This is accomplished by using the [cypress-io/github-action](https://github.com/cypress-io/github-action), i.e:

```yml
on: [deployment_status]
jobs:
  e2e:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: pnpm/action-setup@15569a497d6aff479ba1c47c859888e22a431052
      - run: pnpm install --frozen-lockfile
      - uses: cypress-io/github-action@v4
        with:
          install: false
          record: true
        env:
          CYPRESS_BASE_URL: ${{ github.event.deployment_status.target_url }}
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

On top of the successful code quality checks needed for a pull request to be merged, these Cypress tests are also needed. This gives us an extra layer of confidence before deploying to production. 👍 🚀

#### Performance Testing

Since one of the goals was performance, I've also added [Lighthouse](https://developers.google.com/web/tools/lighthouse/) as part of CI/CD pipeline to validate wether or not there's been any performance degradation. And as a bonus we also get SEO, Accessibility and Best Practices validations.

In order to accomplish this, I used the [Lighthouse CI Action](https://github.com/treosh/lighthouse-ci-action#lighthouse-ci-action) which followed the same approach as the Cypress Action so it was a simple setup, i.e

```yml
lighthouse:
  if: github.event.deployment_status.state == 'success'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v2

    - name: Lighthouse
      uses: treosh/lighthouse-ci-action@v9
      with:
        urls: |
          ${{ github.event.deployment_status.target_url }}
          ${{ github.event.deployment_status.target_url }}/blog
          ${{ github.event.deployment_status.target_url }}/about
          ${{ github.event.deployment_status.target_url }}/blog/posts/how-i-built-simple-blogfolio
        uploadArtifacts: true
        temporaryPublicStorage: true
        configPath: .github/.lighthouserc.yml
```

Since this GitHub Action is powered by the [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci#lighthouse-ci), it offers [extensive configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md).

## Analytics

Using [Fathom](https://usefathom.com/) with Next.js is extremely simple, given you setup a custom domain first, all you need to do is use `<Script />` component, i.e

```tsx
{
  process.env.NEXT_PUBLIC_FATHOM_KEY && (
    <Script
      src="https://wild-wind-innovate.jimmy.codes/script.js"
      data-site={process.env.NEXT_PUBLIC_FATHOM_KEY}
      strategy="afterInteractive"
    />
  );
}
```

This will allow Next.js to take care of any optimizations and will give you all of Fathom's features such as:

- Fully GDPR, ePrivacy, PECR and CCPA compliant
- Ability to see all visitors even those with ad blockers
- Great SEO since the Fathom script loads fast
- [Analytics that don't sell data](https://usefathom.com/data) which means no annoying cookie notices on this site
- Optional uptime monitoring
- Dashboard that can be private, password protected or public

For transparency's sake, I made [this site's dashboard](https://app.usefathom.com/share/wggacnlj/jimmy.codes#/?filters=%5B%5D&range=last_7_days&site=2251799824003368) public.

## Conclusion

There's nothing game changing mentioned in this post and this is mostly a collection of cool things others have done. But it felt appropriate as my first post on my new personal site to be about how it came to be. With most of my personal projects, I will most likely refactor this with a new cool technology or service that comes along. For now Next.js, TypeScript, the Unified System, Fathom, Cloudinary and Vercel is a perfect combination to build a highly performant blogfolio site.
