import { Raylib, color } from "../src";
import type { Vec2 } from "../src/types";

Raylib.initWindow(800, 600, "Test Window");
Raylib.setTargetFPS(60);
const pos: Vec2 = { x: 200, y: 300 };
while (!Raylib.windowShouldClose()) {
  Raylib.beginDrawing();
  Raylib.clearBackground(color(30, 30, 30));
  Raylib.drawRectangleV(pos, pos, color(0, 255, 0));
  Raylib.drawText("Hello r!", 100, 350, 20, color(255, 255, 255));
  Raylib.endDrawing();
}

Raylib.closeWindow();
