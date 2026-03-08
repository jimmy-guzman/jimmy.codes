import { describe, expect, it } from "vitest";

import { getAllTags, guessMaxVisible, slugifyTag } from "./tags";

describe("slugifyTag", () => {
  it("should lowercase the input", () => {
    expect(slugifyTag("ReAcT")).toBe("react");
  });

  it("should replace spaces with a single hyphen", () => {
    expect(slugifyTag("React Router")).toBe("react-router");
  });

  it("should replace slashes with a single hyphen", () => {
    expect(slugifyTag("react/router")).toBe("react-router");
  });

  it("should collapse consecutive spaces and slashes to a single hyphen", () => {
    expect(slugifyTag("react   ///   router")).toBe("react-router");
  });

  it("should preserve leading/trailing separators based on input (no trim)", () => {
    expect(slugifyTag("  TypeScript  ")).toBe("-typescript-");
  });

  it("should keep existing hyphens intact", () => {
    expect(slugifyTag("node-js")).toBe("node-js");
  });

  it("should handle unicode letters", () => {
    expect(slugifyTag("Café Crème")).toBe("café-crème");
  });
});

describe("getAllTags", () => {
  it("should return tags sorted by popularity (descending), then alphabetically", () => {
    const posts = [
      { data: { tags: ["react", "typescript"] } },
      { data: { tags: ["react", "node"] } },
      { data: { tags: ["design"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 2, tag: "react" },
      { count: 1, tag: "design" },
      { count: 1, tag: "node" },
      { count: 1, tag: "typescript" },
    ]);
  });

  it("should sort by frequency with most popular first", () => {
    const posts = [
      { data: { tags: ["a", "b"] } },
      { data: { tags: ["c", "b", "a"] } },
      { data: { tags: ["b"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 3, tag: "b" },
      { count: 2, tag: "a" },
      { count: 1, tag: "c" },
    ]);
  });

  it("should sort alphabetically when tags have the same count", () => {
    const posts = [{ data: { tags: ["zebra", "apple", "banana"] } }];

    expect(getAllTags(posts)).toEqual([
      { count: 1, tag: "apple" },
      { count: 1, tag: "banana" },
      { count: 1, tag: "zebra" },
    ]);
  });

  it("should count duplicate tags within a single post only once", () => {
    const posts = [
      { data: { tags: ["react", "react", "node"] } },
      { data: { tags: ["react"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 2, tag: "react" },
      { count: 1, tag: "node" },
    ]);
  });

  it("should ignore posts without tags", () => {
    const posts = [
      { data: {} },
      { data: { tags: undefined } },
      { data: { tags: [] } },
    ];

    expect(getAllTags(posts)).toEqual([]);
  });

  it("should not transform tag values (no slugify/case-change)", () => {
    const posts = [
      { data: { tags: ["React Router"] } },
      { data: { tags: ["TypeScript"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 1, tag: "React Router" },
      { count: 1, tag: "TypeScript" },
    ]);
  });
});

describe("guessMaxVisible", () => {
  it("should return all tags when total characters are under the target", () => {
    const tags = [
      { count: 2, tag: "CSS" },
      { count: 1, tag: "CLI" },
      { count: 1, tag: "A11y" },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should cut off when character count exceeds target", () => {
    const tags = [
      { count: 3, tag: "Frontend" },
      { count: 3, tag: "TypeScript" },
      { count: 2, tag: "Astro" },
      { count: 2, tag: "CSS" },
      { count: 2, tag: "Markdown" },
      { count: 2, tag: "Node.js" },
      { count: 1, tag: "A11y" },
      { count: 1, tag: "Analytics" },
    ];

    // Row-wrap simulation (avgCharsPerLine=34, paddingPerTag=3):
    // Line 1: Frontend(11) + TypeScript(13)=24 + Astro(8)=32 + CSS(6)=38 > 34 → wrap
    // Line 2: CSS(6) + Markdown(11)=17 + Node.js(10)=27 + A11y(7)=34 → Analytics(12): 34+12=46 > 34 → wrap
    // Line 3: lines(3) > maxLines(2) → cut at Analytics (index 7), lineChars=34
    // Overflow badge: lineChars(34) + overflowBadgeWidth(11) = 45 > 34 → backtrack → 6
    expect(guessMaxVisible(tags)).toBe(6);
  });

  it("should return actual count when fewer than 3 tags exist", () => {
    const tags = [
      { count: 1, tag: "VeryLongTagNameThatExceedsTargetImmediately" },
      { count: 1, tag: "AnotherLongOne" },
    ];

    expect(guessMaxVisible(tags)).toBe(2);
  });

  it("should return 0 with empty array", () => {
    expect(guessMaxVisible([])).toBe(0);
  });

  it("should return 1 with single tag", () => {
    const tags = [{ count: 5, tag: "React" }];

    expect(guessMaxVisible(tags)).toBe(1);
  });

  it("should account for padding in character calculation", () => {
    const tags = [
      { count: 1, tag: "A" }, // 1+3=4
      { count: 1, tag: "B" }, // 1+3=4, total=8
      { count: 1, tag: "C" }, // 1+3=4, total=12
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should handle tags with special characters and spaces", () => {
    const tags = [
      { count: 1, tag: "Next.js" },
      { count: 1, tag: "CI/CD" },
      { count: 1, tag: "Node.js" },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should break at the correct position with mixed tag lengths", () => {
    const tags = [
      { count: 1, tag: "A" }, // width=4,  line1=4
      { count: 1, tag: "BB" }, // width=5,  line1=9
      { count: 1, tag: "CCC" }, // width=6,  line1=15
      { count: 1, tag: "DDDD" }, // width=7,  line1=22
      { count: 1, tag: "EEEEE" }, // width=8,  line1=30
      { count: 1, tag: "FFFFFF" }, // width=9,  30+9=39 > 34 → wrap, line2=9
      { count: 1, tag: "GGGGGGG" }, // width=10, line2=19
      { count: 1, tag: "HHHHHHHH" }, // width=11, line2=30
      { count: 1, tag: "IIIIIIIII" }, // width=12, 30+12=42 > 34 → wrap, lines=3 > 2 → cut (index 8), prevLineChars=30
    ];

    // Overflow badge: prevLineChars(30) + overflowBadgeWidth(11) = 41 > 34 → backtrack → 7
    expect(guessMaxVisible(tags)).toBe(7);
  });

  it("should account for row wrapping caused by wide tags", () => {
    // A wide tag that doesn't fit on the current line starts a new row.
    // avgCharsPerLine=34, paddingPerTag=3
    // "Short"=5 chars → width=8, "Accessibility"=13 chars → width=16
    // Line 1: Short(8)+Short(8)=16+Short(8)=24+Short(8)=32 → Accessibility(16): 32+16=48 > 34 → wrap
    // Line 2: Accessibility(16)+Short(8)=24+Short(8)=32 → Short(8): 32+8=40 > 34 → wrap, lines=3 > 2 → cut (index 7), lineChars=32
    // Overflow badge: lineChars(32) + overflowBadgeWidth(11) = 43 > 34 → backtrack → 6
    const tags = [
      { count: 1, tag: "Short" }, // width=8,  line1=8
      { count: 1, tag: "Short" }, // width=8,  line1=16
      { count: 1, tag: "Short" }, // width=8,  line1=24
      { count: 1, tag: "Short" }, // width=8,  line1=32
      { count: 1, tag: "Accessibility" }, // width=16, 32+16=48 > 34 → wrap, line2=16
      { count: 1, tag: "Short" }, // width=8,  line2=24
      { count: 1, tag: "Short" }, // width=8,  line2=32
      { count: 1, tag: "Short" }, // width=8,  32+8=40 > 34 → wrap, lines=3 > 2 → cut (index 7)
    ];

    expect(guessMaxVisible(tags)).toBe(6);
  });

  it("should reserve space for the overflow badge on the last line", () => {
    // After simulation, if the "+N more" badge (width=11) doesn't fit on the
    // last line alongside lineChars, one tag is hidden to make room.
    // avgCharsPerLine=34, paddingPerTag=3, overflowBadgeWidth=11
    // Line 1: AAAAA(8)+AAAAA(8)=16+AAAAA(8)=24 → BBBBBBBBBBBBBBBBBBBBB(24): 24+24=48 > 34 → wrap, line2=24
    // findIndex never exceeds maxLines=2 → count=tags.length=5, lineChars=24+AAAAA(8)=32
    // No truncation (count === tags.length) → no overflow badge → return 5
    const noTruncationTags = [
      { count: 1, tag: "AAAAA" }, // width=8, line1=8
      { count: 1, tag: "AAAAA" }, // width=8, line1=16
      { count: 1, tag: "AAAAA" }, // width=8, line1=24
      { count: 1, tag: "BBBBBBBBBBBBBBBBBBBBB" }, // width=24, 24+24=48 > 34 → wrap, line2=24
      { count: 1, tag: "AAAAA" }, // width=8, line2=32
    ];
    expect(guessMaxVisible(noTruncationTags)).toBe(5);

    // Now add one more tag that causes truncation.
    // The 5 tags above fit in 2 lines with lineChars=32.
    // Adding a 6th tag: AAAAA(8), 32+8=40 > 34 → wrap, lines=3 > 2 → cut at index 5, lineChars=32
    // Overflow badge: lineChars(32) + overflowBadgeWidth(11) = 43 > 34 → backtrack → 4
    const truncationTags = [
      ...noTruncationTags,
      { count: 1, tag: "AAAAA" }, // triggers the cut
    ];
    expect(guessMaxVisible(truncationTags)).toBe(4);
  });
});
