import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import type { Texture2D } from "../src/types";
import { join } from "path";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Texture Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Texture loading", () => {
  test("loadTexture from file", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_01.png"),
    );
    expect(tex.id).toBeGreaterThan(0);
    expect(tex.width).toBeGreaterThan(0);
    expect(tex.height).toBeGreaterThan(0);
    Raylib.unloadTexture(tex);
  });

  test("isTextureValid", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_02.png"),
    );
    expect(Raylib.isTextureValid(tex)).toBe(true);
    Raylib.unloadTexture(tex);
  });

  test("loadTexture different files", () => {
    const paths = ["texture_03.png", "texture_04.png", "texture_05.png"];
    const textures: Texture2D[] = [];
    for (const p of paths) {
      const tex = Raylib.loadTexture(join(import.meta.dir, `../assets/textures/${p}`));
      expect(tex.id).toBeGreaterThan(0);
      textures.push(tex);
    }
    for (const tex of textures) {
      Raylib.unloadTexture(tex);
    }
  });
});

describe("RenderTexture", () => {
  test("loadRenderTexture", () => {
    const rt = Raylib.loadRenderTexture(128, 128);
    expect(rt.id).toBeGreaterThan(0);
    expect(rt.texture.id).toBeGreaterThan(0);
    expect(rt.texture.width).toBe(128);
    expect(rt.texture.height).toBe(128);
    Raylib.unloadRenderTexture(rt);
  });

  test("isRenderTextureValid", () => {
    const rt = Raylib.loadRenderTexture(64, 64);
    expect(typeof Raylib.isRenderTextureValid(rt)).toBe("boolean");
    Raylib.unloadRenderTexture(rt);
  });

  test("render to texture and draw", () => {
    const rt = Raylib.loadRenderTexture(64, 64);
    Raylib.beginTextureMode(rt);
    Raylib.clearBackground(0x00000000);
    Raylib.drawRectangle(10, 10, 44, 44, 0xFF0000FF);
    Raylib.endTextureMode();

    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTexture(rt.texture, 0, 0, 0xFFFFFFFF);
    Raylib.endDrawing();

    Raylib.unloadRenderTexture(rt);
  });
});

describe("Texture drawing", () => {
  test("drawTexture does not crash", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_01.png"),
    );
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTexture(tex, 10, 10, 0xFFFFFFFF);
    Raylib.endDrawing();
    Raylib.unloadTexture(tex);
  });

  test("drawTextureEx with scale", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_02.png"),
    );
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextureEx(tex, { x: 0, y: 0 }, 0, 2, 0xFFFFFFFF);
    Raylib.endDrawing();
    Raylib.unloadTexture(tex);
  });

  test("drawTextureRec with source rect", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_03.png"),
    );
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTextureRec(
      tex,
      { x: 0, y: 0, width: 32, height: 32 },
      { x: 10, y: 10 },
      0xFFFFFFFF,
    );
    Raylib.endDrawing();
    Raylib.unloadTexture(tex);
  });

  test("drawTexturePro with rotation", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_04.png"),
    );
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.drawTexturePro(
      tex,
      { x: 0, y: 0, width: tex.width, height: tex.height },
      { x: 10, y: 10, width: 50, height: 50 },
      { x: 25, y: 25 },
      Math.PI / 4,
      0xFFFFFFFF,
    );
    Raylib.endDrawing();
    Raylib.unloadTexture(tex);
  });
});

describe("Texture config", () => {
  test("setTextureFilter does not crash", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_05.png"),
    );
    Raylib.setTextureFilter(tex, 0);
    Raylib.setTextureFilter(tex, 1);
    Raylib.unloadTexture(tex);
  });

  test("setTextureWrap does not crash", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_06.png"),
    );
    Raylib.setTextureWrap(tex, 0);
    Raylib.setTextureWrap(tex, 1);
    Raylib.unloadTexture(tex);
  });

  test("genTextureMipmaps does not crash", () => {
    const tex = Raylib.loadTexture(
      join(import.meta.dir, "../assets/textures/texture_07.png"),
    );
    Raylib.genTextureMipmaps(tex);
    Raylib.unloadTexture(tex);
  });
});
