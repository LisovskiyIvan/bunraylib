import { Raylib, color } from "../src";
import type { Vec2, Rectangle } from "../src/types";

Raylib.initWindow(1200, 800, "Shape Drawing Demo");
Raylib.setTargetFPS(60);

const center: Vec2 = { x: 400, y: 300 };
const rect: Rectangle = { x: 100, y: 100, width: 200, height: 100 };
const rectRounded: Rectangle = { x: 350, y: 200, width: 150, height: 80 };
const white = color(255, 255, 255);
const red = color(255, 50, 50);
const green = color(50, 255, 50);
const blue = color(50, 50, 255);
const yellow = color(255, 255, 50);
const cyan = color(50, 255, 255);
const magenta = color(255, 50, 255);
const orange = color(255, 150, 50);

while (!Raylib.windowShouldClose()) {
  Raylib.beginDrawing();
  Raylib.clearBackground(color(30, 30, 40));

  Raylib.drawPixel(50, 50, red);
  Raylib.drawPixelV({ x: 60, y: 50 }, green);

  Raylib.drawLine(70, 40, 120, 40, white);
  Raylib.drawLineV({ x: 130, y: 40 }, { x: 180, y: 40 }, white);
  Raylib.drawLineEx({ x: 130, y: 10 }, { x: 260, y: 40 }, 1, red);
  
  const lineStripPoints = new Float32Array([
    270, 40,
    290, 20,
    310, 40,
    330, 60,
    500, 10
  ]);
  Raylib.drawLineStrip(lineStripPoints, lineStripPoints.length, cyan);
  
  Raylib.drawLineBezier({ x: 340, y: 60 }, { x: 390, y: 20 }, 2, magenta);

  Raylib.drawCircle(100, 150, 30, red);
  Raylib.drawCircleV({ x: 180, y: 150 }, 30, green);
  Raylib.drawCircleLines(260, 150, 30, blue);
  Raylib.drawCircleLinesV({ x: 320, y: 150 }, 30, yellow);
  Raylib.drawCircleGradient(380, 150, 30, cyan, magenta);
  Raylib.drawCircleSector({ x: 450, y: 150 }, 30, 0, 180, 3, orange);
  Raylib.drawCircleSectorLines({ x: 520, y: 150 }, 30, 0, 270, 5, white);

  Raylib.drawEllipse(100, 230, 40, 25, red);
  Raylib.drawEllipseLines(180, 230, 40, 25, green);

  Raylib.drawRing({ x: 260, y: 230 }, 15, 30, 0, 360, 32, red);
  Raylib.drawRingLines({ x: 340, y: 230 }, 15, 30, 0, 270, 24, yellow);

  Raylib.drawRectangle(100, 280, 150, 60, red);
  Raylib.drawRectangleV({ x: 270, y: 280 }, { x: 150, y: 60 }, green);
  Raylib.drawRectangleRec({ x: 440, y: 280, width: 150, height: 60 }, blue);
  Raylib.drawRectanglePro({ x: 610, y: 280, width: 150, height: 60 }, { x: 75, y: 30 }, Math.PI / 6, yellow);

  Raylib.drawRectangleGradientV(100, 360, 150, 50, red, blue);
  Raylib.drawRectangleGradientH(270, 360, 150, 50, green, yellow);
  Raylib.drawRectangleGradientEx({ x: 440, y: 360, width: 150, height: 50 }, red, green, blue, yellow);

  Raylib.drawRectangleLines(100, 430, 150, 50, white);
  Raylib.drawRectangleLinesEx({ x: 270, y: 430, width: 150, height: 50 }, 3, cyan);
  Raylib.drawRectangleRounded({ x: 440, y: 430, width: 150, height: 50 }, 5, 16, magenta);
  Raylib.drawRectangleRoundedLines({ x: 610, y: 430, width: 150, height: 50 }, 1, 16, orange);
  Raylib.drawRectangleRoundedLinesEx({ x: 100, y: 500, width: 150, height: 50 }, 2, 16, 2, white);

  Raylib.drawTriangle({ x: 350, y: 500 }, { x: 300, y: 560 }, { x: 400, y: 560 }, red);
  Raylib.drawTriangleLines({ x: 450, y: 500 }, { x: 400, y: 560 }, { x: 500, y: 560 }, green);

  const triangleFanPoints = new Float32Array([
    600, 530,
    550, 580,
    575, 550,
    600, 580,
    625, 550,
    650, 580,
  ]);
  Raylib.drawTriangleFan(triangleFanPoints, triangleFanPoints.length, blue);

  const triangleStripPoints = new Float32Array([
    680, 500,
    700, 560,
    720, 520,
    740, 580,
  ]);
  Raylib.drawTriangleStrip(triangleStripPoints, triangleStripPoints.length, yellow);

  Raylib.drawPoly({ x: 150, y: 600 }, 5, 30, 120, red);
  Raylib.drawPolyLines({ x: 220, y: 600 }, 6, 30, 90, green);
  Raylib.drawPolyLinesEx({ x: 290, y: 600 }, 8, 30, 0, 2, blue);

  Raylib.endDrawing();
}

Raylib.closeWindow();
