import { defineCollection, z } from "astro:content";

const tags = z.enum([
  "Accessibility",
  "Analytics",
  "Astro",
  "CI/CD",
  "CLI",
  "Frontend",
  "JavaScript",
  "Markdown",
  "Next.js",
  "Node.js",
  "Performance",
  "React",
  "Tailwind",
  "TIL",
  "Tooling",
  "TypeScript",
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
    tags: z
      .array(tags)
      .min(1, "At least one tag is required")
      .max(5, "No more than five tags allowed"),
  }),
});

export const collections = {
  posts,
};
