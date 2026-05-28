import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Core Extended Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Window dimensions", () => {
  test("getRenderWidth / getRenderHeight return numbers", () => {
    expect(typeof Raylib.getRenderWidth()).toBe("number");
    expect(typeof Raylib.getRenderHeight()).toBe("number");
  });

  test("getRenderWidth matches screen width initially", () => {
    const sw = Raylib.getScreenWidth();
    const rw = Raylib.getRenderWidth();
    expect(rw).toBe(sw);
  });

  test("getRenderHeight matches screen height initially", () => {
    const sh = Raylib.getScreenHeight();
    const rh = Raylib.getRenderHeight();
    expect(rh).toBe(sh);
  });
});

describe("Monitor physical dimensions", () => {
  test("getMonitorPhysicalWidth returns number", () => {
    expect(typeof Raylib.getMonitorPhysicalWidth(0)).toBe("number");
  });

  test("getMonitorPhysicalHeight returns number", () => {
    expect(typeof Raylib.getMonitorPhysicalHeight(0)).toBe("number");
  });
});

describe("Window position & scale", () => {
  test("getWindowPosition returns Vec2", () => {
    const pos = Raylib.getWindowPosition();
    expect(typeof pos.x).toBe("number");
    expect(typeof pos.y).toBe("number");
  });

  test("getWindowScaleDPI returns Vec2", () => {
    const scale = Raylib.getWindowScaleDPI();
    expect(typeof scale.x).toBe("number");
    expect(typeof scale.y).toBe("number");
    expect(scale.x).toBeGreaterThan(0);
    expect(scale.y).toBeGreaterThan(0);
  });
});

describe("Frame time", () => {
  test("getFrameTime returns positive number after drawing", () => {
    Raylib.beginDrawing();
    Raylib.clearBackground(0);
    Raylib.endDrawing();
    const dt = Raylib.getFrameTime();
    expect(typeof dt).toBe("number");
    expect(dt).toBeGreaterThanOrEqual(0);
  });
});

describe("Window state", () => {
  test("isWindowState returns boolean", () => {
    expect(typeof Raylib.isWindowState(0)).toBe("boolean");
  });

  test("windowShouldClose returns boolean", () => {
    expect(typeof Raylib.windowShouldClose()).toBe("boolean");
  });
});
