import type { Nodes, Root } from "mdast";
import { render } from "pele";

/** Renders ```mermaid blocks to static SVG at build time, before expressive-code sees them. */
export const remarkPele = () => (tree: Root) => {
  let n = 0;

  const visit = (node: Nodes) => {
    if (!("children" in node)) return;

    node.children = node.children.map((child) => {
      if (child.type !== "code" || child.lang !== "mermaid") {
        visit(child);

        return child;
      }

      const { svg } = render(child.value, {
        idPrefix: `pele-${n++}`,
        // shortcut: Commit Mono is a fixed 0.6em advance; CJK/emoji would measure narrow
        measurer: { width: (text, size) => [...text].length * size * 0.6 },
        responsive: true,
      });

      return {
        type: "html",
        value: `<figure class="not-prose">${svg}</figure>`,
      };
    }) as typeof node.children;
  };

  visit(tree);
};
