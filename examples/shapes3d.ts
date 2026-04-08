import { Raylib, color } from "../src";
import type { Vec3, Vec2, Camera3D, Ray } from "../src/types";

Raylib.initWindow(1200, 800, "3D Shapes Demo");
Raylib.setTargetFPS(60);

const camera: Camera3D = {
  position: { x: 20, y: 20, z: 20 },
  target: { x: 0, y: 0, z: 0 },
  up: { x: 0, y: 1, z: 0 },
  fovy: 45,
  projection: 0,
};

const white = color(255, 255, 255);
const red = color(255, 50, 50);
const green = color(50, 255, 50);
const blue = color(50, 50, 255);
const yellow = color(255, 255, 50);
const cyan = color(50, 255, 255);
const magenta = color(255, 50, 255);
const orange = color(255, 150, 50);
const gray = color(180, 180, 180);

let angle = 0;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();
  angle += dt * 0.5;

  camera.position.x = 20 * Math.cos(angle);
  camera.position.z = 20 * Math.sin(angle);

  Raylib.beginDrawing();
  Raylib.clearBackground(color(30, 30, 40));

  Raylib.beginMode3D(camera);

  Raylib.drawGrid(20, 1);

  Raylib.drawLine3D({ x: -2, y: 5, z: -2 }, { x: 2, y: 5, z: 2 }, white);
  Raylib.drawPoint3D({ x: 0, y: 5, z: 0 }, yellow);

  Raylib.drawCircle3D({ x: 0, y: 8, z: 0 }, 2, { x: 1, y: 0, z: 0 }, 90, cyan);

  Raylib.drawTriangle3D(
    { x: -8, y: 0, z: -2 },
    { x: -6, y: 3, z: -2 },
    { x: -4, y: 0, z: -2 },
    red,
  );

  const stripPoints = new Float32Array([
    -8, 1, 2,
    -7, 3, 2,
    -6, 1, 2,
    -5, 3, 2,
    -4, 1, 2,
  ]);
  Raylib.drawTriangleStrip3D(stripPoints, stripPoints.length / 3, green);

  Raylib.drawCube({ x: -4, y: 1, z: -6 }, 2, 2, 2, red);
  Raylib.drawCubeWires({ x: -4, y: 1, z: -6 }, 2, 2, 2, white);

  Raylib.drawCubeV({ x: -4, y: 1, z: -2 }, { x: 1.5, y: 1.5, z: 1.5 }, orange);
  Raylib.drawCubeWiresV({ x: -4, y: 1, z: -2 }, { x: 1.5, y: 1.5, z: 1.5 }, white);

  Raylib.drawSphere({ x: 0, y: 2, z: -6 }, 1.5, blue);
  Raylib.drawSphereEx({ x: 0, y: 2, z: -2 }, 1.2, 16, 16, green);
  Raylib.drawSphereWires({ x: 0, y: 2, z: 2 }, 1.2, 12, 12, cyan);

  Raylib.drawCylinder({ x: 4, y: 1.5, z: -6 }, 1, 1, 3, 16, magenta);
  Raylib.drawCylinderWires({ x: 4, y: 1.5, z: -2 }, 1, 1, 3, 16, white);

  Raylib.drawCylinder({ x: 4, y: 2, z: 2 }, 0, 1.5, 4, 16, orange);
  Raylib.drawCylinderWires({ x: 4, y: 2, z: 2 }, 0, 1.5, 4, 16, yellow);

  Raylib.drawCylinderEx(
    { x: -8, y: 0, z: -6 },
    { x: -8, y: 4, z: -6 },
    0.3, 1, 12, magenta,
  );
  Raylib.drawCylinderWiresEx(
    { x: -8, y: 0, z: -6 },
    { x: -8, y: 4, z: -6 },
    0.3, 1, 12, white,
  );

  Raylib.drawCapsule(
    { x: 8, y: 1, z: -6 },
    { x: 8, y: 3, z: -6 },
    0.8, 8, 8, red,
  );
  Raylib.drawCapsuleWires(
    { x: 8, y: 1, z: -2 },
    { x: 8, y: 3, z: -2 },
    0.8, 8, 8, yellow,
  );

  Raylib.drawPlane({ x: 0, y: 0, z: 8 }, { x: 6, y: 6 } as Vec2, gray);

  const ray: Ray = {
    position: { x: 8, y: 5, z: 8 },
    direction: { x: -2, y: -1, z: -1 },
  };
  Raylib.drawRay(ray, yellow);

  Raylib.endMode3D();

  Raylib.drawText("3D Shapes Demo - Camera orbits automatically", 10, 10, 20, white);
  Raylib.drawText("Cube | Sphere | Cylinder | Cone | Capsule | Plane | Ray | Triangle | Line | Circle | Grid", 10, 35, 16, gray);

  Raylib.endDrawing();
}

Raylib.closeWindow();
