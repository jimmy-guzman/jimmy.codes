import { execSync } from "node:child_process";

import getReadingTime from "reading-time";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

/**
 * Format a date as a pretty string in "MMM dd, yyyy" format.
 *
 * @param date The date to format
 *
 * @returns The formatted date string
 */
export function prettyDate(date: Date) {
  return dateFormatter.format(date);
}

const TWOSLASH_SETUP_REGEX =
  /```(tsx?)\s+twoslash\n[\s\S]*?\/\/\s*---cut---\n/g;
const TWOSLASH_ANNOTATION_REGEX = /^\s*\/\/\s*\^[?|]\s*$/gm;
const TWOSLASH_DIRECTIVE_REGEX = /^\s*\/\/\s+@[\w-].*$/gm;
const FRONTMATTER_REGEX = /^---\n[\s\S]*?\n---\n+/;

/**
 * Clean markdown content for accurate reading time calculation.
 * Removes twoslash setup code, annotations, and directives.
 *
 * @param markdown The markdown content to process
 *
 * @returns Cleaned markdown content
 */
export const cleanMarkdownForReadingTime = (markdown: string) => {
  const normalized = markdown.replaceAll("\r\n", "\n");

  return normalized
    .replace(FRONTMATTER_REGEX, "")
    .replaceAll(TWOSLASH_SETUP_REGEX, "```$1\n")
    .replaceAll(TWOSLASH_ANNOTATION_REGEX, "")
    .replaceAll(TWOSLASH_DIRECTIVE_REGEX, "");
};

/**
 * Estimate reading time for a given text.
 *
 * @param text The text to estimate reading time for
 *
 * @returns Estimated reading time in minutes. Minimum is 1 minute for non-empty text, 0 for empty text.
 */
export const readingTime = (text: string) => {
  if (!text) return 0;

  const { minutes } = getReadingTime(cleanMarkdownForReadingTime(text));

  return Math.max(1, Math.round(minutes));
};

/**
 * Sort posts by their publish date in descending order.
 *
 * @param a First post
 *
 * @param a.data The post data
 *
 * @param a.data.publishDate The publish date of the first post
 *
 * @param b Second post
 *
 * @param b.data The post data
 *
 * @param b.data.publishDate The publish date of the second post
 *
 * @returns Negative if b is newer, positive if a is newer, zero if equal
 */
export const sortByPublishDate = <T extends { data: { publishDate: Date } }>(
  a: T,
  b: T,
) => {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
};

/**
 * Get the last modified date of a file using git.
 *
 * @param filePath The path to the file
 *
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
