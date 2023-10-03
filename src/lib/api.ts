import { readFile, readdir } from 'fs/promises'

import { Repository } from '@napi-rs/simple-git'
import matter from 'gray-matter'

const repo = Repository.discover('.')

const POSTS = 'src/_posts'

export const getPostBySlug = async <const T extends readonly string[]>(
  slug: string,
  fields: T
): Promise<Record<(typeof fields)[number], string> & { timestamp: Date }> => {
  const realSlug = slug.replace(/\.md$/, '')
  const postPath = `${POSTS}/${realSlug}.md`

  const lastModifiedDate = await repo.getFileLatestModifiedDateAsync(postPath)
  const timestamp = new Date(lastModifiedDate)

  const fileContents = await readFile(postPath, 'utf8')
  const { data, content } = matter(fileContents)

  return fields.reduce((acc, curr) => {
    return {
      ...acc,
      ...(curr === 'slug' && { [curr]: realSlug }),
      ...(curr === 'content' && { [curr]: content }),
      ...(typeof data[curr] !== 'undefined' && { [curr]: data[curr] }),
      timestamp,
    }
  }, {}) as Record<(typeof fields)[number], string> & { timestamp: Date }
}

export const getAllPosts = async <const T extends readonly string[]>(
  fields: T
): Promise<Record<(typeof fields)[number], string>[]> => {
  const slugs = await readdir(POSTS)

  return Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))
}
