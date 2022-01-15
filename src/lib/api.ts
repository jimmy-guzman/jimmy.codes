import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'src/_posts')

export const getPostSlugs = (): string[] => {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = <T extends readonly string[]>(
  slug: string,
  fields: T
): Record<typeof fields[number], string> => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return fields.reduce((acc, curr) => {
    return {
      ...acc,
      ...(curr === 'slug' && { [curr]: realSlug }),
      ...(curr === 'content' && { [curr]: content }),
      ...(typeof data[curr] !== 'undefined' && { [curr]: data[curr] }),
    }
  }, {}) as Record<typeof fields[number], string>
}

export const getAllPosts = <T extends readonly string[]>(
  fields: T
): Record<typeof fields[number], string>[] => {
  const slugs = getPostSlugs()

  const posts = slugs.map((slug) => {
    return getPostBySlug(slug, fields)
  })

  return posts
}
