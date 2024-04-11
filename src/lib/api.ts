import { readdir, readFile } from "node:fs/promises";

import { Repository } from "@napi-rs/simple-git";
import matter from "gray-matter";

const repo = Repository.discover(".");

const POSTS = "src/_posts";

export const getPostBySlug = async <const T extends readonly string[]>(
  slug: string,
  fields: T,
) => {
  const realSlug = slug.replace(/\.md$/, "");
  const postPath = `${POSTS}/${realSlug}.md`;

  // this is disabled due to vercel not supporting deep clone
  const timestamp = process.env["VERCEL"]
    ? null
    : new Date(await repo.getFileLatestModifiedDateAsync(postPath));

  const fileContents = await readFile(postPath, "utf8");
  const { data, content } = matter(fileContents);

  return fields.reduce((acc, curr) => {
    return {
      ...acc,
      ...(curr === "slug" && { [curr]: realSlug }),
      ...(curr === "content" && { [curr]: content }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...(typeof data[curr] !== "undefined" && { [curr]: data[curr] }),
      timestamp,
    };
  }, {}) as Record<(typeof fields)[number], string> & {
    timestamp: Date | null;
  };
};

export const getAllPosts = async <const T extends readonly string[]>(
  fields: T,
) => {
  const slugs = await readdir(POSTS);

  return Promise.all(
    slugs.map((slug) => {
      return getPostBySlug(slug, fields);
    }),
  );
};
