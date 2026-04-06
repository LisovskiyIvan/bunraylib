import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import type { Vec2 } from "../src/types";

const expectVec2 = (got: Vec2, expected: Vec2, eps = 0.01) => {
  expect(Math.abs(got.x - expected.x)).toBeLessThan(eps);
  expect(Math.abs(got.y - expected.y)).toBeLessThan(eps);
};

beforeAll(() => {
  Raylib.initWindow(100, 100, "Spline Point Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("GetSplinePointLinear", () => {
  test("t=0", () => {
    expectVec2(Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 0), { x: 0, y: 0 });
  });

  test("t=0.5", () => {
    expectVec2(Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 0.5), { x: 50, y: 100 });
  });

  test("t=1", () => {
    expectVec2(Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 1), { x: 100, y: 200 });
  });
});

describe("GetSplinePointBezierQuad", () => {
  test("t=0", () => {
    expectVec2(
      Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 0),
      { x: 0, y: 0 },
    );
  });

  test("t=1", () => {
    expectVec2(
      Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 1),
      { x: 100, y: 0 },
    );
  });

  test("t=0.5", () => {
    expectVec2(
      Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 0.5),
      { x: 50, y: 50 },
    );
  });
});

describe("GetSplinePointBezierCubic", () => {
  test("t=0", () => {
    expectVec2(
      Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 0),
      { x: 0, y: 0 },
    );
  });

  test("t=1", () => {
    expectVec2(
      Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 1),
      { x: 100, y: 0 },
    );
  });

  test("t=0.5", () => {
    expectVec2(
      Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 0.5),
      { x: 50, y: 75 },
    );
  });
});

describe("GetSplinePointCatmullRom", () => {
  test("t=0 (p2)", () => {
    expectVec2(
      Raylib.getSplinePointCatmullRom({ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 0 }, 0),
      { x: 50, y: 50 },
    );
  });

  test("t=1 (p3)", () => {
    expectVec2(
      Raylib.getSplinePointCatmullRom({ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 0 }, 1),
      { x: 100, y: 50 },
    );
  });
});

describe("GetSplinePointBasis", () => {
  test("t=0.5 returns non-NaN", () => {
    const basis = Raylib.getSplinePointBasis(
      { x: 0, y: 0 },
      { x: 30, y: 50 },
      { x: 70, y: 50 },
      { x: 100, y: 0 },
      0.5,
    );
    expect(isNaN(basis.x)).toBe(false);
    expect(isNaN(basis.y)).toBe(false);
  });
});
