import { BlogPost } from "@/components/organisms/blog-post";
import { getAllPosts, getPostBySlug } from "@/lib/api";

interface Props {
  params: { slug: string };
}

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug"]);

  return posts.map((post) => {
    return { slug: post.slug };
  });
};

export const generateMetadata = async ({ params }: Props) => {
  const post = await getPostBySlug(params.slug, [
    "title",
    "description",
    "content",
    "imageUrl",
    "repoUrl",
    "publishDate",
  ]);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "website",
      title: post.title,
      description: post.description,
      url: `https://jimmy.codes/${params.slug}`,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
};

export default async function Page({ params }: Props) {
  const post = await getPostBySlug(params.slug, [
    "title",
    "description",
    "content",
    "imageUrl",
    "repoUrl",
    "publishDate",
  ]);

  return <BlogPost {...post} />;
}
