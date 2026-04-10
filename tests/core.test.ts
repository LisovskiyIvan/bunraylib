import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Core Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("Window state", () => {
  test("isWindowReady", () => {
    expect(Raylib.isWindowReady()).toBe(true);
  });

  test("getScreenWidth / getScreenHeight", () => {
    expect(Raylib.getScreenWidth()).toBe(100);
    expect(Raylib.getScreenHeight()).toBe(100);
  });

  test("isWindowFocused", () => {
    expect(typeof Raylib.isWindowFocused()).toBe("boolean");
  });

  test("isWindowFullscreen", () => {
    expect(Raylib.isWindowFullscreen()).toBe(false);
  });

  test("isWindowHidden", () => {
    expect(Raylib.isWindowHidden()).toBe(false);
  });

  test("isWindowMinimized", () => {
    expect(Raylib.isWindowMinimized()).toBe(false);
  });

  test("isWindowMaximized", () => {
    expect(typeof Raylib.isWindowMaximized()).toBe("boolean");
  });

  test("isWindowResized", () => {
    expect(typeof Raylib.isWindowResized()).toBe("boolean");
  });

  test("setWindowSize", () => {
    Raylib.setWindowSize(200, 200);
    expect(Raylib.getScreenWidth()).toBe(200);
    expect(Raylib.getScreenHeight()).toBe(200);
    Raylib.setWindowSize(100, 100);
  });
});

describe("Monitor", () => {
  test("getMonitorCount", () => {
    const count = Raylib.getMonitorCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("getCurrentMonitor", () => {
    expect(Raylib.getCurrentMonitor()).toBeGreaterThanOrEqual(0);
  });

  test("getMonitorWidth / getMonitorHeight", () => {
    expect(Raylib.getMonitorWidth(0)).toBeGreaterThan(0);
    expect(Raylib.getMonitorHeight(0)).toBeGreaterThan(0);
  });

  test("getMonitorRefreshRate", () => {
    expect(Raylib.getMonitorRefreshRate(0)).toBeGreaterThan(0);
  });

  test("getMonitorName", () => {
    const name = Raylib.getMonitorName(0);
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  test("getMonitorPosition", () => {
    const pos = Raylib.getMonitorPosition(0);
    expect(typeof pos.x).toBe("number");
    expect(typeof pos.y).toBe("number");
  });
});

describe("Timing", () => {
  test("getTime", () => {
    const t = Raylib.getTime();
    expect(t).toBeGreaterThanOrEqual(0);
  });

  test("getFPS", () => {
    Raylib.beginDrawing();
    Raylib.endDrawing();
    const fps = Raylib.getFPS();
    expect(fps).toBeGreaterThanOrEqual(0);
  });
});

describe("Random", () => {
  test("setRandomSeed + getRandomValue", () => {
    Raylib.setRandomSeed(42);
    const a = Raylib.getRandomValue(0, 100);
    const b = Raylib.getRandomValue(0, 100);
    expect(a).toBeGreaterThanOrEqual(0);
    expect(a).toBeLessThanOrEqual(100);
    expect(b).toBeGreaterThanOrEqual(0);
    expect(b).toBeLessThanOrEqual(100);
  });

  test("seed reproducibility", () => {
    Raylib.setRandomSeed(12345);
    const first = Raylib.getRandomValue(0, 1000);
    Raylib.setRandomSeed(12345);
    const second = Raylib.getRandomValue(0, 1000);
    expect(first).toBe(second);
  });
});

describe("Cursor", () => {
  test("hide/show cursor", () => {
    Raylib.hideCursor();
    expect(Raylib.isCursorHidden()).toBe(true);
    Raylib.showCursor();
    expect(Raylib.isCursorHidden()).toBe(false);
  });

  test("enable/disable cursor", () => {
    Raylib.disableCursor();
    Raylib.enableCursor();
    expect(typeof Raylib.isCursorOnScreen()).toBe("boolean");
  });
});

describe("Input: Keyboard", () => {
  test("isKeyUp for unpressed key", () => {
    expect(Raylib.isKeyUp(256)).toBe(true);
  });

  test("isKeyDown for unpressed key", () => {
    expect(Raylib.isKeyDown(256)).toBe(false);
  });

  test("getKeyPressed returns 0 when empty", () => {
    expect(Raylib.getKeyPressed()).toBe(0);
  });

  test("getCharPressed returns 0 when empty", () => {
    expect(Raylib.getCharPressed()).toBe(0);
  });
});

describe("Input: Mouse", () => {
  test("getMouseX / getMouseY", () => {
    const x = Raylib.getMouseX();
    const y = Raylib.getMouseY();
    expect(typeof x).toBe("number");
    expect(typeof y).toBe("number");
  });

  test("getMousePosition returns Vec2", () => {
    const pos = Raylib.getMousePosition();
    expect(typeof pos.x).toBe("number");
    expect(typeof pos.y).toBe("number");
  });

  test("getMouseDelta returns Vec2", () => {
    const delta = Raylib.getMouseDelta();
    expect(typeof delta.x).toBe("number");
    expect(typeof delta.y).toBe("number");
  });

  test("mouse buttons not pressed by default", () => {
    expect(Raylib.isMouseButtonUp(0)).toBe(true);
    expect(Raylib.isMouseButtonDown(0)).toBe(false);
    expect(Raylib.isMouseButtonPressed(0)).toBe(false);
    expect(Raylib.isMouseButtonReleased(0)).toBe(false);
  });
});

describe("Input: Gamepad", () => {
  test("isGamepadAvailable for non-existent gamepad", () => {
    expect(Raylib.isGamepadAvailable(99)).toBe(false);
  });

  test("getGamepadAxisCount", () => {
    const count = Raylib.getGamepadAxisCount(0);
    expect(typeof count).toBe("number");
  });
});

describe("Input: Touch", () => {
  test("getTouchPointCount", () => {
    const count = Raylib.getTouchPointCount();
    expect(typeof count).toBe("number");
  });
});

describe("Gestures", () => {
  test("getGestureDetected returns 0 (no gesture)", () => {
    expect(Raylib.getGestureDetected()).toBe(0);
  });

  test("getGestureHoldDuration returns number", () => {
    expect(typeof Raylib.getGestureHoldDuration()).toBe("number");
  });
});

describe("Drawing modes", () => {
  test("blend mode does not crash", () => {
    Raylib.beginDrawing();
    Raylib.beginBlendMode(0);
    Raylib.clearBackground(0);
    Raylib.endBlendMode();
    Raylib.endDrawing();
  });

  test("scissor mode does not crash", () => {
    Raylib.beginDrawing();
    Raylib.beginScissorMode(0, 0, 50, 50);
    Raylib.clearBackground(0);
    Raylib.endScissorMode();
    Raylib.endDrawing();
  });
});

describe("Screen-space", () => {
  test("getWorldToScreen2D identity", () => {
    const result = Raylib.getWorldToScreen2D(
      { x: 50, y: 50 },
      { offset: { x: 0, y: 0 }, target: { x: 0, y: 0 }, rotation: 0, zoom: 1 },
    );
    expect(Math.abs(result.x - 50)).toBeLessThan(1);
    expect(Math.abs(result.y - 50)).toBeLessThan(1);
  });

  test("getScreenToWorld2D identity", () => {
    const result = Raylib.getScreenToWorld2D(
      { x: 50, y: 50 },
      { offset: { x: 0, y: 0 }, target: { x: 0, y: 0 }, rotation: 0, zoom: 1 },
    );
    expect(Math.abs(result.x - 50)).toBeLessThan(1);
    expect(Math.abs(result.y - 50)).toBeLessThan(1);
  });

  test("getWorldToScreen2D with zoom", () => {
    const result = Raylib.getWorldToScreen2D(
      { x: 50, y: 50 },
      { offset: { x: 0, y: 0 }, target: { x: 0, y: 0 }, rotation: 0, zoom: 2 },
    );
    expect(Math.abs(result.x - 100)).toBeLessThan(1);
    expect(Math.abs(result.y - 100)).toBeLessThan(1);
  });
});

describe("Clipboard", () => {
  test("set and get clipboard text", () => {
    Raylib.setClipboardText("hello rraylib");
    const text = Raylib.getClipboardText();
    expect(text).toBe("hello rraylib");
  });
});
