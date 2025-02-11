import { BlogPost } from "@/components/organisms/blog-post";
import { getAllPosts, getPostBySlug } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug"]);

  return posts.map((post) => {
    return { slug: post.slug };
  });
};

export const generateMetadata = async (props: Props) => {
  const params = await props.params;

  const post = await getPostBySlug(params.slug, [
    "title",
    "description",
    "content",
    "imageUrl",
    "repoUrl",
    "publishDate",
  ]);

  return {
    description: post.description,
    openGraph: {
      description: post.description,
      title: post.title,
      type: "website",
      url: `https://jimmy.codes/${params.slug}`,
    },
    title: post.title,
    twitter: {
      description: post.description,
      title: post.title,
    },
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
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
