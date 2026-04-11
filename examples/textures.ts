import { Raylib, COLORS, KEYS } from "../src";
import { join } from "path";

Raylib.initWindow(1200, 800, "Texture Demo");
Raylib.setTargetFPS(60);

const dir = join(import.meta.dir, "../assets/textures");

const textures = [
  Raylib.loadTexture(join(dir, "texture_01.png")),
  Raylib.loadTexture(join(dir, "texture_02.png")),
  Raylib.loadTexture(join(dir, "texture_03.png")),
  Raylib.loadTexture(join(dir, "texture_04.png")),
  Raylib.loadTexture(join(dir, "texture_05.png")),
  Raylib.loadTexture(join(dir, "texture_06.png")),
];

const renderTarget = Raylib.loadRenderTexture(256, 256);

let currentTex = 0;
let scale = 1.0;
let rotation = 0;
let showRenderTarget = false;
let filterMode = 0;
const filterNames = ["POINT", "BILINEAR", "TRILINEAR"];

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();
  rotation += dt * 30;

  if (Raylib.isKeyPressed(KEYS.RIGHT)) currentTex = (currentTex + 1) % textures.length;
  if (Raylib.isKeyPressed(KEYS.LEFT)) currentTex = (currentTex - 1 + textures.length) % textures.length;
  if (Raylib.isKeyPressed(KEYS.R)) showRenderTarget = !showRenderTarget;
  if (Raylib.isKeyPressed(KEYS.F)) {
    filterMode = (filterMode + 1) % 3;
    for (const t of textures) Raylib.setTextureFilter(t, filterMode);
  }
  if (Raylib.isKeyDown(KEYS.UP)) scale = Math.min(scale + dt, 5);
  if (Raylib.isKeyDown(KEYS.DOWN)) scale = Math.max(scale - dt, 0.2);

  const tex = textures[currentTex]!;

  Raylib.beginTextureMode(renderTarget);
  Raylib.clearBackground(COLORS.DARKGRAY);
  Raylib.drawRectangle(10, 10, 236, 236, COLORS.MAROON);
  Raylib.drawText("Render Target", 50, 110, 20, COLORS.WHITE);
  Raylib.drawTexture(tex, 128 - (tex.width / 8), 128 - (tex.height / 8), COLORS.WHITE);
  Raylib.endTextureMode();

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.BLACK);

  let y = 10;
  Raylib.drawText("TEXTURE DEMO", 10, y, 28, COLORS.GOLD); y += 35;
  Raylib.drawText(`Texture ${currentTex + 1}/${textures.length} (${tex.width}x${tex.height})`, 10, y, 20, COLORS.WHITE); y += 25;
  Raylib.drawText(`Scale: ${scale.toFixed(2)} | Rotation: ${rotation.toFixed(0)}deg`, 10, y, 18, COLORS.CYAN); y += 22;
  Raylib.drawText(`Filter: ${filterNames[filterMode]}`, 10, y, 18, COLORS.LIME); y += 22;
  Raylib.drawText(`Show Render Target: ${showRenderTarget}`, 10, y, 18, COLORS.ORANGE); y += 28;

  Raylib.drawText("[Left/Right] Switch texture", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[Up/Down] Scale", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[F] Filter mode", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[R] Toggle render target view", 10, y, 16, COLORS.LIGHTGRAY); y += 30;

  if (showRenderTarget) {
    Raylib.drawTextureEx(renderTarget.texture, { x: 300, y: 50 }, 0, 2, COLORS.WHITE);
  } else {
    Raylib.drawTextureEx(tex, { x: 300, y: 50 }, 0, scale, COLORS.WHITE);
  }

  Raylib.drawTexturePro(
    tex,
    { x: 0, y: 0, width: tex.width, height: tex.height },
    { x: 750, y: 50, width: 200, height: 200 },
    { x: 100, y: 100 },
    rotation,
    COLORS.WHITE,
  );

  const srcSize = 64;
  Raylib.drawTextureRec(
    tex,
    { x: 0, y: 0, width: srcSize, height: srcSize },
    { x: 750, y: 300 },
    COLORS.WHITE,
  );
  Raylib.drawText(`Rec (${srcSize}x${srcSize})`, 750, 370, 16, COLORS.YELLOW);

  const stripW = 900;
  const stripH = 80;
  const gap = 10;
  const stripY = 500;
  for (let i = 0; i < textures.length; i++) {
    const tx = 100 + i * (stripW / textures.length + gap);
    Raylib.drawTextureEx(textures[i]!, { x: tx, y: stripY }, 0, 0.07, COLORS.WHITE);
    Raylib.drawText(`${i + 1}`, tx + 15, stripY + stripH + 5, 16, i === currentTex ? COLORS.GOLD : COLORS.WHITE);
  }

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);

  Raylib.endDrawing();
}

for (const t of textures) Raylib.unloadTexture(t);
Raylib.unloadRenderTexture(renderTarget);
Raylib.closeWindow();
