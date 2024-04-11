import jimmyDotCodes from "@jimmy.codes/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

export default jimmyDotCodes({
  typescript: true,
  react: true,
  testing: {
    framework: "jest",
    utilities: ["testing-library"],
  },
  overrides: [
    {
      name: "next",
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        "@next/next": nextPlugin,
      },
      rules: {
        ...nextPlugin.configs["core-web-vitals"].rules,
      },
    },
    {
      name: "react-refresh/next",
      files: ["**/layout.tsx", "**/page.tsx"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
});
