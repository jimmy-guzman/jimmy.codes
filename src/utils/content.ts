import { execSync } from "node:child_process";

import getReadingTime from "reading-time";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "numeric",
});

/**
 * Format a date as a pretty string in "MMM dd, yyyy" format.
 *
 * @param date The date to format
 * @returns The formatted date string
 */
export function prettyDate(date: Date) {
  return dateFormatter.format(date);
}

/**
 * Estimate reading time for a given text.
 *
 * @param text The text to estimate reading time for
 * @returns Estimated reading time in minutes. Minimum is 1 minute for non-empty text, 0 for empty text.
 */
export const readingTime = (text: string) => {
  if (!text) return 0;

  const { minutes } = getReadingTime(text);

  return Math.max(1, Math.round(minutes));
};

/**
 * Sort posts by their publish date in descending order.
 *
 * @param a First post
 * @param b Second post
 * @returns Negative if b is newer, positive if a is newer, zero if equal
 */
export const sortByPublishDate = (
  a: { data: { publishDate: Date } },
  b: { data: { publishDate: Date } },
) => {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
};

/**
 * Get the last modified date of a file using git.
 *
 * @param filePath The path to the file
 * @returns The last modified date or undefined if not available
 */
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
