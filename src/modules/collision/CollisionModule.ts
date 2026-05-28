import { getSymbols } from '../../symbols';
import { bufs as b, f, i, validatePoints } from '../../utils';
import type {
  Vec2,
  Vec3,
  Rectangle,
  Ray,
  BoundingBox,
  Mesh,
  RayCollision } from '../../types';

const r = () => getSymbols();

export class CollisionModule {
  /** Check collision between two rectangles */
  static checkCollisionRecs(rec1: Rectangle, rec2: Rectangle): boolean {
    return r().symbols.CheckCollisionRecsW(
      f(rec1.x),
      f(rec1.y),
      f(rec1.width),
      f(rec1.height),
      f(rec2.x),
      f(rec2.y),
      f(rec2.width),
      f(rec2.height),
    );
  }
  /** Check collision between two circles */
  static checkCollisionCircles(
    center1: Vec2,
    radius1: number,
    center2: Vec2,
    radius2: number,
  ): boolean {
    return r().symbols.CheckCollisionCirclesW(
      f(center1.x),
      f(center1.y),
      f(radius1),
      f(center2.x),
      f(center2.y),
      f(radius2),
    );
  }
  /** Check collision between circle and rectangle */
  static checkCollisionCircleRec(center: Vec2, radius: number, rec: Rectangle): boolean {
    return r().symbols.CheckCollisionCircleRecW(
      f(center.x),
      f(center.y),
      f(radius),
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
    );
  }
  /** Check if circle collides with a line created between two points [p1] and [p2] */
  static checkCollisionCircleLine(center: Vec2, radius: number, p1: Vec2, p2: Vec2): boolean {
    return r().symbols.CheckCollisionCircleLineW(
      f(center.x),
      f(center.y),
      f(radius),
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
    );
  }
  /** Check if point is inside rectangle */
  static checkCollisionPointRec(point: Vec2, rec: Rectangle): boolean {
    return r().symbols.CheckCollisionPointRecW(
      f(point.x),
      f(point.y),
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
    );
  }
  /** Check if point is inside circle */
  static checkCollisionPointCircle(point: Vec2, center: Vec2, radius: number): boolean {
    return r().symbols.CheckCollisionPointCircleW(
      f(point.x),
      f(point.y),
      f(center.x),
      f(center.y),
      f(radius),
    );
  }
  /** Check if point is inside a triangle */
  static checkCollisionPointTriangle(point: Vec2, p1: Vec2, p2: Vec2, p3: Vec2): boolean {
    return r().symbols.CheckCollisionPointTriangleW(
      f(point.x),
      f(point.y),
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      f(p3.x),
      f(p3.y),
    );
  }
  /** Check if point belongs to line created between two points [p1] and [p2] with defined margin [threshold] */
  static checkCollisionPointLine(point: Vec2, p1: Vec2, p2: Vec2, threshold: number): boolean {
    return r().symbols.CheckCollisionPointLineW(
      f(point.x),
      f(point.y),
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      i(threshold),
    );
  }
  /**
   * Check if point is within a polygon described by array of vertices.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static checkCollisionPointPoly(point: Vec2, points: Float32Array): boolean {
    validatePoints('checkCollisionPointPoly', points, 2, 3);
    return r().symbols.CheckCollisionPointPolyW(
      f(point.x),
      f(point.y),
      points,
      i(points.length / 2),
    );
  }
  /**
   * Check collision between two lines defined by two points each.
   * @returns Object with `collides` boolean and `collisionPoint` Vec2 (valid only if collides is true)
   */
  static checkCollisionLines(
    startPos1: Vec2,
    endPos1: Vec2,
    startPos2: Vec2,
    endPos2: Vec2,
  ): { collides: boolean; collisionPoint: Vec2 } {
    const collides = r().symbols.CheckCollisionLinesW(
      b._colPtBuf,
      f(startPos1.x),
      f(startPos1.y),
      f(endPos1.x),
      f(endPos1.y),
      f(startPos2.x),
      f(startPos2.y),
      f(endPos2.x),
      f(endPos2.y),
    );
    return { collides, collisionPoint: { x: b._colPtBuf[0]!, y: b._colPtBuf[1]! } };
  }
  /** Get collision rectangle for two rectangles collision. Returns null if no overlap */
  static getCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle {
    r().symbols.GetCollisionRecW(
      b._recBuf,
      f(rec1.x),
      f(rec1.y),
      f(rec1.width),
      f(rec1.height),
      f(rec2.x),
      f(rec2.y),
      f(rec2.width),
      f(rec2.height),
    );
    return {
      x: b._recBuf[0]!,
      y: b._recBuf[1]!,
      width: b._recBuf[2]!,
      height: b._recBuf[3]! };
  }
  static checkCollisionSpheres(
    center1: Vec3,
    radius1: number,
    center2: Vec3,
    radius2: number,
  ): boolean {
    return r().symbols.CheckCollisionSpheresW(
      f(center1.x),
      f(center1.y),
      f(center1.z),
      f(radius1),
      f(center2.x),
      f(center2.y),
      f(center2.z),
      f(radius2),
    );
  }
  static checkCollisionBoxes(box1: BoundingBox, box2: BoundingBox): boolean {
    return r().symbols.CheckCollisionBoxesW(
      f(box1.min.x),
      f(box1.min.y),
      f(box1.min.z),
      f(box1.max.x),
      f(box1.max.y),
      f(box1.max.z),
      f(box2.min.x),
      f(box2.min.y),
      f(box2.min.z),
      f(box2.max.x),
      f(box2.max.y),
      f(box2.max.z),
    );
  }
  static checkCollisionBoxSphere(box: BoundingBox, center: Vec3, radius: number): boolean {
    return r().symbols.CheckCollisionBoxSphereW(
      f(box.min.x),
      f(box.min.y),
      f(box.min.z),
      f(box.max.x),
      f(box.max.y),
      f(box.max.z),
      f(center.x),
      f(center.y),
      f(center.z),
      f(radius),
    );
  }
  static getRayCollisionSphere(ray: Ray, center: Vec3, radius: number): RayCollision {
    r().symbols.GetRayCollisionSphereW(
      b._rcHit,
      b._rcDist,
      b._rcPt,
      b._rcNorm,
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      f(center.x),
      f(center.y),
      f(center.z),
      f(radius),
    );
    return {
      hit: b._rcHit[0]! !== 0,
      distance: b._rcDist[0]!,
      point: { x: b._rcPt[0]!, y: b._rcPt[1]!, z: b._rcPt[2]! },
      normal: { x: b._rcNorm[0]!, y: b._rcNorm[1]!, z: b._rcNorm[2]! } };
  }
  static getRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision {
    r().symbols.GetRayCollisionBoxW(
      b._rcHit,
      b._rcDist,
      b._rcPt,
      b._rcNorm,
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      f(box.min.x),
      f(box.min.y),
      f(box.min.z),
      f(box.max.x),
      f(box.max.y),
      f(box.max.z),
    );
    return {
      hit: b._rcHit[0]! !== 0,
      distance: b._rcDist[0]!,
      point: { x: b._rcPt[0]!, y: b._rcPt[1]!, z: b._rcPt[2]! },
      normal: { x: b._rcNorm[0]!, y: b._rcNorm[1]!, z: b._rcNorm[2]! } };
  }
  static getRayCollisionTriangle(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3): RayCollision {
    r().symbols.GetRayCollisionTriangleW(
      b._rcHit,
      b._rcDist,
      b._rcPt,
      b._rcNorm,
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      f(p1.x),
      f(p1.y),
      f(p1.z),
      f(p2.x),
      f(p2.y),
      f(p2.z),
      f(p3.x),
      f(p3.y),
      f(p3.z),
    );
    return {
      hit: b._rcHit[0]! !== 0,
      distance: b._rcDist[0]!,
      point: { x: b._rcPt[0]!, y: b._rcPt[1]!, z: b._rcPt[2]! },
      normal: { x: b._rcNorm[0]!, y: b._rcNorm[1]!, z: b._rcNorm[2]! } };
  }
  static getRayCollisionQuad(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3): RayCollision {
    r().symbols.GetRayCollisionQuadW(
      b._rcHit,
      b._rcDist,
      b._rcPt,
      b._rcNorm,
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      f(p1.x),
      f(p1.y),
      f(p1.z),
      f(p2.x),
      f(p2.y),
      f(p2.z),
      f(p3.x),
      f(p3.y),
      f(p3.z),
      f(p4.x),
      f(p4.y),
      f(p4.z),
    );
    return {
      hit: b._rcHit[0]! !== 0,
      distance: b._rcDist[0]!,
      point: { x: b._rcPt[0]!, y: b._rcPt[1]!, z: b._rcPt[2]! },
      normal: { x: b._rcNorm[0]!, y: b._rcNorm[1]!, z: b._rcNorm[2]! } };
  }
  static getRayCollisionMesh(
    ray: Ray,
    mesh: Mesh,
    transform: { m: Float32Array } | Float32Array,
  ): RayCollision {
    const m = transform instanceof Float32Array ? transform : transform.m;
    r().symbols.GetRayCollisionMeshW(
      b._rcHit,
      b._rcDist,
      b._rcPt,
      b._rcNorm,
      f(ray.position.x),
      f(ray.position.y),
      f(ray.position.z),
      f(ray.direction.x),
      f(ray.direction.y),
      f(ray.direction.z),
      i(mesh),
      f(m[0]!),
      f(m[4]!),
      f(m[8]!),
      f(m[12]!),
      f(m[1]!),
      f(m[5]!),
      f(m[9]!),
      f(m[13]!),
      f(m[2]!),
      f(m[6]!),
      f(m[10]!),
      f(m[14]!),
      f(m[3]!),
      f(m[7]!),
      f(m[11]!),
      f(m[15]!),
    );
    return {
      hit: b._rcHit[0]! !== 0,
      distance: b._rcDist[0]!,
      point: { x: b._rcPt[0]!, y: b._rcPt[1]!, z: b._rcPt[2]! },
      normal: { x: b._rcNorm[0]!, y: b._rcNorm[1]!, z: b._rcNorm[2]! } };
  }
}
