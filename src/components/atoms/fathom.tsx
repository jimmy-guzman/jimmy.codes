"use client";

import { load, trackPageview } from "fathom-client";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const TrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env["NEXT_PUBLIC_FATHOM_KEY"]
    ) {
      load(process.env["NEXT_PUBLIC_FATHOM_KEY"], {
        includedDomains: ["www.jimmy.codes", "jimmy.codes"],
      });
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      referrer: document.referrer,
      url: pathname + searchParams.toString(),
    });
  }, [pathname, searchParams]);

  return null;
};

export const Fathom = () => {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
};
