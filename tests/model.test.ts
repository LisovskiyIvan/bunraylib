import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import { join } from "path";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Model Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

const dir = join(import.meta.dir, "../assets/models/GLB format");

describe("Model loading", () => {
  test("loadModel from glb", () => {
    const model = Raylib.loadModel(join(dir, "sedan.glb"));
    expect(model).toBeGreaterThanOrEqual(0);
    Raylib.unloadModel(model);
  });

  test("loadModel from obj", () => {
    const objDir = join(import.meta.dir, "../assets/models/OBJ format");
    const model = Raylib.loadModel(join(objDir, "box.obj"));
    expect(model).toBeGreaterThanOrEqual(0);
    Raylib.unloadModel(model);
  });

  test("isModelValid", () => {
    const model = Raylib.loadModel(join(dir, "taxi.glb"));
    expect(Raylib.isModelValid(model)).toBe(true);
    Raylib.unloadModel(model);
  });

  test("getModelBoundingBox", () => {
    const model = Raylib.loadModel(join(dir, "box.glb"));
    const bb = Raylib.getModelBoundingBox(model);
    expect(typeof bb.min.x).toBe("number");
    expect(typeof bb.min.y).toBe("number");
    expect(typeof bb.min.z).toBe("number");
    expect(typeof bb.max.x).toBe("number");
    expect(typeof bb.max.y).toBe("number");
    expect(typeof bb.max.z).toBe("number");
    Raylib.unloadModel(model);
  });

  test("load multiple models", () => {
    const models = [
      Raylib.loadModel(join(dir, "sedan.glb")),
      Raylib.loadModel(join(dir, "suv.glb")),
      Raylib.loadModel(join(dir, "truck.glb")),
    ];
    for (const m of models) {
      expect(m).toBeGreaterThanOrEqual(0);
      expect(Raylib.isModelValid(m)).toBe(true);
    }
    for (const m of models) {
      Raylib.unloadModel(m);
    }
  });
});

describe("Model drawing", () => {
  test("drawModel does not crash", () => {
    const model = Raylib.loadModel(join(dir, "box.glb"));
    const cam = {
      position: { x: 5, y: 5, z: 5 },
      target: { x: 0, y: 0, z: 0 },
      up: { x: 0, y: 1, z: 0 },
      fovy: 45,
      projection: 0,
    };
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.beginMode3D(cam);
    Raylib.drawModel(model, { x: 0, y: 0, z: 0 }, 1, 0xFFFFFFFF);
    Raylib.endMode3D();
    Raylib.endDrawing();
    Raylib.unloadModel(model);
  });

  test("drawModelEx with rotation", () => {
    const model = Raylib.loadModel(join(dir, "sedan.glb"));
    const cam = {
      position: { x: 5, y: 5, z: 5 },
      target: { x: 0, y: 0, z: 0 },
      up: { x: 0, y: 1, z: 0 },
      fovy: 45,
      projection: 0,
    };
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.beginMode3D(cam);
    Raylib.drawModelEx(
      model,
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      Math.PI / 4,
      { x: 1, y: 1, z: 1 },
      0xFFFFFFFF,
    );
    Raylib.endMode3D();
    Raylib.endDrawing();
    Raylib.unloadModel(model);
  });

  test("drawModelWires does not crash", () => {
    const model = Raylib.loadModel(join(dir, "cone.glb"));
    const cam = {
      position: { x: 5, y: 5, z: 5 },
      target: { x: 0, y: 0, z: 0 },
      up: { x: 0, y: 1, z: 0 },
      fovy: 45,
      projection: 0,
    };
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.beginMode3D(cam);
    Raylib.drawModelWires(model, { x: 0, y: 0, z: 0 }, 1, 0xFFFFFFFF);
    Raylib.endMode3D();
    Raylib.endDrawing();
    Raylib.unloadModel(model);
  });
});
