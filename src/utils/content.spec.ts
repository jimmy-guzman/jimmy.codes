import * as childProcess from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
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
