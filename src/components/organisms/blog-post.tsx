import "highlight.js/styles/base16/material.css";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

import { BlogPostTimestamp } from "../atoms/blog-post-timestamp";
import { ExtLink } from "../atoms/ext-link";
import { Image } from "../atoms/image";
import { Prose } from "../atoms/prose";
import { Markdown } from "../molecules/markdown";

interface BlogPostProps {
  content: string;
  imageUrl: string;
  publishDate: string;
  repoUrl?: string;
  timestamp: Date | null;
  title: string;
}

export const BlogPost = ({
  content,
  imageUrl,
  publishDate,
  repoUrl,
  timestamp,
  title,
}: BlogPostProps) => {
  return (
    <Prose>
      <Image
        alt="Blog Post Cover"
        className="rounded-lg"
        height={732}
        imageUrl={imageUrl}
        width={1472}
      />
      <header>
        <div className="flex items-center justify-between">
          <time>{publishDate}</time>
          {repoUrl ? (
            <ExtLink isIcon to={repoUrl as `https://${string}.${string}`}>
              <SiGithub />
            </ExtLink>
          ) : null}
        </div>
        <h1>{title}</h1>
        <p>
          <Link href="/">Jimmy Guzman Moreno</Link>
        </p>
      </header>
      <main>
        <Markdown content={content} />
        <p>Thank you for reading ❤️</p>
        {timestamp ? <BlogPostTimestamp timestamp={timestamp} /> : null}
      </main>
    </Prose>
  );
};
