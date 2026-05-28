import { Raylib, COLORS, KEYS } from "../src";
import { join } from "path";

Raylib.initWindow(1200, 800, "Image Demo");
Raylib.setTargetFPS(60);

const texDir = join(import.meta.dir, "../assets/textures");
const baseImage = Raylib.loadTexture(join(texDir, "texture_01.png"));

const imgWidth = 200;
const imgHeight = 200;

let currentImg = Raylib.genImageColor(imgWidth, imgHeight, COLORS.DARKGRAY);

let rotate = 0;
let filter = 0;

const rebuildImage = () => {
  Raylib.imageClearBackground(currentImg, COLORS.DARKGRAY);
  Raylib.imageDrawRectangle(currentImg, 10, 10, imgWidth - 20, imgHeight - 20, COLORS.MAROON);
  Raylib.imageDrawCircle(currentImg, imgWidth / 2, imgHeight / 2, 30, COLORS.GREEN);
  Raylib.imageDrawLine(currentImg, 0, 0, imgWidth, imgHeight, COLORS.BLUE);
  Raylib.imageDrawLine(currentImg, imgWidth, 0, 0, imgHeight, COLORS.BLUE);
  Raylib.imageDrawText(currentImg, "Image!", 40, imgHeight / 2 - 10, 24, COLORS.WHITE);
};

rebuildImage();
let tex = Raylib.loadTextureFromImage(currentImg);
Raylib.setTextureFilter(tex, filter);

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.R)) {
    Raylib.unloadImage(currentImg);
    currentImg = Raylib.genImageColor(imgWidth, imgHeight, COLORS.DARKGRAY);
    rebuildImage();
    Raylib.unloadTexture(tex);
    tex = Raylib.loadTextureFromImage(currentImg);
    Raylib.setTextureFilter(tex, filter);
  }
  if (Raylib.isKeyPressed(KEYS.F)) {
    filter = (filter + 1) % 3;
    Raylib.setTextureFilter(tex, filter);
  }

  if (Raylib.isKeyDown(KEYS.LEFT)) rotate = (rotate - 60 * dt) % 360;
  if (Raylib.isKeyDown(KEYS.RIGHT)) rotate = (rotate + 60 * dt) % 360;

  if (currentImg < 0 || !Raylib.isImageValid(currentImg)) continue;

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.BLACK);

  const hw = imgWidth / 2;
  const hh = imgHeight / 2;

  Raylib.drawTexturePro(
    tex,
    { x: 0, y: 0, width: imgWidth, height: imgHeight },
    { x: 50 + hw, y: 50 + hh, width: imgWidth, height: imgHeight },
    { x: hw, y: hh },
    rotate,
    COLORS.WHITE,
  );
  Raylib.drawTextureEx(baseImage, { x: 300, y: 50 }, 0, 1, COLORS.WHITE);

  Raylib.drawTexturePro(
    tex,
    { x: 0, y: 0, width: imgWidth, height: imgHeight },
    { x: 50 + hw, y: 300 + hh, width: imgWidth / 2, height: imgHeight / 2 },
    { x: hw, y: hh },
    rotate,
    COLORS.WHITE,
  );
  Raylib.drawTexturePro(
    tex,
    { x: 0, y: 0, width: imgWidth, height: imgHeight },
    { x: 180 + hw, y: 300 + hh, width: imgWidth / 2, height: imgHeight / 2 },
    { x: hw, y: hh },
    rotate,
    COLORS.WHITE,
  );
  Raylib.drawTexturePro(
    tex,
    { x: 0, y: 0, width: imgWidth, height: imgHeight },
    { x: 310 + hw, y: 300 + hh, width: imgWidth / 2, height: imgHeight / 2 },
    { x: hw, y: hh },
    rotate,
    COLORS.WHITE,
  );

  let y = 10;
  Raylib.drawText("IMAGE DEMO", 500, y, 28, COLORS.GOLD); y += 40;
  Raylib.drawText(`Image: ${currentImg}`, 500, y, 18, COLORS.WHITE); y += 22;
  Raylib.drawText(`Rotation: ${rotate.toFixed(0)}deg`, 500, y, 18, COLORS.CYAN); y += 22;
  const filterName = ["POINT", "BILINEAR", "TRILINEAR"][filter];
  Raylib.drawText(`Filter: ${filterName}`, 500, y, 18, COLORS.LIME); y += 30;
  Raylib.drawText("[R] Reset image", 500, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[F] Cycle filter", 500, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[Left/Right] Rotate", 500, y, 16, COLORS.LIGHTGRAY);

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();
}

if (currentImg >= 0) Raylib.unloadImage(currentImg);
Raylib.unloadTexture(tex);
Raylib.unloadTexture(baseImage);
Raylib.closeWindow();
