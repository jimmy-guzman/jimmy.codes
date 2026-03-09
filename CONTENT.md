# Content Rules

## No em dashes

Use a comma, period, or restructure the sentence instead.

Em dashes create rhythm that doesn't translate well to technical writing. They can feel informal or ambiguous about the relationship between clauses.

## No horizontal rules as section dividers

Don't use `---` to separate sections when a heading is already doing that job.

Headings provide structure and are navigable. A `---` on top of a heading is visual noise with no semantic value.

Exception: `---` is fine as a thematic break when there is no heading on either side (e.g. a closing thought separated from the last section).

## No curly/smart quotes in prose

Use straight quotes (`"`) not curly quotes (U+201C `\u201C` / U+201D `\u201D`).

Curly quotes are inconsistent across editors and tools, and can cause subtle encoding issues. Straight quotes are unambiguous.

Applies to prose only. Code blocks are verbatim and exempt.

## Sentence case subheadings

Write `## Like this` not `## Like This`.

Subheadings are not titles. Sentence case reads more naturally in technical prose and avoids the stiffness of title case.

Exception: proper nouns and acronyms follow their standard casing (e.g. `## Working with TypeScript`).
