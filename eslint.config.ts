import jimmyDotCodes from "@jimmy.codes/eslint-config";
// @ts-expect-error missing types
import nextPlugin from "@next/eslint-plugin-next";

export default jimmyDotCodes(
  {
    testing: {
      framework: "jest",
    },
  },
  {
    files: ["**/layout.tsx", "**/page.tsx"],
    name: "react-refresh/next",
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    name: "next",
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "@next/next": nextPlugin,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
);
