import type { Metadata } from "next";

import { Prose } from "@/components/atoms/prose";
import { BlogPostPreview } from "@/components/molecules/blog-post-preview";
import { getAllPosts } from "@/lib/api";

export const metadata = {
  description: "The place where Jimmy talks about coding things",
  openGraph: {
    description: "The place where Jimmy talks about coding things",
    title: "Read articles written by me",
    type: "website",
    url: "https://jimmy.codes/blog",
  },
  title: "Read articles written by me",
  twitter: {
    description: "The place where Jimmy talks about coding things",
    title: "Read articles written by me",
  },
} satisfies Metadata;

export default async function Page() {
  const allPosts = await getAllPosts([
    "title",
    "publishDate",
    "slug",
    "name",
    "description",
    "keywords",
    "imageUrl",
  ]);

  return (
    <div className="flex flex-col gap-16">
      <Prose>
        <h1>Blog</h1>
      </Prose>
      <section className="no-prose">
        <div className="no-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post, index) => {
            return <BlogPostPreview key={index} post={post} />;
          })}
        </div>
      </section>
    </div>
  );
}
