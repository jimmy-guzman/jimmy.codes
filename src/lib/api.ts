import { readFile, readdir } from 'fs/promises'
import { join } from 'path'

import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'src/_posts')

export const getPostBySlug = async <const T extends readonly string[]>(
  slug: string,
  fields: T
): Promise<Record<(typeof fields)[number], string>> => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = await readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return fields.reduce((acc, curr) => {
    return {
      ...acc,
      ...(curr === 'slug' && { [curr]: realSlug }),
      ...(curr === 'content' && { [curr]: content }),
      ...(typeof data[curr] !== 'undefined' && { [curr]: data[curr] }),
    }
  }, {}) as Record<(typeof fields)[number], string>
}

export const getAllPosts = async <const T extends readonly string[]>(
  fields: T
): Promise<Record<(typeof fields)[number], string>[]> => {
  const slugs = await readdir(postsDirectory)

  return Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))
}
