import eslintConfig from "@jimmy.codes/eslint-config";
// @ts-expect-error missing types
import nextPlugin from "@next/eslint-plugin-next";

export default eslintConfig(
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- missing types
      "@next/next": nextPlugin,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- missing types
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- missing types
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
);
