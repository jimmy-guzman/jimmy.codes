import NextImage from "next/image";
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

import { cn } from "../../lib/cn";

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
        className="rounded-lg"
        blurDataURL={image.src}
        src={image.src}
        alt={image.alt ?? ""}
        width={945}
        height={645}
        placeholder="blur"
        quality={65}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    );
  },
};
