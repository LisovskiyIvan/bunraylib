import { getSymbols } from '../../symbols';
import { f, i, validatePoints } from '../../utils';
import type {
  Vec2,
  Vec3,
  Rectangle,
  Camera3D,
  Ray,
  Texture2D,
  BoundingBox,
  Color,
} from '../../types';

const r = () => getSymbols();

export class Draw3DModule {
  /** Draw a line in 3D world space */
  static drawLine3D(startPos: Vec3, endPos: Vec3, col: Color): void {
    r().symbols.DrawLine3DW(
      f(startPos.x),
      f(startPos.y),
      f(startPos.z),
      f(endPos.x),
      f(endPos.y),
      f(endPos.z),
      i(col),
    );
  }
  /** Draw a point in 3D space */
  static drawPoint3D(position: Vec3, col: Color): void {
    r().symbols.DrawPoint3DW(f(position.x), f(position.y), f(position.z), i(col));
  }
  /** Draw a circle in 3D world space */
  static drawCircle3D(
    center: Vec3,
    radius: number,
    rotationAxis: Vec3,
    rotationAngle: number,
    col: Color,
  ): void {
    r().symbols.DrawCircle3DW(
      f(center.x),
      f(center.y),
      f(center.z),
      f(radius),
      f(rotationAxis.x),
      f(rotationAxis.y),
      f(rotationAxis.z),
      f(rotationAngle),
      i(col),
    );
  }
  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle3D(v1: Vec3, v2: Vec3, v3: Vec3, col: Color): void {
    r().symbols.DrawTriangle3DW(
      f(v1.x),
      f(v1.y),
      f(v1.z),
      f(v2.x),
      f(v2.y),
      f(v2.z),
      f(v3.x),
      f(v3.y),
      f(v3.z),
      i(col),
    );
  }
  /** Draw a triangle strip defined by points. Points packed as [x0,y0,z0, x1,y1,z1, ...] in Float32Array */
  static drawTriangleStrip3D(points: Float32Array, col: Color): void {
    validatePoints('drawTriangleStrip3D', points, 3, 2);
    r().symbols.DrawTriangleStrip3D(points, i(points.length / 3), i(col));
  }
  /** Draw cube */
  static drawCube(position: Vec3, width: number, height: number, length: number, col: Color): void {
    r().symbols.DrawCubeW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(width),
      f(height),
      f(length),
      i(col),
    );
  }
  /** Draw cube (Vector version) */
  static drawCubeV(position: Vec3, size: Vec3, col: Color): void {
    r().symbols.DrawCubeVW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(size.x),
      f(size.y),
      f(size.z),
      i(col),
    );
  }
  /** Draw cube wires */
  static drawCubeWires(
    position: Vec3,
    width: number,
    height: number,
    length: number,
    col: Color,
  ): void {
    r().symbols.DrawCubeWiresW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(width),
      f(height),
      f(length),
      i(col),
    );
  }
  /** Draw cube wires (Vector version) */
  static drawCubeWiresV(position: Vec3, size: Vec3, col: Color): void {
    r().symbols.DrawCubeWiresVW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(size.x),
      f(size.y),
      f(size.z),
      i(col),
    );
  }
  /** Draw sphere */
  static drawSphere(centerPos: Vec3, radius: number, col: Color): void {
    r().symbols.DrawSphereW(f(centerPos.x), f(centerPos.y), f(centerPos.z), f(radius), i(col));
  }
  /** Draw sphere with extended parameters */
  static drawSphereEx(
    centerPos: Vec3,
    radius: number,
    rings: number,
    slices: number,
    col: Color,
  ): void {
    r().symbols.DrawSphereExW(
      f(centerPos.x),
      f(centerPos.y),
      f(centerPos.z),
      f(radius),
      i(rings),
      i(slices),
      i(col),
    );
  }
  /** Draw sphere wires */
  static drawSphereWires(
    centerPos: Vec3,
    radius: number,
    rings: number,
    slices: number,
    col: Color,
  ): void {
    r().symbols.DrawSphereWiresW(
      f(centerPos.x),
      f(centerPos.y),
      f(centerPos.z),
      f(radius),
      i(rings),
      i(slices),
      i(col),
    );
  }
  /** Draw a cylinder/cone */
  static drawCylinder(
    position: Vec3,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    slices: number,
    col: Color,
  ): void {
    r().symbols.DrawCylinderW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(radiusTop),
      f(radiusBottom),
      f(height),
      i(slices),
      i(col),
    );
  }
  /** Draw a cylinder with base at startPos and top at endPos */
  static drawCylinderEx(
    startPos: Vec3,
    endPos: Vec3,
    startRadius: number,
    endRadius: number,
    sides: number,
    col: Color,
  ): void {
    r().symbols.DrawCylinderExW(
      f(startPos.x),
      f(startPos.y),
      f(startPos.z),
      f(endPos.x),
      f(endPos.y),
      f(endPos.z),
      f(startRadius),
      f(endRadius),
      i(sides),
      i(col),
    );
  }
  /** Draw a cylinder/cone wires */
  static drawCylinderWires(
    position: Vec3,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    slices: number,
    col: Color,
  ): void {
    r().symbols.DrawCylinderWiresW(
      f(position.x),
      f(position.y),
      f(position.z),
      f(radiusTop),
      f(radiusBottom),
      f(height),
      i(slices),
      i(col),
    );
  }
  /** Draw a cylinder wires with base at startPos and top at endPos */
  static drawCylinderWiresEx(
    startPos: Vec3,
    endPos: Vec3,
    startRadius: number,
    endRadius: number,
    sides: number,
    col: Color,
  ): void {
    r().symbols.DrawCylinderWiresExW(
      f(startPos.x),
      f(startPos.y),
      f(startPos.z),
      f(endPos.x),
      f(endPos.y),
      f(endPos.z),
      f(startRadius),
      f(endRadius),
      i(sides),
      i(col),
    );
  }
  /** Draw a capsule with the center of its sphere caps at startPos and endPos */
  static drawCapsule(
    startPos: Vec3,
    endPos: Vec3,
    radius: number,
    slices: number,
    rings: number,
    col: Color,
  ): void {
    r().symbols.DrawCapsuleW(
      f(startPos.x),
      f(startPos.y),
      f(startPos.z),
      f(endPos.x),
      f(endPos.y),
      f(endPos.z),
      f(radius),
      i(slices),
      i(rings),
      i(col),
    );
  }
  /** Draw capsule wireframe */
  static drawCapsuleWires(
    startPos: Vec3,
    endPos: Vec3,
    radius: number,
    slices: number,
    rings: number,
    col: Color,
  ): void {
    r().symbols.DrawCapsuleWiresW(
      f(startPos.x),
      f(startPos.y),
      f(startPos.z),
      f(endPos.x),
      f(endPos.y),
      f(endPos.z),
      f(radius),
      i(slices),
      i(rings),
      i(col),
    );
  }
  /** Draw a plane XZ */
  static drawPlane(centerPos: Vec3, size: Vec2, col: Color): void {
    r().symbols.DrawPlaneW(
      f(centerPos.x),
      f(centerPos.y),
      f(centerPos.z),
      f(size.x),
      f(size.y),
      i(col),
    );
  }
  /** Draw a ray line */
  static drawRay(ray: Ray, col: Color): void {
    r().symbols.DrawRayW(
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      i(col),
    );
  }
  /** Draw a grid */
  static drawGrid(slices: number, spacing: number): void {
    r().symbols.DrawGrid(i(slices), f(spacing));
  }
  static drawBoundingBox(box: BoundingBox, color: Color): void {
    r().symbols.DrawBoundingBoxW(
      f(box.min.x),
      f(box.min.y),
      f(box.min.z),
      f(box.max.x),
      f(box.max.y),
      f(box.max.z),
      i(color),
    );
  }
  static drawBillboard(
    camera: Camera3D,
    texture: Texture2D,
    position: Vec3,
    scale: number,
    tint: Color,
  ): void {
    r().symbols.DrawBillboardW(
      f(camera.position.x),
      f(camera.position.y),
      f(camera.position.z),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.target.z),
      f(camera.up.x),
      f(camera.up.y),
      f(camera.up.z),
      f(camera.fovy),
      i(camera.projection),
      i(texture.id),
      i(texture.width),
      i(texture.height),
      f(position.x),
      f(position.y),
      f(position.z),
      f(scale),
      i(tint),
    );
  }
  static drawBillboardRec(
    camera: Camera3D,
    texture: Texture2D,
    source: Rectangle,
    position: Vec3,
    size: Vec2,
    tint: Color,
  ): void {
    r().symbols.DrawBillboardRecW(
      f(camera.position.x),
      f(camera.position.y),
      f(camera.position.z),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.target.z),
      f(camera.up.x),
      f(camera.up.y),
      f(camera.up.z),
      f(camera.fovy),
      i(camera.projection),
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      f(position.x),
      f(position.y),
      f(position.z),
      f(size.x),
      f(size.y),
      i(tint),
    );
  }
  static drawBillboardPro(
    camera: Camera3D,
    texture: Texture2D,
    source: Rectangle,
    position: Vec3,
    up: Vec3,
    size: Vec2,
    origin: Vec2,
    rotation: number,
    tint: Color,
  ): void {
    r().symbols.DrawBillboardProW(
      f(camera.position.x),
      f(camera.position.y),
      f(camera.position.z),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.target.z),
      f(camera.up.x),
      f(camera.up.y),
      f(camera.up.z),
      f(camera.fovy),
      i(camera.projection),
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      f(position.x),
      f(position.y),
      f(position.z),
      f(up.x),
      f(up.y),
      f(up.z),
      f(size.x),
      f(size.y),
      f(origin.x),
      f(origin.y),
      f(rotation),
      i(tint),
    );
  }
}
