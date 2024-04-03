export const BlogPostTimestamp = ({ timestamp }: { timestamp: Date }) => {
  return (
    <div className="flex justify-center text-sm italic text-info md:justify-end ">
      <time dateTime={timestamp.toISOString()}>
        Last updated on{" "}
        {timestamp.toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </div>
  );
};
