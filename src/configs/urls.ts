export const urls = {
  site: "https://jimmy.codes",
  LinkedIn: "https://www.linkedin.com/in/jimmy-guzman-moreno",
  GitHub: "https://github.com/jimmy-guzman",
  email: "mailto:hi@jimmy.codes",
} satisfies Record<string, `https://${string}` | `mailto:${string}@${string}`>;
