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
  "CSS",
]);

const posts = defineCollection({
  schema: z.object({
    description: z.string().min(1, "Description is required"),
    keywords: z.array(
      z.string().min(1, "Keywords must contain at least one character"),
    ),
    publishDate: z.date(),
    shortTitle: z
      .string()
      .max(48, "Short Title must be 40 characters or less")
      .optional(),
    tags: z.array(tags).max(5, "No more than five tags allowed"),
    title: z.string().min(1, "Title is required"),
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  posts,
};
