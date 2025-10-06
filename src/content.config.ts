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
    title: z.string().min(1, "Title is required"),
    shortTitle: z
      .string()
      .max(40, "Short Title must be 40 characters or less")
      .optional(),
    description: z.string().min(1, "Description is required"),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    keywords: z
      .array(z.string().min(1, "Keywords must contain at least one character"))
      .min(1, "At least one keyword is required"),
    tags: z
      .array(tags)
      .min(1, "At least one tag is required")
      .max(5, "No more than five tags allowed"),
  }),
});

export const collections = {
  posts,
};
