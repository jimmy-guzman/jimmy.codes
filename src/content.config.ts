import { defineCollection, z } from "astro:content";

const content = defineCollection({
  schema: z.object({
    title: z.string(),
    heading: z
      .string()
      .max(60, "Heading must be 60 characters or less")
      .optional(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    keywords: z.array(z.string()),
  }),
});

export const collections = {
  posts: content,
  notes: content,
};
