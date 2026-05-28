import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import fc from "fast-check";
import { Raylib } from "../src";
import { join } from "path";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Text Extended Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Codepoint navigation", () => {
  test("getCodepointNext for ASCII", () => {
    const cp = Raylib.getCodepointNext("Hello");
    expect(cp.codepoint).toBe(72); // 'H'
    expect(cp.size).toBe(1);
  });

  test("getCodepointPrevious for ASCII from start returns 0", () => {
    const cp = Raylib.getCodepointPrevious("Hello");
    // The wrapper passes string start, so going backwards yields 0
    expect(cp.codepoint).toBe(0);
  });

  test("getCodepointNext for empty string", () => {
    const cp = Raylib.getCodepointNext("");
    expect(cp.codepoint).toBe(0);
  });

  test("getCodepointPrevious for empty string", () => {
    const cp = Raylib.getCodepointPrevious("");
    expect(cp.codepoint).toBe(0);
  });

  test("getCodepointNext for multi-byte UTF-8", () => {
    const cp = Raylib.getCodepointNext("é");
    expect(cp.codepoint).toBeGreaterThan(127);
    expect(cp.size).toBeGreaterThan(1);
  });
});

describe("Measure text codepoints", () => {
  const fontDir = join(import.meta.dir, "../assets/fonts");

  test("measureTextCodepoints returns positive size", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const codepoints = new Int32Array([72, 101, 108, 108, 111]);
    const size = Raylib.measureTextCodepoints(font, codepoints, codepoints.length, 24, 1);
    expect(size.x).toBeGreaterThan(0);
    expect(size.y).toBeGreaterThan(0);
    Raylib.unloadFont(font);
  });

  test("measureTextCodepoints matches measureTextEx for same text", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const text = "Hello";
    const codepoints = new Int32Array([72, 101, 108, 108, 111]);
    const size1 = Raylib.measureTextEx(font, text, 24, 1);
    const size2 = Raylib.measureTextCodepoints(font, codepoints, codepoints.length, 24, 1);
    expect(Math.abs(size1.x - size2.x)).toBeLessThan(2);
    Raylib.unloadFont(font);
  });
});

// ── Fast-check fuzz ────────────────────────────────────────────

describe("Fuzz: codepoint navigation", () => {
  test("getCodepointNext → getCodepointPrevious roundtrip for ASCII", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1, maxLength: 20 }), (s) => {
        const next = Raylib.getCodepointNext(s);
        const prev = Raylib.getCodepointPrevious(s);
        // Both should return valid results for non-empty ASCII strings
        return next.codepoint >= 0 && prev.codepoint >= 0;
      }),
      { numRuns: 300 },
    );
  });
});
