import { Raylib, COLORS } from "../src";
import type { Vec2 } from "../src/types";

Raylib.initWindow(1200, 800, "Shape Drawing Demo");
Raylib.setTargetFPS(60);

const center: Vec2 = { x: 400, y: 300 };

while (!Raylib.windowShouldClose()) {
  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  Raylib.drawPixel(50, 50, COLORS.RED);
  Raylib.drawPixelV({ x: 55, y: 50 }, COLORS.RED);

  Raylib.drawLine(70, 40, 120, 40, COLORS.WHITE);
  Raylib.drawLineEx({ x: 130, y: 10 }, { x: 260, y: 40 }, 1, COLORS.RED);

  const lineStripPoints = new Float32Array([
    270, 40, 290, 20, 310, 50, 330, 10
  ]);
  Raylib.drawLineStrip(lineStripPoints, COLORS.CYAN);
  Raylib.drawLineBezier(
    { x: 340, y: 60 },
    { x: 390, y: 20 },
    2,
    COLORS.MAGENTA,
  );

  Raylib.drawCircle(100, 150, 30, COLORS.RED);
  Raylib.drawCircleV({ x: 160, y: 150 }, 30, COLORS.RED);
  Raylib.drawCircleLines(260, 150, 30, COLORS.BLUE);
  Raylib.drawCircleGradient(380, 150, 30, COLORS.CYAN, COLORS.MAGENTA);
  Raylib.drawCircleSector({ x: 450, y: 150 }, 30, 0, 180, 3, COLORS.ORANGE);
  Raylib.drawCircleSectorLines({ x: 520, y: 150 }, 30, 0, 270, 5, COLORS.WHITE);

  Raylib.drawEllipse(100, 230, 40, 25, COLORS.RED);
  Raylib.drawEllipseLines(180, 230, 40, 25, COLORS.GREEN);

  Raylib.drawRing({ x: 260, y: 230 }, 15, 30, 0, 360, 32, COLORS.RED);
  Raylib.drawRingLines({ x: 340, y: 230 }, 15, 30, 0, 270, 24, COLORS.YELLOW);

  Raylib.drawRectangle(100, 280, 150, 60, COLORS.RED);
  Raylib.drawRectanglePro(
    { x: 610, y: 280, width: 150, height: 60 },
    { x: 75, y: 30 },
    Math.PI / 6,
    COLORS.YELLOW,
  );
  Raylib.drawRectangleGradientV(100, 360, 150, 50, COLORS.RED, COLORS.BLUE);
  Raylib.drawRectangleGradientH(270, 360, 150, 50, COLORS.GREEN, COLORS.YELLOW);
  Raylib.drawRectangleGradientEx(
    { x: 440, y: 360, width: 150, height: 50 },
    COLORS.RED,
    COLORS.GREEN,
    COLORS.BLUE,
    COLORS.YELLOW,
  );
  Raylib.drawRectangleLines(100, 430, 150, 50, COLORS.WHITE);
  Raylib.drawRectangleLinesEx(
    { x: 270, y: 430, width: 150, height: 50 },
    3,
    COLORS.CYAN,
  );
  Raylib.drawRectangleRounded(
    { x: 440, y: 430, width: 150, height: 50 },
    5,
    16,
    COLORS.MAGENTA,
  );
  Raylib.drawRectangleRoundedLinesEx(
    { x: 100, y: 500, width: 150, height: 50 },
    2,
    16,
    2,
    COLORS.WHITE,
  );

  Raylib.drawTriangle(
    { x: 350, y: 500 },
    { x: 300, y: 560 },
    { x: 400, y: 560 },
    COLORS.RED,
  );
  Raylib.drawTriangleLines(
    { x: 450, y: 500 },
    { x: 400, y: 560 },
    { x: 500, y: 560 },
    COLORS.GREEN,
  );

  const fan = new Float32Array([
    600, 530, 550, 580, 575, 550, 600, 580, 625, 550, 650, 580,
  ]);
  Raylib.drawTriangleFan(fan, COLORS.BLUE);

  const strip = new Float32Array([680, 500, 700, 560, 720, 520, 740, 580]);
  Raylib.drawTriangleStrip(strip, COLORS.YELLOW);

  Raylib.drawPoly({ x: 150, y: 600 }, 5, 30, 120, COLORS.RED);
  Raylib.drawPolyLines({ x: 220, y: 600 }, 6, 30, 90, COLORS.GREEN);
  Raylib.drawPolyLinesEx({ x: 290, y: 600 }, 8, 30, 0, 2, COLORS.BLUE);

  const sp = new Float32Array([
    50, 700, 200, 650, 350, 750, 500, 680, 650, 720, 800, 660, 950, 700,
  ]);
  Raylib.drawSplineLinear(sp, 2, COLORS.WHITE);
  Raylib.drawSplineCatmullRom(sp, 2, COLORS.CYAN);
  Raylib.drawSplineBezierQuadratic(sp, 3, COLORS.MAGENTA);

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);

  Raylib.endDrawing();
}

Raylib.closeWindow();
