import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import fc from "fast-check";
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

// ── Fast-check fuzz ────────────────────────────────────────────

const fuzzVec2 = fc.record({
  x: fc.double({ min: -10000, max: 10000, noNaN: true }),
  y: fc.double({ min: -10000, max: 10000, noNaN: true }),
});

describe("Fuzz: spline endpoints", () => {
  test("GetSplinePointLinear: t=0 → p1, t=1 → p2", () => {
    fc.assert(
      fc.property(fuzzVec2, fuzzVec2, (p1, p2) => {
        const at0 = Raylib.getSplinePointLinear(p1, p2, 0);
        const at1 = Raylib.getSplinePointLinear(p1, p2, 1);
        return (
          Math.abs(at0.x - p1.x) < 0.01 &&
          Math.abs(at0.y - p1.y) < 0.01 &&
          Math.abs(at1.x - p2.x) < 0.01 &&
          Math.abs(at1.y - p2.y) < 0.01
        );
      }),
      { numRuns: 300 },
    );
  });

  test("GetSplinePointBezierQuad: t=0 → p1, t=1 → p3", () => {
    fc.assert(
      fc.property(fuzzVec2, fuzzVec2, fuzzVec2, (p1, p2, p3) => {
        const at0 = Raylib.getSplinePointBezierQuad(p1, p2, p3, 0);
        const at1 = Raylib.getSplinePointBezierQuad(p1, p2, p3, 1);
        return (
          Math.abs(at0.x - p1.x) < 0.01 &&
          Math.abs(at0.y - p1.y) < 0.01 &&
          Math.abs(at1.x - p3.x) < 0.01 &&
          Math.abs(at1.y - p3.y) < 0.01
        );
      }),
      { numRuns: 300 },
    );
  });

  test("GetSplinePointBezierCubic: t=0 → p1, t=1 → p4", () => {
    fc.assert(
      fc.property(fuzzVec2, fuzzVec2, fuzzVec2, fuzzVec2, (p1, p2, p3, p4) => {
        const at0 = Raylib.getSplinePointBezierCubic(p1, p2, p3, p4, 0);
        const at1 = Raylib.getSplinePointBezierCubic(p1, p2, p3, p4, 1);
        return (
          Math.abs(at0.x - p1.x) < 0.01 &&
          Math.abs(at0.y - p1.y) < 0.01 &&
          Math.abs(at1.x - p4.x) < 0.01 &&
          Math.abs(at1.y - p4.y) < 0.01
        );
      }),
      { numRuns: 300 },
    );
  });

  test("GetSplinePointCatmullRom: t=0 → p2, t=1 → p3", () => {
    fc.assert(
      fc.property(fuzzVec2, fuzzVec2, fuzzVec2, fuzzVec2, (p1, p2, p3, p4) => {
        const at0 = Raylib.getSplinePointCatmullRom(p1, p2, p3, p4, 0);
        const at1 = Raylib.getSplinePointCatmullRom(p1, p2, p3, p4, 1);
        return (
          Math.abs(at0.x - p2.x) < 0.01 &&
          Math.abs(at0.y - p2.y) < 0.01 &&
          Math.abs(at1.x - p3.x) < 0.01 &&
          Math.abs(at1.y - p3.y) < 0.01
        );
      }),
      { numRuns: 300 },
    );
  });
});

describe("Fuzz: spline linear interpolation", () => {
  test("midpoint at t=0.5 is average of endpoints", () => {
    fc.assert(
      fc.property(fuzzVec2, fuzzVec2, (p1, p2) => {
        const mid = Raylib.getSplinePointLinear(p1, p2, 0.5);
        return (
          Math.abs(mid.x - (p1.x + p2.x) / 2) < 0.02 &&
          Math.abs(mid.y - (p1.y + p2.y) / 2) < 0.02
        );
      }),
      { numRuns: 300 },
    );
  });
});
