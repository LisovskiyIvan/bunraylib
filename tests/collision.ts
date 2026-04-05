import { Raylib } from "../src";
import type { Rectangle } from "../src/types";

let passed = 0;
let failed = 0;

function assert(name: string, got: boolean, expected: boolean) {
  if (got === expected) {
    console.log(`  PASS ${name}: ${got}`);
    passed++;
  } else {
    console.log(`  FAIL ${name}: got ${got}, expected ${expected}`);
    failed++;
  }
}

function assertRect(name: string, got: Rectangle, expected: Rectangle, eps = 0.01) {
  const ok =
    Math.abs(got.x - expected.x) < eps &&
    Math.abs(got.y - expected.y) < eps &&
    Math.abs(got.width - expected.width) < eps &&
    Math.abs(got.height - expected.height) < eps;
  if (ok) {
    console.log(`  PASS ${name}: { x: ${got.x}, y: ${got.y}, w: ${got.width}, h: ${got.height} }`);
    passed++;
  } else {
    console.log(`  FAIL ${name}: got { x: ${got.x}, y: ${got.y}, w: ${got.width}, h: ${got.height} }, expected { x: ${expected.x}, y: ${expected.y}, w: ${expected.width}, h: ${expected.height} }`);
    failed++;
  }
}

Raylib.initWindow(100, 100, "Collision Test");
Raylib.setTargetFPS(60);

console.log("\n=== CheckCollisionRecs ===");
assert("overlapping", Raylib.checkCollisionRecs(
  { x: 0, y: 0, width: 100, height: 100 },
  { x: 50, y: 50, width: 100, height: 100 },
), true);
assert("not overlapping", Raylib.checkCollisionRecs(
  { x: 0, y: 0, width: 50, height: 50 },
  { x: 100, y: 100, width: 50, height: 50 },
), false);
assert("touching edge", Raylib.checkCollisionRecs(
  { x: 0, y: 0, width: 50, height: 50 },
  { x: 50, y: 0, width: 50, height: 50 },
), false);

console.log("\n=== CheckCollisionCircles ===");
assert("overlapping", Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 15, y: 0 }, 10), true);
assert("not overlapping", Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 30, y: 0 }, 10), false);
assert("touching", Raylib.checkCollisionCircles({ x: 0, y: 0 }, 10, { x: 20, y: 0 }, 10), true);

console.log("\n=== CheckCollisionCircleRec ===");
assert("circle inside rect", Raylib.checkCollisionCircleRec({ x: 50, y: 50 }, 10, { x: 0, y: 0, width: 100, height: 100 }), true);
assert("circle outside rect", Raylib.checkCollisionCircleRec({ x: 200, y: 200 }, 10, { x: 0, y: 0, width: 100, height: 100 }), false);
assert("circle overlaps rect edge", Raylib.checkCollisionCircleRec({ x: 95, y: 50 }, 10, { x: 0, y: 0, width: 100, height: 100 }), true);

console.log("\n=== CheckCollisionPointRec ===");
assert("point inside", Raylib.checkCollisionPointRec({ x: 50, y: 50 }, { x: 0, y: 0, width: 100, height: 100 }), true);
assert("point outside", Raylib.checkCollisionPointRec({ x: 150, y: 150 }, { x: 0, y: 0, width: 100, height: 100 }), false);
assert("point on edge", Raylib.checkCollisionPointRec({ x: 100, y: 50 }, { x: 0, y: 0, width: 100, height: 100 }), false);

console.log("\n=== CheckCollisionPointCircle ===");
assert("point inside", Raylib.checkCollisionPointCircle({ x: 5, y: 0 }, { x: 0, y: 0 }, 10), true);
assert("point outside", Raylib.checkCollisionPointCircle({ x: 15, y: 0 }, { x: 0, y: 0 }, 10), false);
assert("point on edge", Raylib.checkCollisionPointCircle({ x: 10, y: 0 }, { x: 0, y: 0 }, 10), true);

console.log("\n=== CheckCollisionPointTriangle ===");
assert("point inside", Raylib.checkCollisionPointTriangle(
  { x: 5, y: 2 }, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 },
), true);
assert("point outside", Raylib.checkCollisionPointTriangle(
  { x: 20, y: 20 }, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 },
), false);

console.log("\n=== CheckCollisionPointLine ===");
assert("point near line", Raylib.checkCollisionPointLine(
  { x: 5, y: 2 }, { x: 0, y: 0 }, { x: 10, y: 0 }, 5,
), true);
assert("point far from line", Raylib.checkCollisionPointLine(
  { x: 5, y: 20 }, { x: 0, y: 0 }, { x: 10, y: 0 }, 5,
), false);

console.log("\n=== CheckCollisionPointPoly ===");
const poly = new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]);
assert("point inside poly", Raylib.checkCollisionPointPoly({ x: 50, y: 50 }, poly, 4), true);
assert("point outside poly", Raylib.checkCollisionPointPoly({ x: 150, y: 50 }, poly, 4), false);

console.log("\n=== CheckCollisionLines ===");
const cross = Raylib.checkCollisionLines(
  { x: 0, y: 0 }, { x: 100, y: 100 },
  { x: 100, y: 0 }, { x: 0, y: 100 },
);
assert("crossing lines collide", cross.collides, true);
assert("crossing point x ~50", Math.abs(cross.collisionPoint.x - 50) < 1, true);
assert("crossing point y ~50", Math.abs(cross.collisionPoint.y - 50) < 1, true);

const parallel = Raylib.checkCollisionLines(
  { x: 0, y: 0 }, { x: 100, y: 0 },
  { x: 0, y: 50 }, { x: 100, y: 50 },
);
assert("parallel lines no collide", parallel.collides, false);

console.log("\n=== CheckCollisionCircleLine ===");
assert("circle hits line", Raylib.checkCollisionCircleLine(
  { x: 50, y: 5 }, 10, { x: 0, y: 0 }, { x: 100, y: 0 },
), true);
assert("circle misses line", Raylib.checkCollisionCircleLine(
  { x: 50, y: 50 }, 5, { x: 0, y: 0 }, { x: 100, y: 0 },
), false);

console.log("\n=== GetCollisionRec ===");
const overlap = Raylib.getCollisionRec(
  { x: 0, y: 0, width: 100, height: 100 },
  { x: 50, y: 50, width: 100, height: 100 },
);
assertRect("overlap region", overlap, { x: 50, y: 50, width: 50, height: 50 });

const noOverlap = Raylib.getCollisionRec(
  { x: 0, y: 0, width: 50, height: 50 },
  { x: 100, y: 100, width: 50, height: 50 },
);
assertRect("no overlap", noOverlap, { x: 0, y: 0, width: 0, height: 0 });

Raylib.closeWindow();

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
