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
