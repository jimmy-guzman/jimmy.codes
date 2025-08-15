import readingTime from "reading-time";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export const getReadingTime = (text: string) => {
  const { minutes } = readingTime(text);

  return Math.max(1, Math.round(minutes));
};
