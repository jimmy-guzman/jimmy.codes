import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string().min(1, "Description is required"),
    heading: z.string().min(1, "Heading is required"),
    keywords: z
      .array(z.string().min(1, "Keywords must contain at least one character"))
      .min(1, "At least one keyword is required"),
    title: z.string().min(1, "Title is required"),
  }),
});

const tags = z.enum([
  "Accessibility",
  "Analytics",
  "Astro",
  "Backend",
  "CI/CD",
  "CLI",
  "CSS",
  "Frontend",
  "Markdown",
  "Next.js",
  "Node.js",
  "Performance",
  "React",
  "Tailwind",
  "TIL",
  "Tooling",
  "TypeScript",
  "AI",
]);

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    description: z.string().min(1, "Description is required"),
    keywords: z
      .array(z.string().min(1, "Keywords must contain at least one character"))
      .min(1, "At least one keyword is required"),
    publishDate: z.date(),
    shortTitle: z
      .string()
      .max(48, "Short Title must be 40 characters or less")
      .optional(),
    tags: z
      .array(tags)
      .min(1, "At least one tag is required")
      .max(5, "No more than five tags allowed"),
    title: z.string().min(1, "Title is required"),
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  pages,
  posts,
};
