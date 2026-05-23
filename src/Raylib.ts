import { getSymbols } from './symbols';
export { configure } from './symbols';
export type { RaylibConfig } from './symbols';

const r = () => getSymbols();
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
} from './types';
import { cstr, f, i } from './utils';
import { CString } from 'bun:ffi';
import type { Color } from './types';

export class Raylib {
  private static _rcHit = new Uint8Array(1);
  private static _rcDist = new Float32Array(1);
  private static _rcPt = new Float32Array(3);
  private static _rcNorm = new Float32Array(3);
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
  private static _colPtBuf = new Float32Array(2);
  private static _recBuf = new Float32Array(4);
  private static _vec2Buf = new Float32Array(2);

  /** Initialize window and OpenGL context */
  static initWindow(width: number, height: number, title: string): void {
    r().symbols.InitWindowW(i(width), i(height), cstr(title));
  }

  /** Close window and unload OpenGL context */
  static closeWindow(): void {
    r().symbols.CloseWindowW();
  }

  /** Check if application should close (KEY_ESCAPE pressed or window close button) */
  static windowShouldClose(): boolean {
    return r().symbols.WindowShouldCloseW();
  }

  /** Setup canvas (framebuffer) to start drawing */
  static beginDrawing(): void {
    r().symbols.BeginDrawingW();
  }

  /** End canvas drawing and swap buffers (double buffering) */
  static endDrawing(): void {
    r().symbols.EndDrawingW();
  }

  /** Begin 2D mode with custom camera */
  static beginMode2D(camera: Camera2D): void {
    r().symbols.BeginMode2DW(
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
  }

  /** Ends 2D mode with custom camera */
  static endMode2D(): void {
    r().symbols.EndMode2DW();
  }

  /** Begin 3D mode with custom camera */
  static beginMode3D(camera: Camera3D): void {
    r().symbols.BeginMode3DW(
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
    );
  }

  /** Ends 3D mode with custom camera */
  static endMode3D(): void {
    r().symbols.EndMode3DW();
  }

  /** Set background color (used before drawing) */
  static clearBackground(col: Color): void {
    r().symbols.ClearBackgroundW(i(col));
  }

  /** Set target FPS (frames per second) */
  static setTargetFPS(fps: number): void {
    r().symbols.SetTargetFPSW(i(fps));
  }

  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime(): number {
    return r().symbols.GetFrameTimeW();
  }

  /** Draw a color-filled rectangle */
  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r().symbols.DrawRectangleW(i(x), i(y), i(width), i(height), i(col));
  }

  /** Draw text (using default font) */
  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r().symbols.DrawTextW(cstr(text), i(x), i(y), i(fontSize), i(col));
  }

  /** Draw a pixel */
  static drawPixel(x: number, y: number, col: Color): void {
    r().symbols.DrawPixelW(i(x), i(y), i(col));
  }

  /** Draw a pixel (using vector position) */
  static drawPixelV(position: Vec2, col: Color): void {
    r().symbols.DrawPixelVW(f(position.x), f(position.y), i(col));
  }

  /** Draw a line */
  static drawLine(startX: number, startY: number, endX: number, endY: number, col: Color): void {
    r().symbols.DrawLineW(i(startX), i(startY), i(endX), i(endY), i(col));
  }

  /** Draw a line (using vector positions) */
  static drawLineV(startPos: Vec2, endPos: Vec2, col: Color): void {
    r().symbols.DrawLineVW(f(startPos.x), f(startPos.y), f(endPos.x), f(endPos.y), i(col));
  }

  /** Draw a line with defined thickness */
  static drawLineEx(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r().symbols.DrawLineExW(f(startPos.x), f(startPos.y), f(endPos.x), f(endPos.y), f(thick), i(col));
  }

  /** Draw lines sequence as a strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawLineStrip(points: Float32Array, col: Color): void {
    r().symbols.DrawLineStripW(points, i(points.length / 2), i(col));
  }

  /** Draw line segment with Bezier easing */
  static drawLineBezier(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r().symbols.DrawLineBezierW(
      f(startPos.x),
      f(startPos.y),
      f(endPos.x),
      f(endPos.y),
      f(thick),
      i(col),
    );
  }

  /** Draw a color-filled circle */
  static drawCircle(centerX: number, centerY: number, radius: number, col: Color): void {
    r().symbols.DrawCircleW(i(centerX), i(centerY), f(radius), i(col));
  }

  /** Draw a color-filled circle (using vector center) */
  static drawCircleV(center: Vec2, radius: number, col: Color): void {
    r().symbols.DrawCircleVW(i(center.x), i(center.y), f(radius), i(col));
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
    r().symbols.DrawCircleSectorW(
      f(center.x),
      f(center.y),
      f(radius),
      f(startAngle),
      f(endAngle),
      i(segments),
      i(col),
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
    r().symbols.DrawCircleSectorLinesW(
      f(center.x),
      f(center.y),
      f(radius),
      f(startAngle),
      f(endAngle),
      i(segments),
      i(col),
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
    r().symbols.DrawCircleGradientW(f(centerX), f(centerY), f(radius), i(inner), i(outer));
  }

  /** Draw circle outline */
  static drawCircleLines(centerX: number, centerY: number, radius: number, col: Color): void {
    r().symbols.DrawCircleLinesW(i(centerX), i(centerY), f(radius), i(col));
  }

  /** Draw circle outline (using vector center) */
  static drawCircleLinesV(center: Vec2, radius: number, col: Color): void {
    r().symbols.DrawCircleLinesVW(f(center.x), f(center.y), f(radius), i(col));
  }

  /** Draw a color-filled ellipse */
  static drawEllipse(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r().symbols.DrawEllipseW(i(centerX), i(centerY), f(radiusH), f(radiusV), i(col));
  }

  /** Draw ellipse outline */
  static drawEllipseLines(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r().symbols.DrawEllipseLinesW(i(centerX), i(centerY), f(radiusH), f(radiusV), i(col));
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
    r().symbols.DrawRingW(
      f(center.x),
      f(center.y),
      f(innerRadius),
      f(outerRadius),
      f(startAngle),
      f(endAngle),
      i(segments),
      i(col),
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
    r().symbols.DrawRingLinesW(
      f(center.x),
      f(center.y),
      f(innerRadius),
      f(outerRadius),
      f(startAngle),
      f(endAngle),
      i(segments),
      i(col),
    );
  }

  /** Draw a color-filled rectangle (using vector position and size) */
  static drawRectangleV(pos: Vec2, size: Vec2, col: Color): void {
    r().symbols.DrawRectangleVW(f(pos.x), f(pos.y), f(size.x), f(size.y), i(col));
  }

  static drawRectangleRec(rec: Rectangle, col: Color): void {
    r().symbols.DrawRectangleRecW(f(rec.x), f(rec.y), f(rec.width), f(rec.height), i(col));
  }

  /** Draw a color-filled rectangle with pro parameters (rotation and origin) */
  static drawRectanglePro(rec: Rectangle, origin: Vec2, rotation: number, col: Color): void {
    r().symbols.DrawRectangleProW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      f(origin.x),
      f(origin.y),
      f(rotation),
      i(col),
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
    r().symbols.DrawRectangleGradientVW(i(x), i(y), i(width), i(height), i(top), i(bottom));
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
    r().symbols.DrawRectangleGradientHW(i(x), i(y), i(width), i(height), i(left), i(right));
  }

  /** Draw a gradient-filled rectangle with custom gradient colors for each corner */
  static drawRectangleGradientEx(
    rec: Rectangle,
    topLeft: Color,
    bottomLeft: Color,
    topRight: Color,
    bottomRight: Color,
  ): void {
    r().symbols.DrawRectangleGradientExW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      i(topLeft),
      i(bottomLeft),
      i(topRight),
      i(bottomRight),
    );
  }

  /** Draw rectangle outline */
  static drawRectangleLines(x: number, y: number, width: number, height: number, col: Color): void {
    r().symbols.DrawRectangleLinesW(i(x), i(y), i(width), i(height), i(col));
  }

  /** Draw rectangle outline with extended parameters (custom line thickness) */
  static drawRectangleLinesEx(rec: Rectangle, lineThick: number, col: Color): void {
    r().symbols.DrawRectangleLinesExW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      f(lineThick),
      i(col),
    );
  }

  /** Draw rectangle with rounded edges */
  static drawRectangleRounded(
    rec: Rectangle,
    roundness: number,
    segments: number,
    col: Color,
  ): void {
    r().symbols.DrawRectangleRoundedW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      f(roundness),
      i(segments),
      i(col),
    );
  }

  /** Draw rectangle with rounded edges outline */
  static drawRectangleRoundedLines(
    rec: Rectangle,
    roundness: number,
    segments: number,
    col: Color,
  ): void {
    r().symbols.DrawRectangleRoundedLinesW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      f(roundness),
      i(segments),
      i(col),
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
    r().symbols.DrawRectangleRoundedLinesExW(
      f(rec.x),
      f(rec.y),
      f(rec.width),
      f(rec.height),
      f(roundness),
      i(segments),
      f(lineThick),
      i(col),
    );
  }

  /** Draw a color-filled triangle */
  static drawTriangle(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r().symbols.DrawTriangleW(f(v1.x), f(v1.y), f(v2.x), f(v2.y), f(v3.x), f(v3.y), i(col));
  }

  /** Draw triangle outline */
  static drawTriangleLines(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r().symbols.DrawTriangleLinesW(f(v1.x), f(v1.y), f(v2.x), f(v2.y), f(v3.x), f(v3.y), i(col));
  }

  /** Draw a triangle fan. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleFan(points: Float32Array, col: Color): void {
    r().symbols.DrawTriangleFanW(points, i(points.length / 2), i(col));
  }

  /** Draw a triangle strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleStrip(points: Float32Array, col: Color): void {
    r().symbols.DrawTriangleStripW(points, i(points.length / 2), i(col));
  }

  /** Draw a regular polygon (color-filled) */
  static drawPoly(center: Vec2, sides: number, radius: number, rotation: number, col: Color): void {
    r().symbols.DrawPolyW(f(center.x), f(center.y), i(sides), f(radius), f(rotation), i(col));
  }

  /** Draw a regular polygon outline */
  static drawPolyLines(
    center: Vec2,
    sides: number,
    radius: number,
    rotation: number,
    col: Color,
  ): void {
    r().symbols.DrawPolyLinesW(f(center.x), f(center.y), i(sides), f(radius), f(rotation), i(col));
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
    r().symbols.DrawPolyLinesExW(
      f(center.x),
      f(center.y),
      i(sides),
      f(radius),
      f(rotation),
      f(lineThick),
      i(col),
    );
  }

  /**
   * Draw spline: Linear. Minimum 2 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineLinear(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineLinearW(points, i(points.length / 2), f(thick), i(col));
  }

  /**
   * Draw spline: B-Spline. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBasis(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBasisW(points, i(points.length / 2), f(thick), i(col));
  }

  /**
   * Draw spline: Catmull-Rom. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineCatmullRom(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineCatmullRomW(points, i(points.length / 2), f(thick), i(col));
  }

  /**
   * Draw spline: Quadratic Bezier. Minimum 3 points (1 control point).
   * Points layout: [p1, c2, p3, c4, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierQuadratic(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBezierQuadraticW(points, i(points.length / 2), f(thick), i(col));
  }

  /**
   * Draw spline: Cubic Bezier. Minimum 4 points (2 control points).
   * Points layout: [p1, c2, c3, p4, c5, c6, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierCubic(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBezierCubicW(points, i(points.length / 2), f(thick), i(col));
  }

  /** Draw spline segment: Linear, 2 points */
  static drawSplineSegmentLinear(p1: Vec2, p2: Vec2, thick: number, col: Color): void {
    r().symbols.DrawSplineSegmentLinearW(f(p1.x), f(p1.y), f(p2.x), f(p2.y), f(thick), i(col));
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
    r().symbols.DrawSplineSegmentBasisW(
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      f(p3.x),
      f(p3.y),
      f(p4.x),
      f(p4.y),
      f(thick),
      i(col),
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
    r().symbols.DrawSplineSegmentCatmullRomW(
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      f(p3.x),
      f(p3.y),
      f(p4.x),
      f(p4.y),
      f(thick),
      i(col),
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
    r().symbols.DrawSplineSegmentBezierQuadraticW(
      f(p1.x),
      f(p1.y),
      f(c2.x),
      f(c2.y),
      f(p3.x),
      f(p3.y),
      f(thick),
      i(col),
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
    r().symbols.DrawSplineSegmentBezierCubicW(
      f(p1.x),
      f(p1.y),
      f(c2.x),
      f(c2.y),
      f(c3.x),
      f(c3.y),
      f(p4.x),
      f(p4.y),
      f(thick),
      i(col),
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
    r().symbols.GetSplinePointLinearW(
      this._vec2Buf,
      f(startPos.x),
      f(startPos.y),
      f(endPos.x),
      f(endPos.y),
      f(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
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
    r().symbols.GetSplinePointBasisW(
      this._vec2Buf,
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      f(p3.x),
      f(p3.y),
      f(p4.x),
      f(p4.y),
      f(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
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
    r().symbols.GetSplinePointCatmullRomW(
      this._vec2Buf,
      f(p1.x),
      f(p1.y),
      f(p2.x),
      f(p2.y),
      f(p3.x),
      f(p3.y),
      f(p4.x),
      f(p4.y),
      f(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
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
    r().symbols.GetSplinePointBezierQuadW(
      this._vec2Buf,
      f(p1.x),
      f(p1.y),
      f(c2.x),
      f(c2.y),
      f(p3.x),
      f(p3.y),
      f(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
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
    r().symbols.GetSplinePointBezierCubicW(
      this._vec2Buf,
      f(p1.x),
      f(p1.y),
      f(c2.x),
      f(c2.y),
      f(c3.x),
      f(c3.y),
      f(p4.x),
      f(p4.y),
      f(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

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
    return r().symbols.CheckCollisionPointPolyW(f(point.x), f(point.y), points, i(points.length / 2));
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
      this._colPtBuf,
      f(startPos1.x),
      f(startPos1.y),
      f(endPos1.x),
      f(endPos1.y),
      f(startPos2.x),
      f(startPos2.y),
      f(endPos2.x),
      f(endPos2.y),
    );
    return { collides, collisionPoint: { x: this._colPtBuf[0]!, y: this._colPtBuf[1]! } };
  }

  /** Get collision rectangle for two rectangles collision. Returns null if no overlap */
  static getCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle {
    r().symbols.GetCollisionRecW(
      this._recBuf,
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
      x: this._recBuf[0]!,
      y: this._recBuf[1]!,
      width: this._recBuf[2]!,
      height: this._recBuf[3]!,
    };
  }

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
    r().symbols.DrawTriangleStrip3DW(points, i(points.length / 3), i(col));
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
    r().symbols.DrawGridW(i(slices), f(spacing));
  }

  // --- Window state ---

  static isWindowReady(): boolean {
    return r().symbols.IsWindowReadyW();
  }
  static isWindowFullscreen(): boolean {
    return r().symbols.IsWindowFullscreenW();
  }
  static isWindowHidden(): boolean {
    return r().symbols.IsWindowHiddenW();
  }
  static isWindowMinimized(): boolean {
    return r().symbols.IsWindowMinimizedW();
  }
  static isWindowMaximized(): boolean {
    return r().symbols.IsWindowMaximizedW();
  }
  static isWindowFocused(): boolean {
    return r().symbols.IsWindowFocusedW();
  }
  static isWindowResized(): boolean {
    return r().symbols.IsWindowResizedW();
  }
  static isWindowState(flag: number): boolean {
    return r().symbols.IsWindowStateW(i(flag));
  }
  static setWindowState(flags: number): void {
    r().symbols.SetWindowStateW(i(flags));
  }
  static clearWindowState(flags: number): void {
    r().symbols.ClearWindowStateW(i(flags));
  }
  static toggleFullscreen(): void {
    r().symbols.ToggleFullscreenW();
  }
  static toggleBorderlessWindowed(): void {
    r().symbols.ToggleBorderlessWindowedW();
  }
  static maximizeWindow(): void {
    r().symbols.MaximizeWindowW();
  }
  static minimizeWindow(): void {
    r().symbols.MinimizeWindowW();
  }
  static restoreWindow(): void {
    r().symbols.RestoreWindowW();
  }
  static setWindowTitle(title: string): void {
    r().symbols.SetWindowTitleW(cstr(title));
  }
  static setWindowPosition(x: number, y: number): void {
    r().symbols.SetWindowPositionW(i(x), i(y));
  }
  static setWindowMonitor(monitor: number): void {
    r().symbols.SetWindowMonitorW(i(monitor));
  }
  static setWindowMinSize(w: number, h: number): void {
    r().symbols.SetWindowMinSizeW(i(w), i(h));
  }
  static setWindowMaxSize(w: number, h: number): void {
    r().symbols.SetWindowMaxSizeW(i(w), i(h));
  }
  static setWindowSize(w: number, h: number): void {
    r().symbols.SetWindowSizeW(i(w), i(h));
  }
  static setWindowOpacity(opacity: number): void {
    r().symbols.SetWindowOpacityW(f(opacity));
  }
  static setWindowFocused(): void {
    r().symbols.SetWindowFocusedW();
  }
  static getScreenWidth(): number {
    return r().symbols.GetScreenWidthW();
  }
  static getScreenHeight(): number {
    return r().symbols.GetScreenHeightW();
  }
  static getRenderWidth(): number {
    return r().symbols.GetRenderWidthW();
  }
  static getRenderHeight(): number {
    return r().symbols.GetRenderHeightW();
  }
  static getMonitorCount(): number {
    return r().symbols.GetMonitorCountW();
  }
  static getCurrentMonitor(): number {
    return r().symbols.GetCurrentMonitorW();
  }

  static getMonitorPosition(monitor: number): Vec2 {
    r().symbols.GetMonitorPositionW(this._vec2Buf, i(monitor));
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getMonitorWidth(monitor: number): number {
    return r().symbols.GetMonitorWidthW(i(monitor));
  }
  static getMonitorHeight(monitor: number): number {
    return r().symbols.GetMonitorHeightW(i(monitor));
  }
  static getMonitorPhysicalWidth(monitor: number): number {
    return r().symbols.GetMonitorPhysicalWidthW(i(monitor));
  }
  static getMonitorPhysicalHeight(monitor: number): number {
    return r().symbols.GetMonitorPhysicalHeightW(i(monitor));
  }
  static getMonitorRefreshRate(monitor: number): number {
    return r().symbols.GetMonitorRefreshRateW(i(monitor));
  }

  static getWindowPosition(): Vec2 {
    r().symbols.GetWindowPositionW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getWindowScaleDPI(): Vec2 {
    r().symbols.GetWindowScaleDPIW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getMonitorName(monitor: number): string {
    const ptr = r().symbols.GetMonitorNameW(i(monitor));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static setClipboardText(text: string): void {
    r().symbols.SetClipboardTextW(cstr(text));
  }

  static getClipboardText(): string {
    const ptr = r().symbols.GetClipboardTextW();
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static enableEventWaiting(): void {
    r().symbols.EnableEventWaitingW();
  }
  static disableEventWaiting(): void {
    r().symbols.DisableEventWaitingW();
  }

  // --- Cursor ---

  static showCursor(): void {
    r().symbols.ShowCursorW();
  }
  static hideCursor(): void {
    r().symbols.HideCursorW();
  }
  static isCursorHidden(): boolean {
    return r().symbols.IsCursorHiddenW();
  }
  static enableCursor(): void {
    r().symbols.EnableCursorW();
  }
  static disableCursor(): void {
    r().symbols.DisableCursorW();
  }
  static isCursorOnScreen(): boolean {
    return r().symbols.IsCursorOnScreenW();
  }

  // --- Drawing modes ---

  static beginTextureMode(target: RenderTexture2D): void {
    r().symbols.BeginTextureModeW(i(target.id), i(target.texture.width), i(target.texture.height));
  }
  static endTextureMode(): void {
    r().symbols.EndTextureModeW();
  }
  static beginBlendMode(mode: number): void {
    r().symbols.BeginBlendModeW(i(mode));
  }
  static endBlendMode(): void {
    r().symbols.EndBlendModeW();
  }
  static beginScissorMode(x: number, y: number, w: number, h: number): void {
    r().symbols.BeginScissorModeW(i(x), i(y), i(w), i(h));
  }
  static endScissorMode(): void {
    r().symbols.EndScissorModeW();
  }

  // --- Timing ---

  static getTime(): number {
    return r().symbols.GetTimeW();
  }
  static getFPS(): number {
    return r().symbols.GetFPSW();
  }
  static swapScreenBuffer(): void {
    r().symbols.SwapScreenBufferW();
  }
  static pollInputEvents(): void {
    r().symbols.PollInputEventsW();
  }
  static waitTime(seconds: number): void {
    r().symbols.WaitTimeW(seconds);
  }

  // --- Random ---

  static setRandomSeed(seed: number): void {
    r().symbols.SetRandomSeedW(i(seed));
  }
  static getRandomValue(min: number, max: number): number {
    return r().symbols.GetRandomValueW(i(min), i(max));
  }

  // --- Misc ---

  static takeScreenshot(fileName: string): void {
    r().symbols.TakeScreenshotW(cstr(fileName));
  }
  static setConfigFlags(flags: number): void {
    r().symbols.SetConfigFlagsW(i(flags));
  }
  static openURL(url: string): void {
    r().symbols.OpenURLW(cstr(url));
  }

  // --- Input: Keyboard ---

  static isKeyPressed(key: number): boolean {
    return r().symbols.IsKeyPressedW(i(key));
  }
  static isKeyPressedRepeat(key: number): boolean {
    return r().symbols.IsKeyPressedRepeatW(i(key));
  }
  static isKeyDown(key: number): boolean {
    return r().symbols.IsKeyDownW(i(key));
  }
  static isKeyReleased(key: number): boolean {
    return r().symbols.IsKeyReleasedW(i(key));
  }
  static isKeyUp(key: number): boolean {
    return r().symbols.IsKeyUpW(i(key));
  }
  static getKeyPressed(): number {
    return r().symbols.GetKeyPressedW();
  }
  static getCharPressed(): number {
    return r().symbols.GetCharPressedW();
  }
  static setExitKey(key: number): void {
    r().symbols.SetExitKeyW(i(key));
  }

  // --- Input: Gamepad ---

  static isGamepadAvailable(gamepad: number): boolean {
    return r().symbols.IsGamepadAvailableW(i(gamepad));
  }
  static getGamepadName(gamepad: number): string {
    const cstr = r().symbols.GetGamepadNameW(i(gamepad));
    if (!cstr) return '';
    return cstr.toString();
  }
  static isGamepadButtonPressed(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonPressedW(i(gamepad), i(button));
  }
  static isGamepadButtonDown(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonDownW(i(gamepad), i(button));
  }
  static isGamepadButtonReleased(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonReleasedW(i(gamepad), i(button));
  }
  static isGamepadButtonUp(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonUpW(i(gamepad), i(button));
  }
  static getGamepadButtonPressed(): number {
    return r().symbols.GetGamepadButtonPressedW();
  }
  static getGamepadAxisCount(gamepad: number): number {
    return r().symbols.GetGamepadAxisCountW(i(gamepad));
  }
  static getGamepadAxisMovement(gamepad: number, axis: number): number {
    return r().symbols.GetGamepadAxisMovementW(i(gamepad), i(axis));
  }
  static setGamepadMappings(mappings: string): number {
    return r().symbols.SetGamepadMappingsW(cstr(mappings));
  }

  // --- Input: Mouse ---

  static isMouseButtonPressed(button: number): boolean {
    return r().symbols.IsMouseButtonPressedW(i(button));
  }
  static isMouseButtonDown(button: number): boolean {
    return r().symbols.IsMouseButtonDownW(i(button));
  }
  static isMouseButtonReleased(button: number): boolean {
    return r().symbols.IsMouseButtonReleasedW(i(button));
  }
  static isMouseButtonUp(button: number): boolean {
    return r().symbols.IsMouseButtonUpW(i(button));
  }
  static getMouseX(): number {
    return r().symbols.GetMouseXW();
  }
  static getMouseY(): number {
    return r().symbols.GetMouseYW();
  }

  static getMousePosition(): Vec2 {
    r().symbols.GetMousePositionW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getMouseDelta(): Vec2 {
    r().symbols.GetMouseDeltaW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static setMousePosition(x: number, y: number): void {
    r().symbols.SetMousePositionW(i(x), i(y));
  }
  static setMouseOffset(x: number, y: number): void {
    r().symbols.SetMouseOffsetW(i(x), i(y));
  }
  static setMouseScale(scaleX: number, scaleY: number): void {
    r().symbols.SetMouseScaleW(f(scaleX), f(scaleY));
  }
  static getMouseWheelMove(): number {
    return r().symbols.GetMouseWheelMoveW();
  }

  static getMouseWheelMoveV(): Vec2 {
    r().symbols.GetMouseWheelMoveVW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static setMouseCursor(cursor: number): void {
    r().symbols.SetMouseCursorW(i(cursor));
  }

  // --- Input: Touch ---

  static getTouchX(): number {
    return r().symbols.GetTouchXW();
  }
  static getTouchY(): number {
    return r().symbols.GetTouchYW();
  }

  static getTouchPosition(index: number): Vec2 {
    r().symbols.GetTouchPositionW(this._vec2Buf, i(index));
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getTouchPointId(index: number): number {
    return r().symbols.GetTouchPointIdW(i(index));
  }
  static getTouchPointCount(): number {
    return r().symbols.GetTouchPointCountW();
  }

  // --- Gestures ---

  static setGesturesEnabled(flags: number): void {
    r().symbols.SetGesturesEnabledW(i(flags));
  }
  static isGestureDetected(gesture: number): boolean {
    return r().symbols.IsGestureDetectedW(i(gesture));
  }
  static getGestureDetected(): number {
    return r().symbols.GetGestureDetectedW();
  }
  static getGestureHoldDuration(): number {
    return r().symbols.GetGestureHoldDurationW();
  }

  static getGestureDragVector(): Vec2 {
    r().symbols.GetGestureDragVectorW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getGestureDragAngle(): number {
    return r().symbols.GetGestureDragAngleW();
  }

  static getGesturePinchVector(): Vec2 {
    r().symbols.GetGesturePinchVectorW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getGesturePinchAngle(): number {
    return r().symbols.GetGesturePinchAngleW();
  }

  // --- Camera ---

  static updateCamera(camera: Camera3D, mode: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r().symbols.UpdateCameraW(pos, tar, up, fovy, proj, i(mode));
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D['projection'],
    };
  }

  static updateCameraPro(camera: Camera3D, movement: Vec3, rotation: Vec3, zoom: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r().symbols.UpdateCameraProW(
      pos,
      tar,
      up,
      fovy,
      proj,
      f(movement.x),
      f(movement.y),
      f(movement.z),
      f(rotation.x),
      f(rotation.y),
      f(rotation.z),
      f(zoom),
    );
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D['projection'],
    };
  }

  // --- Screen-space ---

  static getScreenToWorldRay(position: Vec2, camera: Camera3D): Ray {
    const outPos = new Float32Array(3);
    const outDir = new Float32Array(3);
    r().symbols.GetScreenToWorldRayW(
      outPos,
      outDir,
      i(position.x),
      i(position.y),
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
    );
    return {
      position: { x: outPos[0]!, y: outPos[1]!, z: outPos[2]! },
      direction: { x: outDir[0]!, y: outDir[1]!, z: outDir[2]! },
    };
  }

  static getWorldToScreen(position: Vec3, camera: Camera3D): Vec2 {
    r().symbols.GetWorldToScreenW(
      this._vec2Buf,
      f(position.x),
      f(position.y),
      f(position.z),
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
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getWorldToScreen2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetWorldToScreen2DW(
      this._vec2Buf,
      f(position.x),
      f(position.y),
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getScreenToWorld2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetScreenToWorld2DW(
      this._vec2Buf,
      f(position.x),
      f(position.y),
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  // --- DrawFPS ---

  static drawFPS(posX: number, posY: number): void {
    r().symbols.DrawFPSW(i(posX), i(posY));
  }

  // --- Texture ---
  static loadTexture(fileName: string): Texture2D {
    r().symbols.LoadTextureW(this._texOutId, this._texOutW, this._texOutH, cstr(fileName));
    return {
      id: this._texOutId[0]!,
      width: this._texOutW[0]!,
      height: this._texOutH[0]!,
    };
  }

  static unloadTexture(texture: Texture2D): void {
    r().symbols.UnloadTextureW(i(texture.id));
  }

  static isTextureValid(texture: Texture2D): boolean {
    return r().symbols.IsTextureValidW(i(texture.id), i(texture.width), i(texture.height));
  }

  static loadRenderTexture(width: number, height: number): RenderTexture2D {
    r().symbols.LoadRenderTextureW(
      this._texOutId,
      this._texOutTexId,
      this._texOutW,
      this._texOutH,
      i(width),
      i(height),
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
    r().symbols.UnloadRenderTextureW(i(target.id));
  }

  static isRenderTextureValid(target: RenderTexture2D): boolean {
    return r().symbols.IsRenderTextureValidW(i(target.id));
  }

  static genTextureMipmaps(texture: Texture2D): void {
    r().symbols.GenTextureMipmapsW(i(texture.id));
  }

  static setTextureFilter(texture: Texture2D, filter: number): void {
    r().symbols.SetTextureFilterW(i(texture.id), i(filter));
  }

  static setTextureWrap(texture: Texture2D, wrap: number): void {
    r().symbols.SetTextureWrapW(i(texture.id), i(wrap));
  }

  static drawTexture(texture: Texture2D, posX: number, posY: number, tint: Color): void {
    r().symbols.DrawTextureW(i(texture.id), i(texture.width), i(texture.height), i(posX), i(posY), i(tint));
  }

  static drawTextureEx(
    texture: Texture2D,
    position: Vec2,
    rotation: number,
    scale: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextureExW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(position.x),
      i(position.y),
      f(rotation),
      f(scale),
      i(tint),
    );
  }

  static drawTextureRec(texture: Texture2D, source: Rectangle, position: Vec2, tint: Color): void {
    r().symbols.DrawTextureRecW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      i(position.x),
      i(position.y),
      i(tint),
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
    r().symbols.DrawTextureProW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      i(dest.x),
      i(dest.y),
      i(dest.width),
      i(dest.height),
      i(origin.x),
      i(origin.y),
      f(rotation),
      i(tint),
    );
  }

  // --- Model ---

  private static _bbMin = new Float32Array(3);
  private static _bbMax = new Float32Array(3);

  static loadModel(fileName: string): Model {
    return r().symbols.LoadModelW(cstr(fileName));
  }

  static unloadModel(model: Model): void {
    r().symbols.UnloadModelW(i(model));
  }

  static isModelValid(model: Model): boolean {
    return r().symbols.IsModelValidW(i(model));
  }

  static getModelBoundingBox(model: Model): BoundingBox {
    r().symbols.GetModelBoundingBoxW(this._bbMin, this._bbMax, i(model));
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static drawModel(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelW(i(model), f(position.x), f(position.y), f(position.z), f(scale), i(tint));
  }

  static drawModelEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r().symbols.DrawModelExW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(rotationAxis.x),
      f(rotationAxis.y),
      f(rotationAxis.z),
      f(rotationAngle),
      f(scale.x),
      f(scale.y),
      f(scale.z),
      i(tint),
    );
  }

  static drawModelWires(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelWiresW(i(model), f(position.x), f(position.y), f(position.z), f(scale), i(tint));
  }

  static drawModelWiresEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r().symbols.DrawModelWiresExW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(rotationAxis.x),
      f(rotationAxis.y),
      f(rotationAxis.z),
      f(rotationAngle),
      f(scale.x),
      f(scale.y),
      f(scale.z),
      i(tint),
    );
  }

  // --- Shapes texture ---

  static setShapesTexture(texture: Texture2D, source: Rectangle): void {
    r().symbols.SetShapesTextureW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
    );
  }

  static getShapesTexture(): Texture2D {
    r().symbols.GetShapesTextureW(this._shapesTexId, this._shapesTexW, this._shapesTexH);
    return { id: this._shapesTexId[0]!, width: this._shapesTexW[0]!, height: this._shapesTexH[0]! };
  }

  static getShapesTextureRectangle(): Rectangle {
    r().symbols.GetShapesTextureRectangleW(this._recBuf);
    return {
      x: this._recBuf[0]!,
      y: this._recBuf[1]!,
      width: this._recBuf[2]!,
      height: this._recBuf[3]!,
    };
  }

  // --- Color utilities ---

  private static _vec4Buf = new Float32Array(4);
  private static _vec3Buf2 = new Float32Array(3);

  static colorToInt(c: Color): number {
    return r().symbols.ColorToIntW(i(c));
  }

  static colorNormalize(c: Color): { x: number; y: number; z: number; w: number } {
    r().symbols.ColorNormalizeW(this._vec4Buf, i(c));
    return {
      x: this._vec4Buf[0]!,
      y: this._vec4Buf[1]!,
      z: this._vec4Buf[2]!,
      w: this._vec4Buf[3]!,
    };
  }

  static colorFromNormalized(normalized: { x: number; y: number; z: number; w: number }): Color {
    return r().symbols.ColorFromNormalizedW(
      f(normalized.x),
      f(normalized.y),
      f(normalized.z),
      f(normalized.w),
    );
  }

  static colorToHSV(c: Color): { h: number; s: number; v: number } {
    r().symbols.ColorToHSVW(this._vec3Buf2, i(c));
    return { h: this._vec3Buf2[0]!, s: this._vec3Buf2[1]!, v: this._vec3Buf2[2]! };
  }

  static colorFromHSV(hue: number, saturation: number, value: number): Color {
    return r().symbols.ColorFromHSVW(f(hue), f(saturation), f(value));
  }

  static colorTint(color: Color, tint: Color): Color {
    return r().symbols.ColorTintW(i(color), i(tint));
  }
  static colorBrightness(color: Color, factor: number): Color {
    return r().symbols.ColorBrightnessW(i(color), f(factor));
  }
  static colorContrast(color: Color, contrast: number): Color {
    return r().symbols.ColorContrastW(i(color), f(contrast));
  }
  static colorAlpha(color: Color, alpha: number): Color {
    return r().symbols.ColorAlphaW(i(color), f(alpha));
  }
  static colorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
    return r().symbols.ColorAlphaBlendW(i(dst), i(src), i(tint));
  }
  static colorLerp(color1: Color, color2: Color, factor: number): Color {
    return r().symbols.ColorLerpW(i(color1), i(color2), f(factor));
  }
  static getColor(hexValue: number): Color {
    return r().symbols.GetColorW(i(hexValue));
  }
  static fade(color: Color, alpha: number): Color {
    return r().symbols.FadeW(i(color), f(alpha));
  }
  static colorIsEqual(col1: Color, col2: Color): boolean {
    return r().symbols.ColorIsEqualW(i(col1), i(col2));
  }
  static getPixelDataSize(width: number, height: number, format: number): number {
    return r().symbols.GetPixelDataSizeW(i(width), i(height), i(format));
  }

  // --- Font ---

  static loadFont(fileName: string): Font {
    return r().symbols.LoadFontW(cstr(fileName));
  }

  static loadFontEx(fileName: string, fontSize: number): Font {
    return r().symbols.LoadFontExW(cstr(fileName), i(fontSize));
  }

  static getFontDefault(): Font {
    return r().symbols.GetFontDefaultW();
  }

  static unloadFont(font: Font): void {
    r().symbols.UnloadFontW(i(font));
  }

  static isFontValid(font: Font): boolean {
    return r().symbols.IsFontValidW(i(font));
  }

  static measureText(text: string, fontSize: number): number {
    return r().symbols.MeasureTextW(cstr(text), i(fontSize));
  }

  static measureTextEx(font: Font, text: string, fontSize: number, spacing: number): Vec2 {
    r().symbols.MeasureTextExW(this._vec2Buf, i(font), cstr(text), f(fontSize), f(spacing));
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static drawTextEx(
    font: Font,
    text: string,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextExW(
      i(font),
      cstr(text),
      f(position.x),
      f(position.y),
      f(fontSize),
      f(spacing),
      i(tint),
    );
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
    r().symbols.DrawTextProW(
      i(font),
      cstr(text),
      f(position.x),
      f(position.y),
      f(origin.x),
      f(origin.y),
      f(rotation),
      f(fontSize),
      f(spacing),
      i(tint),
    );
  }

  static setTextLineSpacing(spacing: number): void {
    r().symbols.SetTextLineSpacingW(i(spacing));
  }

  // --- Core extensions ---

  static setGamepadVibration(
    gamepad: number,
    leftMotor: number,
    rightMotor: number,
    duration: number,
  ): void {
    r().symbols.SetGamepadVibrationW(i(gamepad), f(leftMotor), f(rightMotor), f(duration));
  }

  static traceLog(logLevel: number, text: string): void {
    r().symbols.TraceLogW(i(logLevel), cstr(text));
  }

  static setTraceLogLevel(logLevel: number): void {
    r().symbols.SetTraceLogLevelW(i(logLevel));
  }

  static setWindowIcon(image: Image): void {
    r().symbols.SetWindowIconW(i(image));
  }

  static getClipboardImage(): Image {
    return r().symbols.GetClipboardImageW();
  }

  // --- Screen-space extended ---

  static getScreenToWorldRayEx(
    position: Vec2,
    camera: Camera3D,
    width: number,
    height: number,
  ): Ray {
    r().symbols.GetScreenToWorldRayExW(
      this._rayPosBuf2,
      this._rayDirBuf2,
      i(position.x),
      i(position.y),
      i(width),
      i(height),
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
    );
    return {
      position: { x: this._rayPosBuf2[0]!, y: this._rayPosBuf2[1]!, z: this._rayPosBuf2[2]! },
      direction: { x: this._rayDirBuf2[0]!, y: this._rayDirBuf2[1]!, z: this._rayDirBuf2[2]! },
    };
  }

  static getWorldToScreenEx(position: Vec3, camera: Camera3D, width: number, height: number): Vec2 {
    r().symbols.GetWorldToScreenExW(
      this._vec2Buf,
      f(position.x),
      f(position.y),
      f(position.z),
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
      i(width),
      i(height),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  private static _matBuf = new Float32Array(16);

  static getCameraMatrix(camera: Camera3D): Float32Array {
    r().symbols.GetCameraMatrixW(
      this._matBuf,
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
    );
    return new Float32Array(this._matBuf);
  }

  static getCameraMatrix2D(camera: Camera2D): Float32Array {
    r().symbols.GetCameraMatrix2DW(
      this._matBuf,
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f(camera.rotation),
      f(camera.zoom),
    );
    return new Float32Array(this._matBuf);
  }

  // --- File system ---

  static fileExists(fileName: string): boolean {
    return r().symbols.FileExistsW(cstr(fileName));
  }
  static directoryExists(dirPath: string): boolean {
    return r().symbols.DirectoryExistsW(cstr(dirPath));
  }
  static isFileExtension(fileName: string, ext: string): boolean {
    return r().symbols.IsFileExtensionW(cstr(fileName), cstr(ext));
  }
  static getFileLength(fileName: string): number {
    return r().symbols.GetFileLengthW(cstr(fileName));
  }

  static getFileExtension(fileName: string): string {
    const ptr = r().symbols.GetFileExtensionW(cstr(fileName));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getFileName(filePath: string): string {
    const ptr = r().symbols.GetFileNameW(cstr(filePath));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getFileNameWithoutExt(filePath: string): string {
    const ptr = r().symbols.GetFileNameWithoutExtW(cstr(filePath));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getDirectoryPath(filePath: string): string {
    const ptr = r().symbols.GetDirectoryPathW(cstr(filePath));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getPrevDirectoryPath(dirPath: string): string {
    const ptr = r().symbols.GetPrevDirectoryPathW(cstr(dirPath));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getWorkingDirectory(): string {
    const ptr = r().symbols.GetWorkingDirectoryW();
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static getApplicationDirectory(): string {
    const ptr = r().symbols.GetApplicationDirectoryW();
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static makeDirectory(dirPath: string): number {
    return r().symbols.MakeDirectoryW(cstr(dirPath));
  }
  static changeDirectory(dir: string): boolean {
    return r().symbols.ChangeDirectoryW(cstr(dir));
  }
  static isPathFile(path: string): boolean {
    return r().symbols.IsPathFileW(cstr(path));
  }
  static isFileNameValid(fileName: string): boolean {
    return r().symbols.IsFileNameValidW(cstr(fileName));
  }
  static getFileModTime(fileName: string): number {
    return Number(r().symbols.GetFileModTimeW(cstr(fileName)));
  }

  static loadFileText(fileName: string): string {
    const ptr = r().symbols.LoadFileTextW(cstr(fileName));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }

  static unloadFileText(text: string): void {
    r().symbols.UnloadFileTextW(Buffer.from(text));
  }
  static saveFileText(fileName: string, text: string): boolean {
    return r().symbols.SaveFileTextW(cstr(fileName), cstr(text));
  }

  static computeCRC32(data: Uint8Array, dataSize: number): number {
    return r().symbols.ComputeCRC32W(data, i(dataSize));
  }

  // --- Shader ---

  static loadShader(vsFileName: string | null, fsFileName: string | null): Shader {
    return r().symbols.LoadShaderW(
      vsFileName ? cstr(vsFileName) : null,
      fsFileName ? cstr(fsFileName) : null,
    );
  }

  static loadShaderFromMemory(vsCode: string | null, fsCode: string | null): Shader {
    return r().symbols.LoadShaderFromMemoryW(
      vsCode ? cstr(vsCode) : null,
      fsCode ? cstr(fsCode) : null,
    );
  }

  static isShaderValid(shader: Shader): boolean {
    return r().symbols.IsShaderValidW(i(shader));
  }
  static getShaderLocation(shader: Shader, uniformName: string): number {
    return r().symbols.GetShaderLocationW(i(shader), cstr(uniformName));
  }
  static getShaderLocationAttrib(shader: Shader, attribName: string): number {
    return r().symbols.GetShaderLocationAttribW(i(shader), cstr(attribName));
  }

  static setShaderValueMatrix(shader: Shader, locIndex: number, mat: Float32Array): void {
    r().symbols.SetShaderValueMatrixW(i(shader), i(locIndex), mat);
  }

  static setShaderValueTexture(shader: Shader, locIndex: number, texture: Texture2D): void {
    r().symbols.SetShaderValueTextureW(i(shader), i(locIndex), i(texture.id), i(texture.width), i(texture.height));
  }

  static unloadShader(shader: Shader): void {
    r().symbols.UnloadShaderW(i(shader));
  }
  static beginShaderMode(shader: Shader): void {
    r().symbols.BeginShaderModeW(i(shader));
  }
  static endShaderMode(): void {
    r().symbols.EndShaderModeW();
  }

  // --- Image loading ---

  static loadImage(fileName: string): Image {
    return r().symbols.LoadImageW(cstr(fileName));
  }
  static loadImageRaw(
    fileName: string,
    width: number,
    height: number,
    format: number,
    headerSize: number,
  ): Image {
    return r().symbols.LoadImageRawW(cstr(fileName), i(width), i(height), i(format), i(headerSize));
  }

  private static _imgAnimSlot = new Int32Array(1);
  private static _imgAnimFrames = new Int32Array(1);

  static loadImageAnim(fileName: string): { image: Image; frames: number } {
    r().symbols.LoadImageAnimW(this._imgAnimSlot, this._imgAnimFrames, cstr(fileName));
    return { image: this._imgAnimSlot[0]!, frames: this._imgAnimFrames[0]! };
  }

  static loadImageFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Image {
    return r().symbols.LoadImageFromMemoryW(cstr(fileType), fileData, i(dataSize));
  }

  static loadImageFromTexture(texture: Texture2D): Image {
    return r().symbols.LoadImageFromTextureW(i(texture.id), i(texture.width), i(texture.height));
  }

  static loadImageFromScreen(): Image {
    return r().symbols.LoadImageFromScreenW();
  }
  static isImageValid(image: Image): boolean {
    return r().symbols.IsImageValidW(i(image));
  }
  static unloadImage(image: Image): void {
    r().symbols.UnloadImageW(i(image));
  }
  static exportImage(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageW(i(image), cstr(fileName));
  }
  static exportImageAsCode(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageAsCodeW(i(image), cstr(fileName));
  }

  // --- Image generation ---

  static genImageColor(width: number, height: number, color: Color): Image {
    return r().symbols.GenImageColorW(i(width), i(height), i(color));
  }
  static genImageGradientLinear(
    width: number,
    height: number,
    direction: number,
    start: Color,
    end: Color,
  ): Image {
    return r().symbols.GenImageGradientLinearW(i(width), i(height), i(direction), i(start), i(end));
  }
  static genImageGradientRadial(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientRadialW(i(width), i(height), f(density), i(inner), i(outer));
  }
  static genImageGradientSquare(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientSquareW(i(width), i(height), f(density), i(inner), i(outer));
  }
  static genImageChecked(
    width: number,
    height: number,
    checksX: number,
    checksY: number,
    col1: Color,
    col2: Color,
  ): Image {
    return r().symbols.GenImageCheckedW(i(width), i(height), i(checksX), i(checksY), i(col1), i(col2));
  }
  static genImageWhiteNoise(width: number, height: number, factor: number): Image {
    return r().symbols.GenImageWhiteNoiseW(i(width), i(height), f(factor));
  }
  static genImagePerlinNoise(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
  ): Image {
    return r().symbols.GenImagePerlinNoiseW(i(width), i(height), i(offsetX), i(offsetY), f(scale));
  }
  static genImageCellular(width: number, height: number, tileSize: number): Image {
    return r().symbols.GenImageCellularW(i(width), i(height), i(tileSize));
  }
  static genImageText(width: number, height: number, text: string): Image {
    return r().symbols.GenImageTextW(i(width), i(height), cstr(text));
  }

  // --- Image manipulation ---

  static imageCopy(image: Image): Image {
    return r().symbols.ImageCopyW(i(image));
  }
  static imageFromImage(image: Image, rec: Rectangle): Image {
    return r().symbols.ImageFromImageW(i(image), i(rec.x), i(rec.y), i(rec.width), i(rec.height));
  }
  static imageFromChannel(image: Image, selectedChannel: number): Image {
    return r().symbols.ImageFromChannelW(i(image), i(selectedChannel));
  }
  static imageText(text: string, fontSize: number, color: Color): Image {
    return r().symbols.ImageTextW(cstr(text), i(fontSize), i(color));
  }
  static imageTextEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): Image {
    return r().symbols.ImageTextExW(i(font), cstr(text), i(fontSize), f(spacing), i(tint));
  }

  static imageFormat(image: Image, newFormat: number): void {
    r().symbols.ImageFormatW(i(image), i(newFormat));
  }
  static imageCrop(image: Image, rec: Rectangle): void {
    r().symbols.ImageCropW(i(image), i(rec.x), i(rec.y), i(rec.width), i(rec.height));
  }
  static imageAlphaCrop(image: Image, threshold: number): void {
    r().symbols.ImageAlphaCropW(i(image), f(threshold));
  }
  static imageAlphaClear(image: Image, color: Color, threshold: number): void {
    r().symbols.ImageAlphaClearW(i(image), i(color), f(threshold));
  }
  static imageAlphaMask(image: Image, alphaMask: Image): void {
    r().symbols.ImageAlphaMaskW(i(image), i(alphaMask));
  }
  static imageAlphaPremultiply(image: Image): void {
    r().symbols.ImageAlphaPremultiplyW(i(image));
  }
  static imageBlurGaussian(image: Image, blurSize: number): void {
    r().symbols.ImageBlurGaussianW(i(image), i(blurSize));
  }
  static imageResize(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeW(i(image), i(newWidth), i(newHeight));
  }
  static imageResizeNN(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeNNW(i(image), i(newWidth), i(newHeight));
  }
  static imageResizeCanvas(
    image: Image,
    newWidth: number,
    newHeight: number,
    offsetX: number,
    offsetY: number,
    fill: Color,
  ): void {
    r().symbols.ImageResizeCanvasW(i(image), i(newWidth), i(newHeight), i(offsetX), i(offsetY), i(fill));
  }
  static imageMipmaps(image: Image): void {
    r().symbols.ImageMipmapsW(i(image));
  }
  static imageDither(image: Image, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void {
    r().symbols.ImageDitherW(i(image), i(rBpp), i(gBpp), i(bBpp), i(aBpp));
  }
  static imageFlipVertical(image: Image): void {
    r().symbols.ImageFlipVerticalW(i(image));
  }
  static imageFlipHorizontal(image: Image): void {
    r().symbols.ImageFlipHorizontalW(i(image));
  }
  static imageRotate(image: Image, degrees: number): void {
    r().symbols.ImageRotateW(i(image), f(degrees));
  }
  static imageRotateCW(image: Image): void {
    r().symbols.ImageRotateCWW(i(image));
  }
  static imageRotateCCW(image: Image): void {
    r().symbols.ImageRotateCCWW(i(image));
  }
  static imageColorTint(image: Image, color: Color): void {
    r().symbols.ImageColorTintW(i(image), i(color));
  }
  static imageColorInvert(image: Image): void {
    r().symbols.ImageColorInvertW(i(image));
  }
  static imageColorGrayscale(image: Image): void {
    r().symbols.ImageColorGrayscaleW(i(image));
  }
  static imageColorContrast(image: Image, contrast: number): void {
    r().symbols.ImageColorContrastW(i(image), f(contrast));
  }
  static imageColorBrightness(image: Image, brightness: number): void {
    r().symbols.ImageColorBrightnessW(i(image), i(brightness));
  }
  static imageColorReplace(image: Image, color: Color, replace: Color): void {
    r().symbols.ImageColorReplaceW(i(image), i(color), i(replace));
  }

  // --- Image info ---

  static getImageAlphaBorder(image: Image, threshold: number): Rectangle {
    r().symbols.GetImageAlphaBorderW(this._recBuf, i(image), f(threshold));
    return {
      x: this._recBuf[0]!,
      y: this._recBuf[1]!,
      width: this._recBuf[2]!,
      height: this._recBuf[3]!,
    };
  }

  static getImageColor(image: Image, x: number, y: number): Color {
    return r().symbols.GetImageColorW(i(image), i(x), i(y));
  }

  // --- Image drawing ---

  static imageClearBackground(dst: Image, color: Color): void {
    r().symbols.ImageClearBackgroundW(i(dst), i(color));
  }
  static imageDrawPixel(dst: Image, posX: number, posY: number, color: Color): void {
    r().symbols.ImageDrawPixelW(i(dst), i(posX), i(posY), i(color));
  }
  static imageDrawPixelV(dst: Image, position: Vec2, color: Color): void {
    r().symbols.ImageDrawPixelVW(i(dst), i(position.x), i(position.y), i(color));
  }
  static imageDrawLine(
    dst: Image,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawLineW(i(dst), i(startX), i(startY), i(endX), i(endY), i(color));
  }
  static imageDrawLineV(dst: Image, start: Vec2, end: Vec2, color: Color): void {
    r().symbols.ImageDrawLineVW(i(dst), i(start.x), i(start.y), i(end.x), i(end.y), i(color));
  }
  static imageDrawLineEx(dst: Image, start: Vec2, end: Vec2, thick: number, color: Color): void {
    r().symbols.ImageDrawLineExW(i(dst), i(start.x), i(start.y), i(end.x), i(end.y), i(thick), i(color));
  }
  static imageDrawCircle(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleW(i(dst), i(centerX), i(centerY), i(radius), i(color));
  }
  static imageDrawCircleV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleVW(i(dst), i(center.x), i(center.y), i(radius), i(color));
  }
  static imageDrawCircleLines(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleLinesW(i(dst), i(centerX), i(centerY), i(radius), i(color));
  }
  static imageDrawCircleLinesV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleLinesVW(i(dst), i(center.x), i(center.y), i(radius), i(color));
  }
  static imageDrawRectangle(
    dst: Image,
    posX: number,
    posY: number,
    w: number,
    h: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawRectangleW(i(dst), i(posX), i(posY), i(w), i(h), i(color));
  }
  static imageDrawRectangleV(dst: Image, position: Vec2, size: Vec2, color: Color): void {
    r().symbols.ImageDrawRectangleVW(i(dst), i(position.x), i(position.y), i(size.x), i(size.y), i(color));
  }
  static imageDrawRectangleRec(dst: Image, rec: Rectangle, color: Color): void {
    r().symbols.ImageDrawRectangleRecW(i(dst), i(rec.x), i(rec.y), i(rec.width), i(rec.height), i(color));
  }
  static imageDrawRectangleLines(dst: Image, rec: Rectangle, thick: number, color: Color): void {
    r().symbols.ImageDrawRectangleLinesW(i(dst), i(rec.x), i(rec.y), i(rec.width), i(rec.height), i(thick), i(color));
  }
  static imageDrawTriangle(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleW(i(dst), i(v1.x), i(v1.y), i(v2.x), i(v2.y), i(v3.x), i(v3.y), i(color));
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
    r().symbols.ImageDrawTriangleExW(i(dst), i(v1.x), i(v1.y), i(v2.x), i(v2.y), i(v3.x), i(v3.y), i(c1), i(c2), i(c3));
  }
  static imageDrawTriangleLines(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleLinesW(i(dst), i(v1.x), i(v1.y), i(v2.x), i(v2.y), i(v3.x), i(v3.y), i(color));
  }
  static imageDrawTriangleFan(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleFanW(i(dst), points, i(points.length / 2), i(color));
  }
  static imageDrawTriangleStrip(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleStripW(i(dst), points, i(points.length / 2), i(color));
  }
  static imageDraw(
    dst: Image,
    src: Image,
    srcRec: Rectangle,
    dstRec: Rectangle,
    tint: Color,
  ): void {
    r().symbols.ImageDrawW(
      i(dst),
      i(src),
      i(srcRec.x),
      i(srcRec.y),
      i(srcRec.width),
      i(srcRec.height),
      i(dstRec.x),
      i(dstRec.y),
      i(dstRec.width),
      i(dstRec.height),
      i(tint),
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
    r().symbols.ImageDrawTextW(i(dst), cstr(text), i(posX), i(posY), i(fontSize), i(color));
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
    r().symbols.ImageDrawTextExW(
      i(dst),
      i(font),
      cstr(text),
      i(position.x),
      i(position.y),
      i(fontSize),
      f(spacing),
      i(tint),
    );
  }

  // --- Texture extensions ---

  static loadTextureFromImage(image: Image): Texture2D {
    r().symbols.LoadTextureFromImageW(this._texOutId, this._texOutW, this._texOutH, i(image));
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static loadTextureCubemap(image: Image, layout: number): Texture2D {
    r().symbols.LoadTextureCubemapW(this._texOutId, this._texOutW, this._texOutH, i(image), i(layout));
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static updateTexture(texture: Texture2D, pixels: Uint8Array): void {
    r().symbols.UpdateTextureW(i(texture.id), i(texture.width), i(texture.height), pixels);
  }

  static updateTextureRec(texture: Texture2D, rec: Rectangle, pixels: Uint8Array): void {
    r().symbols.UpdateTextureRecW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(rec.x),
      i(rec.y),
      i(rec.width),
      i(rec.height),
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
    r().symbols.DrawTextureNPatchW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(nPatchInfo.source.x),
      i(nPatchInfo.source.y),
      i(nPatchInfo.source.width),
      i(nPatchInfo.source.height),
      i(nPatchInfo.left),
      i(nPatchInfo.top),
      i(nPatchInfo.right),
      i(nPatchInfo.bottom),
      i(nPatchInfo.layout),
      i(dest.x),
      i(dest.y),
      i(dest.width),
      i(dest.height),
      i(origin.x),
      i(origin.y),
      f(rotation),
      i(tint),
    );
  }

  static getPixelColor(srcPtr: number, format: number): Color {
    return r().symbols.GetPixelColorW(srcPtr as any, i(format));
  }
  static setPixelColor(dstPtr: number, color: Color, format: number): void {
    r().symbols.SetPixelColorW(dstPtr as any, i(color), i(format));
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

  // --- Model from mesh ---

  static loadModelFromMesh(mesh: Mesh): Model {
    return r().symbols.LoadModelFromMeshW(i(mesh));
  }

  // --- Mesh management ---

  static unloadMesh(mesh: Mesh): void {
    r().symbols.UnloadMeshW(i(mesh));
  }
  static uploadMesh(mesh: Mesh, dynamic: boolean): void {
    r().symbols.UploadMeshW(i(mesh), dynamic);
  }

  static getMeshBoundingBox(mesh: Mesh): BoundingBox {
    r().symbols.GetMeshBoundingBoxW(this._bbMin, this._bbMax, i(mesh));
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static genMeshTangents(mesh: Mesh): void {
    r().symbols.GenMeshTangentsW(i(mesh));
  }
  static exportMesh(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshW(i(mesh), cstr(fileName));
  }
  static exportMeshAsCode(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshAsCodeW(i(mesh), cstr(fileName));
  }

  // --- Mesh generation ---

  static genMeshPoly(sides: number, radius: number): Mesh {
    return r().symbols.GenMeshPolyW(i(sides), f(radius));
  }
  static genMeshPlane(width: number, length: number, resX: number, resZ: number): Mesh {
    return r().symbols.GenMeshPlaneW(f(width), f(length), i(resX), i(resZ));
  }
  static genMeshCube(width: number, height: number, length: number): Mesh {
    return r().symbols.GenMeshCubeW(f(width), f(height), f(length));
  }
  static genMeshSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshSphereW(f(radius), i(rings), i(slices));
  }
  static genMeshHemiSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshHemiSphereW(f(radius), i(rings), i(slices));
  }
  static genMeshCylinder(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshCylinderW(f(radius), f(height), i(slices));
  }
  static genMeshCone(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshConeW(f(radius), f(height), i(slices));
  }
  static genMeshTorus(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshTorusW(f(radius), f(size), i(radSeg), i(sides));
  }
  static genMeshKnot(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshKnotW(f(radius), f(size), i(radSeg), i(sides));
  }
  static genMeshHeightmap(heightmap: Image, size: Vec3): Mesh {
    return r().symbols.GenMeshHeightmapW(i(heightmap), f(size.x), f(size.y), f(size.z));
  }
  static genMeshCubicmap(cubicmap: Image, cubeSize: Vec3): Mesh {
    return r().symbols.GenMeshCubicmapW(i(cubicmap), f(cubeSize.x), f(cubeSize.y), f(cubeSize.z));
  }

  // --- Material management ---

  static loadMaterialDefault(): Material {
    return r().symbols.LoadMaterialDefaultW();
  }
  static isMaterialValid(material: Material): boolean {
    return r().symbols.IsMaterialValidW(i(material));
  }
  static unloadMaterial(material: Material): void {
    r().symbols.UnloadMaterialW(i(material));
  }
  static setMaterialTexture(material: Material, mapType: number, texture: Texture2D): void {
    r().symbols.SetMaterialTextureW(i(material), i(mapType), i(texture.id), i(texture.width), i(texture.height));
  }
  static setModelMeshMaterial(model: Model, meshId: number, materialId: number): void {
    r().symbols.SetModelMeshMaterialW(i(model), i(meshId), i(materialId));
  }

  // --- Model animations ---

  static loadModelAnimations(fileName: string): { startSlot: number; count: number } {
    r().symbols.LoadModelAnimationsW(this._animSlotStart, this._animCount, cstr(fileName));
    return { startSlot: this._animSlotStart[0]!, count: this._animCount[0]! };
  }

  static updateModelAnimation(model: Model, anim: ModelAnimation, frame: number): void {
    r().symbols.UpdateModelAnimationW(i(model), i(anim), f(frame));
  }
  static updateModelAnimationEx(
    model: Model,
    animA: ModelAnimation,
    frameA: number,
    animB: ModelAnimation,
    frameB: number,
    blend: number,
  ): void {
    r().symbols.UpdateModelAnimationExW(i(model), i(animA), f(frameA), i(animB), f(frameB), f(blend));
  }
  static unloadModelAnimations(startSlot: number, count: number): void {
    r().symbols.UnloadModelAnimationsW(i(startSlot), i(count));
  }
  static isModelAnimationValid(model: Model, anim: ModelAnimation): boolean {
    return r().symbols.IsModelAnimationValidW(i(model), i(anim));
  }

  // --- Collision detection ---

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
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
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
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision {
    r().symbols.GetRayCollisionBoxW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
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
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionTriangle(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3): RayCollision {
    r().symbols.GetRayCollisionTriangleW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
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
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static getRayCollisionQuad(ray: Ray, p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3): RayCollision {
    r().symbols.GetRayCollisionQuadW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
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
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  // --- Audio device ---

  static initAudioDevice(): void {
    r().symbols.InitAudioDeviceW();
  }
  static closeAudioDevice(): void {
    r().symbols.CloseAudioDeviceW();
  }
  static isAudioDeviceReady(): boolean {
    return r().symbols.IsAudioDeviceReadyW();
  }
  static setMasterVolume(volume: number): void {
    r().symbols.SetMasterVolumeW(f(volume));
  }
  static getMasterVolume(): number {
    return r().symbols.GetMasterVolumeW();
  }

  // --- Wave ---

  static loadWave(fileName: string): Wave {
    return r().symbols.LoadWaveW(cstr(fileName));
  }
  static loadWaveFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Wave {
    return r().symbols.LoadWaveFromMemoryW(cstr(fileType), fileData, i(dataSize));
  }
  static isWaveValid(wave: Wave): boolean {
    return r().symbols.IsWaveValidW(i(wave));
  }
  static unloadWave(wave: Wave): void {
    r().symbols.UnloadWaveW(i(wave));
  }
  static exportWave(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveW(i(wave), cstr(fileName));
  }
  static exportWaveAsCode(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveAsCodeW(i(wave), cstr(fileName));
  }
  static waveCopy(wave: Wave): Wave {
    return r().symbols.WaveCopyW(i(wave));
  }
  static waveCrop(wave: Wave, initFrame: number, finalFrame: number): void {
    r().symbols.WaveCropW(i(wave), i(initFrame), i(finalFrame));
  }
  static waveFormat(wave: Wave, sampleRate: number, sampleSize: number, channels: number): void {
    r().symbols.WaveFormatW(i(wave), i(sampleRate), i(sampleSize), i(channels));
  }

  // --- Sound ---

  static loadSound(fileName: string): Sound {
    return r().symbols.LoadSoundW(cstr(fileName));
  }
  static loadSoundFromWave(wave: Wave): Sound {
    return r().symbols.LoadSoundFromWaveW(i(wave));
  }
  static loadSoundAlias(source: Sound): Sound {
    return r().symbols.LoadSoundAliasW(i(source));
  }
  static isSoundValid(sound: Sound): boolean {
    return r().symbols.IsSoundValidW(i(sound));
  }
  static unloadSound(sound: Sound): void {
    r().symbols.UnloadSoundW(i(sound));
  }
  static unloadSoundAlias(alias: Sound): void {
    r().symbols.UnloadSoundAliasW(i(alias));
  }
  static playSound(sound: Sound): void {
    r().symbols.PlaySoundW(i(sound));
  }
  static stopSound(sound: Sound): void {
    r().symbols.StopSoundW(i(sound));
  }
  static pauseSound(sound: Sound): void {
    r().symbols.PauseSoundW(i(sound));
  }
  static resumeSound(sound: Sound): void {
    r().symbols.ResumeSoundW(i(sound));
  }
  static isSoundPlaying(sound: Sound): boolean {
    return r().symbols.IsSoundPlayingW(i(sound));
  }
  static setSoundVolume(sound: Sound, volume: number): void {
    r().symbols.SetSoundVolumeW(i(sound), f(volume));
  }
  static setSoundPitch(sound: Sound, pitch: number): void {
    r().symbols.SetSoundPitchW(i(sound), f(pitch));
  }
  static setSoundPan(sound: Sound, pan: number): void {
    r().symbols.SetSoundPanW(i(sound), f(pan));
  }

  // --- Music ---

  static loadMusicStream(fileName: string): Music {
    return r().symbols.LoadMusicStreamW(cstr(fileName));
  }
  static loadMusicStreamFromMemory(fileType: string, data: Uint8Array, dataSize: number): Music {
    return r().symbols.LoadMusicStreamFromMemoryW(cstr(fileType), data, i(dataSize));
  }
  static isMusicValid(music: Music): boolean {
    return r().symbols.IsMusicValidW(i(music));
  }
  static unloadMusicStream(music: Music): void {
    r().symbols.UnloadMusicStreamW(i(music));
  }
  static playMusicStream(music: Music): void {
    r().symbols.PlayMusicStreamW(i(music));
  }
  static isMusicStreamPlaying(music: Music): boolean {
    return r().symbols.IsMusicStreamPlayingW(i(music));
  }
  static updateMusicStream(music: Music): void {
    r().symbols.UpdateMusicStreamW(i(music));
  }
  static stopMusicStream(music: Music): void {
    r().symbols.StopMusicStreamW(i(music));
  }
  static pauseMusicStream(music: Music): void {
    r().symbols.PauseMusicStreamW(i(music));
  }
  static resumeMusicStream(music: Music): void {
    r().symbols.ResumeMusicStreamW(i(music));
  }
  static seekMusicStream(music: Music, position: number): void {
    r().symbols.SeekMusicStreamW(i(music), f(position));
  }
  static setMusicVolume(music: Music, volume: number): void {
    r().symbols.SetMusicVolumeW(i(music), f(volume));
  }
  static setMusicPitch(music: Music, pitch: number): void {
    r().symbols.SetMusicPitchW(i(music), f(pitch));
  }
  static setMusicPan(music: Music, pan: number): void {
    r().symbols.SetMusicPanW(i(music), f(pan));
  }
  static getMusicTimeLength(music: Music): number {
    return r().symbols.GetMusicTimeLengthW(i(music));
  }
  static getMusicTimePlayed(music: Music): number {
    return r().symbols.GetMusicTimePlayedW(i(music));
  }

  // --- AudioStream ---

  static loadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStream {
    return r().symbols.LoadAudioStreamW(i(sampleRate), i(sampleSize), i(channels));
  }
  static isAudioStreamValid(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamValidW(i(stream));
  }
  static unloadAudioStream(stream: AudioStream): void {
    r().symbols.UnloadAudioStreamW(i(stream));
  }
  static isAudioStreamProcessed(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamProcessedW(i(stream));
  }
  static playAudioStream(stream: AudioStream): void {
    r().symbols.PlayAudioStreamW(i(stream));
  }
  static pauseAudioStream(stream: AudioStream): void {
    r().symbols.PauseAudioStreamW(i(stream));
  }
  static resumeAudioStream(stream: AudioStream): void {
    r().symbols.ResumeAudioStreamW(i(stream));
  }
  static isAudioStreamPlaying(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamPlayingW(i(stream));
  }
  static stopAudioStream(stream: AudioStream): void {
    r().symbols.StopAudioStreamW(i(stream));
  }
  static setAudioStreamVolume(stream: AudioStream, volume: number): void {
    r().symbols.SetAudioStreamVolumeW(i(stream), f(volume));
  }
  static setAudioStreamPitch(stream: AudioStream, pitch: number): void {
    r().symbols.SetAudioStreamPitchW(i(stream), f(pitch));
  }
  static setAudioStreamPan(stream: AudioStream, pan: number): void {
    r().symbols.SetAudioStreamPanW(i(stream), f(pan));
  }
  static setAudioStreamBufferSizeDefault(size: number): void {
    r().symbols.SetAudioStreamBufferSizeDefaultW(i(size));
  }

  // --- Font/Text remaining ---

  static loadFontFromImage(image: Image, key: Color, firstChar: number): Font {
    return r().symbols.LoadFontFromImageW(i(image), i(key), i(firstChar));
  }
  static loadFontFromMemory(
    fileType: string,
    fileData: Uint8Array,
    dataSize: number,
    fontSize: number,
  ): Font {
    return r().symbols.LoadFontFromMemoryW(cstr(fileType), fileData, i(dataSize), i(fontSize));
  }
  static exportFontAsCode(font: Font, fileName: string): boolean {
    return r().symbols.ExportFontAsCodeW(i(font), cstr(fileName));
  }
  static drawTextCodepoint(
    font: Font,
    codepoint: number,
    position: Vec2,
    fontSize: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextCodepointW(
      i(font),
      i(codepoint),
      f(position.x),
      f(position.y),
      f(fontSize),
      i(tint),
    );
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
    r().symbols.DrawTextCodepointsW(
      i(font),
      codepoints,
      i(count),
      f(position.x),
      f(position.y),
      f(fontSize),
      f(spacing),
      i(tint),
    );
  }
  static getGlyphIndex(font: Font, codepoint: number): number {
    return r().symbols.GetGlyphIndexW(i(font), i(codepoint));
  }

  private static _glyphValue = new Int32Array(1);
  private static _glyphOffsetX = new Int32Array(1);
  private static _glyphOffsetY = new Int32Array(1);
  private static _glyphAdvanceX = new Int32Array(1);
  private static _glyphImageSlot = new Int32Array(1);

  static getGlyphInfo(font: Font, codepoint: number): GlyphInfo {
    r().symbols.GetGlyphInfoW(
      this._glyphValue,
      this._glyphOffsetX,
      this._glyphOffsetY,
      this._glyphAdvanceX,
      this._glyphImageSlot,
      i(font),
      i(codepoint),
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
    r().symbols.GetGlyphAtlasRecW(this._recBuf, i(font), i(codepoint));
    return {
      x: this._recBuf[0]!,
      y: this._recBuf[1]!,
      width: this._recBuf[2]!,
      height: this._recBuf[3]!,
    };
  }

  private static _cpSize = new Int32Array(1);

  static getCodepoint(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepointW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointNext(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepointNextW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointPrevious(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepointPreviousW(cstr(text), this._cpSize);
    return { codepoint: cp, size: this._cpSize[0]! };
  }

  static getCodepointCount(text: string): number {
    return r().symbols.GetCodepointCountW(cstr(text));
  }
  static textIsEqual(text1: string, text2: string): boolean {
    return r().symbols.TextIsEqualW(cstr(text1), cstr(text2));
  }
  static textLength(text: string): number {
    return r().symbols.TextLengthW(cstr(text));
  }
  static textToInteger(text: string): number {
    return r().symbols.TextToIntegerW(cstr(text));
  }
  static textToFloat(text: string): number {
    return r().symbols.TextToFloatW(cstr(text));
  }
  static textFindIndex(text: string, find: string): number {
    return r().symbols.TextFindIndexW(cstr(text), cstr(find));
  }

  static imageToPOT(image: Image, fill: number): void {
    r().symbols.ImageToPOTW(i(image), i(fill));
  }

  static imageKernelConvolution(image: Image, kernel: Float32Array): void {
    r().symbols.ImageKernelConvolutionW(i(image), kernel, i(kernel.length));
  }

  static unloadImageColors(ptr: number): void {
    r().symbols.UnloadImageColorsW(ptr as any);
  }
  static unloadImagePalette(ptr: number): void {
    r().symbols.UnloadImagePaletteW(ptr as any);
  }

  static loadImageAnimFromMemory(
    fileType: string,
    data: Buffer | Uint8Array,
    frames?: Int32Array,
  ): Image {
    return r().symbols.LoadImageAnimFromMemoryW(
      cstr(fileType),
      data,
      i(data.length),
      frames ?? new Int32Array(1),
    );
  }

  static unloadFontData(ptr: number, glyphCount: number): void {
    r().symbols.UnloadFontDataW(ptr as any, i(glyphCount));
  }
  static unloadUTF8(ptr: number): void {
    r().symbols.UnloadUTF8W(ptr as any);
  }
  static unloadCodepoints(ptr: number): void {
    r().symbols.UnloadCodepointsW(ptr as any);
  }

  static textCopy(dst: Uint8Array, src: string): number {
    return r().symbols.TextCopyW(dst, cstr(src));
  }

  private static _textAppendPos = new Int32Array(1);

  static textAppend(text: Uint8Array, append: string, position: number): number {
    this._textAppendPos[0] = position;
    r().symbols.TextAppendW(text, cstr(append), this._textAppendPos);
    return this._textAppendPos[0]!;
  }

  static updateMeshBuffer(
    mesh: Mesh,
    index: number,
    data: Buffer | Uint8Array,
    offset: number,
  ): void {
    r().symbols.UpdateMeshBufferW(i(mesh), i(index), data, i(data.length), i(offset));
  }

  static getRayCollisionMesh(
    ray: Ray,
    mesh: Mesh,
    transform: { m: Float32Array } | Float32Array,
  ): RayCollision {
    const m = transform instanceof Float32Array ? transform : transform.m;
    r().symbols.GetRayCollisionMeshW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
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
      hit: this._rcHit[0]! !== 0,
      distance: this._rcDist[0]!,
      point: { x: this._rcPt[0]!, y: this._rcPt[1]!, z: this._rcPt[2]! },
      normal: { x: this._rcNorm[0]!, y: this._rcNorm[1]!, z: this._rcNorm[2]! },
    };
  }

  static unloadRandomSequence(ptr: number): void {
    r().symbols.UnloadRandomSequenceW(ptr as any);
  }
  static memFree(ptr: number): void {
    r().symbols.MemFreeW(ptr as any);
  }
  static unloadFileData(ptr: number): void {
    r().symbols.UnloadFileDataW(ptr as any);
  }
  static saveFileData(fileName: string, data: Uint8Array | Buffer): boolean {
    return r().symbols.SaveFileDataW(cstr(fileName), data, i(data.length));
  }
  static exportDataAsCode(data: Uint8Array | Buffer, fileName: string): boolean {
    return r().symbols.ExportDataAsCodeW(data, i(data.length), cstr(fileName));
  }
  static loadWaveSamples(wave: Wave): number {
    return r().symbols.LoadWaveSamplesW(wave) as number;
  }
  static unloadWaveSamples(ptr: number): void {
    r().symbols.UnloadWaveSamplesW(ptr as any);
  }
  static setWindowIcons(images: number, count: number): void {
    r().symbols.SetWindowIconsW(images as any, i(count));
  }
}
