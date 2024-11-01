import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

import NextImage from "next/image";

import { cn } from "@/lib/cn";

type CodeElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type ImageElementProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const renderers = {
  code: ({ children, className }: CodeElementProps) => {
    return <code className={cn(className, "!bg-neutral")}>{children}</code>;
  },
  img: (image: ImageElementProps) => {
    if (!image.src) return null;

    return (
      <NextImage
        alt={image.alt ?? ""}
        blurDataURL={image.src}
        className="rounded-lg"
        height={645}
        placeholder="blur"
        quality={65}
        sizes="100vw"
        src={image.src}
        style={{
          height: "auto",
          width: "100%",
        }}
        width={945}
      />
    );
  },
};
