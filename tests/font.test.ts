import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib, color } from "../src";
import { join } from "path";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Font Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

const fontDir = join(import.meta.dir, "../assets/fonts");

describe("Font loading", () => {
  test("loadFont from TTF", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    expect(font).toBeGreaterThanOrEqual(0);
    Raylib.unloadFont(font);
  });

  test("loadFontEx with size", () => {
    const font = Raylib.loadFontEx(join(fontDir, "test.ttf"), 32);
    expect(font).toBeGreaterThanOrEqual(0);
    Raylib.unloadFont(font);
  });

  test("getFontDefault", () => {
    const font = Raylib.getFontDefault();
    expect(font).toBeGreaterThanOrEqual(0);
  });

  test("isFontValid", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    expect(Raylib.isFontValid(font)).toBe(true);
    Raylib.unloadFont(font);
  });

  test("load multiple fonts", () => {
    const f1 = Raylib.loadFont(join(fontDir, "test.ttf"));
    const f2 = Raylib.loadFontEx(join(fontDir, "test.ttf"), 48);
    expect(f1).not.toBe(f2);
    expect(Raylib.isFontValid(f1)).toBe(true);
    expect(Raylib.isFontValid(f2)).toBe(true);
    Raylib.unloadFont(f1);
    Raylib.unloadFont(f2);
  });
});

describe("Measure text", () => {
  test("measureText returns positive width", () => {
    const w = Raylib.measureText("Hello", 20);
    expect(w).toBeGreaterThan(0);
  });

  test("measureText larger fontSize = larger width", () => {
    const w1 = Raylib.measureText("Test", 16);
    const w2 = Raylib.measureText("Test", 32);
    expect(w2).toBeGreaterThan(w1);
  });

  test("measureTextEx", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const size = Raylib.measureTextEx(font, "Hello World", 24, 1);
    expect(size.x).toBeGreaterThan(0);
    expect(size.y).toBeGreaterThan(0);
    Raylib.unloadFont(font);
  });
});

describe("Font drawing", () => {
  test("drawTextEx does not crash", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextEx(font, "Hello Font!", { x: 10, y: 10 }, 24, 1, color(255, 255, 255, 255));
    Raylib.endDrawing();
    Raylib.unloadFont(font);
  });

  test("drawTextPro with rotation", () => {
    const font = Raylib.loadFontEx(join(fontDir, "test.ttf"), 32);
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextPro(
      font,
      "Rotated!",
      { x: 50, y: 50 },
      { x: 30, y: 10 },
      Math.PI / 6,
      32, 2,
      color(255, 200, 0, 255),
    );
    Raylib.endDrawing();
    Raylib.unloadFont(font);
  });

  test("drawTextEx multiline", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    Raylib.setTextLineSpacing(28);
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextEx(font, "Line 1\nLine 2\nLine 3", { x: 5, y: 5 }, 16, 1, color(200, 200, 200, 255));
    Raylib.endDrawing();
    Raylib.unloadFont(font);
  });
});
