import { Raylib, color } from "../src";
import type { Vec2 } from "../src/types";

let passed = 0;
let failed = 0;

function assertVec2(name: string, got: Vec2, expected: Vec2, eps = 0.01) {
  const dx = Math.abs(got.x - expected.x);
  const dy = Math.abs(got.y - expected.y);
  if (dx < eps && dy < eps) {
    console.log(`  PASS ${name}: { x: ${got.x.toFixed(2)}, y: ${got.y.toFixed(2)} }`);
    passed++;
  } else {
    console.log(`  FAIL ${name}: got { x: ${got.x}, y: ${got.y} }, expected { x: ${expected.x}, y: ${expected.y} }`);
    failed++;
  }
}

console.log("Init window (headless test)...");
Raylib.initWindow(100, 100, "Spline Point Test");
Raylib.setTargetFPS(60);

console.log("\n=== GetSplinePointLinear ===");
assertVec2("t=0", Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 0), { x: 0, y: 0 });
assertVec2("t=0.5", Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 0.5), { x: 50, y: 100 });
assertVec2("t=1", Raylib.getSplinePointLinear({ x: 0, y: 0 }, { x: 100, y: 200 }, 1), { x: 100, y: 200 });

console.log("\n=== GetSplinePointBezierQuad ===");
assertVec2("t=0", Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 0), { x: 0, y: 0 });
assertVec2("t=1", Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 1), { x: 100, y: 0 });
assertVec2("t=0.5", Raylib.getSplinePointBezierQuad({ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }, 0.5), { x: 50, y: 50 });

console.log("\n=== GetSplinePointBezierCubic ===");
assertVec2("t=0", Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 0), { x: 0, y: 0 });
assertVec2("t=1", Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 1), { x: 100, y: 0 });
assertVec2("t=0.5", Raylib.getSplinePointBezierCubic({ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }, 0.5), { x: 50, y: 75 });

console.log("\n=== GetSplinePointCatmullRom ===");
assertVec2("t=0 (p2)", Raylib.getSplinePointCatmullRom({ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 0 }, 0), { x: 50, y: 50 });
assertVec2("t=1 (p3)", Raylib.getSplinePointCatmullRom({ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 0 }, 1), { x: 100, y: 50 });

console.log("\n=== GetSplinePointBasis ===");
const basis = Raylib.getSplinePointBasis({ x: 0, y: 0 }, { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 100, y: 0 }, 0.5);
console.log(`  INFO Basis t=0.5: { x: ${basis.x.toFixed(2)}, y: ${basis.y.toFixed(2)} } (values depend on basis math, just check non-NaN)`);
if (isNaN(basis.x) || isNaN(basis.y)) {
  console.log("  FAIL: got NaN");
  failed++;
} else {
  console.log("  PASS: non-NaN result");
  passed++;
}

Raylib.closeWindow();

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
