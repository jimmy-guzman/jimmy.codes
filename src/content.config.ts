import { defineCollection, z } from "astro:content";

const content = z.object({
  title: z.string(),
  heading: z
    .string()
    .max(60, "Heading must be 60 characters or less")
    .optional(),
  description: z.string(),
  publishDate: z.date(),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

const blog = defineCollection({
  schema: content.extend({
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  posts: blog,
  notes: content,
};
