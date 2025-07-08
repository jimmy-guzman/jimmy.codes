import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    imageUrl: z.string(),
    keywords: z.string(),
  }),
});

export const collections = {
  posts,
};
