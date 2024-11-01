import type { Metadata } from "next";

import { AboutMe } from "@/components/organisms/about-me";

export const metadata: Metadata = {
  description: "An overview of my engineering story",
  openGraph: {
    description: "An overview of my engineering story",
    title: "About Me",
    type: "website",
    url: "https://jimmy.codes/about",
  },
  title: "About Me",
  twitter: {
    description: "An overview of my engineering story",
    title: "About Me",
  },
};

export default function Page() {
  return <AboutMe title="About Me" />;
}
