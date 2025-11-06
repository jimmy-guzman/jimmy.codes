import * as childProcess from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  cleanMarkdownForReadingTime,
  lastModified,
  prettyDate,
  readingTime,
  sortByPublishDate,
} from "./content";

vi.mock("node:child_process", { spy: true });

afterEach(() => {
  vi.restoreAllMocks();
});

describe("prettyDate", () => {
  it("should format a date as `Mon D, YYYY` in en-US with UTC", () => {
    const date = new Date("2024-01-05T00:00:00Z");

    expect(prettyDate(date)).toBe("Jan 5, 2024");
  });

  it("should handle different months/days", () => {
    const date = new Date("2025-09-03T12:34:56Z");

    expect(prettyDate(date)).toBe("Sep 3, 2025");
  });
});

describe("readingTime", () => {
  it("should return at least 1 minute for very short text", () => {
    expect(readingTime("word")).toBe(1);
  });

  it("should return 0 minutes for empty text", () => {
    expect(readingTime("")).toBe(0);
  });

  it("should NOT throw for empty text", () => {
    expect(() => readingTime("")).not.toThrow();
  });

  it("should increase with longer text", () => {
    const short = "word ".repeat(100);
    const medium = "word ".repeat(500);

    const shortTime = readingTime(short);
    const mediumTime = readingTime(medium);

    expect(shortTime).toBeGreaterThanOrEqual(1);
    expect(mediumTime).toBeGreaterThan(shortTime);
  });

  it("should round correctly to nearest minute", () => {
    const text = "word ".repeat(450); // ≈2 minutes
    const result = readingTime(text);

    expect(result).toBeGreaterThanOrEqual(2);
  });
});

describe("sortByPublishDate", () => {
  it("should sort newest → oldest", () => {
    const items = [
      { data: { publishDate: new Date("2022-01-01T00:00:00Z") } },
      { data: { publishDate: new Date("2025-09-03T00:00:00Z") } },
      { data: { publishDate: new Date("2024-06-15T00:00:00Z") } },
    ];

    const sorted = [...items].sort(sortByPublishDate);

    expect(sorted.map((i) => i.data.publishDate.toISOString())).toEqual([
      "2025-09-03T00:00:00.000Z",
      "2024-06-15T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z",
    ]);
  });

  it("should return 0 for equal dates", () => {
    const a = { data: { publishDate: new Date("2024-01-01T00:00:00Z") } };
    const b = { data: { publishDate: new Date("2024-01-01T00:00:00Z") } };

    expect(sortByPublishDate(a, b)).toBe(0);
  });
});

describe("lastModified", () => {
  it("should return a Date when git outputs a valid ISO timestamp", () => {
    const file = "/path/to/file.md";
    const iso = "2023-12-01T10:00:00Z";

    vi.spyOn(childProcess, "execSync").mockReturnValue(Buffer.from(iso));

    const result = lastModified(file);
    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString()).toBe("2023-12-01T10:00:00.000Z");

    expect(childProcess.execSync).toHaveBeenCalledWith(
      `git log -1 --pretty="format:%cI" "${file}"`,
    );
  });

  it("should return undefined when git output is empty or invalid", () => {
    vi.spyOn(childProcess, "execSync").mockReturnValue(Buffer.from(""));

    expect(lastModified("note.md")).toBeUndefined();
  });

  it("should return undefined when execSync throws", () => {
    vi.spyOn(childProcess, "execSync").mockImplementation(() => {
      throw new Error("git error");
    });

    expect(lastModified("missing.md")).toBeUndefined();
  });
});

describe("cleanMarkdownForReadingTime", () => {
  describe("twoslash setup code removal", () => {
    it("should remove tsx twoslash setup code before ---cut---", () => {
      const markdown = `
\`\`\`tsx twoslash
// @jsx: react-jsx
interface FormProps {
  initialValues: any;
}
// ---cut---
function App() {
  return <div />;
}
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).toBe(`
\`\`\`tsx
function App() {
  return <div />;
}
\`\`\`
`);
    });

    it("should remove ts twoslash setup code before ---cut---", () => {
      const markdown = `
\`\`\`ts twoslash
interface User {
  name: string;
}
// ---cut---
const user: User = { name: "John" };
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).toBe(`
\`\`\`ts
const user: User = { name: "John" };
\`\`\`
`);
    });

    it("should handle multiple twoslash code blocks", () => {
      const markdown = `
\`\`\`tsx twoslash
interface Props {
  value: string;
}
// ---cut---
const Component = () => <div />;
\`\`\`

Some text between blocks.

\`\`\`ts twoslash
type Foo = string;
// ---cut---
const foo: Foo = "bar";
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).toContain("```tsx\nconst Component");
      expect(result).toContain("```ts\nconst foo");
      expect(result).not.toContain("---cut---");
      expect(result).not.toContain("interface Props");
      expect(result).not.toContain("type Foo");
    });

    it("should preserve code blocks without ---cut---", () => {
      const markdown = `
\`\`\`tsx twoslash
function App() {
  return <div />;
}
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).toBe(markdown);
    });
  });

  describe("twoslash annotation removal", () => {
    it("should remove ^? type hover annotations", () => {
      const markdown = `
\`\`\`tsx
const value = 123;
//    ^?
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("^?");
      expect(result).toContain("const value = 123;");
    });

    it("should remove ^| completion annotations", () => {
      const markdown = `
\`\`\`tsx
console.log(values.)
//                 ^|
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("^|");
      expect(result).toContain("console.log(values.)");
    });

    it("should handle annotations with varying whitespace", () => {
      const markdown = `
\`\`\`tsx
const x = 1;
//^?
//  ^?
//               ^?
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("^?");
      expect(result).toContain("const x = 1;");
    });
  });

  describe("twoslash directive removal", () => {
    it("should remove @errors directives", () => {
      const markdown = `
\`\`\`tsx
// @errors: 2339
console.log(foo.bar);
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("@errors");
      expect(result).toContain("console.log(foo.bar);");
    });

    it("should remove @noErrors directives", () => {
      const markdown = `
\`\`\`tsx
// @noErrors
const x: string = 123;
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("@noErrors");
      expect(result).toContain("const x: string = 123;");
    });

    it("should remove @jsx directives", () => {
      const markdown = `
\`\`\`tsx
// @jsx: react-jsx
const App = () => <div />;
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("@jsx");
      expect(result).toContain("const App = () => <div />;");
    });

    it("should remove multiple different directives", () => {
      const markdown = `
\`\`\`tsx
// @jsx: react-jsx
// @errors: 2339
// @noErrors
const App = () => <div />;
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("@jsx");
      expect(result).not.toContain("@errors");
      expect(result).not.toContain("@noErrors");
      expect(result).toContain("const App = () => <div />;");
    });
  });

  describe("combined cleanup", () => {
    it("should remove all twoslash artifacts from a real example", () => {
      const markdown = `
\`\`\`tsx twoslash
// @jsx: react-jsx
interface FormProps {
  initialValues: any;
  onSubmit?: (values: any) => void;
}

function Form({ initialValues, onSubmit }: FormProps) {
  return <form />;
}
// ---cut---
function App() {
  return (
    <Form
      initialValues={{ name: "", email: "" }}
      onSubmit={(values) => {
//               ^?
        console.log(values.name, values.email);
      }}
    />
  );
}
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).not.toContain("---cut---");
      expect(result).not.toContain("@jsx");
      expect(result).not.toContain("^?");
      expect(result).not.toContain("interface FormProps");
      expect(result).toContain("function App()");
      expect(result).toContain("console.log(values.name, values.email);");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      const result = cleanMarkdownForReadingTime("");
      expect(result).toBe("");
    });

    it("should handle markdown with no twoslash content", () => {
      const markdown = `
# Title

Regular paragraph text.

\`\`\`typescript
const x = 1;
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);
      expect(result).toBe(markdown);
    });

    it("should preserve regular comments that aren't directives", () => {
      const markdown = `
\`\`\`tsx
// This is a regular comment
const x = 1;
// Another regular comment explaining something
\`\`\`
`;

      const result = cleanMarkdownForReadingTime(markdown);

      expect(result).toContain("// This is a regular comment");
      expect(result).toContain("// Another regular comment");
    });

    it("should not remove @ symbols in regular content", () => {
      const markdown = `
Email me at user@example.com or mention @username on Twitter.
`;

      const result = cleanMarkdownForReadingTime(markdown);
      expect(result).toBe(markdown);
    });
  });
});
