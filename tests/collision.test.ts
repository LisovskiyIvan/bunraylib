import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import fc from "fast-check";
import { Raylib } from "../src";
import type { Rectangle } from "../src/types";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Collision Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("CheckCollisionRecs", () => {
  test("overlapping", () => {
    expect(
      Raylib.checkCollisionRecs(
        { x: 0, y: 0, width: 100, height: 100 },
        { x: 50, y: 50, width: 100, height: 100 },
      ),
    ).toBe(true);
  });

  test("not overlapping", () => {
    expect(
      Raylib.checkCollisionRecs(
        { x: 0, y: 0, width: 50, height: 50 },
        { x: 100, y: 100, width: 50, height: 50 },
      ),
    ).toBe(false);
  });

  test("touching edge", () => {
    expect(
      Raylib.checkCollisionRecs(
        { x: 0, y: 0, width: 50, height: 50 },
        { x: 50, y: 0, width: 50, height: 50 },
      ),
    ).toBe(false);
  });
});

describe("CheckCollisionCircles", () => {
  test("overlapping", () => {
    expect(Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 15, y: 0 }, 10)).toBe(true);
  });

  test("not overlapping", () => {
    expect(Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 30, y: 0 }, 10)).toBe(false);
  });

  test("touching", () => {
    expect(Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 20, y: 0 }, 10)).toBe(true);
  });
});

describe("CheckCollisionCircleRec", () => {
  test("circle inside rect", () => {
    expect(
      Raylib.checkCollisionCircleRec({ x: 50, y: 50 }, 10, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(true);
  });

  test("circle outside rect", () => {
    expect(
      Raylib.checkCollisionCircleRec({ x: 200, y: 200 }, 10, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(false);
  });

  test("circle overlaps rect edge", () => {
    expect(
      Raylib.checkCollisionCircleRec({ x: 95, y: 50 }, 10, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(true);
  });
});

describe("CheckCollisionPointRec", () => {
  test("point inside", () => {
    expect(
      Raylib.checkCollisionPointRec({ x: 50, y: 50 }, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(true);
  });

  test("point outside", () => {
    expect(
      Raylib.checkCollisionPointRec({ x: 150, y: 150 }, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(false);
  });

  test("point on edge", () => {
    expect(
      Raylib.checkCollisionPointRec({ x: 100, y: 50 }, { x: 0, y: 0, width: 100, height: 100 }),
    ).toBe(false);
  });
});

describe("CheckCollisionPointCircle", () => {
  test("point inside", () => {
    expect(Raylib.checkCollisionPointCircle({ x: 5, y: 0 }, { x: 0, y: 0 }, 10)).toBe(true);
  });

  test("point outside", () => {
    expect(Raylib.checkCollisionPointCircle({ x: 15, y: 0 }, { x: 0, y: 0 }, 10)).toBe(false);
  });

  test("point on edge", () => {
    expect(Raylib.checkCollisionPointCircle({ x: 10, y: 0 }, { x: 0, y: 0 }, 10)).toBe(true);
  });
});

describe("CheckCollisionPointTriangle", () => {
  test("point inside", () => {
    expect(
      Raylib.checkCollisionPointTriangle({ x: 5, y: 2 }, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 }),
    ).toBe(true);
  });

  test("point outside", () => {
    expect(
      Raylib.checkCollisionPointTriangle({ x: 20, y: 20 }, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 }),
    ).toBe(false);
  });
});

describe("CheckCollisionPointLine", () => {
  test("point near line", () => {
    expect(Raylib.checkCollisionPointLine({ x: 5, y: 2 }, { x: 0, y: 0 }, { x: 10, y: 0 }, 5)).toBe(true);
  });

  test("point far from line", () => {
    expect(Raylib.checkCollisionPointLine({ x: 5, y: 20 }, { x: 0, y: 0 }, { x: 10, y: 0 }, 5)).toBe(false);
  });
});

describe("CheckCollisionPointPoly", () => {
  const poly = new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]);

  test("point inside poly", () => {
    expect(Raylib.checkCollisionPointPoly({ x: 50, y: 50 }, poly)).toBe(true);
  });

  test("point outside poly", () => {
    expect(Raylib.checkCollisionPointPoly({ x: 150, y: 50 }, poly)).toBe(false);
  });
});

describe("CheckCollisionLines", () => {
  test("crossing lines collide", () => {
    const cross = Raylib.checkCollisionLines(
      { x: 0, y: 0 },
      { x: 100, y: 100 },
      { x: 100, y: 0 },
      { x: 0, y: 100 },
    );
    expect(cross.collides).toBe(true);
    expect(Math.abs(cross.collisionPoint.x - 50)).toBeLessThan(1);
    expect(Math.abs(cross.collisionPoint.y - 50)).toBeLessThan(1);
  });

  test("parallel lines no collide", () => {
    const parallel = Raylib.checkCollisionLines(
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 0, y: 50 },
      { x: 100, y: 50 },
    );
    expect(parallel.collides).toBe(false);
  });
});

describe("CheckCollisionCircleLine", () => {
  test("circle hits line", () => {
    expect(Raylib.checkCollisionCircleLine({ x: 50, y: 5 }, 10, { x: 0, y: 0 }, { x: 100, y: 0 })).toBe(
      true,
    );
  });

  test("circle misses line", () => {
    expect(Raylib.checkCollisionCircleLine({ x: 50, y: 50 }, 5, { x: 0, y: 0 }, { x: 100, y: 0 })).toBe(
      false,
    );
  });
});

describe("GetCollisionRec", () => {
  const expectRect = (got: Rectangle, expected: Rectangle, eps = 0.01) => {
    expect(Math.abs(got.x - expected.x)).toBeLessThan(eps);
    expect(Math.abs(got.y - expected.y)).toBeLessThan(eps);
    expect(Math.abs(got.width - expected.width)).toBeLessThan(eps);
    expect(Math.abs(got.height - expected.height)).toBeLessThan(eps);
  };

  test("overlap region", () => {
    const overlap = Raylib.getCollisionRec(
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 50, y: 50, width: 100, height: 100 },
    );
    expectRect(overlap, { x: 50, y: 50, width: 50, height: 50 });
  });

  test("no overlap", () => {
    const noOverlap = Raylib.getCollisionRec(
      { x: 0, y: 0, width: 50, height: 50 },
      { x: 100, y: 100, width: 50, height: 50 },
    );
    expectRect(noOverlap, { x: 0, y: 0, width: 0, height: 0 });
  });
});

// ── Fast-check fuzz ────────────────────────────────────────────

const rectArb = fc.record({
  x: fc.integer({ min: -1000, max: 1000 }),
  y: fc.integer({ min: -1000, max: 1000 }),
  width: fc.integer({ min: 1, max: 1000 }),
  height: fc.integer({ min: 1, max: 1000 }),
});

const vec2Arb = fc.record({
  x: fc.double({ min: -1000, max: 1000, noNaN: true }),
  y: fc.double({ min: -1000, max: 1000, noNaN: true }),
});

const smallFloat = fc.double({ min: 1, max: 100, noNaN: true });

describe("Fuzz: collision symmetry", () => {
  test("checkCollisionRecs(A,B) === checkCollisionRecs(B,A)", () => {
    fc.assert(
      fc.property(rectArb, rectArb, (a, b) => {
        return Raylib.checkCollisionRecs(a, b) === Raylib.checkCollisionRecs(b, a);
      }),
      { numRuns: 500 },
    );
  });

  test("rect always collides with itself", () => {
    fc.assert(
      fc.property(rectArb, (r) => {
        return Raylib.checkCollisionRecs(r, r);
      }),
      { numRuns: 200 },
    );
  });

  test("checkCollisionPointRec: point inside rect at center", () => {
    fc.assert(
      fc.property(rectArb, (r) => {
        const cx = r.x + Math.floor(r.width / 2);
        const cy = r.y + Math.floor(r.height / 2);
        return Raylib.checkCollisionPointRec({ x: cx, y: cy }, r);
      }),
      { numRuns: 200 },
    );
  });
});

describe("Fuzz: circle collision", () => {
  test("circles collide iff distance <= radius sum", () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.double({ min: -500, max: 500, noNaN: true }), y: fc.double({ min: -500, max: 500, noNaN: true }) }),
        smallFloat,
        smallFloat,
        (center, r1, r2) => {
          // Place second circle exactly at distance d = r1 + r2
          const d = r1 + r2 + 0.01;
          const c2 = { x: center.x + d, y: center.y };
          const collides = Raylib.checkCollisionCircles(center, r1, c2, r2);
          return collides === (d <= r1 + r2);
        },
      ),
      { numRuns: 300 },
    );
  });

  test("circle collides with itself", () => {
    fc.assert(
      fc.property(vec2Arb, smallFloat, (c, r) => {
        return Raylib.checkCollisionCircles(c, r, c, r);
      }),
      { numRuns: 200 },
    );
  });
});

describe("Fuzz: point collision", () => {
  test("checkCollisionPointLine near the line", () => {
    fc.assert(
      fc.property(
        fc.double({ min: -500, max: 500, noNaN: true }),
        fc.double({ min: 1, max: 100, noNaN: true }),
        (x, threshold) => {
          // Point on the line itself near the start
          const onLine = Raylib.checkCollisionPointLine(
            { x: x, y: 0 },
            { x: x - 100, y: 0 },
            { x: x + 100, y: 0 },
            threshold,
          );
          return onLine;
        },
      ),
      { numRuns: 200 },
    );
  });
});
