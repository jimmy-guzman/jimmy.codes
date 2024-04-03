import "../styles/global.css";

import type { Metadata } from "next";

import { Fathom } from "../components/atoms/fathom";
import { Navigation } from "../components/organisms/navigation";

export const metadata = {
  title: "jimmy.codes",
  description: "I code things",
  metadataBase: new URL("https://jimmy.codes"),
  openGraph: {
    type: "website",
    title: "jimmy.codes",
    description: "I code things",
    url: "https://jimmy.codes",
  },
  twitter: {
    title: "jimmy.codes",
    description: "I code things",
  },
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Fathom />
        <div className="flex h-full min-h-screen flex-col">
          <Navigation />
          <div className="mx-auto mb-auto mt-8 w-full max-w-7xl px-4 py-6 sm:w-auto md:px-6 lg:px-8">
            <main>{children}</main>
          </div>
          <footer className="dsy-footer dsy-footer-center bg-base-100 p-4 text-base-content">
            <aside>
              <p>©2024 Jimmy Guzman Moreno</p>
            </aside>
          </footer>
        </div>
      </body>
    </html>
  );
}
