import { Raylib, COLORS, KEYS } from "../src";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

Raylib.initWindow(1200, 800, "Image Demo");
Raylib.setTargetFPS(60);

const texDir = join(import.meta.dir, "../assets/textures");
const baseImage = Raylib.loadTexture(join(texDir, "texture_01.png"));

let currentImg: number | null = null;
let imgWidth = 200;
let imgHeight = 200;

function makeImage() {
  if (currentImg) Raylib.unloadImage(currentImg);
  currentImg = Raylib.genImageColor(imgWidth, imgHeight, COLORS.DARKGRAY);
}

makeImage();

let rotate = 0;
let filter = 0;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.R)) makeImage();
  if (Raylib.isKeyPressed(KEYS.F)) filter = (filter + 1) % 3;

  if (Raylib.isKeyDown(KEYS.LEFT)) rotate = (rotate - 60 * dt) % 360;
  if (Raylib.isKeyDown(KEYS.RIGHT)) rotate = (rotate + 60 * dt) % 360;

  const img = currentImg;
  if (!img) continue;

  Raylib.imageClearBackground(img, COLORS.DARKGRAY);
  Raylib.imageDrawRectangle(img, 10, 10, imgWidth - 20, imgHeight - 20, COLORS.MAROON);
  Raylib.imageDrawCircle(img, imgWidth / 2, imgHeight / 2, 30, COLORS.GREEN);
  Raylib.imageDrawLine(img, 0, 0, imgWidth, imgHeight, COLORS.BLUE);
  Raylib.imageDrawLine(img, imgWidth, 0, 0, imgHeight, COLORS.BLUE);
  Raylib.imageDrawText(img, "Image!", 40, imgHeight / 2 - 10, 24, COLORS.WHITE);

  Raylib.imageRotate(img, rotate);

  const tex = Raylib.loadTextureFromImage(img);
  Raylib.setTextureFilter(tex, filter);

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.BLACK);

  Raylib.drawTextureEx(tex, { x: 50, y: 50 }, 0, 1, COLORS.WHITE);
  Raylib.drawTextureEx(baseImage, { x: 300, y: 50 }, 0, 1, COLORS.WHITE);

  Raylib.drawTextureEx(tex, { x: 50, y: 300 }, 0, 0.5, COLORS.WHITE);
  Raylib.drawTextureEx(tex, { x: 180, y: 300 }, 0, 0.5, COLORS.WHITE);
  Raylib.drawTextureEx(tex, { x: 310, y: 300 }, 0, 0.5, COLORS.WHITE);

  let y = 10;
  Raylib.drawText("IMAGE DEMO", 500, y, 28, COLORS.GOLD); y += 40;
  Raylib.drawText(`Image: ${img}`, 500, y, 18, COLORS.WHITE); y += 22;
  Raylib.drawText(`Rotation: ${rotate.toFixed(0)}deg`, 500, y, 18, COLORS.CYAN); y += 22;
  const filterName = ["POINT", "BILINEAR", "TRILINEAR"][filter];
  Raylib.drawText(`Filter: ${filterName}`, 500, y, 18, COLORS.LIME); y += 30;
  Raylib.drawText("[R] Reset image", 500, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[F] Cycle filter", 500, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[Left/Right] Rotate", 500, y, 16, COLORS.LIGHTGRAY);

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();

  Raylib.unloadTexture(tex);
}

if (currentImg) Raylib.unloadImage(currentImg);
Raylib.unloadTexture(baseImage);
Raylib.closeWindow();