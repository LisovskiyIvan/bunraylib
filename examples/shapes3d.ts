import { Raylib, COLORS, KEYS, CAMERA } from "../src";
import type { Camera3D } from "../src/types";

Raylib.initWindow(1200, 800, "3D Shapes Demo");
Raylib.setTargetFPS(60);

const camera: Camera3D = {
  position: { x: 20, y: 20, z: 20 },
  target: { x: 0, y: 0, z: 0 },
  up: { x: 0, y: 1, z: 0 },
  fovy: 45,
  projection: CAMERA.PERSPECTIVE,
};

let angle = 0;
let paused = false;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.SPACE)) paused = !paused;
  if (!paused) angle += dt * 0.5;

  camera.position.x = 20 * Math.cos(angle);
  camera.position.z = 20 * Math.sin(angle);

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  Raylib.beginMode3D(camera);

  Raylib.drawGrid(20, 1);

  Raylib.drawLine3D({ x: -2, y: 5, z: -2 }, { x: 2, y: 5, z: 2 }, COLORS.WHITE);
  Raylib.drawPoint3D({ x: 0, y: 5, z: 0 }, COLORS.YELLOW);
  Raylib.drawCircle3D({ x: 0, y: 8, z: 0 }, 2, { x: 1, y: 0, z: 0 }, 90, COLORS.CYAN);

  Raylib.drawTriangle3D(
    { x: -8, y: 0, z: -2 },
    { x: -6, y: 3, z: -2 },
    { x: -4, y: 0, z: -2 },
    COLORS.RED,
  );

  const stripPoints = new Float32Array([-8, 1, 2, -7, 3, 2, -6, 1, 2, -5, 3, 2, -4, 1, 2]);
  Raylib.drawTriangleStrip3D(stripPoints, stripPoints.length / 3, COLORS.GREEN);

  Raylib.drawCube({ x: -4, y: 1, z: -6 }, 2, 2, 2, COLORS.RED);
  Raylib.drawCubeWires({ x: -4, y: 1, z: -6 }, 2, 2, 2, COLORS.WHITE);
  Raylib.drawCubeV({ x: -4, y: 1, z: -2 }, { x: 1.5, y: 1.5, z: 1.5 }, COLORS.ORANGE);
  Raylib.drawCubeWiresV({ x: -4, y: 1, z: -2 }, { x: 1.5, y: 1.5, z: 1.5 }, COLORS.WHITE);

  Raylib.drawSphere({ x: 0, y: 2, z: -6 }, 1.5, COLORS.BLUE);
  Raylib.drawSphereEx({ x: 0, y: 2, z: -2 }, 1.2, 16, 16, COLORS.GREEN);
  Raylib.drawSphereWires({ x: 0, y: 2, z: 2 }, 1.2, 12, 12, COLORS.CYAN);

  Raylib.drawCylinder({ x: 4, y: 1.5, z: -6 }, 1, 1, 3, 16, COLORS.MAGENTA);
  Raylib.drawCylinderWires({ x: 4, y: 1.5, z: -2 }, 1, 1, 3, 16, COLORS.WHITE);
  Raylib.drawCylinder({ x: 4, y: 2, z: 2 }, 0, 1.5, 4, 16, COLORS.ORANGE);
  Raylib.drawCylinderWires({ x: 4, y: 2, z: 2 }, 0, 1.5, 4, 16, COLORS.YELLOW);

  Raylib.drawCylinderEx({ x: -8, y: 0, z: -6 }, { x: -8, y: 4, z: -6 }, 0.3, 1, 12, COLORS.MAGENTA);
  Raylib.drawCylinderWiresEx({ x: -8, y: 0, z: -6 }, { x: -8, y: 4, z: -6 }, 0.3, 1, 12, COLORS.WHITE);

  Raylib.drawCapsule({ x: 8, y: 1, z: -6 }, { x: 8, y: 3, z: -6 }, 0.8, 8, 8, COLORS.RED);
  Raylib.drawCapsuleWires({ x: 8, y: 1, z: -2 }, { x: 8, y: 3, z: -2 }, 0.8, 8, 8, COLORS.YELLOW);

  Raylib.drawPlane({ x: 0, y: 0, z: 8 }, { x: 6, y: 6 }, COLORS.GRAY);
  Raylib.drawRay({ position: { x: 8, y: 5, z: 8 }, direction: { x: -2, y: -1, z: -1 } }, COLORS.YELLOW);

  Raylib.endMode3D();

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.drawText("3D Shapes Demo", 10, 10, 20, COLORS.WHITE);
  Raylib.drawText("[SPACE] Pause rotation", 10, 35, 16, COLORS.LIGHTGRAY);
  Raylib.drawText(`Paused: ${paused} | FPS: ${Raylib.getFPS()}`, 10, 55, 16, COLORS.YELLOW);

  Raylib.endDrawing();
}

Raylib.closeWindow();
