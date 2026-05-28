import { Raylib, COLORS, KEYS, MOUSE, FLAGS } from "../src";

Raylib.setConfigFlags(0x00000004);
Raylib.initWindow(1200, 800, "Input & Window Demo");
Raylib.setTargetFPS(300);

let x = 600;
let y = 400;
const speed = 200;
let fullscreen = false;
let showFps = true;
let blendMode = 0;
let clipboardPreview = "";
const blendModes = ["ALPHA", "ADDITIVE", "MULTIPLIED", "ADD_COLORS", "SUBTRACT"];
let cursorIdx = 0;
const cursors = ["DEFAULT", "ARROW", "IBEAM", "CROSSHAIR", "POINTING_HAND", "RESIZE_EW", "RESIZE_NS", "RESIZE_NWSE", "RESIZE_NESW", "RESIZE_ALL", "NOT_ALLOWED"];
let wheelAccum = 0;
let titleTimer = 0;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.F)) {
    fullscreen = !fullscreen;
    Raylib.toggleFullscreen();
  }
  if (Raylib.isKeyPressed(KEYS.TAB)) showFps = !showFps;
  if (Raylib.isKeyPressed(KEYS.B)) blendMode = (blendMode + 1) % blendModes.length;
  if (Raylib.isKeyPressed(KEYS.C)) clipboardPreview = Raylib.getClipboardText().slice(0, 30);
  if (Raylib.isKeyPressed(KEYS.M)) {
    cursorIdx = (cursorIdx + 1) % cursors.length;
    Raylib.setMouseCursor(cursorIdx);
  }
  if (Raylib.isKeyPressed(KEYS.N)) {
    titleTimer = 2;
    Raylib.setWindowTitle("Input & Window Demo — Title Changed!");
  }
  if (Raylib.isKeyPressed(KEYS.K)) Raylib.maximizeWindow();
  if (Raylib.isKeyPressed(KEYS.L)) Raylib.minimizeWindow();
  if (Raylib.isKeyPressed(KEYS.J)) Raylib.restoreWindow();

  if (titleTimer > 0) {
    titleTimer -= dt;
    if (titleTimer <= 0) Raylib.setWindowTitle("Input & Window Demo");
  }

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
  const wheel = Raylib.getMouseWheelMove();
  const wheelV = Raylib.getMouseWheelMoveV();
  wheelAccum += wheel;

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  const panelBg = mouseInRect ? COLORS.GRAY : COLORS.DARKPURPLE;
  Raylib.drawRectangle(20, 60, 200, 60, panelBg);
  Raylib.drawText("Hover me!", 35, 75, 20, COLORS.WHITE);

  let ty = 130;
  Raylib.drawText(`Screen: ${Raylib.getScreenWidth()}x${Raylib.getScreenHeight()}`, 20, ty, 18, COLORS.WHITE); ty += 22;
  Raylib.drawText(`Render: ${Raylib.getRenderWidth()}x${Raylib.getRenderHeight()}`, 20, ty, 18, COLORS.WHITE); ty += 22;
  Raylib.drawText(`FPS: ${Raylib.getFPS()}`, 20, ty, 18, COLORS.GREEN); ty += 22;
  Raylib.drawText(`Time: ${Raylib.getTime().toFixed(1)}s`, 20, ty, 18, COLORS.YELLOW); ty += 22;
  Raylib.drawText(`FrameTime: ${(Raylib.getFrameTime() * 1000).toFixed(1)}ms`, 20, ty, 18, COLORS.YELLOW); ty += 22;
  Raylib.drawText(`Mouse: (${mouse.x.toFixed(0)}, ${mouse.y.toFixed(0)})`, 20, ty, 18, COLORS.CYAN); ty += 22;
  Raylib.drawText(`Wheel: ${wheelAccum.toFixed(0)}`, 20, ty, 18, COLORS.CYAN); ty += 22;
  Raylib.drawText(`WheelV: (${wheelV.x.toFixed(1)}, ${wheelV.y.toFixed(1)})`, 20, ty, 18, COLORS.CYAN); ty += 22;
  Raylib.drawText(`Player: (${x.toFixed(0)}, ${y.toFixed(0)})`, 20, ty, 18, COLORS.ORANGE); ty += 22;
  Raylib.drawText(`Fullscreen: ${Raylib.isWindowFullscreen()}`, 20, ty, 18, COLORS.MAGENTA); ty += 22;
  Raylib.drawText(`WindowState: ${Raylib.isWindowState(FLAGS.WINDOW_RESIZABLE) ? "RESIZABLE" : "-"}`, 20, ty, 18, COLORS.MAGENTA); ty += 22;
  Raylib.drawText(`Blend: ${blendModes[blendMode]}`, 20, ty, 18, COLORS.PINK); ty += 22;
  Raylib.drawText(`Cursor: ${cursors[cursorIdx]}`, 20, ty, 18, COLORS.PINK); ty += 22;
  Raylib.drawText(`Monitors: ${Raylib.getMonitorCount()}`, 20, ty, 18, COLORS.LIME); ty += 22;
  const monitorName = Raylib.getMonitorName(0);
  Raylib.drawText(`Monitor: ${monitorName}`, 20, ty, 18, COLORS.GOLD); ty += 22;
  Raylib.drawText(`Resized: ${Raylib.isWindowResized()}`, 20, ty, 18, COLORS.BEIGE); ty += 22;
  const winPos = Raylib.getWindowPosition();
  Raylib.drawText(`WinPos: (${winPos.x.toFixed(0)}, ${winPos.y.toFixed(0)})`, 20, ty, 18, COLORS.BEIGE); ty += 22;
  const dpi = Raylib.getWindowScaleDPI();
  Raylib.drawText(`DPI: (${dpi.x.toFixed(2)}, ${dpi.y.toFixed(2)})`, 20, ty, 18, COLORS.BEIGE); ty += 22;
  Raylib.drawText(`Clipboard: ${clipboardPreview}`, 20, ty, 18, COLORS.VIOLET); ty += 22;

  ty += 10;
  Raylib.drawText("[WASD/Arrows] Move player", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[Click] Teleport to mouse", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[F] Toggle fullscreen", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[B] Cycle blend modes", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[M] Cycle mouse cursor", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[N] Change window title", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[K] Maximize  [L] Minimize  [J] Restore", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[TAB] Toggle FPS counter", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;
  Raylib.drawText("[ESC] Quit", 20, ty, 16, COLORS.LIGHTGRAY); ty += 20;

  if (Raylib.isKeyPressed(KEYS.ONE)) {
    clipboardPreview = "Hello from rraylib!";
    Raylib.setClipboardText(clipboardPreview);
  }
  if (Raylib.isKeyPressed(KEYS.TWO)) {
    clipboardPreview = "rraylib is awesome";
    Raylib.setClipboardText(clipboardPreview);
  }
  Raylib.drawText("[1/2] Set clipboard text, [C] Read clipboard", 20, ty, 16, COLORS.LIGHTGRAY);

  if (showFps) Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);

  Raylib.beginBlendMode(blendMode);
  Raylib.drawCircle(x, y, 20, COLORS.RED);
  Raylib.drawCircle(mouse.x | 0, mouse.y | 0, 10, COLORS.SKYBLUE);
  Raylib.endBlendMode();

  Raylib.endDrawing();
}

Raylib.closeWindow();
