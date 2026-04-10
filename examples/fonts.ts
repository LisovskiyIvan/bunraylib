import { Raylib, COLORS, KEYS } from "../src";
import { join } from "path";

Raylib.initWindow(1000, 700, "Font Demo");
Raylib.setTargetFPS(60);

const dir = join(import.meta.dir, "../assets/fonts");

const fontDefault = Raylib.getFontDefault();
const font16 = Raylib.loadFont(join(dir, "test.ttf"));
const font32 = Raylib.loadFontEx(join(dir, "test.ttf"), 32);
const font48 = Raylib.loadFontEx(join(dir, "test.ttf"), 48);

let rotation = 0;
let showDefault = false;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();
  rotation += dt * 30;

  if (Raylib.isKeyPressed(KEYS.SPACE)) showDefault = !showDefault;

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  let y = 10;
  Raylib.drawText("FONT DEMO", 10, y, 28, COLORS.GOLD); y += 40;

  Raylib.drawText(`Mode: ${showDefault ? "Default" : "Custom TTF"}`, 10, y, 20, COLORS.WHITE); y += 30;

  const activeFont = showDefault ? fontDefault : font32;

  Raylib.drawTextEx(activeFont, "Hello from rraylib!", { x: 10, y }, 32, 1, COLORS.WHITE); y += 40;
  Raylib.drawTextEx(activeFont, "The quick brown fox jumps over the lazy dog.", { x: 10, y }, 24, 1, COLORS.CYAN); y += 35;

  Raylib.drawTextEx(font48, "BIG TEXT 48px", { x: 10, y }, 48, 2, COLORS.ORANGE); y += 60;

  Raylib.setTextLineSpacing(22);
  Raylib.drawTextEx(activeFont, "Line 1: Multiline text\nLine 2: With custom spacing\nLine 3: Using TTF font", { x: 10, y }, 18, 1, COLORS.LIGHTGRAY); y += 80;
  Raylib.setTextLineSpacing(15);

  Raylib.drawCircle(500, 400, 80, COLORS.DARKPURPLE);
  Raylib.drawTextPro(font32, "Rotated!", { x: 500, y: 400 }, { x: 60, y: 16 }, rotation, 32, 1, COLORS.WHITE);

  const text = "Measured Text";
  const size = Raylib.measureTextEx(activeFont, text, 24, 1);
  const mx = 10;
  const my = y;
  Raylib.drawTextEx(activeFont, text, { x: mx, y: my }, 24, 1, COLORS.GREEN);
  Raylib.drawLine(mx, my + size.y, mx + size.x, my + size.y, COLORS.RED);
  Raylib.drawLine(mx + size.x, my, mx + size.x, my + size.y, COLORS.RED);
  Raylib.drawText(`size: ${size.x.toFixed(0)}x${size.y.toFixed(0)}`, mx + size.x + 10, my, 16, COLORS.YELLOW);

  y += 50;
  Raylib.drawText("[SPACE] Toggle default/custom font", 10, 660, 16, COLORS.LIGHTGRAY);

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);

  Raylib.endDrawing();
}

Raylib.unloadFont(font16);
Raylib.unloadFont(font32);
Raylib.unloadFont(font48);
Raylib.closeWindow();
