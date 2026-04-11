import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib, color } from "../src";
import type { Shader, Font, GlyphInfo, Image } from "../src/types";
import { join } from "path";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Shader Font Extended Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Shader", () => {
  test("loadShader with null vs (default vertex)", () => {
    const shader: Shader = Raylib.loadShader(null, "");
    expect(shader).toBeGreaterThanOrEqual(0);
    Raylib.unloadShader(shader);
  });

  test("isShaderValid", () => {
    const shader = Raylib.loadShader(null, "");
    expect(typeof Raylib.isShaderValid(shader)).toBe("boolean");
    Raylib.unloadShader(shader);
  });

  test("getShaderLocation returns -1 for missing uniform", () => {
    const shader = Raylib.loadShader(null, "");
    const loc = Raylib.getShaderLocation(shader, "nonexistent");
    expect(loc).toBe(-1);
    Raylib.unloadShader(shader);
  });

  test("beginShaderMode / endShaderMode does not crash", () => {
    const shader = Raylib.loadShader(null, "");
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.beginShaderMode(shader);
    Raylib.drawRectangle(10, 10, 50, 50, color(255, 0, 0, 255));
    Raylib.endShaderMode();
    Raylib.endDrawing();
    Raylib.unloadShader(shader);
  });

  test("setShaderValueMatrix does not crash", () => {
    const shader = Raylib.loadShader(null, "");
    const mat = new Float32Array(16);
    mat[0] = 1; mat[5] = 1; mat[10] = 1; mat[15] = 1;
    Raylib.setShaderValueMatrix(shader, 0, mat);
    Raylib.unloadShader(shader);
  });
});

describe("Font text utilities", () => {
  const fontDir = join(import.meta.dir, "../assets/fonts");

  test("getGlyphIndex", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const idx = Raylib.getGlyphIndex(font, 65);
    expect(typeof idx).toBe("number");
    Raylib.unloadFont(font);
  });

  test("getGlyphInfo", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const info: GlyphInfo = Raylib.getGlyphInfo(font, 65);
    expect(typeof info.value).toBe("number");
    expect(typeof info.offsetX).toBe("number");
    expect(typeof info.offsetY).toBe("number");
    expect(typeof info.advanceX).toBe("number");
    expect(typeof info.image).toBe("number");
    Raylib.unloadFont(font);
  });

  test("getGlyphAtlasRec", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const rec = Raylib.getGlyphAtlasRec(font, 65);
    expect(typeof rec.x).toBe("number");
    expect(typeof rec.y).toBe("number");
    Raylib.unloadFont(font);
  });

  test("getCodepointCount", () => {
    expect(Raylib.getCodepointCount("Hello")).toBe(5);
    expect(Raylib.getCodepointCount("")).toBe(0);
  });

  test("getCodepoint", () => {
    const cp = Raylib.getCodepoint("A");
    expect(cp.codepoint).toBe(65);
    expect(cp.size).toBe(1);
  });

  test("textIsEqual", () => {
    expect(Raylib.textIsEqual("abc", "abc")).toBe(true);
    expect(Raylib.textIsEqual("abc", "def")).toBe(false);
  });

  test("textLength", () => {
    expect(Raylib.textLength("hello")).toBe(5);
    expect(Raylib.textLength("")).toBe(0);
  });

  test("textFindIndex", () => {
    expect(Raylib.textFindIndex("hello world", "world")).toBe(6);
  });

  test("textToInteger", () => {
    expect(Raylib.textToInteger("42")).toBe(42);
    expect(Raylib.textToInteger("-7")).toBe(-7);
  });

  test("textToFloat", () => {
    expect(Math.abs(Raylib.textToFloat("3.14") - 3.14)).toBeLessThan(0.01);
  });

  test("loadFontFromImage", () => {
    const img: Image = Raylib.genImageColor(128, 32, color(255, 255, 255, 255));
    const font = Raylib.loadFontFromImage(img, color(0, 0, 0, 255), 32);
    expect(typeof font).toBe("number");
    Raylib.unloadFont(font);
    Raylib.unloadImage(img);
  });

  test("drawTextCodepoint does not crash", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextCodepoint(font, 65, { x: 10, y: 10 }, 24, color(255, 255, 255, 255));
    Raylib.endDrawing();
    Raylib.unloadFont(font);
  });

  test("drawTextCodepoints does not crash", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const codepoints = new Int32Array([72, 101, 108, 108, 111]);
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextCodepoints(font, codepoints, codepoints.length, { x: 10, y: 10 }, 24, 1, color(255, 255, 255, 255));
    Raylib.endDrawing();
    Raylib.unloadFont(font);
  });
});
