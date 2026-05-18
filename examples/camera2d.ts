import { Raylib, COLORS, KEYS } from "../src";
import type { Camera2D } from "../src/types";

Raylib.initWindow(1200, 800, "Camera 2D Demo");
Raylib.setTargetFPS(60);

const camera: Camera2D = {
  offset: { x: 600, y: 400 },
  target: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
};

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();
  const speed = 300 / camera.zoom;
  const zoomSpeed = 1 + dt * 2;

  if (Raylib.isKeyDown(KEYS.RIGHT) || Raylib.isKeyDown(KEYS.D)) camera.target.x += speed * dt;
  if (Raylib.isKeyDown(KEYS.LEFT) || Raylib.isKeyDown(KEYS.A)) camera.target.x -= speed * dt;
  if (Raylib.isKeyDown(KEYS.DOWN) || Raylib.isKeyDown(KEYS.S)) camera.target.y += speed * dt;
  if (Raylib.isKeyDown(KEYS.UP) || Raylib.isKeyDown(KEYS.W)) camera.target.y -= speed * dt;

  if (Raylib.isKeyDown(KEYS.Q)) camera.rotation += 90 * dt;
  if (Raylib.isKeyDown(KEYS.E)) camera.rotation -= 90 * dt;
  if (Raylib.isKeyDown(KEYS.Z)) camera.zoom *= zoomSpeed;
  if (Raylib.isKeyDown(KEYS.X)) camera.zoom /= zoomSpeed;
  camera.zoom = Math.max(0.1, Math.min(5, camera.zoom));

  if (Raylib.isKeyPressed(KEYS.R)) {
    camera.target = { x: 0, y: 0 };
    camera.rotation = 0;
    camera.zoom = 1;
  }

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  Raylib.beginMode2D(camera);

  Raylib.drawRectangle(0, 0, 100, 100, COLORS.RED);
  Raylib.drawRectangle(-100, -100, 100, 100, COLORS.GREEN);
  Raylib.drawCircle(0, 0, 20, COLORS.YELLOW);
  Raylib.drawLine(-200, 0, 200, 0, COLORS.WHITE);
  Raylib.drawLine(0, -200, 0, 200, COLORS.WHITE);

  Raylib.endMode2D();

  Raylib.drawText("Camera 2D Demo", 10, 10, 20, COLORS.WHITE);
  let ty = 40;
  Raylib.drawText(`Target: (${camera.target.x.toFixed(0)}, ${camera.target.y.toFixed(0)})`, 10, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText(`Rotation: ${camera.rotation.toFixed(1)}°`, 10, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText(`Zoom: ${camera.zoom.toFixed(2)}x`, 10, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  ty += 10;
  Raylib.drawText("[WASD/Arrows] Move", 10, ty, 14, COLORS.GRAY); ty += 18;
  Raylib.drawText("[Q/E] Rotate", 10, ty, 14, COLORS.GRAY); ty += 18;
  Raylib.drawText("[Z/X] Zoom", 10, ty, 14, COLORS.GRAY); ty += 18;
  Raylib.drawText("[R] Reset", 10, ty, 14, COLORS.GRAY); ty += 18;

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();
}

Raylib.closeWindow();
