import { Raylib, color } from "../src";

Raylib.init(800, 600, "Test Window");
Raylib.setTargetFPS(60);

while (!Raylib.shouldClose()) {
  Raylib.beginDrawing();
  Raylib.clearBackground(color(30, 30, 30));
  Raylib.drawRectangle(100, 100, 200, 200, color(0, 255, 0));
  Raylib.drawText("Hello r!", 100, 350, 20, color(255, 255, 255));
  Raylib.endDrawing();
}

Raylib.close();