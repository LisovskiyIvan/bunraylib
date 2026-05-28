import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import fc from "fast-check";
import { Raylib } from "../src";
import type { Camera3D } from "../src/types";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Camera Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

const makeCam = (): Camera3D => ({
  position: { x: 10, y: 10, z: 10 },
  target: { x: 0, y: 0, z: 0 },
  up: { x: 0, y: 1, z: 0 },
  fovy: 45,
  projection: 0,
});

describe("Camera update", () => {
  test("updateCamera returns a camera", () => {
    const cam = makeCam();
    const updated = Raylib.updateCamera(cam, 0); // CAMERA_CUSTOM
    expect(typeof updated.position.x).toBe("number");
    expect(typeof updated.position.y).toBe("number");
    expect(typeof updated.position.z).toBe("number");
    expect(typeof updated.target.x).toBe("number");
    expect(typeof updated.fovy).toBe("number");
    expect(typeof updated.projection).toBe("number");
  });

  test("updateCameraPro returns a camera", () => {
    const cam = makeCam();
    const updated = Raylib.updateCameraPro(
      cam,
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0,
    );
    expect(typeof updated.position.x).toBe("number");
    expect(typeof updated.target.x).toBe("number");
  });
});

describe("Camera matrices", () => {
  test("getCameraMatrix returns 16-element Float32Array", () => {
    const cam = makeCam();
    const mat = Raylib.getCameraMatrix(cam);
    expect(mat.length).toBe(16);
    expect(mat instanceof Float32Array).toBe(true);
  });

  test("getCameraMatrix2D returns 16-element Float32Array", () => {
    const mat = Raylib.getCameraMatrix2D({
      offset: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      rotation: 0,
      zoom: 1,
    });
    expect(mat.length).toBe(16);
    expect(mat instanceof Float32Array).toBe(true);
  });
});

describe("World to screen", () => {
  test("getWorldToScreen returns Vec2", () => {
    const cam = makeCam();
    const screen = Raylib.getWorldToScreen({ x: 0, y: 0, z: 0 }, cam);
    expect(typeof screen.x).toBe("number");
    expect(typeof screen.y).toBe("number");
  });

  test("getWorldToScreenEx returns Vec2 with explicit size", () => {
    const cam = makeCam();
    const screen = Raylib.getWorldToScreenEx({ x: 0, y: 0, z: 0 }, cam, 100, 100);
    expect(typeof screen.x).toBe("number");
    expect(typeof screen.y).toBe("number");
  });
});

describe("Screen to world ray", () => {
  test("getScreenToWorldRay returns Ray", () => {
    const cam = makeCam();
    const ray = Raylib.getScreenToWorldRay({ x: 50, y: 50 }, cam);
    expect(typeof ray.position.x).toBe("number");
    expect(typeof ray.position.y).toBe("number");
    expect(typeof ray.position.z).toBe("number");
    expect(typeof ray.direction.x).toBe("number");
    expect(typeof ray.direction.y).toBe("number");
    expect(typeof ray.direction.z).toBe("number");
  });

  test("getScreenToWorldRayEx returns Ray", () => {
    const cam = makeCam();
    const ray = Raylib.getScreenToWorldRayEx({ x: 50, y: 50 }, cam, 100, 100);
    expect(typeof ray.position.x).toBe("number");
    expect(typeof ray.direction.x).toBe("number");
  });
});

// ── Fast-check fuzz ────────────────────────────────────────────

const vec3Arb = fc.record({
  x: fc.double({ min: -100, max: 100, noNaN: true }),
  y: fc.double({ min: -100, max: 100, noNaN: true }),
  z: fc.double({ min: -100, max: 100, noNaN: true }),
});

const cameraArb = fc.record({
  position: vec3Arb,
  target: vec3Arb,
  up: fc.record({ x: fc.constant(0), y: fc.constant(1), z: fc.constant(0) }),
  fovy: fc.double({ min: 10, max: 120, noNaN: true }),
  projection: fc.constant(0),
});

describe("Fuzz: camera determinism", () => {
  test("getCameraMatrix is deterministic", () => {
    fc.assert(
      fc.property(cameraArb, (cam: Camera3D) => {
        const m1 = Raylib.getCameraMatrix(cam);
        const m2 = Raylib.getCameraMatrix(cam);
        for (let i = 0; i < 16; i++) {
          if (m1[i] !== m2[i]) return false;
        }
        return true;
      }),
      { numRuns: 200 },
    );
  });

  test("getWorldToScreen for same input gives same output", () => {
    fc.assert(
      fc.property(cameraArb, vec3Arb, (cam, pos) => {
        // Skip degenerate camera configs
        const dx = cam.position.x - cam.target.x;
        const dy = cam.position.y - cam.target.y;
        const dz = cam.position.z - cam.target.z;
        if (dx * dx + dy * dy + dz * dz < 0.01) return true;
        const s1 = Raylib.getWorldToScreen(pos, cam);
        const s2 = Raylib.getWorldToScreen(pos, cam);
        if (!isFinite(s1.x) || !isFinite(s1.y)) return true;
        return Math.abs(s1.x - s2.x) < 0.01 && Math.abs(s1.y - s2.y) < 0.01;
      }),
      { numRuns: 200 },
    );
  });
});
