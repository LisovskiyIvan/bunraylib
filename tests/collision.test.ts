import { describe, test, expect, beforeAll, afterAll } from "bun:test";
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
