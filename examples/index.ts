import { Raylib, COLORS, KEYS, MOUSE, BLEND, CAMERA } from "../src";
import type { Camera3D } from "../src/types";

Raylib.setConfigFlags(0x00000004);
Raylib.initWindow(1200, 800, "Input & Window Demo");
Raylib.setTargetFPS(60);

let x = 600;
let y = 400;
const speed = 200;
let fullscreen = false;
let showFps = true;
let blendMode = 0;
const blendModes = ["ALPHA", "ADDITIVE", "MULTIPLIED", "ADD_COLORS", "SUBTRACT"];

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.F)) {
    fullscreen = !fullscreen;
    Raylib.toggleFullscreen();
  }
  if (Raylib.isKeyPressed(KEYS.TAB)) showFps = !showFps;
  if (Raylib.isKeyPressed(KEYS.B)) blendMode = (blendMode + 1) % blendModes.length;

  if (Raylib.isKeyDown(KEYS.RIGHT) || Raylib.isKeyDown(KEYS.D)) x += speed * dt;
  if (Raylib.isKeyDown(KEYS.LEFT) || Raylib.isKeyDown(KEYS.A)) x -= speed * dt;
  if (Raylib.isKeyDown(KEYS.DOWN) || Raylib.isKeyDown(KEYS.S)) y += speed * dt;
  if (Raylib.isKeyDown(KEYS.UP) || Raylib.isKeyDown(KEYS.W)) y -= speed * dt;

  x = Math.max(0, Math.min(Raylib.getScreenWidth(), x));
  y = Math.max(0, Math.min(Raylib.getScreenHeight(), y));

  if (Raylib.isMouseButtonPressed(MOUSE.BUTTON_LEFT)) {
    x = Raylib.getMouseX();
    y = Raylib.getMouseY();
  }

  const mouse = Raylib.getMousePosition();
  const mouseInRect = mouse.x > 20 && mouse.x < 220 && mouse.y > 60 && mouse.y < 120;

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  const panelBg = mouseInRect ? COLORS.GRAY : COLORS.DARKPURPLE;
  Raylib.drawRectangle(20, 60, 200, 60, panelBg);
  Raylib.drawText("Hover me!", 35, 75, 20, COLORS.WHITE);

  let ty = 130;
  Raylib.drawText(`Screen: ${Raylib.getScreenWidth()}x${Raylib.getScreenHeight()}`, 20, ty, 18, COLORS.WHITE); ty += 22;
  Raylib.drawText(`FPS: ${Raylib.getFPS()}`, 20, ty, 18, COLORS.GREEN); ty += 22;
  Raylib.drawText(`Time: ${Raylib.getTime().toFixed(1)}s`, 20, ty, 18, COLORS.YELLOW); ty += 22;
  Raylib.drawText(`Mouse: (${mouse.x.toFixed(0)}, ${mouse.y.toFixed(0)})`, 20, ty, 18, COLORS.CYAN); ty += 22;
  Raylib.drawText(`Player: (${x.toFixed(0)}, ${y.toFixed(0)})`, 20, ty, 18, COLORS.ORANGE); ty += 22;
  Raylib.drawText(`Fullscreen: ${Raylib.isWindowFullscreen()}`, 20, ty, 18, COLORS.MAGENTA); ty += 22;
  Raylib.drawText(`Blend: ${blendModes[blendMode]}`, 20, ty, 18, COLORS.PINK); ty += 22;
  Raylib.drawText(`Monitors: ${Raylib.getMonitorCount()}`, 20, ty, 18, COLORS.LIME); ty += 22;
  const monitorName = Raylib.getMonitorName(0);
  Raylib.drawText(`Monitor: ${monitorName}`, 20, ty, 18, COLORS.GOLD); ty += 22;
  Raylib.drawText(`Resized: ${Raylib.isWindowResized()}`, 20, ty, 18, COLORS.BEIGE); ty += 22;
  Raylib.drawText(`Clipboard: ${Raylib.getClipboardText().slice(0, 30)}`, 20, ty, 18, COLORS.VIOLET); ty += 22;

  ty += 10;
  Raylib.drawText("[WASD/Arrows] Move player", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[Click] Teleport to mouse", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[F] Toggle fullscreen", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[B] Cycle blend modes", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[TAB] Toggle FPS counter", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[ESC] Quit", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;

  if (Raylib.isKeyPressed(KEYS.ONE)) Raylib.setClipboardText("Hello from rraylib!");
  if (Raylib.isKeyPressed(KEYS.TWO)) Raylib.setClipboardText("rraylib is awesome");
  Raylib.drawText("[1/2] Set clipboard text", 20, ty, 16, COLORS.LIGHTGRAY);

  if (showFps) Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);

  Raylib.beginBlendMode(blendMode);
  Raylib.drawCircle(x | 0, y | 0, 20, COLORS.RED);
  Raylib.drawCircle(mouse.x | 0, mouse.y | 0, 10, COLORS.SKYBLUE);
  Raylib.endBlendMode();

  Raylib.endDrawing();
}

Raylib.closeWindow();
