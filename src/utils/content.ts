import { execSync } from "node:child_process";

import getReadingTime from "reading-time";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function prettyDate(date: Date) {
  return dateFormatter.format(date);
}

export const readingTime = (text: string) => {
  const { minutes } = getReadingTime(text);

  return Math.max(1, Math.round(minutes));
};

export const sortByPublishDate = (
  a: { data: { publishDate: Date } },
  b: { data: { publishDate: Date } },
) => {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
};

export const lastModified = (filePath: string) => {
  try {
    const gitCommand = `git log -1 --pretty="format:%cI" "${filePath}"`;
    const result = execSync(gitCommand).toString().trim();
    const date = new Date(result);
    const isDateValid = date instanceof Date && !Number.isNaN(date.getTime());

    return isDateValid ? date : undefined;
  } catch {
    return undefined;
  }
};
