import Link from "next/link";

import { Image } from "../atoms/image";

interface BlogPreviewProps {
  post: {
    description: string;
    imageUrl: string;
    keywords: string;
    publishDate: string;
    slug: string;
    title: string;
  };
}

export const BlogPostPreview = ({ post }: BlogPreviewProps) => {
  return (
    <article className="dsy-card shadow-xl">
      <Image
        alt="Blog Post Cover"
        imageUrl={post.imageUrl}
        width={607}
        height={302.33}
      />
      <div className="dsy-card-body">
        <span>{post.publishDate}</span>
        <h2 className="dsy-card-title">{post.title}</h2>
        <p className="overflow-hidden text-ellipsis">{post.description}</p>
        <div className="dsy-card-actions">
          {post.keywords.split(",").map((keyword) => {
            return (
              <span className="dsy-badge dsy-badge-neutral" key={keyword}>
                {keyword.trim()}
              </span>
            );
          })}
        </div>
        <div className="dsy-card-actions justify-end">
          <Link
            className="dsy-btn dsy-btn-primary dsy-btn-sm"
            href={`/blog/posts/${post.slug}`}
          >
            Read Post
          </Link>
        </div>
      </div>
    </article>
  );
};
