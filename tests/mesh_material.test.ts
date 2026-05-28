import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import type { Mesh, Material, BoundingBox, RayCollision } from "../src/types";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Mesh Material Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Mesh generation", () => {
  const meshes: Mesh[] = [];

  afterAll(() => {
    for (const m of meshes) Raylib.unloadMesh(m);
  });

  test("genMeshCube", () => {
    const mesh = Raylib.genMeshCube(2, 2, 2);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshSphere", () => {
    const mesh = Raylib.genMeshSphere(1.5, 16, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshPlane", () => {
    const mesh = Raylib.genMeshPlane(10, 10, 5, 5);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshCylinder", () => {
    const mesh = Raylib.genMeshCylinder(1, 3, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshCone", () => {
    const mesh = Raylib.genMeshCone(1, 2, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshTorus", () => {
    const mesh = Raylib.genMeshTorus(2, 0.5, 16, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshKnot", () => {
    const mesh = Raylib.genMeshKnot(1, 0.5, 16, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshPoly", () => {
    const mesh = Raylib.genMeshPoly(6, 1.5);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });

  test("genMeshHemiSphere", () => {
    const mesh = Raylib.genMeshHemiSphere(1.5, 16, 16);
    expect(mesh).toBeGreaterThanOrEqual(0);
    meshes.push(mesh);
  });
});

describe("Mesh operations", () => {
  test("getMeshBoundingBox", () => {
    const mesh = Raylib.genMeshCube(2, 2, 2);
    const bb: BoundingBox = Raylib.getMeshBoundingBox(mesh);
    expect(bb.min.x).toBeLessThan(bb.max.x);
    expect(bb.min.y).toBeLessThan(bb.max.y);
    expect(bb.min.z).toBeLessThan(bb.max.z);
    Raylib.unloadMesh(mesh);
  });

  test("uploadMesh does not crash", () => {
    const mesh = Raylib.genMeshCube(1, 1, 1);
    Raylib.uploadMesh(mesh, false);
    Raylib.unloadMesh(mesh);
  });

  test("genMeshTangents does not crash", () => {
    const mesh = Raylib.genMeshSphere(1, 8, 8);
    Raylib.genMeshTangents(mesh);
    Raylib.unloadMesh(mesh);
  });
});

describe("Material", () => {
  test("loadMaterialDefault", () => {
    const mat: Material = Raylib.loadMaterialDefault();
    expect(mat).toBeGreaterThanOrEqual(0);
    Raylib.unloadMaterial(mat);
  });

  test("isMaterialValid", () => {
    const mat = Raylib.loadMaterialDefault();
    expect(Raylib.isMaterialValid(mat)).toBe(true);
    Raylib.unloadMaterial(mat);
  });
});

describe("Mesh generation from images", () => {
  test("genMeshHeightmap", () => {
    const img = Raylib.genImageColor(16, 16, 0xFFFFFFFF);
    const mesh = Raylib.genMeshHeightmap(img, { x: 10, y: 2, z: 10 });
    expect(mesh).toBeGreaterThanOrEqual(0);
    Raylib.unloadMesh(mesh);
    Raylib.unloadImage(img);
  });

  test("genMeshCubicmap", () => {
    const img = Raylib.genImageColor(4, 4, 0xFFFFFFFF);
    const mesh = Raylib.genMeshCubicmap(img, { x: 1, y: 1, z: 1 });
    expect(mesh).toBeGreaterThanOrEqual(0);
    Raylib.unloadMesh(mesh);
    Raylib.unloadImage(img);
  });
});

describe("Model from mesh", () => {
  test("loadModelFromMesh", () => {
    const mesh = Raylib.genMeshCube(2, 2, 2);
    const model = Raylib.loadModelFromMesh(mesh);
    expect(model).toBeGreaterThanOrEqual(0);
    expect(Raylib.isModelValid(model)).toBe(true);
    Raylib.unloadModel(model);
  });

  test("setModelMeshMaterial does not crash", () => {
    const mesh = Raylib.genMeshCube(1, 1, 1);
    const model = Raylib.loadModelFromMesh(mesh);
    const mat = Raylib.loadMaterialDefault();
    Raylib.setModelMeshMaterial(model, 0, mat);
    Raylib.unloadModel(model);
    Raylib.unloadMaterial(mat);
  });
});

describe("3D Collision", () => {
  test("checkCollisionSpheres", () => {
    expect(Raylib.checkCollisionSpheres({ x: 0, y: 0, z: 0 }, 5, { x: 6, y: 0, z: 0 }, 5)).toBe(true);
    expect(Raylib.checkCollisionSpheres({ x: 0, y: 0, z: 0 }, 2, { x: 10, y: 0, z: 0 }, 2)).toBe(false);
  });

  test("checkCollisionBoxes", () => {
    expect(
      Raylib.checkCollisionBoxes(
        { min: { x: 0, y: 0, z: 0 }, max: { x: 5, y: 5, z: 5 } },
        { min: { x: 3, y: 3, z: 3 }, max: { x: 8, y: 8, z: 8 } },
      ),
    ).toBe(true);
    expect(
      Raylib.checkCollisionBoxes(
        { min: { x: 0, y: 0, z: 0 }, max: { x: 2, y: 2, z: 2 } },
        { min: { x: 5, y: 5, z: 5 }, max: { x: 8, y: 8, z: 8 } },
      ),
    ).toBe(false);
  });

  test("checkCollisionBoxSphere", () => {
    expect(
      Raylib.checkCollisionBoxSphere(
        { min: { x: 0, y: 0, z: 0 }, max: { x: 5, y: 5, z: 5 } },
        { x: 3, y: 3, z: 3 }, 2,
      ),
    ).toBe(true);
  });

  test("getRayCollisionSphere", () => {
    const rc: RayCollision = Raylib.getRayCollisionSphere(
      { position: { x: 0, y: 0, z: -10 }, direction: { x: 0, y: 0, z: 1 } },
      { x: 0, y: 0, z: 0 }, 3,
    );
    expect(rc.hit).toBe(true);
    expect(rc.distance).toBeGreaterThan(0);
  });

  test("getRayCollisionBox", () => {
    const rc: RayCollision = Raylib.getRayCollisionBox(
      { position: { x: 0, y: 0, z: -10 }, direction: { x: 0, y: 0, z: 1 } },
      { min: { x: -1, y: -1, z: -1 }, max: { x: 1, y: 1, z: 1 } },
    );
    expect(rc.hit).toBe(true);
  });

  test("getRayCollisionTriangle", () => {
    const rc: RayCollision = Raylib.getRayCollisionTriangle(
      { position: { x: 0, y: 5, z: -10 }, direction: { x: 0, y: 0, z: 1 } },
      { x: -5, y: 0, z: 0 }, { x: 5, y: 0, z: 0 }, { x: 0, y: 10, z: 0 },
    );
    expect(rc.hit).toBe(true);
  });

  test("getRayCollisionQuad", () => {
    const rc: RayCollision = Raylib.getRayCollisionQuad(
      { position: { x: 0, y: 0, z: -10 }, direction: { x: 0, y: 0, z: 1 } },
      { x: -5, y: -5, z: 0 }, { x: 5, y: -5, z: 0 },
      { x: 5, y: 5, z: 0 }, { x: -5, y: 5, z: 0 },
    );
    expect(rc.hit).toBe(true);
  });
});
