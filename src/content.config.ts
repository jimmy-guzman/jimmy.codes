import { defineCollection, z } from "astro:content";

const tags = z.union([
  z.literal("Frontend"),
  z.literal("Analytics"),
  z.literal("Accessibility"),
  z.literal("Astro"),
  z.literal("Markdown"),
  z.literal("Tailwind CSS"),
  z.literal("TIL"),
  z.literal("Node.js"),
  z.literal("Terminal"),
  z.literal("TypeScript"),
  z.literal("Tooling"),
  z.literal("Performance"),
  z.literal("Next.js"),
  z.literal("CI/CD"),
  z.literal("React"),
  z.literal("JavaScript"),
]);

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    heading: z
      .string()
      .max(60, "Heading must be 60 characters or less")
      .optional(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    keywords: z.array(z.string()).min(1, "At least one keyword is required"),
    tags: z.array(tags).min(1, "At least one tag is required"),
  }),
});

export const collections = {
  posts,
};
