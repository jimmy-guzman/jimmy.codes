import type { Root } from "mdast";
import { describe, expect, it } from "vitest";

import { remarkPele } from "./remark-pele";

const tree = (): Root => ({
  children: [
    { lang: "ts", type: "code", value: "const a = 1;" },
    {
      children: [
        {
          children: [
            {
              lang: "mermaid",
              type: "code",
              value: "flowchart LR\n  accTitle: A\n  A --> B",
            },
          ],
          type: "listItem",
        },
      ],
      type: "list",
    },
    {
      lang: "mermaid",
      type: "code",
      value: "flowchart LR\n  accTitle: C\n  C --> D",
    },
  ],
  type: "root",
});

describe("remarkPele", () => {
  it("should render nested and top-level mermaid blocks to svg with unique id prefixes", () => {
    const root = tree();

    remarkPele()(root);

    const [code, list, diagram] = root.children;

    expect(code).toMatchObject({ lang: "ts", type: "code" });
    expect(list).toMatchObject({
      children: [
        {
          children: [
            { type: "html", value: expect.stringContaining("pele-0-") },
          ],
        },
      ],
    });
    expect(diagram).toMatchObject({
      type: "html",
      value: expect.stringContaining("pele-1-"),
    });
    expect(diagram).toMatchObject({ value: expect.stringContaining("<svg") });
  });
});
