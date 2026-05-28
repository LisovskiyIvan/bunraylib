import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import fc from "fast-check";
import { Raylib, color } from "../src";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Color Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Color utilities", () => {
  const red = color(230, 41, 55, 255);

  test("colorIsEqual", () => {
    expect(Raylib.colorIsEqual(red, red)).toBe(true);
    expect(Raylib.colorIsEqual(red, color(0, 0, 0, 255))).toBe(false);
  });

  test("colorToInt", () => {
    const val = Raylib.colorToInt(red);
    expect(val).not.toBe(0);
    expect(typeof val).toBe("number");
  });

  test("getColor roundtrip", () => {
    const val = Raylib.colorToInt(red);
    const restored = Raylib.getColor(val);
    expect(Raylib.colorIsEqual(red, restored)).toBe(true);
  });

  test("colorNormalize", () => {
    const n = Raylib.colorNormalize(color(255, 0, 0, 255));
    expect(Math.abs(n.x - 1)).toBeLessThan(0.02);
    expect(n.y).toBeLessThan(0.01);
    expect(n.z).toBeLessThan(0.01);
    expect(Math.abs(n.w - 1)).toBeLessThan(0.02);
  });

  test("colorFromNormalized", () => {
    const restored = Raylib.colorFromNormalized({ x: 1, y: 0, z: 0, w: 1 });
    const n = Raylib.colorNormalize(restored);
    expect(Math.abs(n.x - 1)).toBeLessThan(0.02);
    expect(n.y).toBeLessThan(0.02);
  });

  test("colorToHSV / colorFromHSV", () => {
    const hsv = Raylib.colorToHSV(color(255, 0, 0, 255));
    expect(hsv.h).toBeGreaterThanOrEqual(0);
    expect(hsv.s).toBeGreaterThanOrEqual(0);
    expect(hsv.v).toBeGreaterThanOrEqual(0);
    const restored = Raylib.colorFromHSV(hsv.h, hsv.s, hsv.v);
    const origN = Raylib.colorNormalize(color(255, 0, 0, 255));
    const restN = Raylib.colorNormalize(restored);
    expect(Math.abs(origN.x - restN.x)).toBeLessThan(0.02);
    expect(Math.abs(origN.y - restN.y)).toBeLessThan(0.02);
  });

  test("colorAlpha", () => {
    const transparent = Raylib.colorAlpha(color(255, 0, 0, 255), 0.5);
    const n = Raylib.colorNormalize(transparent);
    expect(Math.abs(n.w - 0.5)).toBeLessThan(0.02);
  });

  test("fade", () => {
    const faded = Raylib.fade(color(255, 0, 0, 255), 0.3);
    const n = Raylib.colorNormalize(faded);
    expect(Math.abs(n.w - 0.3)).toBeLessThan(0.02);
  });

  test("colorLerp", () => {
    const c1 = color(0, 0, 0, 255);
    const c2 = color(100, 100, 100, 255);
    const mid = Raylib.colorLerp(c1, c2, 0.5);
    expect(typeof mid).toBe("number");
  });

  test("colorTint", () => {
    const tinted = Raylib.colorTint(color(100, 100, 100, 255), color(255, 255, 255, 255));
    expect(typeof tinted).toBe("number");
  });

  test("colorBrightness", () => {
    const bright = Raylib.colorBrightness(color(100, 100, 100, 255), 0.5);
    expect(typeof bright).toBe("number");
  });

  test("colorContrast", () => {
    const cont = Raylib.colorContrast(color(128, 128, 128, 255), 0.5);
    expect(typeof cont).toBe("number");
  });

  test("colorAlphaBlend", () => {
    const blended = Raylib.colorAlphaBlend(color(0, 0, 0, 255), color(255, 0, 0, 128), color(255, 255, 255, 255));
    expect(typeof blended).toBe("number");
  });

  test("getPixelDataSize", () => {
    expect(Raylib.getPixelDataSize(100, 100, 7)).toBe(40000);
  });
});

describe("Shapes Vec variants", () => {
  test("drawPixelV does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawPixelV({ x: 50, y: 50 }, color(255, 0, 0, 255));
    Raylib.endDrawing();
  });

  test("drawLineV does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawLineV({ x: 10, y: 10 }, { x: 90, y: 90 }, color(255, 255, 255, 255));
    Raylib.endDrawing();
  });

  test("drawCircleV does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawCircleV({ x: 50, y: 50 }, 20, color(0, 255, 0, 255));
    Raylib.endDrawing();
  });

  test("drawCircleLinesV does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawCircleLinesV({ x: 50, y: 50 }, 20, color(0, 0, 255, 255));
    Raylib.endDrawing();
  });

  test("drawRectangleV does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawRectangleV({ x: 10, y: 10 }, { x: 50, y: 30 }, color(255, 255, 0, 255));
    Raylib.endDrawing();
  });

  test("drawRectangleRec does not crash", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawRectangleRec({ x: 10, y: 10, width: 50, height: 30 }, color(255, 0, 255, 255));
    Raylib.endDrawing();
  });
});

// ── Fast-check fuzz ────────────────────────────────────────────

const byteArb = fc.integer({ min: 0, max: 255 });
const colorArb = fc.record({ r: byteArb, g: byteArb, b: byteArb, a: byteArb });

describe("Fuzz: color roundtrips", () => {
  test("colorToInt → getColor roundtrip", () => {
    fc.assert(
      fc.property(colorArb, (c) => {
        const col = color(c.r, c.g, c.b, c.a);
        const intVal = Raylib.colorToInt(col);
        const restored = Raylib.getColor(intVal);
        return Raylib.colorIsEqual(col, restored);
      }),
      { numRuns: 500 },
    );
  });

  test("colorNormalize → colorFromNormalized roundtrip", () => {
    fc.assert(
      fc.property(colorArb, (c) => {
        const col = color(c.r, c.g, c.b, c.a);
        const n = Raylib.colorNormalize(col);
        const restored = Raylib.colorFromNormalized(n);
        // Normalized components are within [0,1]; roundtrip should be ~equal
        return Raylib.colorIsEqual(col, restored);
      }),
      { numRuns: 300 },
    );
  });

  test("colorToHSV → colorFromHSV roundtrip", () => {
    fc.assert(
      fc.property(colorArb, (c) => {
        const col = color(c.r, c.g, c.b, c.a);
        const hsv = Raylib.colorToHSV(col);
        const restored = Raylib.colorFromHSV(hsv.h, hsv.s, hsv.v);
        // Alpha preserved via original
        const withAlpha = Raylib.colorAlpha(restored, c.a / 255);
        const origN = Raylib.colorNormalize(col);
        const restN = Raylib.colorNormalize(withAlpha);
        return (
          Math.abs(origN.x - restN.x) < 0.02 &&
          Math.abs(origN.y - restN.y) < 0.02 &&
          Math.abs(origN.z - restN.z) < 0.02
        );
      }),
      { numRuns: 200 },
    );
  });
});

describe("Fuzz: color operations", () => {
  test("fade(color, alpha) preserves RGB hue, changes alpha", () => {
    fc.assert(
      fc.property(colorArb, fc.double({ min: 0, max: 1, noNaN: true }), (c, alpha) => {
        const col = color(c.r, c.g, c.b, c.a);
        const faded = Raylib.fade(col, alpha);
        const n = Raylib.colorNormalize(faded);
        return Math.abs(n.w - alpha) < 0.02;
      }),
      { numRuns: 200 },
    );
  });

  test("colorAlpha sets alpha weight without changing RGB", () => {
    fc.assert(
      fc.property(colorArb, fc.double({ min: 0, max: 1, noNaN: true }), (c, alphaWeight) => {
        const col = color(c.r, c.g, c.b, c.a);
        const result = Raylib.colorAlpha(col, alphaWeight);
        const n = Raylib.colorNormalize(result);
        return Math.abs(n.w - alphaWeight) < 0.02;
      }),
      { numRuns: 200 },
    );
  });

  test("colorIsEqual is reflexive", () => {
    fc.assert(
      fc.property(colorArb, (c) => {
        const col = color(c.r, c.g, c.b, c.a);
        return Raylib.colorIsEqual(col, col);
      }),
      { numRuns: 200 },
    );
  });
});
