import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from "bun:test";
import { Raylib, color } from "../src";
import type { Image } from "../src/types";
import { join } from "path";
import { existsSync, unlinkSync } from "fs";

const fontDir = join(import.meta.dir, "../assets/fonts");

beforeAll(() => {
  Raylib.initWindow(100, 100, "Image Extended Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Image generation", () => {
  test("genImageColor", () => {
    const img = Raylib.genImageColor(64, 64, color(255, 0, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageGradientLinear", () => {
    const img = Raylib.genImageGradientLinear(64, 64, 0, color(0, 0, 0, 255), color(255, 255, 255, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageGradientRadial", () => {
    const img = Raylib.genImageGradientRadial(64, 64, 0.5, color(255, 255, 255, 255), color(0, 0, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageChecked", () => {
    const img = Raylib.genImageChecked(64, 64, 8, 8, color(255, 0, 0, 255), color(0, 255, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageWhiteNoise", () => {
    const img = Raylib.genImageWhiteNoise(64, 64, 0.5);
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImagePerlinNoise", () => {
    const img = Raylib.genImagePerlinNoise(64, 64, 0, 0, 1.0);
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageCellular", () => {
    const img = Raylib.genImageCellular(64, 64, 8);
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("genImageText", () => {
    const img = Raylib.genImageText(64, 16, "Hello!");
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });
});

describe("Image generation extended", () => {
  test("genImageGradientSquare", () => {
    const img = Raylib.genImageGradientSquare(64, 64, 0.5, color(255, 255, 255, 255), color(0, 0, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("imageFromChannel", () => {
    const img = Raylib.genImageColor(64, 64, color(255, 128, 64, 255));
    const ch = Raylib.imageFromChannel(img, 0);
    expect(ch).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(ch);
    Raylib.unloadImage(img);
  });

  test("imageText", () => {
    const img = Raylib.imageText("Hello", 20, color(255, 0, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
  });

  test("imageTextEx", () => {
    const font = Raylib.loadFont(join(fontDir, "test.ttf"));
    const img = Raylib.imageTextEx(font, "Hello", 20, 1, color(255, 0, 0, 255));
    expect(img).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(img);
    Raylib.unloadFont(font);
  });
});

describe("Image manipulation", () => {
  let img: Image;

  beforeEach(() => {
    img = Raylib.genImageColor(100, 100, color(128, 128, 128, 255));
  });

  afterEach(() => {
    Raylib.unloadImage(img);
  });

  test("imageCopy", () => {
    const copy = Raylib.imageCopy(img);
    expect(copy).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(copy);
  });

  test("imageFromImage", () => {
    const sub = Raylib.imageFromImage(img, { x: 10, y: 10, width: 50, height: 50 });
    expect(sub).toBeGreaterThanOrEqual(0);
    Raylib.unloadImage(sub);
  });

  test("imageResize", () => {
    Raylib.imageResize(img, 50, 50);
  });

  test("imageResizeNN", () => {
    Raylib.imageResizeNN(img, 200, 200);
  });

  test("imageFlipVertical", () => {
    Raylib.imageFlipVertical(img);
  });

  test("imageFlipHorizontal", () => {
    Raylib.imageFlipHorizontal(img);
  });

  test("imageRotate", () => {
    Raylib.imageRotate(img, 90);
  });

  test("imageRotateCW", () => {
    Raylib.imageRotateCW(img);
  });

  test("imageRotateCCW", () => {
    Raylib.imageRotateCCW(img);
  });

  test("imageColorTint", () => {
    Raylib.imageColorTint(img, color(255, 0, 0, 255));
  });

  test("imageColorInvert", () => {
    Raylib.imageColorInvert(img);
  });

  test("imageColorGrayscale", () => {
    Raylib.imageColorGrayscale(img);
  });

  test("imageColorBrightness", () => {
    Raylib.imageColorBrightness(img, 50);
  });

  test("imageColorContrast", () => {
    Raylib.imageColorContrast(img, 0.5);
  });

  test("imageMipmaps", () => {
    Raylib.imageMipmaps(img);
  });

  test("imageDither", () => {
    Raylib.imageDither(img, 8, 8, 8, 8);
  });

  test("imageFormat", () => {
    Raylib.imageFormat(img, 7);
  });

  test("imageBlurGaussian", () => {
    Raylib.imageBlurGaussian(img, 4);
  });

  test("imageAlphaPremultiply", () => {
    Raylib.imageAlphaPremultiply(img);
  });
});

describe("Image drawing on image", () => {
  let dst: Image;

  beforeEach(() => {
    dst = Raylib.genImageColor(128, 128, color(0, 0, 0, 255));
  });

  afterEach(() => {
    Raylib.unloadImage(dst);
  });

  test("imageClearBackground", () => {
    Raylib.imageClearBackground(dst, color(255, 0, 0, 255));
  });

  test("imageDrawPixel", () => {
    Raylib.imageDrawPixel(dst, 10, 10, color(255, 255, 255, 255));
  });

  test("imageDrawLine", () => {
    Raylib.imageDrawLine(dst, 0, 0, 127, 127, color(255, 0, 0, 255));
  });

  test("imageDrawCircle", () => {
    Raylib.imageDrawCircle(dst, 64, 64, 30, color(0, 255, 0, 255));
  });

  test("imageDrawRectangle", () => {
    Raylib.imageDrawRectangle(dst, 10, 10, 50, 50, color(0, 0, 255, 255));
  });

  test("imageDrawTriangle", () => {
    Raylib.imageDrawTriangle(dst, { x: 64, y: 10 }, { x: 10, y: 100 }, { x: 118, y: 100 }, color(255, 255, 0, 255));
  });
});

describe("Image info", () => {
  test("getImageColor", () => {
    const img = Raylib.genImageColor(10, 10, color(255, 0, 0, 255));
    const c = Raylib.getImageColor(img, 5, 5);
    expect(typeof c).toBe("number");
    Raylib.unloadImage(img);
  });

  test("getImageAlphaBorder", () => {
    const img = Raylib.genImageColor(64, 64, color(255, 255, 255, 255));
    const border = Raylib.getImageAlphaBorder(img, 0.0);
    expect(typeof border.x).toBe("number");
    expect(typeof border.y).toBe("number");
    Raylib.unloadImage(img);
  });
});

describe("Image to texture", () => {
  test("loadTextureFromImage", () => {
    const img = Raylib.genImageColor(64, 64, color(255, 0, 0, 255));
    const tex = Raylib.loadTextureFromImage(img);
    expect(tex.id).toBeGreaterThan(0);
    expect(tex.width).toBe(64);
    expect(tex.height).toBe(64);
    Raylib.unloadTexture(tex);
    Raylib.unloadImage(img);
  });
});

describe("Image export", () => {
  test("exportImage", () => {
    const img = Raylib.genImageColor(4, 4, color(255, 0, 0, 255));
    const tmpFile = join(import.meta.dir, "_rr_test_export.png");
    const result = Raylib.exportImage(img, tmpFile);
    expect(result).toBe(true);
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
    Raylib.unloadImage(img);
  });

  test("exportImageAsCode", () => {
    const img = Raylib.genImageColor(4, 4, color(255, 0, 0, 255));
    const tmpFile = join(import.meta.dir, "_rr_test_export_code.h");
    const result = Raylib.exportImageAsCode(img, tmpFile);
    expect(typeof result).toBe("boolean");
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
    Raylib.unloadImage(img);
  });
});
