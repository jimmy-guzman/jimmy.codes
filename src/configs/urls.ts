export const urls = {
  email: "mailto:hi@jimmy.codes",
  GitHub: "https://github.com/jimmy-guzman",
  LinkedIn: "https://www.linkedin.com/in/jimmy-guzman-moreno",
  site: "https://jimmy.codes",
} satisfies Record<string, `https://${string}` | `mailto:${string}@${string}`>;
