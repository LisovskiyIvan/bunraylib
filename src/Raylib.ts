import { symbols as r } from "./symbols";
import type {
  Vec2,
  Vec3,
  Rectangle,
  Camera2D,
  Camera3D,
  Ray,
  Texture2D,
  RenderTexture2D,
  Model,
  BoundingBox,
  Font,
  Image,
  Shader,
  Wave,
  Sound,
  Music,
  AudioStream,
  Material,
  Mesh,
  ModelAnimation,
  RayCollision,
  GlyphInfo,
} from "./types";
import { cstr, f2i } from "./utils";
import { CString } from "bun:ffi";
import type { Color } from "./types";

const _vec2Buf = new Float32Array(2);
const _recBuf = new Float32Array(4);
const _colPtBuf = new Float32Array(2);

export class Raylib {

  private static _rcHit = new Uint8Array(1);
  private static _rcDist = new Float32Array(1);
  private static _rcPt = new Float32Array(3);
  private static _rcNorm = new Float32Array(3);
  private static initialized = false;
  private static _texOutId = new Uint32Array(1);
  private static _texOutTexId = new Uint32Array(1);
  private static _texOutW = new Int32Array(1);
  private static _texOutH = new Int32Array(1);
  private static _shapesTexId = new Uint32Array(1);
  private static _shapesTexW = new Int32Array(1);
  private static _shapesTexH = new Int32Array(1);
  private static _rayPosBuf2 = new Float32Array(3);
  private static _rayDirBuf2 = new Float32Array(3);
  private static _animSlotStart = new Int32Array(1);
  private static _animCount = new Int32Array(1);


  /** Initialize window and OpenGL context */
  static initWindow(width: number, height: number, title: string): void {
    r.symbols.InitWindowW(width, height, cstr(title));
    Raylib.initialized = true;
  }

  /** Close window and unload OpenGL context */
  static closeWindow(): void {
    r.symbols.CloseWindowW();
    Raylib.initialized = false;
  }

  /** Check if application should close (KEY_ESCAPE pressed or window close button) */
  static windowShouldClose(): boolean {
    return r.symbols.WindowShouldCloseW();
  }

  /** Setup canvas (framebuffer) to start drawing */
  static beginDrawing(): void {
    r.symbols.BeginDrawingW();
  }

  /** End canvas drawing and swap buffers (double buffering) */
  static endDrawing(): void {
    r.symbols.EndDrawingW();
  }

  /** Begin 2D mode with custom camera */
  static beginMode2D(camera: Camera2D): void {
    r.symbols.BeginMode2DW(
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f2i(camera.rotation),
      f2i(camera.zoom),
    );
  }

  /** Ends 2D mode with custom camera */
  static endMode2D(): void {
    r.symbols.EndMode2DW();
  }

  /** Begin 3D mode with custom camera */
  static beginMode3D(camera: Camera3D): void {
    r.symbols.BeginMode3DW(
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
    );
  }

  /** Ends 3D mode with custom camera */
  static endMode3D(): void {
    r.symbols.EndMode3DW();
  }

  /** Set background color (used before drawing) */
  static clearBackground(col: Color): void {
    r.symbols.ClearBackgroundW(col);
  }

  /** Set target FPS (frames per second) */
  static setTargetFPS(fps: number): void {
    r.symbols.SetTargetFPSW(fps);
  }

  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime(): number {
    return r.symbols.GetFrameTimeW();
  }

  /** Draw a color-filled rectangle */
  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r.symbols.DrawRectangleW(x, y, width, height, col);
  }

  /** Draw text (using default font) */
  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r.symbols.DrawTextW(cstr(text), x, y, fontSize, col);
  }

  /** Draw a pixel */
  static drawPixel(x: number, y: number, col: Color): void {
    r.symbols.DrawPixelW(x, y, col);
  }

  /** Draw a pixel (using vector position) */
  static drawPixelV(position: Vec2, col: Color): void {
    r.symbols.DrawPixelVW(position.x, position.y, col);
  }

  /** Draw a line */
  static drawLine(startX: number, startY: number, endX: number, endY: number, col: Color): void {
    r.symbols.DrawLineW(startX, startY, endX, endY, col);
  }

  /** Draw a line (using vector positions) */
  static drawLineV(startPos: Vec2, endPos: Vec2, col: Color): void {
    r.symbols.DrawLineVW(startPos.x, startPos.y, endPos.x, endPos.y, col);
  }

  /** Draw a line with defined thickness */
  static drawLineEx(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r.symbols.DrawLineExW(startPos.x, startPos.y, endPos.x, endPos.y, thick, col);
  }

  /** Draw lines sequence as a strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawLineStrip(points: Float32Array, col: Color): void {
    r.symbols.DrawLineStripW(points, points.length / 2, col);
  }

  /** Draw line segment with Bezier easing */
  static drawLineBezier(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r.symbols.DrawLineBezierW(startPos.x, startPos.y, endPos.x, endPos.y, thick, col);
  }

  /** Draw a color-filled circle */
  static drawCircle(centerX: number, centerY: number, radius: number, col: Color): void {
    r.symbols.DrawCircleW(centerX, centerY, radius, col);
  }

  /** Draw a color-filled circle (using vector center) */
  static drawCircleV(center: Vec2, radius: number, col: Color): void {
    r.symbols.DrawCircleVW(center.x, center.y, f2i(radius), col);
  }

  /**
   * Draw a circle sector (pie slice).
   * @param center - Center position
   * @param radius - Circle radius
   * @param startAngle - Start angle in degrees
   * @param endAngle - End angle in degrees
   * @param segments - Number of segments (higher = smoother)
   * @param col - Fill color
   */
  static drawCircleSector(
    center: Vec2,
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawCircleSectorW(
      center.x,
      center.y,
      radius,
      f2i(startAngle),
      f2i(endAngle),
      segments,
      col,
    );
  }

  /**
   * Draw a circle sector outline.
   * @param center - Center position
   * @param radius - Circle radius
   * @param startAngle - Start angle in degrees
   * @param endAngle - End angle in degrees
   * @param segments - Number of segments (higher = smoother)
   * @param col - Outline color
   */
  static drawCircleSectorLines(
    center: Vec2,
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawCircleSectorLinesW(
      center.x,
      center.y,
      radius,
      f2i(startAngle),
      f2i(endAngle),
      segments,
      col,
    );
  }

  /** Draw a gradient-filled circle */
  static drawCircleGradient(
    centerX: number,
    centerY: number,
    radius: number,
    inner: Color,
    outer: Color,
  ): void {
    r.symbols.DrawCircleGradientW(centerX, centerY, f2i(radius), inner, outer);
  }

  /** Draw circle outline */
  static drawCircleLines(centerX: number, centerY: number, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesW(centerX, centerY, radius, col);
  }

  /** Draw circle outline (using vector center) */
  static drawCircleLinesV(center: Vec2, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesVW(center.x, center.y, f2i(radius), col);
  }

  /** Draw a color-filled ellipse */
  static drawEllipse(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r.symbols.DrawEllipseW(centerX, centerY, radiusH, radiusV, col);
  }

  /** Draw ellipse outline */
  static drawEllipseLines(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r.symbols.DrawEllipseLinesW(centerX, centerY, radiusH, radiusV, col);
  }

  /**
   * Draw a ring (donut shape).
   * @param center - Center position
   * @param innerRadius - Inner circle radius
   * @param outerRadius - Outer circle radius
   * @param startAngle - Start angle in degrees
   * @param endAngle - End angle in degrees
   * @param segments - Number of segments (higher = smoother)
   * @param col - Fill color
   */
  static drawRing(
    center: Vec2,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawRingW(
      center.x,
      center.y,
      innerRadius,
      outerRadius,
      f2i(startAngle),
      f2i(endAngle),
      segments,
      col,
    );
  }

  /**
   * Draw a ring outline.
   * @param center - Center position
   * @param innerRadius - Inner circle radius
   * @param outerRadius - Outer circle radius
   * @param startAngle - Start angle in degrees
   * @param endAngle - End angle in degrees
   * @param segments - Number of segments (higher = smoother)
   * @param col - Outline color
   */
  static drawRingLines(
    center: Vec2,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawRingLinesW(
      center.x,
      center.y,
      innerRadius,
      outerRadius,
      f2i(startAngle),
      f2i(endAngle),
      segments,
      col,
    );
  }

  /** Draw a color-filled rectangle (using vector position and size) */
  static drawRectangleV(pos: Vec2, size: Vec2, col: Color): void {
    r.symbols.DrawRectangleVW(pos.x, pos.y, size.x, size.y, col);
  }

  static drawRectangleRec(rec: Rectangle, col: Color): void {
    r.symbols.DrawRectangleRecW(rec.x, rec.y, rec.width, rec.height, col);
  }

  /** Draw a color-filled rectangle with pro parameters (rotation and origin) */
  static drawRectanglePro(rec: Rectangle, origin: Vec2, rotation: number, col: Color): void {
    r.symbols.DrawRectangleProW(
      rec.x,
      rec.y,
      rec.width,
      rec.height,
      origin.x,
      origin.y,
      rotation,
      col,
    );
  }

  /** Draw a vertical-gradient-filled rectangle */
  static drawRectangleGradientV(
    x: number,
    y: number,
    width: number,
    height: number,
    top: Color,
    bottom: Color,
  ): void {
    r.symbols.DrawRectangleGradientVW(x, y, width, height, top, bottom);
  }

  /** Draw a horizontal-gradient-filled rectangle */
  static drawRectangleGradientH(
    x: number,
    y: number,
    width: number,
    height: number,
    left: Color,
    right: Color,
  ): void {
    r.symbols.DrawRectangleGradientHW(x, y, width, height, left, right);
  }

  /** Draw a gradient-filled rectangle with custom gradient colors for each corner */
  static drawRectangleGradientEx(
    rec: Rectangle,
    topLeft: Color,
    bottomLeft: Color,
    topRight: Color,
    bottomRight: Color,
  ): void {
    r.symbols.DrawRectangleGradientExW(
      rec.x,
      rec.y,
      rec.width,
      rec.height,
      topLeft,
      bottomLeft,
      topRight,
      bottomRight,
    );
  }

  /** Draw rectangle outline */
  static drawRectangleLines(x: number, y: number, width: number, height: number, col: Color): void {
    r.symbols.DrawRectangleLinesW(x, y, width, height, col);
  }

  /** Draw rectangle outline with extended parameters (custom line thickness) */
  static drawRectangleLinesEx(rec: Rectangle, lineThick: number, col: Color): void {
    r.symbols.DrawRectangleLinesExW(rec.x, rec.y, rec.width, rec.height, lineThick, col);
  }

  /** Draw rectangle with rounded edges */
  static drawRectangleRounded(
    rec: Rectangle,
    roundness: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawRectangleRoundedW(rec.x, rec.y, rec.width, rec.height, roundness, segments, col);
  }

  /** Draw rectangle with rounded edges outline */
  static drawRectangleRoundedLines(
    rec: Rectangle,
    roundness: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawRectangleRoundedLinesW(
      rec.x,
      rec.y,
      rec.width,
      rec.height,
      roundness,
      segments,
      col,
    );
  }

  /** Draw rectangle with rounded edges outline (custom line thickness) */
  static drawRectangleRoundedLinesEx(
    rec: Rectangle,
    roundness: number,
    segments: number,
    lineThick: number,
    col: Color,
  ): void {
    r.symbols.DrawRectangleRoundedLinesExW(
      rec.x,
      rec.y,
      rec.width,
      rec.height,
      roundness,
      segments,
      lineThick,
      col,
    );
  }

  /** Draw a color-filled triangle */
  static drawTriangle(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r.symbols.DrawTriangleW(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, col);
  }

  /** Draw triangle outline */
  static drawTriangleLines(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r.symbols.DrawTriangleLinesW(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, col);
  }

  /** Draw a triangle fan. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleFan(points: Float32Array, col: Color): void {
    r.symbols.DrawTriangleFanW(points, points.length / 2, col);
  }

  /** Draw a triangle strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleStrip(points: Float32Array, col: Color): void {
    r.symbols.DrawTriangleStripW(points, points.length / 2, col);
  }

  /** Draw a regular polygon (color-filled) */
  static drawPoly(center: Vec2, sides: number, radius: number, rotation: number, col: Color): void {
    r.symbols.DrawPolyW(center.x, center.y, sides, radius, rotation, col);
  }

  /** Draw a regular polygon outline */
  static drawPolyLines(
    center: Vec2,
    sides: number,
    radius: number,
    rotation: number,
    col: Color,
  ): void {
    r.symbols.DrawPolyLinesW(center.x, center.y, sides, radius, rotation, col);
  }

  /** Draw a regular polygon outline with custom line thickness */
  static drawPolyLinesEx(
    center: Vec2,
    sides: number,
    radius: number,
    rotation: number,
    lineThick: number,
    col: Color,
  ): void {
    r.symbols.DrawPolyLinesExW(center.x, center.y, sides, radius, rotation, lineThick, col);
  }

  /**
   * Draw spline: Linear. Minimum 2 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineLinear(
    points: Float32Array,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineLinearW(points, points.length / 2, f2i(thick), col);
  }

  /**
   * Draw spline: B-Spline. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBasis(
    points: Float32Array,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBasisW(points, points.length / 2, f2i(thick), col);
  }

  /**
   * Draw spline: Catmull-Rom. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineCatmullRom(
    points: Float32Array,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineCatmullRomW(points, points.length / 2, f2i(thick), col);
  }

  /**
   * Draw spline: Quadratic Bezier. Minimum 3 points (1 control point).
   * Points layout: [p1, c2, p3, c4, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierQuadratic(
    points: Float32Array,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBezierQuadraticW(points, points.length / 2, f2i(thick), col);
  }

  /**
   * Draw spline: Cubic Bezier. Minimum 4 points (2 control points).
   * Points layout: [p1, c2, c3, p4, c5, c6, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierCubic(
    points: Float32Array,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBezierCubicW(points, points.length / 2, f2i(thick), col);
  }

  /** Draw spline segment: Linear, 2 points */
  static drawSplineSegmentLinear(p1: Vec2, p2: Vec2, thick: number, col: Color): void {
    r.symbols.DrawSplineSegmentLinearW(p1.x, p1.y, p2.x, p2.y, f2i(thick), col);
  }

  /** Draw spline segment: B-Spline, 4 points */
  static drawSplineSegmentBasis(
    p1: Vec2,
    p2: Vec2,
    p3: Vec2,
    p4: Vec2,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineSegmentBasisW(
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
      p4.x,
      p4.y,
      f2i(thick),
      col,
    );
  }

  /** Draw spline segment: Catmull-Rom, 4 points */
  static drawSplineSegmentCatmullRom(
    p1: Vec2,
    p2: Vec2,
    p3: Vec2,
    p4: Vec2,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineSegmentCatmullRomW(
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
      p4.x,
      p4.y,
      f2i(thick),
      col,
    );
  }

  /** Draw spline segment: Quadratic Bezier, 2 points + 1 control point */
  static drawSplineSegmentBezierQuadratic(
    p1: Vec2,
    c2: Vec2,
    p3: Vec2,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineSegmentBezierQuadraticW(
      p1.x,
      p1.y,
      c2.x,
      c2.y,
      p3.x,
      p3.y,
      f2i(thick),
      col,
    );
  }

  /** Draw spline segment: Cubic Bezier, 2 points + 2 control points */
  static drawSplineSegmentBezierCubic(
    p1: Vec2,
    c2: Vec2,
    c3: Vec2,
    p4: Vec2,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineSegmentBezierCubicW(
      p1.x,
      p1.y,
      c2.x,
      c2.y,
      c3.x,
      c3.y,
      p4.x,
      p4.y,
      f2i(thick),
      col,
    );
  }

  /**
   * Get (evaluate) spline point: Linear.
   * @param startPos - Start position
   * @param endPos - End position
   * @param t - Interpolation factor [0.0 .. 1.0]
   * @returns Evaluated point as Vec2
   */
  static getSplinePointLinear(startPos: Vec2, endPos: Vec2, t: number): Vec2 {
    r.symbols.GetSplinePointLinearW(_vec2Buf, startPos.x, startPos.y, endPos.x, endPos.y, f2i(t));
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  /**
   * Get (evaluate) spline point: B-Spline.
   * @param p1 - Point 1
   * @param p2 - Point 2
   * @param p3 - Point 3
   * @param p4 - Point 4
   * @param t - Interpolation factor [0.0 .. 1.0]
   * @returns Evaluated point as Vec2
   */
  static getSplinePointBasis(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, t: number): Vec2 {
    r.symbols.GetSplinePointBasisW(
      _vec2Buf,
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
      p4.x,
      p4.y,
      f2i(t),
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  /**
   * Get (evaluate) spline point: Catmull-Rom.
   * @param p1 - Point 1
   * @param p2 - Point 2
   * @param p3 - Point 3
   * @param p4 - Point 4
   * @param t - Interpolation factor [0.0 .. 1.0]
   * @returns Evaluated point as Vec2
   */
  static getSplinePointCatmullRom(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, t: number): Vec2 {
    r.symbols.GetSplinePointCatmullRomW(
      _vec2Buf,
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
      p4.x,
      p4.y,
      f2i(t),
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  /**
   * Get (evaluate) spline point: Quadratic Bezier.
   * @param p1 - Start point
   * @param c2 - Control point
   * @param p3 - End point
   * @param t - Interpolation factor [0.0 .. 1.0]
   * @returns Evaluated point as Vec2
   */
  static getSplinePointBezierQuad(p1: Vec2, c2: Vec2, p3: Vec2, t: number): Vec2 {
    r.symbols.GetSplinePointBezierQuadW(_vec2Buf, p1.x, p1.y, c2.x, c2.y, p3.x, p3.y, f2i(t));
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  /**
   * Get (evaluate) spline point: Cubic Bezier.
   * @param p1 - Start point
   * @param c2 - Control point 1
   * @param c3 - Control point 2
   * @param p4 - End point
   * @param t - Interpolation factor [0.0 .. 1.0]
   * @returns Evaluated point as Vec2
   */
  static getSplinePointBezierCubic(p1: Vec2, c2: Vec2, c3: Vec2, p4: Vec2, t: number): Vec2 {
    r.symbols.GetSplinePointBezierCubicW(
      _vec2Buf,
      p1.x,
      p1.y,
      c2.x,
      c2.y,
      c3.x,
      c3.y,
      p4.x,
      p4.y,
      f2i(t),
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  /** Check collision between two rectangles */
  static checkCollisionRecs(rec1: Rectangle, rec2: Rectangle): boolean {
    return r.symbols.CheckCollisionRecsW(
      rec1.x,
      rec1.y,
      rec1.width,
      rec1.height,
      rec2.x,
      rec2.y,
      rec2.width,
      rec2.height,
    );
  }

  /** Check collision between two circles */
  static checkCollisionCircles(
    center1: Vec2,
    radius1: number,
    center2: Vec2,
    radius2: number,
  ): boolean {
    return r.symbols.CheckCollisionCirclesW(
      center1.x,
      center1.y,
      radius1,
      center2.x,
      center2.y,
      radius2,
    );
  }

  /** Check collision between circle and rectangle */
  static checkCollisionCircleRec(center: Vec2, radius: number, rec: Rectangle): boolean {
    return r.symbols.CheckCollisionCircleRecW(
      center.x,
      center.y,
      radius,
      rec.x,
      rec.y,
      rec.width,
      rec.height,
    );
  }

  /** Check if circle collides with a line created between two points [p1] and [p2] */
  static checkCollisionCircleLine(center: Vec2, radius: number, p1: Vec2, p2: Vec2): boolean {
    return r.symbols.CheckCollisionCircleLineW(center.x, center.y, radius, p1.x, p1.y, p2.x, p2.y);
  }

  /** Check if point is inside rectangle */
  static checkCollisionPointRec(point: Vec2, rec: Rectangle): boolean {
    return r.symbols.CheckCollisionPointRecW(point.x, point.y, rec.x, rec.y, rec.width, rec.height);
  }

  /** Check if point is inside circle */
  static checkCollisionPointCircle(point: Vec2, center: Vec2, radius: number): boolean {
    return r.symbols.CheckCollisionPointCircleW(point.x, point.y, center.x, center.y, radius);
  }

  /** Check if point is inside a triangle */
  static checkCollisionPointTriangle(point: Vec2, p1: Vec2, p2: Vec2, p3: Vec2): boolean {
    return r.symbols.CheckCollisionPointTriangleW(
      point.x,
      point.y,
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
    );
  }

  /** Check if point belongs to line created between two points [p1] and [p2] with defined margin [threshold] */
  static checkCollisionPointLine(point: Vec2, p1: Vec2, p2: Vec2, threshold: number): boolean {
    return r.symbols.CheckCollisionPointLineW(point.x, point.y, p1.x, p1.y, p2.x, p2.y, threshold);
  }

  /**
   * Check if point is within a polygon described by array of vertices.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static checkCollisionPointPoly(point: Vec2, points: Float32Array): boolean {
    return r.symbols.CheckCollisionPointPolyW(point.x, point.y, points, points.length / 2);
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
    const collides = r.symbols.CheckCollisionLinesW(
      _colPtBuf,
      startPos1.x,
      startPos1.y,
      endPos1.x,
      endPos1.y,
      startPos2.x,
      startPos2.y,
      endPos2.x,
      endPos2.y,
    );
    return { collides, collisionPoint: { x: _colPtBuf[0]!, y: _colPtBuf[1]! } };
  }

  /** Get collision rectangle for two rectangles collision. Returns null if no overlap */
  static getCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle {
    r.symbols.GetCollisionRecW(
      _recBuf,
      rec1.x,
      rec1.y,
      rec1.width,
      rec1.height,
      rec2.x,
      rec2.y,
      rec2.width,
      rec2.height,
    );
    return {
      x: _recBuf[0]!,
      y: _recBuf[1]!,
      width: _recBuf[2]!,
      height: _recBuf[3]!,
    };
  }

  /** Draw a line in 3D world space */
  static drawLine3D(startPos: Vec3, endPos: Vec3, col: Color): void {
    r.symbols.DrawLine3DW(
      f2i(startPos.x),
      f2i(startPos.y),
      f2i(startPos.z),
      f2i(endPos.x),
      f2i(endPos.y),
      f2i(endPos.z),
      col,
    );
  }

  /** Draw a point in 3D space */
  static drawPoint3D(position: Vec3, col: Color): void {
    r.symbols.DrawPoint3DW(f2i(position.x), f2i(position.y), f2i(position.z), col);
  }

  /** Draw a circle in 3D world space */
  static drawCircle3D(
    center: Vec3,
    radius: number,
    rotationAxis: Vec3,
    rotationAngle: number,
    col: Color,
  ): void {
    r.symbols.DrawCircle3DW(
      f2i(center.x),
      f2i(center.y),
      f2i(center.z),
      f2i(radius),
      f2i(rotationAxis.x),
      f2i(rotationAxis.y),
      f2i(rotationAxis.z),
      f2i(rotationAngle),
      col,
    );
  }

  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle3D(v1: Vec3, v2: Vec3, v3: Vec3, col: Color): void {
    r.symbols.DrawTriangle3DW(
      f2i(v1.x),
      f2i(v1.y),
      f2i(v1.z),
      f2i(v2.x),
      f2i(v2.y),
      f2i(v2.z),
      f2i(v3.x),
      f2i(v3.y),
      f2i(v3.z),
      col,
    );
  }

  /** Draw a triangle strip defined by points. Points packed as [x0,y0,z0, x1,y1,z1, ...] in Float32Array */
  static drawTriangleStrip3D(points: Float32Array, col: Color): void {
    r.symbols.DrawTriangleStrip3DW(points, points.length / 3, col);
  }

  /** Draw cube */
  static drawCube(position: Vec3, width: number, height: number, length: number, col: Color): void {
    r.symbols.DrawCubeW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(width),
      f2i(height),
      f2i(length),
      col,
    );
  }

  /** Draw cube (Vector version) */
  static drawCubeV(position: Vec3, size: Vec3, col: Color): void {
    r.symbols.DrawCubeVW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(size.x),
      f2i(size.y),
      f2i(size.z),
      col,
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
    r.symbols.DrawCubeWiresW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(width),
      f2i(height),
      f2i(length),
      col,
    );
  }

  /** Draw cube wires (Vector version) */
  static drawCubeWiresV(position: Vec3, size: Vec3, col: Color): void {
    r.symbols.DrawCubeWiresVW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(size.x),
      f2i(size.y),
      f2i(size.z),
      col,
    );
  }

  /** Draw sphere */
  static drawSphere(centerPos: Vec3, radius: number, col: Color): void {
    r.symbols.DrawSphereW(f2i(centerPos.x), f2i(centerPos.y), f2i(centerPos.z), f2i(radius), col);
  }

  /** Draw sphere with extended parameters */
  static drawSphereEx(
    centerPos: Vec3,
    radius: number,
    rings: number,
    slices: number,
    col: Color,
  ): void {
    r.symbols.DrawSphereExW(
      f2i(centerPos.x),
      f2i(centerPos.y),
      f2i(centerPos.z),
      f2i(radius),
      rings,
      slices,
      col,
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
    r.symbols.DrawSphereWiresW(
      f2i(centerPos.x),
      f2i(centerPos.y),
      f2i(centerPos.z),
      f2i(radius),
      rings,
      slices,
      col,
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
    r.symbols.DrawCylinderW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(radiusTop),
      f2i(radiusBottom),
      f2i(height),
      slices,
      col,
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
    r.symbols.DrawCylinderExW(
      f2i(startPos.x),
      f2i(startPos.y),
      f2i(startPos.z),
      f2i(endPos.x),
      f2i(endPos.y),
      f2i(endPos.z),
      f2i(startRadius),
      f2i(endRadius),
      sides,
      col,
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
    r.symbols.DrawCylinderWiresW(
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(radiusTop),
      f2i(radiusBottom),
      f2i(height),
      slices,
      col,
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
    r.symbols.DrawCylinderWiresExW(
      f2i(startPos.x),
      f2i(startPos.y),
      f2i(startPos.z),
      f2i(endPos.x),
      f2i(endPos.y),
      f2i(endPos.z),
      f2i(startRadius),
      f2i(endRadius),
      sides,
      col,
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
    r.symbols.DrawCapsuleW(
      f2i(startPos.x),
      f2i(startPos.y),
      f2i(startPos.z),
      f2i(endPos.x),
      f2i(endPos.y),
      f2i(endPos.z),
      f2i(radius),
      slices,
      rings,
      col,
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
    r.symbols.DrawCapsuleWiresW(
      f2i(startPos.x),
      f2i(startPos.y),
      f2i(startPos.z),
      f2i(endPos.x),
      f2i(endPos.y),
      f2i(endPos.z),
      f2i(radius),
      slices,
      rings,
      col,
    );
  }

  /** Draw a plane XZ */
  static drawPlane(centerPos: Vec3, size: Vec2, col: Color): void {
    r.symbols.DrawPlaneW(
      f2i(centerPos.x),
      f2i(centerPos.y),
      f2i(centerPos.z),
      f2i(size.x),
      f2i(size.y),
      col,
    );
  }

  /** Draw a ray line */
  static drawRay(ray: Ray, col: Color): void {
    r.symbols.DrawRayW(
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      col,
    );
  }

  /** Draw a grid */
  static drawGrid(slices: number, spacing: number): void {
    r.symbols.DrawGridW(slices, spacing);
  }

  // --- Window state ---

  static isWindowReady(): boolean {
    return r.symbols.IsWindowReadyW();
  }
  static isWindowFullscreen(): boolean {
    return r.symbols.IsWindowFullscreenW();
  }
  static isWindowHidden(): boolean {
    return r.symbols.IsWindowHiddenW();
  }
  static isWindowMinimized(): boolean {
    return r.symbols.IsWindowMinimizedW();
  }
  static isWindowMaximized(): boolean {
    return r.symbols.IsWindowMaximizedW();
  }
  static isWindowFocused(): boolean {
    return r.symbols.IsWindowFocusedW();
  }
  static isWindowResized(): boolean {
    return r.symbols.IsWindowResizedW();
  }
  static isWindowState(flag: number): boolean {
    return r.symbols.IsWindowStateW(flag);
  }
  static setWindowState(flags: number): void {
    r.symbols.SetWindowStateW(flags);
  }
  static clearWindowState(flags: number): void {
    r.symbols.ClearWindowStateW(flags);
  }
  static toggleFullscreen(): void {
    r.symbols.ToggleFullscreenW();
  }
  static toggleBorderlessWindowed(): void {
    r.symbols.ToggleBorderlessWindowedW();
  }
  static maximizeWindow(): void {
    r.symbols.MaximizeWindowW();
  }
  static minimizeWindow(): void {
    r.symbols.MinimizeWindowW();
  }
  static restoreWindow(): void {
    r.symbols.RestoreWindowW();
  }
  static setWindowTitle(title: string): void {
    r.symbols.SetWindowTitleW(cstr(title));
  }
  static setWindowPosition(x: number, y: number): void {
    r.symbols.SetWindowPositionW(x, y);
  }
  static setWindowMonitor(monitor: number): void {
    r.symbols.SetWindowMonitorW(monitor);
  }
  static setWindowMinSize(w: number, h: number): void {
    r.symbols.SetWindowMinSizeW(w, h);
  }
  static setWindowMaxSize(w: number, h: number): void {
    r.symbols.SetWindowMaxSizeW(w, h);
  }
  static setWindowSize(w: number, h: number): void {
    r.symbols.SetWindowSizeW(w, h);
  }
  static setWindowOpacity(opacity: number): void {
    r.symbols.SetWindowOpacityW(opacity);
  }
  static setWindowFocused(): void {
    r.symbols.SetWindowFocusedW();
  }
  static getScreenWidth(): number {
    return r.symbols.GetScreenWidthW();
  }
  static getScreenHeight(): number {
    return r.symbols.GetScreenHeightW();
  }
  static getRenderWidth(): number {
    return r.symbols.GetRenderWidthW();
  }
  static getRenderHeight(): number {
    return r.symbols.GetRenderHeightW();
  }
  static getMonitorCount(): number {
    return r.symbols.GetMonitorCountW();
  }
  static getCurrentMonitor(): number {
    return r.symbols.GetCurrentMonitorW();
  }

  static getMonitorPosition(monitor: number): Vec2 {
    r.symbols.GetMonitorPositionW(_vec2Buf, monitor);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getMonitorWidth(monitor: number): number {
    return r.symbols.GetMonitorWidthW(monitor);
  }
  static getMonitorHeight(monitor: number): number {
    return r.symbols.GetMonitorHeightW(monitor);
  }
  static getMonitorPhysicalWidth(monitor: number): number {
    return r.symbols.GetMonitorPhysicalWidthW(monitor);
  }
  static getMonitorPhysicalHeight(monitor: number): number {
    return r.symbols.GetMonitorPhysicalHeightW(monitor);
  }
  static getMonitorRefreshRate(monitor: number): number {
    return r.symbols.GetMonitorRefreshRateW(monitor);
  }

  static getWindowPosition(): Vec2 {
    r.symbols.GetWindowPositionW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getWindowScaleDPI(): Vec2 {
    r.symbols.GetWindowScaleDPIW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getMonitorName(monitor: number): string {
    const ptr = r.symbols.GetMonitorNameW(monitor);
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static setClipboardText(text: string): void {
    r.symbols.SetClipboardTextW(cstr(text));
  }

  static getClipboardText(): string {
    const ptr = r.symbols.GetClipboardTextW();
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static enableEventWaiting(): void {
    r.symbols.EnableEventWaitingW();
  }
  static disableEventWaiting(): void {
    r.symbols.DisableEventWaitingW();
  }

  // --- Cursor ---

  static showCursor(): void {
    r.symbols.ShowCursorW();
  }
  static hideCursor(): void {
    r.symbols.HideCursorW();
  }
  static isCursorHidden(): boolean {
    return r.symbols.IsCursorHiddenW();
  }
  static enableCursor(): void {
    r.symbols.EnableCursorW();
  }
  static disableCursor(): void {
    r.symbols.DisableCursorW();
  }
  static isCursorOnScreen(): boolean {
    return r.symbols.IsCursorOnScreenW();
  }

  // --- Drawing modes ---

  static beginTextureMode(target: RenderTexture2D): void {
    r.symbols.BeginTextureModeW(target.id, target.texture.width, target.texture.height);
  }
  static endTextureMode(): void {
    r.symbols.EndTextureModeW();
  }
  static beginBlendMode(mode: number): void {
    r.symbols.BeginBlendModeW(mode);
  }
  static endBlendMode(): void {
    r.symbols.EndBlendModeW();
  }
  static beginScissorMode(x: number, y: number, w: number, h: number): void {
    r.symbols.BeginScissorModeW(x, y, w, h);
  }
  static endScissorMode(): void {
    r.symbols.EndScissorModeW();
  }

  // --- Timing ---

  static getTime(): number {
    return r.symbols.GetTimeW();
  }
  static getFPS(): number {
    return r.symbols.GetFPSW();
  }
  static swapScreenBuffer(): void {
    r.symbols.SwapScreenBufferW();
  }
  static pollInputEvents(): void {
    r.symbols.PollInputEventsW();
  }
  static waitTime(seconds: number): void {
    r.symbols.WaitTimeW(seconds);
  }

  // --- Random ---

  static setRandomSeed(seed: number): void {
    r.symbols.SetRandomSeedW(seed);
  }
  static getRandomValue(min: number, max: number): number {
    return r.symbols.GetRandomValueW(min, max);
  }

  // --- Misc ---

  static takeScreenshot(fileName: string): void {
    r.symbols.TakeScreenshotW(cstr(fileName));
  }
  static setConfigFlags(flags: number): void {
    r.symbols.SetConfigFlagsW(flags);
  }
  static openURL(url: string): void {
    r.symbols.OpenURLW(cstr(url));
  }

  // --- Input: Keyboard ---

  static isKeyPressed(key: number): boolean {
    return r.symbols.IsKeyPressedW(key);
  }
  static isKeyPressedRepeat(key: number): boolean {
    return r.symbols.IsKeyPressedRepeatW(key);
  }
  static isKeyDown(key: number): boolean {
    return r.symbols.IsKeyDownW(key);
  }
  static isKeyReleased(key: number): boolean {
    return r.symbols.IsKeyReleasedW(key);
  }
  static isKeyUp(key: number): boolean {
    return r.symbols.IsKeyUpW(key);
  }
  static getKeyPressed(): number {
    return r.symbols.GetKeyPressedW();
  }
  static getCharPressed(): number {
    return r.symbols.GetCharPressedW();
  }
  static setExitKey(key: number): void {
    r.symbols.SetExitKeyW(key);
  }

  // --- Input: Gamepad ---

  static isGamepadAvailable(gamepad: number): boolean {
    return r.symbols.IsGamepadAvailableW(gamepad);
  }
  static getGamepadName(gamepad: number): string {
    const cstr = r.symbols.GetGamepadNameW(gamepad);
    if (!cstr) return "";
    return cstr.toString();
  }
  static isGamepadButtonPressed(gamepad: number, button: number): boolean {
    return r.symbols.IsGamepadButtonPressedW(gamepad, button);
  }
  static isGamepadButtonDown(gamepad: number, button: number): boolean {
    return r.symbols.IsGamepadButtonDownW(gamepad, button);
  }
  static isGamepadButtonReleased(gamepad: number, button: number): boolean {
    return r.symbols.IsGamepadButtonReleasedW(gamepad, button);
  }
  static isGamepadButtonUp(gamepad: number, button: number): boolean {
    return r.symbols.IsGamepadButtonUpW(gamepad, button);
  }
  static getGamepadButtonPressed(): number {
    return r.symbols.GetGamepadButtonPressedW();
  }
  static getGamepadAxisCount(gamepad: number): number {
    return r.symbols.GetGamepadAxisCountW(gamepad);
  }
  static getGamepadAxisMovement(gamepad: number, axis: number): number {
    return r.symbols.GetGamepadAxisMovementW(gamepad, axis);
  }
  static setGamepadMappings(mappings: string): number {
    return r.symbols.SetGamepadMappingsW(cstr(mappings));
  }

  // --- Input: Mouse ---

  static isMouseButtonPressed(button: number): boolean {
    return r.symbols.IsMouseButtonPressedW(button);
  }
  static isMouseButtonDown(button: number): boolean {
    return r.symbols.IsMouseButtonDownW(button);
  }
  static isMouseButtonReleased(button: number): boolean {
    return r.symbols.IsMouseButtonReleasedW(button);
  }
  static isMouseButtonUp(button: number): boolean {
    return r.symbols.IsMouseButtonUpW(button);
  }
  static getMouseX(): number {
    return r.symbols.GetMouseXW();
  }
  static getMouseY(): number {
    return r.symbols.GetMouseYW();
  }

  static getMousePosition(): Vec2 {
    r.symbols.GetMousePositionW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getMouseDelta(): Vec2 {
    r.symbols.GetMouseDeltaW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static setMousePosition(x: number, y: number): void {
    r.symbols.SetMousePositionW(x, y);
  }
  static setMouseOffset(x: number, y: number): void {
    r.symbols.SetMouseOffsetW(x, y);
  }
  static setMouseScale(scaleX: number, scaleY: number): void {
    r.symbols.SetMouseScaleW(scaleX, scaleY);
  }
  static getMouseWheelMove(): number {
    return r.symbols.GetMouseWheelMoveW();
  }

  static getMouseWheelMoveV(): Vec2 {
    r.symbols.GetMouseWheelMoveVW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static setMouseCursor(cursor: number): void {
    r.symbols.SetMouseCursorW(cursor);
  }

  // --- Input: Touch ---

  static getTouchX(): number {
    return r.symbols.GetTouchXW();
  }
  static getTouchY(): number {
    return r.symbols.GetTouchYW();
  }

  static getTouchPosition(index: number): Vec2 {
    r.symbols.GetTouchPositionW(_vec2Buf, index);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getTouchPointId(index: number): number {
    return r.symbols.GetTouchPointIdW(index);
  }
  static getTouchPointCount(): number {
    return r.symbols.GetTouchPointCountW();
  }

  // --- Gestures ---

  static setGesturesEnabled(flags: number): void {
    r.symbols.SetGesturesEnabledW(flags);
  }
  static isGestureDetected(gesture: number): boolean {
    return r.symbols.IsGestureDetectedW(gesture);
  }
  static getGestureDetected(): number {
    return r.symbols.GetGestureDetectedW();
  }
  static getGestureHoldDuration(): number {
    return r.symbols.GetGestureHoldDurationW();
  }

  static getGestureDragVector(): Vec2 {
    r.symbols.GetGestureDragVectorW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getGestureDragAngle(): number {
    return r.symbols.GetGestureDragAngleW();
  }

  static getGesturePinchVector(): Vec2 {
    r.symbols.GetGesturePinchVectorW(_vec2Buf);
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getGesturePinchAngle(): number {
    return r.symbols.GetGesturePinchAngleW();
  }

  // --- Camera ---

  static updateCamera(camera: Camera3D, mode: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r.symbols.UpdateCameraW(pos, tar, up, fovy, proj, mode);
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D["projection"],
    };
  }

  static updateCameraPro(camera: Camera3D, movement: Vec3, rotation: Vec3, zoom: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r.symbols.UpdateCameraProW(
      pos,
      tar,
      up,
      fovy,
      proj,
      movement.x,
      movement.y,
      movement.z,
      rotation.x,
      rotation.y,
      rotation.z,
      zoom,
    );
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D["projection"],
    };
  }

  // --- Screen-space ---

  static getScreenToWorldRay(position: Vec2, camera: Camera3D): Ray {
    const outPos = new Float32Array(3);
    const outDir = new Float32Array(3);
    r.symbols.GetScreenToWorldRayW(
      outPos,
      outDir,
      position.x,
      position.y,
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
    );
    return {
      position: { x: outPos[0]!, y: outPos[1]!, z: outPos[2]! },
      direction: { x: outDir[0]!, y: outDir[1]!, z: outDir[2]! },
    };
  }

  static getWorldToScreen(position: Vec3, camera: Camera3D): Vec2 {
    r.symbols.GetWorldToScreenW(
      _vec2Buf,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getWorldToScreen2D(position: Vec2, camera: Camera2D): Vec2 {
    r.symbols.GetWorldToScreen2DW(
      _vec2Buf,
      position.x,
      position.y,
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f2i(camera.rotation),
      f2i(camera.zoom),
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  static getScreenToWorld2D(position: Vec2, camera: Camera2D): Vec2 {
    r.symbols.GetScreenToWorld2DW(
      _vec2Buf,
      position.x,
      position.y,
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f2i(camera.rotation),
      f2i(camera.zoom),
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  // --- DrawFPS ---

  static drawFPS(posX: number, posY: number): void {
    r.symbols.DrawFPSW(posX, posY);
  }

  // --- Texture ---
  static loadTexture(fileName: string): Texture2D {
    r.symbols.LoadTextureW(this._texOutId, this._texOutW, this._texOutH, cstr(fileName));
    return {
      id: this._texOutId[0]!,
      width: this._texOutW[0]!,
      height: this._texOutH[0]!,
    };
  }

  static unloadTexture(texture: Texture2D): void {
    r.symbols.UnloadTextureW(texture.id);
  }

  static isTextureValid(texture: Texture2D): boolean {
    return r.symbols.IsTextureValidW(texture.id, texture.width, texture.height);
  }

  static loadRenderTexture(width: number, height: number): RenderTexture2D {
    r.symbols.LoadRenderTextureW(
      this._texOutId,
      this._texOutTexId,
      this._texOutW,
      this._texOutH,
      width,
      height,
    );
    return {
      id: this._texOutId[0]!,
      texture: {
        id: this._texOutTexId[0]!,
        width: this._texOutW[0]!,
        height: this._texOutH[0]!,
      },
    };
  }

  static unloadRenderTexture(target: RenderTexture2D): void {
    r.symbols.UnloadRenderTextureW(target.id);
  }

  static isRenderTextureValid(target: RenderTexture2D): boolean {
    return r.symbols.IsRenderTextureValidW(target.id);
  }

  static genTextureMipmaps(texture: Texture2D): void {
    r.symbols.GenTextureMipmapsW(texture.id);
  }

  static setTextureFilter(texture: Texture2D, filter: number): void {
    r.symbols.SetTextureFilterW(texture.id, filter);
  }

  static setTextureWrap(texture: Texture2D, wrap: number): void {
    r.symbols.SetTextureWrapW(texture.id, wrap);
  }

  static drawTexture(texture: Texture2D, posX: number, posY: number, tint: Color): void {
    r.symbols.DrawTextureW(texture.id, texture.width, texture.height, posX, posY, tint);
  }

  static drawTextureEx(
    texture: Texture2D,
    position: Vec2,
    rotation: number,
    scale: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextureExW(
      texture.id,
      texture.width,
      texture.height,
      position.x,
      position.y,
      f2i(rotation),
      f2i(scale),
      tint,
    );
  }

  static drawTextureRec(texture: Texture2D, source: Rectangle, position: Vec2, tint: Color): void {
    r.symbols.DrawTextureRecW(
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      position.x,
      position.y,
      tint,
    );
  }

  static drawTexturePro(
    texture: Texture2D,
    source: Rectangle,
    dest: Rectangle,
    origin: Vec2,
    rotation: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextureProW(
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      dest.x,
      dest.y,
      dest.width,
      dest.height,
      origin.x,
      origin.y,
      f2i(rotation),
      tint,
    );
  }

  // --- Model ---

  private static _bbMin = new Float32Array(3);
  private static _bbMax = new Float32Array(3);

  static loadModel(fileName: string): Model {
    return r.symbols.LoadModelW(cstr(fileName));
  }

  static unloadModel(model: Model): void {
    r.symbols.UnloadModelW(model);
  }

  static isModelValid(model: Model): boolean {
    return r.symbols.IsModelValidW(model);
  }

  static getModelBoundingBox(model: Model): BoundingBox {
    r.symbols.GetModelBoundingBoxW(this._bbMin, this._bbMax, model);
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static drawModel(model: Model, position: Vec3, scale: number, tint: Color): void {
    r.symbols.DrawModelW(
      model,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(scale),
      tint,
    );
  }

  static drawModelEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r.symbols.DrawModelExW(
      model,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(rotationAxis.x),
      f2i(rotationAxis.y),
      f2i(rotationAxis.z),
      f2i(rotationAngle),
      f2i(scale.x),
      f2i(scale.y),
      f2i(scale.z),
      tint,
    );
  }

  static drawModelWires(model: Model, position: Vec3, scale: number, tint: Color): void {
    r.symbols.DrawModelWiresW(
      model,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(scale),
      tint,
    );
  }

  static drawModelWiresEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r.symbols.DrawModelWiresExW(
      model,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(rotationAxis.x),
      f2i(rotationAxis.y),
      f2i(rotationAxis.z),
      f2i(rotationAngle),
      f2i(scale.x),
      f2i(scale.y),
      f2i(scale.z),
      tint,
    );
  }

  // --- Shapes texture ---

  static setShapesTexture(texture: Texture2D, source: Rectangle): void {
    r.symbols.SetShapesTextureW(
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
    );
  }

  static getShapesTexture(): Texture2D {
    r.symbols.GetShapesTextureW(this._shapesTexId, this._shapesTexW, this._shapesTexH);
    return { id: this._shapesTexId[0]!, width: this._shapesTexW[0]!, height: this._shapesTexH[0]! };
  }

  static getShapesTextureRectangle(): Rectangle {
    r.symbols.GetShapesTextureRectangleW(_recBuf);
    return { x: _recBuf[0]!, y: _recBuf[1]!, width: _recBuf[2]!, height: _recBuf[3]! };
  }

  // --- Color utilities ---

  private static _vec4Buf = new Float32Array(4);
  private static _vec3Buf2 = new Float32Array(3);

  static colorToInt(c: Color): number {
    return r.symbols.ColorToIntW(c);
  }

  static colorNormalize(c: Color): { x: number; y: number; z: number; w: number } {
    r.symbols.ColorNormalizeW(this._vec4Buf, c);
    return {
      x: this._vec4Buf[0]!,
      y: this._vec4Buf[1]!,
      z: this._vec4Buf[2]!,
      w: this._vec4Buf[3]!,
    };
  }

  static colorFromNormalized(normalized: { x: number; y: number; z: number; w: number }): Color {
    return r.symbols.ColorFromNormalizedW(
      f2i(normalized.x),
      f2i(normalized.y),
      f2i(normalized.z),
      f2i(normalized.w),
    );
  }

  static colorToHSV(c: Color): { h: number; s: number; v: number } {
    r.symbols.ColorToHSVW(this._vec3Buf2, c);
    return { h: this._vec3Buf2[0]!, s: this._vec3Buf2[1]!, v: this._vec3Buf2[2]! };
  }

  static colorFromHSV(hue: number, saturation: number, value: number): Color {
    return r.symbols.ColorFromHSVW(f2i(hue), f2i(saturation), f2i(value));
  }

  static colorTint(color: Color, tint: Color): Color {
    return r.symbols.ColorTintW(color, tint);
  }
  static colorBrightness(color: Color, factor: number): Color {
    return r.symbols.ColorBrightnessW(color, f2i(factor));
  }
  static colorContrast(color: Color, contrast: number): Color {
    return r.symbols.ColorContrastW(color, f2i(contrast));
  }
  static colorAlpha(color: Color, alpha: number): Color {
    return r.symbols.ColorAlphaW(color, f2i(alpha));
  }
  static colorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
    return r.symbols.ColorAlphaBlendW(dst, src, tint);
  }
  static colorLerp(color1: Color, color2: Color, factor: number): Color {
    return r.symbols.ColorLerpW(color1, color2, f2i(factor));
  }
  static getColor(hexValue: number): Color {
    return r.symbols.GetColorW(hexValue);
  }
  static fade(color: Color, alpha: number): Color {
    return r.symbols.FadeW(color, f2i(alpha));
  }
  static colorIsEqual(col1: Color, col2: Color): boolean {
    return r.symbols.ColorIsEqualW(col1, col2);
  }
  static getPixelDataSize(width: number, height: number, format: number): number {
    return r.symbols.GetPixelDataSizeW(width, height, format);
  }

  // --- Font ---

  private static _vec2Buf2 = new Float32Array(2);

  static loadFont(fileName: string): Font {
    return r.symbols.LoadFontW(cstr(fileName));
  }

  static loadFontEx(fileName: string, fontSize: number): Font {
    return r.symbols.LoadFontExW(cstr(fileName), fontSize);
  }

  static getFontDefault(): Font {
    return r.symbols.GetFontDefaultW();
  }

  static unloadFont(font: Font): void {
    r.symbols.UnloadFontW(font);
  }

  static isFontValid(font: Font): boolean {
    return r.symbols.IsFontValidW(font);
  }

  static measureText(text: string, fontSize: number): number {
    return r.symbols.MeasureTextW(cstr(text), fontSize);
  }

  static measureTextEx(font: Font, text: string, fontSize: number, spacing: number): Vec2 {
    r.symbols.MeasureTextExW(this._vec2Buf2, font, cstr(text), fontSize, f2i(spacing));
    return { x: this._vec2Buf2[0]!, y: this._vec2Buf2[1]! };
  }

  static drawTextEx(
    font: Font,
    text: string,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextExW(font, cstr(text), position.x, position.y, fontSize, f2i(spacing), tint);
  }

  static drawTextPro(
    font: Font,
    text: string,
    position: Vec2,
    origin: Vec2,
    rotation: number,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextProW(
      font,
      cstr(text),
      position.x,
      position.y,
      origin.x,
      origin.y,
      f2i(rotation),
      fontSize,
      f2i(spacing),
      tint,
    );
  }

  static setTextLineSpacing(spacing: number): void {
    r.symbols.SetTextLineSpacingW(spacing);
  }

  // --- Core extensions ---

  static setGamepadVibration(
    gamepad: number,
    leftMotor: number,
    rightMotor: number,
    duration: number,
  ): void {
    r.symbols.SetGamepadVibrationW(gamepad, leftMotor, rightMotor, duration);
  }

  static traceLog(logLevel: number, text: string): void {
    r.symbols.TraceLogW(logLevel, cstr(text));
  }

  static setTraceLogLevel(logLevel: number): void {
    r.symbols.SetTraceLogLevelW(logLevel);
  }

  static setWindowIcon(image: Image): void {
    r.symbols.SetWindowIconW(image);
  }

  static getClipboardImage(): Image {
    return r.symbols.GetClipboardImageW();
  }

  // --- Screen-space extended ---
  
  static getScreenToWorldRayEx(
    position: Vec2,
    camera: Camera3D,
    width: number,
    height: number,
  ): Ray {
    r.symbols.GetScreenToWorldRayExW(
      this._rayPosBuf2,
      this._rayDirBuf2,
      position.x,
      position.y,
      width,
      height,
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
    );
    return {
      position: { x: this._rayPosBuf2[0]!, y: this._rayPosBuf2[1]!, z: this._rayPosBuf2[2]! },
      direction: { x: this._rayDirBuf2[0]!, y: this._rayDirBuf2[1]!, z: this._rayDirBuf2[2]! },
    };
  }

  static getWorldToScreenEx(position: Vec3, camera: Camera3D, width: number, height: number): Vec2 {
    r.symbols.GetWorldToScreenExW(
      _vec2Buf,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
      width,
      height,
    );
    return { x: _vec2Buf[0]!, y: _vec2Buf[1]! };
  }

  private static _matBuf = new Float32Array(16);

  static getCameraMatrix(camera: Camera3D): Float32Array {
    r.symbols.GetCameraMatrixW(
      this._matBuf,
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
    );
    return new Float32Array(this._matBuf);
  }

  static getCameraMatrix2D(camera: Camera2D): Float32Array {
    r.symbols.GetCameraMatrix2DW(
      this._matBuf,
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f2i(camera.rotation),
      f2i(camera.zoom),
    );
    return new Float32Array(this._matBuf);
  }

  // --- File system ---

  static fileExists(fileName: string): boolean {
    return r.symbols.FileExistsW(cstr(fileName));
  }
  static directoryExists(dirPath: string): boolean {
    return r.symbols.DirectoryExistsW(cstr(dirPath));
  }
  static isFileExtension(fileName: string, ext: string): boolean {
    return r.symbols.IsFileExtensionW(cstr(fileName), cstr(ext));
  }
  static getFileLength(fileName: string): number {
    return r.symbols.GetFileLengthW(cstr(fileName));
  }

  static getFileExtension(fileName: string): string {
    const ptr = r.symbols.GetFileExtensionW(cstr(fileName));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getFileName(filePath: string): string {
    const ptr = r.symbols.GetFileNameW(cstr(filePath));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getFileNameWithoutExt(filePath: string): string {
    const ptr = r.symbols.GetFileNameWithoutExtW(cstr(filePath));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getDirectoryPath(filePath: string): string {
    const ptr = r.symbols.GetDirectoryPathW(cstr(filePath));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getPrevDirectoryPath(dirPath: string): string {
    const ptr = r.symbols.GetPrevDirectoryPathW(cstr(dirPath));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getWorkingDirectory(): string {
    const ptr = r.symbols.GetWorkingDirectoryW();
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static getApplicationDirectory(): string {
    const ptr = r.symbols.GetApplicationDirectoryW();
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static makeDirectory(dirPath: string): number {
    return r.symbols.MakeDirectoryW(cstr(dirPath));
  }
  static changeDirectory(dir: string): boolean {
    return r.symbols.ChangeDirectoryW(cstr(dir));
  }
  static isPathFile(path: string): boolean {
    return r.symbols.IsPathFileW(cstr(path));
  }
  static isFileNameValid(fileName: string): boolean {
    return r.symbols.IsFileNameValidW(cstr(fileName));
  }
  static getFileModTime(fileName: string): number {
    return Number(r.symbols.GetFileModTimeW(cstr(fileName)));
  }

  static loadFileText(fileName: string): string {
    const ptr = r.symbols.LoadFileTextW(cstr(fileName));
    if (!ptr) return "";
    return new CString(ptr).toString();
  }

  static unloadFileText(text: string): void {
    r.symbols.UnloadFileTextW(Buffer.from(text));
  }
  static saveFileText(fileName: string, text: string): boolean {
    return r.symbols.SaveFileTextW(cstr(fileName), cstr(text));
  }

  static computeCRC32(data: Uint8Array, dataSize: number): number {
    return r.symbols.ComputeCRC32W(data, dataSize);
  }

  // --- Shader ---

  static loadShader(vsFileName: string | null, fsFileName: string): Shader {
    return r.symbols.LoadShaderW(vsFileName ? cstr(vsFileName) : Buffer.alloc(0), cstr(fsFileName));
  }

  static loadShaderFromMemory(vsCode: string | null, fsCode: string): Shader {
    return r.symbols.LoadShaderFromMemoryW(vsCode ? cstr(vsCode) : Buffer.alloc(0), cstr(fsCode));
  }

  static isShaderValid(shader: Shader): boolean {
    return r.symbols.IsShaderValidW(shader);
  }
  static getShaderLocation(shader: Shader, uniformName: string): number {
    return r.symbols.GetShaderLocationW(shader, cstr(uniformName));
  }
  static getShaderLocationAttrib(shader: Shader, attribName: string): number {
    return r.symbols.GetShaderLocationAttribW(shader, cstr(attribName));
  }

  static setShaderValueMatrix(shader: Shader, locIndex: number, mat: Float32Array): void {
    r.symbols.SetShaderValueMatrixW(shader, locIndex, mat);
  }

  static setShaderValueTexture(shader: Shader, locIndex: number, texture: Texture2D): void {
    r.symbols.SetShaderValueTextureW(shader, locIndex, texture.id, texture.width, texture.height);
  }

  static unloadShader(shader: Shader): void {
    r.symbols.UnloadShaderW(shader);
  }
  static beginShaderMode(shader: Shader): void {
    r.symbols.BeginShaderModeW(shader);
  }
  static endShaderMode(): void {
    r.symbols.EndShaderModeW();
  }

  // --- Image loading ---

  static loadImage(fileName: string): Image {
    return r.symbols.LoadImageW(cstr(fileName));
  }
  static loadImageRaw(
    fileName: string,
    width: number,
    height: number,
    format: number,
    headerSize: number,
  ): Image {
    return r.symbols.LoadImageRawW(cstr(fileName), width, height, format, headerSize);
  }

  private static _imgAnimSlot = new Int32Array(1);
  private static _imgAnimFrames = new Int32Array(1);

  static loadImageAnim(fileName: string): { image: Image; frames: number } {
    r.symbols.LoadImageAnimW(this._imgAnimSlot, this._imgAnimFrames, cstr(fileName));
    return { image: this._imgAnimSlot[0]!, frames: this._imgAnimFrames[0]! };
  }

  static loadImageFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Image {
    return r.symbols.LoadImageFromMemoryW(cstr(fileType), fileData, dataSize);
  }

  static loadImageFromTexture(texture: Texture2D): Image {
    return r.symbols.LoadImageFromTextureW(texture.id, texture.width, texture.height);
  }

  static loadImageFromScreen(): Image {
    return r.symbols.LoadImageFromScreenW();
  }
  static isImageValid(image: Image): boolean {
    return r.symbols.IsImageValidW(image);
  }
  static unloadImage(image: Image): void {
    r.symbols.UnloadImageW(image);
  }
  static exportImage(image: Image, fileName: string): boolean {
    return r.symbols.ExportImageW(image, cstr(fileName));
  }
  static exportImageAsCode(image: Image, fileName: string): boolean {
    return r.symbols.ExportImageAsCodeW(image, cstr(fileName));
  }

  // --- Image generation ---

  static genImageColor(width: number, height: number, color: Color): Image {
    return r.symbols.GenImageColorW(width, height, color);
  }
  static genImageGradientLinear(
    width: number,
    height: number,
    direction: number,
    start: Color,
    end: Color,
  ): Image {
    return r.symbols.GenImageGradientLinearW(width, height, direction, start, end);
  }
  static genImageGradientRadial(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r.symbols.GenImageGradientRadialW(width, height, f2i(density), inner, outer);
  }
  static genImageGradientSquare(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r.symbols.GenImageGradientSquareW(width, height, f2i(density), inner, outer);
  }
  static genImageChecked(
    width: number,
    height: number,
    checksX: number,
    checksY: number,
    col1: Color,
    col2: Color,
  ): Image {
    return r.symbols.GenImageCheckedW(width, height, checksX, checksY, col1, col2);
  }
  static genImageWhiteNoise(width: number, height: number, factor: number): Image {
    return r.symbols.GenImageWhiteNoiseW(width, height, f2i(factor));
  }
  static genImagePerlinNoise(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
  ): Image {
    return r.symbols.GenImagePerlinNoiseW(width, height, offsetX, offsetY, f2i(scale));
  }
  static genImageCellular(width: number, height: number, tileSize: number): Image {
    return r.symbols.GenImageCellularW(width, height, tileSize);
  }
  static genImageText(width: number, height: number, text: string): Image {
    return r.symbols.GenImageTextW(width, height, cstr(text));
  }

  // --- Image manipulation ---

  static imageCopy(image: Image): Image {
    return r.symbols.ImageCopyW(image);
  }
  static imageFromImage(image: Image, rec: Rectangle): Image {
    return r.symbols.ImageFromImageW(image, rec.x, rec.y, rec.width, rec.height);
  }
  static imageFromChannel(image: Image, selectedChannel: number): Image {
    return r.symbols.ImageFromChannelW(image, selectedChannel);
  }
  static imageText(text: string, fontSize: number, color: Color): Image {
    return r.symbols.ImageTextW(cstr(text), fontSize, color);
  }
  static imageTextEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): Image {
    return r.symbols.ImageTextExW(font, cstr(text), fontSize, f2i(spacing), tint);
  }

  static imageFormat(image: Image, newFormat: number): void {
    r.symbols.ImageFormatW(image, newFormat);
  }
  static imageCrop(image: Image, rec: Rectangle): void {
    r.symbols.ImageCropW(image, rec.x, rec.y, rec.width, rec.height);
  }
  static imageAlphaCrop(image: Image, threshold: number): void {
    r.symbols.ImageAlphaCropW(image, f2i(threshold));
  }
  static imageAlphaClear(image: Image, color: Color, threshold: number): void {
    r.symbols.ImageAlphaClearW(image, color, f2i(threshold));
  }
  static imageAlphaMask(image: Image, alphaMask: Image): void {
    r.symbols.ImageAlphaMaskW(image, alphaMask);
  }
  static imageAlphaPremultiply(image: Image): void {
    r.symbols.ImageAlphaPremultiplyW(image);
  }
  static imageBlurGaussian(image: Image, blurSize: number): void {
    r.symbols.ImageBlurGaussianW(image, blurSize);
  }
  static imageResize(image: Image, newWidth: number, newHeight: number): void {
    r.symbols.ImageResizeW(image, newWidth, newHeight);
  }
  static imageResizeNN(image: Image, newWidth: number, newHeight: number): void {
    r.symbols.ImageResizeNNW(image, newWidth, newHeight);
  }
  static imageResizeCanvas(
    image: Image,
    newWidth: number,
    newHeight: number,
    offsetX: number,
    offsetY: number,
    fill: Color,
  ): void {
    r.symbols.ImageResizeCanvasW(image, newWidth, newHeight, offsetX, offsetY, fill);
  }
  static imageMipmaps(image: Image): void {
    r.symbols.ImageMipmapsW(image);
  }
  static imageDither(image: Image, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void {
    r.symbols.ImageDitherW(image, rBpp, gBpp, bBpp, aBpp);
  }
  static imageFlipVertical(image: Image): void {
    r.symbols.ImageFlipVerticalW(image);
  }
  static imageFlipHorizontal(image: Image): void {
    r.symbols.ImageFlipHorizontalW(image);
  }
  static imageRotate(image: Image, degrees: number): void {
    r.symbols.ImageRotateW(image, f2i(degrees));
  }
  static imageRotateCW(image: Image): void {
    r.symbols.ImageRotateCWW(image);
  }
  static imageRotateCCW(image: Image): void {
    r.symbols.ImageRotateCCWW(image);
  }
  static imageColorTint(image: Image, color: Color): void {
    r.symbols.ImageColorTintW(image, color);
  }
  static imageColorInvert(image: Image): void {
    r.symbols.ImageColorInvertW(image);
  }
  static imageColorGrayscale(image: Image): void {
    r.symbols.ImageColorGrayscaleW(image);
  }
  static imageColorContrast(image: Image, contrast: number): void {
    r.symbols.ImageColorContrastW(image, f2i(contrast));
  }
  static imageColorBrightness(image: Image, brightness: number): void {
    r.symbols.ImageColorBrightnessW(image, brightness);
  }
  static imageColorReplace(image: Image, color: Color, replace: Color): void {
    r.symbols.ImageColorReplaceW(image, color, replace);
  }

  // --- Image info ---

  static getImageAlphaBorder(image: Image, threshold: number): Rectangle {
    r.symbols.GetImageAlphaBorderW(_recBuf, image, f2i(threshold));
    return { x: _recBuf[0]!, y: _recBuf[1]!, width: _recBuf[2]!, height: _recBuf[3]! };
  }

  static getImageColor(image: Image, x: number, y: number): Color {
    return r.symbols.GetImageColorW(image, x, y);
  }

  // --- Image drawing ---

  static imageClearBackground(dst: Image, color: Color): void {
    r.symbols.ImageClearBackgroundW(dst, color);
  }
  static imageDrawPixel(dst: Image, posX: number, posY: number, color: Color): void {
    r.symbols.ImageDrawPixelW(dst, posX, posY, color);
  }
  static imageDrawPixelV(dst: Image, position: Vec2, color: Color): void {
    r.symbols.ImageDrawPixelVW(dst, position.x, position.y, color);
  }
  static imageDrawLine(
    dst: Image,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: Color,
  ): void {
    r.symbols.ImageDrawLineW(dst, startX, startY, endX, endY, color);
  }
  static imageDrawLineV(dst: Image, start: Vec2, end: Vec2, color: Color): void {
    r.symbols.ImageDrawLineVW(dst, start.x, start.y, end.x, end.y, color);
  }
  static imageDrawLineEx(dst: Image, start: Vec2, end: Vec2, thick: number, color: Color): void {
    r.symbols.ImageDrawLineExW(dst, start.x, start.y, end.x, end.y, thick, color);
  }
  static imageDrawCircle(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r.symbols.ImageDrawCircleW(dst, centerX, centerY, radius, color);
  }
  static imageDrawCircleV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r.symbols.ImageDrawCircleVW(dst, center.x, center.y, radius, color);
  }
  static imageDrawCircleLines(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r.symbols.ImageDrawCircleLinesW(dst, centerX, centerY, radius, color);
  }
  static imageDrawCircleLinesV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r.symbols.ImageDrawCircleLinesVW(dst, center.x, center.y, radius, color);
  }
  static imageDrawRectangle(
    dst: Image,
    posX: number,
    posY: number,
    w: number,
    h: number,
    color: Color,
  ): void {
    r.symbols.ImageDrawRectangleW(dst, posX, posY, w, h, color);
  }
  static imageDrawRectangleV(dst: Image, position: Vec2, size: Vec2, color: Color): void {
    r.symbols.ImageDrawRectangleVW(dst, position.x, position.y, size.x, size.y, color);
  }
  static imageDrawRectangleRec(dst: Image, rec: Rectangle, color: Color): void {
    r.symbols.ImageDrawRectangleRecW(dst, rec.x, rec.y, rec.width, rec.height, color);
  }
  static imageDrawRectangleLines(dst: Image, rec: Rectangle, thick: number, color: Color): void {
    r.symbols.ImageDrawRectangleLinesW(dst, rec.x, rec.y, rec.width, rec.height, thick, color);
  }
  static imageDrawTriangle(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r.symbols.ImageDrawTriangleW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, color);
  }
  static imageDrawTriangleEx(
    dst: Image,
    v1: Vec2,
    v2: Vec2,
    v3: Vec2,
    c1: Color,
    c2: Color,
    c3: Color,
  ): void {
    r.symbols.ImageDrawTriangleExW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, c1, c2, c3);
  }
  static imageDrawTriangleLines(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r.symbols.ImageDrawTriangleLinesW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, color);
  }
  static imageDrawTriangleFan(
    dst: Image,
    points: Float32Array,
    color: Color,
  ): void {
    r.symbols.ImageDrawTriangleFanW(dst, points, points.length / 2, color);
  }
  static imageDrawTriangleStrip(
    dst: Image,
    points: Float32Array,
    color: Color,
  ): void {
    r.symbols.ImageDrawTriangleStripW(dst, points, points.length / 2, color);
  }
  static imageDraw(
    dst: Image,
    src: Image,
    srcRec: Rectangle,
    dstRec: Rectangle,
    tint: Color,
  ): void {
    r.symbols.ImageDrawW(
      dst,
      src,
      srcRec.x,
      srcRec.y,
      srcRec.width,
      srcRec.height,
      dstRec.x,
      dstRec.y,
      dstRec.width,
      dstRec.height,
      tint,
    );
  }
  static imageDrawText(
    dst: Image,
    text: string,
    posX: number,
    posY: number,
    fontSize: number,
    color: Color,
  ): void {
    r.symbols.ImageDrawTextW(dst, cstr(text), posX, posY, fontSize, color);
  }
  static imageDrawTextEx(
    dst: Image,
    font: Font,
    text: string,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r.symbols.ImageDrawTextExW(
      dst,
      font,
      cstr(text),
      position.x,
      position.y,
      fontSize,
      f2i(spacing),
      tint,
    );
  }

  // --- Texture extensions ---

  static loadTextureFromImage(image: Image): Texture2D {
    r.symbols.LoadTextureFromImageW(this._texOutId, this._texOutW, this._texOutH, image);
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static loadTextureCubemap(image: Image, layout: number): Texture2D {
    r.symbols.LoadTextureCubemapW(this._texOutId, this._texOutW, this._texOutH, image, layout);
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static updateTexture(texture: Texture2D, pixels: Uint8Array): void {
    r.symbols.UpdateTextureW(texture.id, texture.width, texture.height, pixels);
  }

  static updateTextureRec(texture: Texture2D, rec: Rectangle, pixels: Uint8Array): void {
    r.symbols.UpdateTextureRecW(
      texture.id,
      texture.width,
      texture.height,
      rec.x,
      rec.y,
      rec.width,
      rec.height,
      pixels,
    );
  }

  static drawTextureNPatch(
    texture: Texture2D,
    nPatchInfo: {
      source: Rectangle;
      left: number;
      top: number;
      right: number;
      bottom: number;
      layout: number;
    },
    dest: Rectangle,
    origin: Vec2,
    rotation: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextureNPatchW(
      texture.id,
      texture.width,
      texture.height,
      nPatchInfo.source.x,
      nPatchInfo.source.y,
      nPatchInfo.source.width,
      nPatchInfo.source.height,
      nPatchInfo.left,
      nPatchInfo.top,
      nPatchInfo.right,
      nPatchInfo.bottom,
      nPatchInfo.layout,
      dest.x,
      dest.y,
      dest.width,
      dest.height,
      origin.x,
      origin.y,
      f2i(rotation),
      tint,
    );
  }

  static getPixelColor(srcPtr: number, format: number): Color {
    return r.symbols.GetPixelColorW(srcPtr as any, format);
  }
  static setPixelColor(dstPtr: number, color: Color, format: number): void {
    r.symbols.SetPixelColorW(dstPtr as any, color, format);
  }

  static drawBoundingBox(box: BoundingBox, color: Color): void {
    r.symbols.DrawBoundingBoxW(
      f2i(box.min.x),
      f2i(box.min.y),
      f2i(box.min.z),
      f2i(box.max.x),
      f2i(box.max.y),
      f2i(box.max.z),
      color,
    );
  }

  static drawBillboard(
    camera: Camera3D,
    texture: Texture2D,
    position: Vec3,
    scale: number,
    tint: Color,
  ): void {
    r.symbols.DrawBillboardW(
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(scale),
      tint,
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
    r.symbols.DrawBillboardRecW(
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(size.x),
      f2i(size.y),
      tint,
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
    r.symbols.DrawBillboardProW(
      f2i(camera.position.x),
      f2i(camera.position.y),
      f2i(camera.position.z),
      f2i(camera.target.x),
      f2i(camera.target.y),
      f2i(camera.target.z),
      f2i(camera.up.x),
      f2i(camera.up.y),
      f2i(camera.up.z),
      f2i(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      f2i(position.x),
      f2i(position.y),
      f2i(position.z),
      f2i(up.x),
      f2i(up.y),
      f2i(up.z),
      f2i(size.x),
      f2i(size.y),
      f2i(origin.x),
      f2i(origin.y),
      f2i(rotation),
      tint,
    );
  }

  // --- Model from mesh ---

  static loadModelFromMesh(mesh: Mesh): Model {
    return r.symbols.LoadModelFromMeshW(mesh);
  }

  // --- Mesh management ---

  static unloadMesh(mesh: Mesh): void {
    r.symbols.UnloadMeshW(mesh);
  }
  static uploadMesh(mesh: Mesh, dynamic: boolean): void {
    r.symbols.UploadMeshW(mesh, dynamic);
  }

  static getMeshBoundingBox(mesh: Mesh): BoundingBox {
    r.symbols.GetMeshBoundingBoxW(this._bbMin, this._bbMax, mesh);
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static genMeshTangents(mesh: Mesh): void {
    r.symbols.GenMeshTangentsW(mesh);
  }
  static exportMesh(mesh: Mesh, fileName: string): boolean {
    return r.symbols.ExportMeshW(mesh, cstr(fileName));
  }
  static exportMeshAsCode(mesh: Mesh, fileName: string): boolean {
    return r.symbols.ExportMeshAsCodeW(mesh, cstr(fileName));
  }

  // --- Mesh generation ---

  static genMeshPoly(sides: number, radius: number): Mesh {
    return r.symbols.GenMeshPolyW(sides, f2i(radius));
  }
  static genMeshPlane(width: number, length: number, resX: number, resZ: number): Mesh {
    return r.symbols.GenMeshPlaneW(f2i(width), f2i(length), resX, resZ);
  }
  static genMeshCube(width: number, height: number, length: number): Mesh {
    return r.symbols.GenMeshCubeW(f2i(width), f2i(height), f2i(length));
  }
  static genMeshSphere(radius: number, rings: number, slices: number): Mesh {
    return r.symbols.GenMeshSphereW(f2i(radius), rings, slices);
  }
  static genMeshHemiSphere(radius: number, rings: number, slices: number): Mesh {
    return r.symbols.GenMeshHemiSphereW(f2i(radius), rings, slices);
  }
  static genMeshCylinder(radius: number, height: number, slices: number): Mesh {
    return r.symbols.GenMeshCylinderW(f2i(radius), f2i(height), slices);
  }
  static genMeshCone(radius: number, height: number, slices: number): Mesh {
    return r.symbols.GenMeshConeW(f2i(radius), f2i(height), slices);
  }
  static genMeshTorus(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r.symbols.GenMeshTorusW(f2i(radius), f2i(size), radSeg, sides);
  }
  static genMeshKnot(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r.symbols.GenMeshKnotW(f2i(radius), f2i(size), radSeg, sides);
  }
  static genMeshHeightmap(heightmap: Image, size: Vec3): Mesh {
    return r.symbols.GenMeshHeightmapW(heightmap, f2i(size.x), f2i(size.y), f2i(size.z));
  }
  static genMeshCubicmap(cubicmap: Image, cubeSize: Vec3): Mesh {
    return r.symbols.GenMeshCubicmapW(cubicmap, f2i(cubeSize.x), f2i(cubeSize.y), f2i(cubeSize.z));
  }

  // --- Material management ---

  static loadMaterialDefault(): Material {
    return r.symbols.LoadMaterialDefaultW();
  }
  static isMaterialValid(material: Material): boolean {
    return r.symbols.IsMaterialValidW(material);
  }
  static unloadMaterial(material: Material): void {
    r.symbols.UnloadMaterialW(material);
  }
  static setMaterialTexture(material: Material, mapType: number, texture: Texture2D): void {
    r.symbols.SetMaterialTextureW(material, mapType, texture.id, texture.width, texture.height);
  }
  static setModelMeshMaterial(model: Model, meshId: number, materialId: number): void {
    r.symbols.SetModelMeshMaterialW(model, meshId, materialId);
  }

  // --- Model animations ---
  
  static loadModelAnimations(fileName: string): { startSlot: number; count: number } {
    r.symbols.LoadModelAnimationsW(this._animSlotStart, this._animCount, cstr(fileName));
    return { startSlot: this._animSlotStart[0]!, count: this._animCount[0]! };
  }

  static updateModelAnimation(model: Model, anim: ModelAnimation, frame: number): void {
    r.symbols.UpdateModelAnimationW(model, anim, f2i(frame));
  }
  static updateModelAnimationEx(
    model: Model,
    animA: ModelAnimation,
    frameA: number,
    animB: ModelAnimation,
    frameB: number,
    blend: number,
  ): void {
    r.symbols.UpdateModelAnimationExW(model, animA, f2i(frameA), animB, f2i(frameB), f2i(blend));
  }
  static unloadModelAnimations(startSlot: number, count: number): void {
    r.symbols.UnloadModelAnimationsW(startSlot, count);
  }
  static isModelAnimationValid(model: Model, anim: ModelAnimation): boolean {
    return r.symbols.IsModelAnimationValidW(model, anim);
  }

  // --- Collision detection ---

  static checkCollisionSpheres(
    center1: Vec3,
    radius1: number,
    center2: Vec3,
    radius2: number,
  ): boolean {
    return r.symbols.CheckCollisionSpheresW(
      f2i(center1.x),
      f2i(center1.y),
      f2i(center1.z),
      f2i(radius1),
      f2i(center2.x),
      f2i(center2.y),
      f2i(center2.z),
      f2i(radius2),
    );
  }

  static checkCollisionBoxes(box1: BoundingBox, box2: BoundingBox): boolean {
    return r.symbols.CheckCollisionBoxesW(
      f2i(box1.min.x),
      f2i(box1.min.y),
      f2i(box1.min.z),
      f2i(box1.max.x),
      f2i(box1.max.y),
      f2i(box1.max.z),
      f2i(box2.min.x),
      f2i(box2.min.y),
      f2i(box2.min.z),
      f2i(box2.max.x),
      f2i(box2.max.y),
      f2i(box2.max.z),
    );
  }

  static checkCollisionBoxSphere(box: BoundingBox, center: Vec3, radius: number): boolean {
    return r.symbols.CheckCollisionBoxSphereW(
      f2i(box.min.x),
      f2i(box.min.y),
      f2i(box.min.z),
      f2i(box.max.x),
      f2i(box.max.y),
      f2i(box.max.z),
      f2i(center.x),
      f2i(center.y),
      f2i(center.z),
      f2i(radius),
    );
  }
  static getRayCollisionSphere(ray: Ray, center: Vec3, radius: number): RayCollision {
    r.symbols.GetRayCollisionSphereW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      f2i(center.x),
      f2i(center.y),
      f2i(center.z),
      f2i(radius),
    );
    return {
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision {
    r.symbols.GetRayCollisionBoxW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      f2i(box.min.x),
      f2i(box.min.y),
      f2i(box.min.z),
      f2i(box.max.x),
      f2i(box.max.y),
      f2i(box.max.z),
    );
    return {
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionTriangle(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3): RayCollision {
    r.symbols.GetRayCollisionTriangleW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      f2i(p1.x),
      f2i(p1.y),
      f2i(p1.z),
      f2i(p2.x),
      f2i(p2.y),
      f2i(p2.z),
      f2i(p3.x),
      f2i(p3.y),
      f2i(p3.z),
    );
    return {
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionQuad(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3): RayCollision {
    r.symbols.GetRayCollisionQuadW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      f2i(p1.x),
      f2i(p1.y),
      f2i(p1.z),
      f2i(p2.x),
      f2i(p2.y),
      f2i(p2.z),
      f2i(p3.x),
      f2i(p3.y),
      f2i(p3.z),
      f2i(p4.x),
      f2i(p4.y),
      f2i(p4.z),
    );
    return {
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  // --- Audio device ---

  static initAudioDevice(): void {
    r.symbols.InitAudioDeviceW();
  }
  static closeAudioDevice(): void {
    r.symbols.CloseAudioDeviceW();
  }
  static isAudioDeviceReady(): boolean {
    return r.symbols.IsAudioDeviceReadyW();
  }
  static setMasterVolume(volume: number): void {
    r.symbols.SetMasterVolumeW(volume);
  }
  static getMasterVolume(): number {
    return r.symbols.GetMasterVolumeW();
  }

  // --- Wave ---

  static loadWave(fileName: string): Wave {
    return r.symbols.LoadWaveW(cstr(fileName));
  }
  static loadWaveFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Wave {
    return r.symbols.LoadWaveFromMemoryW(cstr(fileType), fileData, dataSize);
  }
  static isWaveValid(wave: Wave): boolean {
    return r.symbols.IsWaveValidW(wave);
  }
  static unloadWave(wave: Wave): void {
    r.symbols.UnloadWaveW(wave);
  }
  static exportWave(wave: Wave, fileName: string): boolean {
    return r.symbols.ExportWaveW(wave, cstr(fileName));
  }
  static exportWaveAsCode(wave: Wave, fileName: string): boolean {
    return r.symbols.ExportWaveAsCodeW(wave, cstr(fileName));
  }
  static waveCopy(wave: Wave): Wave {
    return r.symbols.WaveCopyW(wave);
  }
  static waveCrop(wave: Wave, initFrame: number, finalFrame: number): void {
    r.symbols.WaveCropW(wave, initFrame, finalFrame);
  }
  static waveFormat(wave: Wave, sampleRate: number, sampleSize: number, channels: number): void {
    r.symbols.WaveFormatW(wave, sampleRate, sampleSize, channels);
  }

  // --- Sound ---

  static loadSound(fileName: string): Sound {
    return r.symbols.LoadSoundW(cstr(fileName));
  }
  static loadSoundFromWave(wave: Wave): Sound {
    return r.symbols.LoadSoundFromWaveW(wave);
  }
  static loadSoundAlias(source: Sound): Sound {
    return r.symbols.LoadSoundAliasW(source);
  }
  static isSoundValid(sound: Sound): boolean {
    return r.symbols.IsSoundValidW(sound);
  }
  static unloadSound(sound: Sound): void {
    r.symbols.UnloadSoundW(sound);
  }
  static unloadSoundAlias(alias: Sound): void {
    r.symbols.UnloadSoundAliasW(alias);
  }
  static playSound(sound: Sound): void {
    r.symbols.PlaySoundW(sound);
  }
  static stopSound(sound: Sound): void {
    r.symbols.StopSoundW(sound);
  }
  static pauseSound(sound: Sound): void {
    r.symbols.PauseSoundW(sound);
  }
  static resumeSound(sound: Sound): void {
    r.symbols.ResumeSoundW(sound);
  }
  static isSoundPlaying(sound: Sound): boolean {
    return r.symbols.IsSoundPlayingW(sound);
  }
  static setSoundVolume(sound: Sound, volume: number): void {
    r.symbols.SetSoundVolumeW(sound, volume);
  }
  static setSoundPitch(sound: Sound, pitch: number): void {
    r.symbols.SetSoundPitchW(sound, pitch);
  }
  static setSoundPan(sound: Sound, pan: number): void {
    r.symbols.SetSoundPanW(sound, pan);
  }

  // --- Music ---

  static loadMusicStream(fileName: string): Music {
    return r.symbols.LoadMusicStreamW(cstr(fileName));
  }
  static loadMusicStreamFromMemory(fileType: string, data: Uint8Array, dataSize: number): Music {
    return r.symbols.LoadMusicStreamFromMemoryW(cstr(fileType), data, dataSize);
  }
  static isMusicValid(music: Music): boolean {
    return r.symbols.IsMusicValidW(music);
  }
  static unloadMusicStream(music: Music): void {
    r.symbols.UnloadMusicStreamW(music);
  }
  static playMusicStream(music: Music): void {
    r.symbols.PlayMusicStreamW(music);
  }
  static isMusicStreamPlaying(music: Music): boolean {
    return r.symbols.IsMusicStreamPlayingW(music);
  }
  static updateMusicStream(music: Music): void {
    r.symbols.UpdateMusicStreamW(music);
  }
  static stopMusicStream(music: Music): void {
    r.symbols.StopMusicStreamW(music);
  }
  static pauseMusicStream(music: Music): void {
    r.symbols.PauseMusicStreamW(music);
  }
  static resumeMusicStream(music: Music): void {
    r.symbols.ResumeMusicStreamW(music);
  }
  static seekMusicStream(music: Music, position: number): void {
    r.symbols.SeekMusicStreamW(music, position);
  }
  static setMusicVolume(music: Music, volume: number): void {
    r.symbols.SetMusicVolumeW(music, volume);
  }
  static setMusicPitch(music: Music, pitch: number): void {
    r.symbols.SetMusicPitchW(music, pitch);
  }
  static setMusicPan(music: Music, pan: number): void {
    r.symbols.SetMusicPanW(music, pan);
  }
  static getMusicTimeLength(music: Music): number {
    return r.symbols.GetMusicTimeLengthW(music);
  }
  static getMusicTimePlayed(music: Music): number {
    return r.symbols.GetMusicTimePlayedW(music);
  }

  // --- AudioStream ---

  static loadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStream {
    return r.symbols.LoadAudioStreamW(sampleRate, sampleSize, channels);
  }
  static isAudioStreamValid(stream: AudioStream): boolean {
    return r.symbols.IsAudioStreamValidW(stream);
  }
  static unloadAudioStream(stream: AudioStream): void {
    r.symbols.UnloadAudioStreamW(stream);
  }
  static isAudioStreamProcessed(stream: AudioStream): boolean {
    return r.symbols.IsAudioStreamProcessedW(stream);
  }
  static playAudioStream(stream: AudioStream): void {
    r.symbols.PlayAudioStreamW(stream);
  }
  static pauseAudioStream(stream: AudioStream): void {
    r.symbols.PauseAudioStreamW(stream);
  }
  static resumeAudioStream(stream: AudioStream): void {
    r.symbols.ResumeAudioStreamW(stream);
  }
  static isAudioStreamPlaying(stream: AudioStream): boolean {
    return r.symbols.IsAudioStreamPlayingW(stream);
  }
  static stopAudioStream(stream: AudioStream): void {
    r.symbols.StopAudioStreamW(stream);
  }
  static setAudioStreamVolume(stream: AudioStream, volume: number): void {
    r.symbols.SetAudioStreamVolumeW(stream, volume);
  }
  static setAudioStreamPitch(stream: AudioStream, pitch: number): void {
    r.symbols.SetAudioStreamPitchW(stream, pitch);
  }
  static setAudioStreamPan(stream: AudioStream, pan: number): void {
    r.symbols.SetAudioStreamPanW(stream, pan);
  }
  static setAudioStreamBufferSizeDefault(size: number): void {
    r.symbols.SetAudioStreamBufferSizeDefaultW(size);
  }

  // --- Font/Text remaining ---

  static loadFontFromImage(image: Image, key: Color, firstChar: number): Font {
    return r.symbols.LoadFontFromImageW(image, key, firstChar);
  }
  static loadFontFromMemory(
    fileType: string,
    fileData: Uint8Array,
    dataSize: number,
    fontSize: number,
  ): Font {
    return r.symbols.LoadFontFromMemoryW(cstr(fileType), fileData, dataSize, fontSize);
  }
  static exportFontAsCode(font: Font, fileName: string): boolean {
    return r.symbols.ExportFontAsCodeW(font, cstr(fileName));
  }
  static drawTextCodepoint(
    font: Font,
    codepoint: number,
    position: Vec2,
    fontSize: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextCodepointW(font, codepoint, position.x, position.y, f2i(fontSize), tint);
  }
  static drawTextCodepoints(
    font: Font,
    codepoints: Int32Array,
    count: number,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r.symbols.DrawTextCodepointsW(
      font,
      codepoints,
      count,
      position.x,
      position.y,
      f2i(fontSize),
      f2i(spacing),
      tint,
    );
  }
  static getGlyphIndex(font: Font, codepoint: number): number {
    return r.symbols.GetGlyphIndexW(font, codepoint);
  }

  private static _glyphValue = new Int32Array(1);
  private static _glyphOffsetX = new Int32Array(1);
  private static _glyphOffsetY = new Int32Array(1);
  private static _glyphAdvanceX = new Int32Array(1);
  private static _glyphImageSlot = new Int32Array(1);

  static getGlyphInfo(font: Font, codepoint: number): GlyphInfo {
    r.symbols.GetGlyphInfoW(
      this._glyphValue,
      this._glyphOffsetX,
      this._glyphOffsetY,
      this._glyphAdvanceX,
      this._glyphImageSlot,
      font,
      codepoint,
    );
    return {
      value: this._glyphValue[0]!,
      offsetX: this._glyphOffsetX[0]!,
      offsetY: this._glyphOffsetY[0]!,
      advanceX: this._glyphAdvanceX[0]!,
      image: this._glyphImageSlot[0]!,
    };
  }

  static getGlyphAtlasRec(font: Font, codepoint: number): Rectangle {
    r.symbols.GetGlyphAtlasRecW(_recBuf, font, codepoint);
    return { x: _recBuf[0]!, y: _recBuf[1]!, width: _recBuf[2]!, height: _recBuf[3]! };
  }

  private static _cpSize = new Int32Array(1);

  static getCodepoint(text: string): { codepoint: number; size: number } {
    const cp = r.symbols.GetCodepointW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointNext(text: string): { codepoint: number; size: number } {
    const cp = r.symbols.GetCodepointNextW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointPrevious(text: string): { codepoint: number; size: number } {
    const cp = r.symbols.GetCodepointPreviousW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointCount(text: string): number {
    return r.symbols.GetCodepointCountW(cstr(text));
  }
  static textIsEqual(text1: string, text2: string): boolean {
    return r.symbols.TextIsEqualW(cstr(text1), cstr(text2));
  }
  static textLength(text: string): number {
    return r.symbols.TextLengthW(cstr(text));
  }
  static textToInteger(text: string): number {
    return r.symbols.TextToIntegerW(cstr(text));
  }
  static textToFloat(text: string): number {
    return r.symbols.TextToFloatW(cstr(text));
  }
  static textFindIndex(text: string, find: string): number {
    return r.symbols.TextFindIndexW(cstr(text), cstr(find));
  }

  static imageToPOT(image: Image, fill: number): void {
    r.symbols.ImageToPOTW(image, fill);
  }

  static imageKernelConvolution(image: Image, kernel: Float32Array): void {
    r.symbols.ImageKernelConvolutionW(image, kernel, kernel.length);
  }

  static unloadImageColors(ptr: number): void {
    r.symbols.UnloadImageColorsW(ptr as any);
  }
  static unloadImagePalette(ptr: number): void {
    r.symbols.UnloadImagePaletteW(ptr as any);
  }

  static loadImageAnimFromMemory(
    fileType: string,
    data: Buffer | Uint8Array,
    frames?: Int32Array,
  ): Image {
    return r.symbols.LoadImageAnimFromMemoryW(
      cstr(fileType),
      data,
      data.length,
      frames ?? new Int32Array(1),
    );
  }

  static unloadFontData(ptr: number, glyphCount: number): void {
    r.symbols.UnloadFontDataW(ptr as any, glyphCount);
  }
  static unloadUTF8(ptr: number): void {
    r.symbols.UnloadUTF8W(ptr as any);
  }
  static unloadCodepoints(ptr: number): void {
    r.symbols.UnloadCodepointsW(ptr as any);
  }

  static textCopy(dst: Uint8Array, src: string): number {
    return r.symbols.TextCopyW(dst, cstr(src));
  }

  private static _textAppendPos = new Int32Array(1);

  static textAppend(text: Uint8Array, append: string, position: number): number {
    this._textAppendPos[0] = position;
    r.symbols.TextAppendW(text, cstr(append), this._textAppendPos);
    return this._textAppendPos[0]!;
  }

  static updateMeshBuffer(
    mesh: Mesh,
    index: number,
    data: Buffer | Uint8Array,
    offset: number,
  ): void {
    r.symbols.UpdateMeshBufferW(mesh, index, data, data.length, offset);
  }

  static getRayCollisionMesh(
    ray: Ray,
    mesh: Mesh,
    transform: { m: Float32Array } | Float32Array,
  ): RayCollision {
    const m = transform instanceof Float32Array ? transform : transform.m;
    r.symbols.GetRayCollisionMeshW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      f2i(ray.position.x),
      f2i(ray.position.y),
      f2i(ray.position.z),
      f2i(ray.direction.x),
      f2i(ray.direction.y),
      f2i(ray.direction.z),
      mesh,
      f2i(m[0]!),
      f2i(m[4]!),
      f2i(m[8]!),
      f2i(m[12]!),
      f2i(m[1]!),
      f2i(m[5]!),
      f2i(m[9]!),
      f2i(m[13]!),
      f2i(m[2]!),
      f2i(m[6]!),
      f2i(m[10]!),
      f2i(m[14]!),
      f2i(m[3]!),
      f2i(m[7]!),
      f2i(m[11]!),
      f2i(m[15]!),
    );
    return {
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static unloadRandomSequence(ptr: number): void {
    r.symbols.UnloadRandomSequenceW(ptr as any);
  }
  static memFree(ptr: number): void {
    r.symbols.MemFreeW(ptr as any);
  }
  static unloadFileData(ptr: number): void {
    r.symbols.UnloadFileDataW(ptr as any);
  }
  static saveFileData(fileName: string, data: Uint8Array | Buffer): boolean {
    return r.symbols.SaveFileDataW(cstr(fileName), data, data.length);
  }
  static exportDataAsCode(data: Uint8Array | Buffer, fileName: string): boolean {
    return r.symbols.ExportDataAsCodeW(data, data.length, cstr(fileName));
  }
  static loadWaveSamples(wave: Wave): number {
    return r.symbols.LoadWaveSamplesW(wave) as number;
  }
  static unloadWaveSamples(ptr: number): void {
    r.symbols.UnloadWaveSamplesW(ptr as any);
  }
  static setWindowIcons(images: number, count: number): void {
    r.symbols.SetWindowIconsW(images as any, count);
  }
}
