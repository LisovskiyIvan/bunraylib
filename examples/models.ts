import { Raylib, COLORS, KEYS, CAMERA } from "../src";
import type { Camera3D } from "../src/types";
import { join } from "path";

Raylib.initWindow(1200, 800, "Model Demo");
Raylib.setTargetFPS(60);

const dir = join(import.meta.dir, "../assets/models/GLB format");

const models = [
  { name: "Sedan", model: Raylib.loadModel(join(dir, "sedan.glb")) },
  { name: "SUV", model: Raylib.loadModel(join(dir, "suv.glb")) },
  { name: "Truck", model: Raylib.loadModel(join(dir, "truck.glb")) },
  { name: "Taxi", model: Raylib.loadModel(join(dir, "taxi.glb")) },
  { name: "Police", model: Raylib.loadModel(join(dir, "police.glb")) },
  { name: "Race", model: Raylib.loadModel(join(dir, "race.glb")) },
];

const camera: Camera3D = {
  position: { x: 10, y: 10, z: 10 },
  target: { x: 0, y: 0, z: 0 },
  up: { x: 0, y: 1, z: 0 },
  fovy: 45,
  projection: CAMERA.PERSPECTIVE,
};

let current = 0;
let wireframe = false;
let angle = 0;
let camAngle = 0;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();
  angle += dt * 45;
  camAngle += dt * 0.3;

  if (Raylib.isKeyPressed(KEYS.RIGHT)) current = (current + 1) % models.length;
  if (Raylib.isKeyPressed(KEYS.LEFT)) current = (current - 1 + models.length) % models.length;
  if (Raylib.isKeyPressed(KEYS.W)) wireframe = !wireframe;

  camera.position.x = 12 * Math.cos(camAngle);
  camera.position.z = 12 * Math.sin(camAngle);

  const m = models[current]!;
  const bb = Raylib.getModelBoundingBox(m.model);
  const rotAxis = { x: 0, y: 1, z: 0 };

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  Raylib.beginMode3D(camera);
  Raylib.drawGrid(20, 1);

  if (wireframe) {
    Raylib.drawModelWiresEx(
      m.model,
      { x: 0, y: 0, z: 0 },
      rotAxis, angle,
      { x: 1, y: 1, z: 1 },
      COLORS.WHITE,
    );
  } else {
    Raylib.drawModelEx(
      m.model,
      { x: 0, y: 0, z: 0 },
      rotAxis, angle,
      { x: 1, y: 1, z: 1 },
      COLORS.WHITE,
    );
  }

  Raylib.endMode3D();

  let ty = 10;
  Raylib.drawText("MODEL DEMO", 10, ty, 28, COLORS.GOLD); ty += 35;
  Raylib.drawText(`Model: ${m.name} (${current + 1}/${models.length})`, 10, ty, 20, COLORS.WHITE); ty += 25;
  Raylib.drawText(`Mode: ${wireframe ? "Wireframe" : "Solid"}`, 10, ty, 18, COLORS.CYAN); ty += 22;
  Raylib.drawText(`BB min: (${bb.min.x.toFixed(2)}, ${bb.min.y.toFixed(2)}, ${bb.min.z.toFixed(2)})`, 10, ty, 16, COLORS.LIME); ty += 20;
  Raylib.drawText(`BB max: (${bb.max.x.toFixed(2)}, ${bb.max.y.toFixed(2)}, ${bb.max.z.toFixed(2)})`, 10, ty, 16, COLORS.LIME); ty += 25;
  Raylib.drawText("[Left/Right] Switch model", 10, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[W] Toggle wireframe", 10, ty, 16, COLORS.LIGHTGRAY);

  const thumbX = 10;
  const thumbY = 660;
  for (let i = 0; i < models.length; i++) {
    const c = i === current ? COLORS.GOLD : COLORS.LIGHTGRAY;
    Raylib.drawText(`[${i + 1}] ${models[i]!.name}`, thumbX + i * 190, thumbY, 16, c);
  }

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();
}

for (const m of models) Raylib.unloadModel(m.model);
Raylib.closeWindow();
