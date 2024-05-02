import type { Metadata } from "next";

import { AboutMe } from "@/components/organisms/about-me";

export const metadata: Metadata = {
  title: "About Me",
  description: "An overview of my engineering story",
  openGraph: {
    type: "website",
    title: "About Me",
    description: "An overview of my engineering story",
    url: "https://jimmy.codes/about",
  },
  twitter: {
    title: "About Me",
    description: "An overview of my engineering story",
  },
};

export default function Page() {
  return <AboutMe title="About Me" />;
}
