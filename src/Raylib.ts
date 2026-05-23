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
import { cstr, F } from './utils';
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
    r().symbols.InitWindowW(width | 0, height | 0, cstr(title));
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
      F(camera.offset.x),
      F(camera.offset.y),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.rotation),
      F(camera.zoom),
    );
  }

  /** Ends 2D mode with custom camera */
  static endMode2D(): void {
    r().symbols.EndMode2DW();
  }

  /** Begin 3D mode with custom camera */
  static beginMode3D(camera: Camera3D): void {
    r().symbols.BeginMode3DW(
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
    );
  }

  /** Ends 3D mode with custom camera */
  static endMode3D(): void {
    r().symbols.EndMode3DW();
  }

  /** Set background color (used before drawing) */
  static clearBackground(col: Color): void {
    r().symbols.ClearBackgroundW(col);
  }

  /** Set target FPS (frames per second) */
  static setTargetFPS(fps: number): void {
    r().symbols.SetTargetFPSW(fps | 0);
  }

  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime(): number {
    return r().symbols.GetFrameTimeW();
  }

  /** Draw a color-filled rectangle */
  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r().symbols.DrawRectangleW(x | 0, y | 0, width | 0, height | 0, col);
  }

  /** Draw text (using default font) */
  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r().symbols.DrawTextW(cstr(text), x | 0, y | 0, fontSize | 0, col);
  }

  /** Draw a pixel */
  static drawPixel(x: number, y: number, col: Color): void {
    r().symbols.DrawPixelW(x | 0, y | 0, col);
  }

  /** Draw a pixel (using vector position) */
  static drawPixelV(position: Vec2, col: Color): void {
    r().symbols.DrawPixelVW(F(position.x), F(position.y), col);
  }

  /** Draw a line */
  static drawLine(startX: number, startY: number, endX: number, endY: number, col: Color): void {
    r().symbols.DrawLineW(startX | 0, startY | 0, endX | 0, endY | 0, col);
  }

  /** Draw a line (using vector positions) */
  static drawLineV(startPos: Vec2, endPos: Vec2, col: Color): void {
    r().symbols.DrawLineVW(F(startPos.x), F(startPos.y), F(endPos.x), F(endPos.y), col);
  }

  /** Draw a line with defined thickness */
  static drawLineEx(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r().symbols.DrawLineExW(
      F(startPos.x),
      F(startPos.y),
      F(endPos.x),
      F(endPos.y),
      F(thick),
      col,
    );
  }

  /** Draw lines sequence as a strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawLineStrip(points: Float32Array, col: Color): void {
    r().symbols.DrawLineStripW(points, points.length / 2, col);
  }

  /** Draw line segment with Bezier easing */
  static drawLineBezier(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r().symbols.DrawLineBezierW(
      F(startPos.x),
      F(startPos.y),
      F(endPos.x),
      F(endPos.y),
      F(thick),
      col,
    );
  }

  /** Draw a color-filled circle */
  static drawCircle(centerX: number, centerY: number, radius: number, col: Color): void {
    r().symbols.DrawCircleW(centerX | 0, centerY | 0, F(radius), col);
  }

  /** Draw a color-filled circle (using vector center) */
  static drawCircleV(center: Vec2, radius: number, col: Color): void {
    r().symbols.DrawCircleVW(center.x | 0, center.y | 0, F(radius), col);
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
      F(center.x),
      F(center.y),
      F(radius),
      F(startAngle),
      F(endAngle),
      segments | 0,
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
    r().symbols.DrawCircleSectorLinesW(
      F(center.x),
      F(center.y),
      F(radius),
      F(startAngle),
      F(endAngle),
      segments | 0,
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
    r().symbols.DrawCircleGradientW(F(centerX), F(centerY), F(radius), inner, outer);
  }

  /** Draw circle outline */
  static drawCircleLines(centerX: number, centerY: number, radius: number, col: Color): void {
    r().symbols.DrawCircleLinesW(centerX | 0, centerY | 0, F(radius), col);
  }

  /** Draw circle outline (using vector center) */
  static drawCircleLinesV(center: Vec2, radius: number, col: Color): void {
    r().symbols.DrawCircleLinesVW(F(center.x), F(center.y), F(radius), col);
  }

  /** Draw a color-filled ellipse */
  static drawEllipse(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r().symbols.DrawEllipseW(centerX | 0, centerY | 0, F(radiusH), F(radiusV), col);
  }

  /** Draw ellipse outline */
  static drawEllipseLines(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r().symbols.DrawEllipseLinesW(centerX | 0, centerY | 0, F(radiusH), F(radiusV), col);
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
      F(center.x),
      F(center.y),
      F(innerRadius),
      F(outerRadius),
      F(startAngle),
      F(endAngle),
      segments | 0,
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
    r().symbols.DrawRingLinesW(
      F(center.x),
      F(center.y),
      F(innerRadius),
      F(outerRadius),
      F(startAngle),
      F(endAngle),
      segments | 0,
      col,
    );
  }

  /** Draw a color-filled rectangle (using vector position and size) */
  static drawRectangleV(pos: Vec2, size: Vec2, col: Color): void {
    r().symbols.DrawRectangleVW(F(pos.x), F(pos.y), F(size.x), F(size.y), col);
  }

  static drawRectangleRec(rec: Rectangle, col: Color): void {
    r().symbols.DrawRectangleRecW(F(rec.x), F(rec.y), F(rec.width), F(rec.height), col);
  }

  /** Draw a color-filled rectangle with pro parameters (rotation and origin) */
  static drawRectanglePro(rec: Rectangle, origin: Vec2, rotation: number, col: Color): void {
    r().symbols.DrawRectangleProW(
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      F(origin.x),
      F(origin.y),
      F(rotation),
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
    r().symbols.DrawRectangleGradientVW(x | 0, y | 0, width | 0, height | 0, top, bottom);
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
    r().symbols.DrawRectangleGradientHW(x | 0, y | 0, width | 0, height | 0, left, right);
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
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      topLeft,
      bottomLeft,
      topRight,
      bottomRight,
    );
  }

  /** Draw rectangle outline */
  static drawRectangleLines(x: number, y: number, width: number, height: number, col: Color): void {
    r().symbols.DrawRectangleLinesW(x | 0, y | 0, width | 0, height | 0, col);
  }

  /** Draw rectangle outline with extended parameters (custom line thickness) */
  static drawRectangleLinesEx(rec: Rectangle, lineThick: number, col: Color): void {
    r().symbols.DrawRectangleLinesExW(
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      F(lineThick),
      col,
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
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      F(roundness),
      segments | 0,
      col,
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
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      F(roundness),
      segments | 0,
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
    r().symbols.DrawRectangleRoundedLinesExW(
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
      F(roundness),
      segments | 0,
      F(lineThick),
      col,
    );
  }

  /** Draw a color-filled triangle */
  static drawTriangle(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r().symbols.DrawTriangleW(
      F(v1.x),
      F(v1.y),
      F(v2.x),
      F(v2.y),
      F(v3.x),
      F(v3.y),
      col,
    );
  }

  /** Draw triangle outline */
  static drawTriangleLines(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r().symbols.DrawTriangleLinesW(
      F(v1.x),
      F(v1.y),
      F(v2.x),
      F(v2.y),
      F(v3.x),
      F(v3.y),
      col,
    );
  }

  /** Draw a triangle fan. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleFan(points: Float32Array, col: Color): void {
    r().symbols.DrawTriangleFanW(points, points.length / 2, col);
  }

  /** Draw a triangle strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleStrip(points: Float32Array, col: Color): void {
    r().symbols.DrawTriangleStripW(points, points.length / 2, col);
  }

  /** Draw a regular polygon (color-filled) */
  static drawPoly(center: Vec2, sides: number, radius: number, rotation: number, col: Color): void {
    r().symbols.DrawPolyW(F(center.x), F(center.y), sides | 0, F(radius), F(rotation), col);
  }

  /** Draw a regular polygon outline */
  static drawPolyLines(
    center: Vec2,
    sides: number,
    radius: number,
    rotation: number,
    col: Color,
  ): void {
    r().symbols.DrawPolyLinesW(
      F(center.x),
      F(center.y),
      sides | 0,
      F(radius),
      F(rotation),
      col,
    );
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
      F(center.x),
      F(center.y),
      sides | 0,
      F(radius),
      F(rotation),
      F(lineThick),
      col,
    );
  }

  /**
   * Draw spline: Linear. Minimum 2 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineLinear(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineLinearW(points, points.length / 2, F(thick), col);
  }

  /**
   * Draw spline: B-Spline. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBasis(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBasisW(points, points.length / 2, F(thick), col);
  }

  /**
   * Draw spline: Catmull-Rom. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineCatmullRom(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineCatmullRomW(points, points.length / 2, F(thick), col);
  }

  /**
   * Draw spline: Quadratic Bezier. Minimum 3 points (1 control point).
   * Points layout: [p1, c2, p3, c4, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierQuadratic(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBezierQuadraticW(points, points.length / 2, F(thick), col);
  }

  /**
   * Draw spline: Cubic Bezier. Minimum 4 points (2 control points).
   * Points layout: [p1, c2, c3, p4, c5, c6, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierCubic(points: Float32Array, thick: number, col: Color): void {
    r().symbols.DrawSplineBezierCubicW(points, points.length / 2, F(thick), col);
  }

  /** Draw spline segment: Linear, 2 points */
  static drawSplineSegmentLinear(p1: Vec2, p2: Vec2, thick: number, col: Color): void {
    r().symbols.DrawSplineSegmentLinearW(
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(thick),
      col,
    );
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
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(p3.x),
      F(p3.y),
      F(p4.x),
      F(p4.y),
      F(thick),
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
    r().symbols.DrawSplineSegmentCatmullRomW(
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(p3.x),
      F(p3.y),
      F(p4.x),
      F(p4.y),
      F(thick),
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
    r().symbols.DrawSplineSegmentBezierQuadraticW(
      F(p1.x),
      F(p1.y),
      F(c2.x),
      F(c2.y),
      F(p3.x),
      F(p3.y),
      F(thick),
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
    r().symbols.DrawSplineSegmentBezierCubicW(
      F(p1.x),
      F(p1.y),
      F(c2.x),
      F(c2.y),
      F(c3.x),
      F(c3.y),
      F(p4.x),
      F(p4.y),
      F(thick),
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
    r().symbols.GetSplinePointLinearW(
      this._vec2Buf,
      F(startPos.x),
      F(startPos.y),
      F(endPos.x),
      F(endPos.y),
      F(t),
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
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(p3.x),
      F(p3.y),
      F(p4.x),
      F(p4.y),
      F(t),
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
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(p3.x),
      F(p3.y),
      F(p4.x),
      F(p4.y),
      F(t),
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
      F(p1.x),
      F(p1.y),
      F(c2.x),
      F(c2.y),
      F(p3.x),
      F(p3.y),
      F(t),
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
      F(p1.x),
      F(p1.y),
      F(c2.x),
      F(c2.y),
      F(c3.x),
      F(c3.y),
      F(p4.x),
      F(p4.y),
      F(t),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  /** Check collision between two rectangles */
  static checkCollisionRecs(rec1: Rectangle, rec2: Rectangle): boolean {
    return r().symbols.CheckCollisionRecsW(
      F(rec1.x),
      F(rec1.y),
      F(rec1.width),
      F(rec1.height),
      F(rec2.x),
      F(rec2.y),
      F(rec2.width),
      F(rec2.height),
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
      F(center1.x),
      F(center1.y),
      F(radius1),
      F(center2.x),
      F(center2.y),
      F(radius2),
    );
  }

  /** Check collision between circle and rectangle */
  static checkCollisionCircleRec(center: Vec2, radius: number, rec: Rectangle): boolean {
    return r().symbols.CheckCollisionCircleRecW(
      F(center.x),
      F(center.y),
      F(radius),
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
    );
  }

  /** Check if circle collides with a line created between two points [p1] and [p2] */
  static checkCollisionCircleLine(center: Vec2, radius: number, p1: Vec2, p2: Vec2): boolean {
    return r().symbols.CheckCollisionCircleLineW(
      F(center.x),
      F(center.y),
      F(radius),
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
    );
  }

  /** Check if point is inside rectangle */
  static checkCollisionPointRec(point: Vec2, rec: Rectangle): boolean {
    return r().symbols.CheckCollisionPointRecW(
      F(point.x),
      F(point.y),
      F(rec.x),
      F(rec.y),
      F(rec.width),
      F(rec.height),
    );
  }

  /** Check if point is inside circle */
  static checkCollisionPointCircle(point: Vec2, center: Vec2, radius: number): boolean {
    return r().symbols.CheckCollisionPointCircleW(
      F(point.x),
      F(point.y),
      F(center.x),
      F(center.y),
      F(radius),
    );
  }

  /** Check if point is inside a triangle */
  static checkCollisionPointTriangle(point: Vec2, p1: Vec2, p2: Vec2, p3: Vec2): boolean {
    return r().symbols.CheckCollisionPointTriangleW(
      F(point.x),
      F(point.y),
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      F(p3.x),
      F(p3.y),
    );
  }

  /** Check if point belongs to line created between two points [p1] and [p2] with defined margin [threshold] */
  static checkCollisionPointLine(point: Vec2, p1: Vec2, p2: Vec2, threshold: number): boolean {
    return r().symbols.CheckCollisionPointLineW(
      F(point.x),
      F(point.y),
      F(p1.x),
      F(p1.y),
      F(p2.x),
      F(p2.y),
      threshold | 0,
    );
  }

  /**
   * Check if point is within a polygon described by array of vertices.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static checkCollisionPointPoly(point: Vec2, points: Float32Array): boolean {
    return r().symbols.CheckCollisionPointPolyW(
      F(point.x),
      F(point.y),
      points,
      points.length / 2,
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
      this._colPtBuf,
      F(startPos1.x),
      F(startPos1.y),
      F(endPos1.x),
      F(endPos1.y),
      F(startPos2.x),
      F(startPos2.y),
      F(endPos2.x),
      F(endPos2.y),
    );
    return { collides, collisionPoint: { x: this._colPtBuf[0]!, y: this._colPtBuf[1]! } };
  }

  /** Get collision rectangle for two rectangles collision. Returns null if no overlap */
  static getCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle {
    r().symbols.GetCollisionRecW(
      this._recBuf,
      F(rec1.x),
      F(rec1.y),
      F(rec1.width),
      F(rec1.height),
      F(rec2.x),
      F(rec2.y),
      F(rec2.width),
      F(rec2.height),
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
      F(startPos.x),
      F(startPos.y),
      F(startPos.z),
      F(endPos.x),
      F(endPos.y),
      F(endPos.z),
      col,
    );
  }

  /** Draw a point in 3D space */
  static drawPoint3D(position: Vec3, col: Color): void {
    r().symbols.DrawPoint3DW(F(position.x), F(position.y), F(position.z), col);
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
      F(center.x),
      F(center.y),
      F(center.z),
      F(radius),
      F(rotationAxis.x),
      F(rotationAxis.y),
      F(rotationAxis.z),
      F(rotationAngle),
      col,
    );
  }

  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle3D(v1: Vec3, v2: Vec3, v3: Vec3, col: Color): void {
    r().symbols.DrawTriangle3DW(
      F(v1.x),
      F(v1.y),
      F(v1.z),
      F(v2.x),
      F(v2.y),
      F(v2.z),
      F(v3.x),
      F(v3.y),
      F(v3.z),
      col,
    );
  }

  /** Draw a triangle strip defined by points. Points packed as [x0,y0,z0, x1,y1,z1, ...] in Float32Array */
  static drawTriangleStrip3D(points: Float32Array, col: Color): void {
    r().symbols.DrawTriangleStrip3DW(points, points.length / 3, col);
  }

  /** Draw cube */
  static drawCube(position: Vec3, width: number, height: number, length: number, col: Color): void {
    r().symbols.DrawCubeW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(width),
      F(height),
      F(length),
      col,
    );
  }

  /** Draw cube (Vector version) */
  static drawCubeV(position: Vec3, size: Vec3, col: Color): void {
    r().symbols.DrawCubeVW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(size.x),
      F(size.y),
      F(size.z),
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
    r().symbols.DrawCubeWiresW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(width),
      F(height),
      F(length),
      col,
    );
  }

  /** Draw cube wires (Vector version) */
  static drawCubeWiresV(position: Vec3, size: Vec3, col: Color): void {
    r().symbols.DrawCubeWiresVW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(size.x),
      F(size.y),
      F(size.z),
      col,
    );
  }

  /** Draw sphere */
  static drawSphere(centerPos: Vec3, radius: number, col: Color): void {
    r().symbols.DrawSphereW(F(centerPos.x), F(centerPos.y), F(centerPos.z), F(radius), col);
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
      F(centerPos.x),
      F(centerPos.y),
      F(centerPos.z),
      F(radius),
      rings | 0,
      slices | 0,
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
    r().symbols.DrawSphereWiresW(
      F(centerPos.x),
      F(centerPos.y),
      F(centerPos.z),
      F(radius),
      rings | 0,
      slices | 0,
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
    r().symbols.DrawCylinderW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(radiusTop),
      F(radiusBottom),
      F(height),
      slices | 0,
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
    r().symbols.DrawCylinderExW(
      F(startPos.x),
      F(startPos.y),
      F(startPos.z),
      F(endPos.x),
      F(endPos.y),
      F(endPos.z),
      F(startRadius),
      F(endRadius),
      sides | 0,
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
    r().symbols.DrawCylinderWiresW(
      F(position.x),
      F(position.y),
      F(position.z),
      F(radiusTop),
      F(radiusBottom),
      F(height),
      slices | 0,
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
    r().symbols.DrawCylinderWiresExW(
      F(startPos.x),
      F(startPos.y),
      F(startPos.z),
      F(endPos.x),
      F(endPos.y),
      F(endPos.z),
      F(startRadius),
      F(endRadius),
      sides | 0,
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
    r().symbols.DrawCapsuleW(
      F(startPos.x),
      F(startPos.y),
      F(startPos.z),
      F(endPos.x),
      F(endPos.y),
      F(endPos.z),
      F(radius),
      slices | 0,
      rings | 0,
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
    r().symbols.DrawCapsuleWiresW(
      F(startPos.x),
      F(startPos.y),
      F(startPos.z),
      F(endPos.x),
      F(endPos.y),
      F(endPos.z),
      F(radius),
      slices | 0,
      rings | 0,
      col,
    );
  }

  /** Draw a plane XZ */
  static drawPlane(centerPos: Vec3, size: Vec2, col: Color): void {
    r().symbols.DrawPlaneW(
      F(centerPos.x),
      F(centerPos.y),
      F(centerPos.z),
      F(size.x),
      F(size.y),
      col,
    );
  }

  /** Draw a ray line */
  static drawRay(ray: Ray, col: Color): void {
    r().symbols.DrawRayW(
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      col,
    );
  }

  /** Draw a grid */
  static drawGrid(slices: number, spacing: number): void {
    r().symbols.DrawGridW(slices | 0, F(spacing));
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
    return r().symbols.IsWindowStateW(flag);
  }
  static setWindowState(flags: number): void {
    r().symbols.SetWindowStateW(flags);
  }
  static clearWindowState(flags: number): void {
    r().symbols.ClearWindowStateW(flags);
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
    r().symbols.SetWindowPositionW(x | 0, y | 0);
  }
  static setWindowMonitor(monitor: number): void {
    r().symbols.SetWindowMonitorW(monitor | 0);
  }
  static setWindowMinSize(w: number, h: number): void {
    r().symbols.SetWindowMinSizeW(w | 0, h | 0);
  }
  static setWindowMaxSize(w: number, h: number): void {
    r().symbols.SetWindowMaxSizeW(w | 0, h | 0);
  }
  static setWindowSize(w: number, h: number): void {
    r().symbols.SetWindowSizeW(w | 0, h | 0);
  }
  static setWindowOpacity(opacity: number): void {
    r().symbols.SetWindowOpacityW(F(opacity));
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
    r().symbols.GetMonitorPositionW(this._vec2Buf, monitor | 0);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getMonitorWidth(monitor: number): number {
    return r().symbols.GetMonitorWidthW(monitor);
  }
  static getMonitorHeight(monitor: number): number {
    return r().symbols.GetMonitorHeightW(monitor);
  }
  static getMonitorPhysicalWidth(monitor: number): number {
    return r().symbols.GetMonitorPhysicalWidthW(monitor | 0);
  }
  static getMonitorPhysicalHeight(monitor: number): number {
    return r().symbols.GetMonitorPhysicalHeightW(monitor | 0);
  }
  static getMonitorRefreshRate(monitor: number): number {
    return r().symbols.GetMonitorRefreshRateW(monitor | 0);
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
    const ptr = r().symbols.GetMonitorNameW(monitor | 0);
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
    r().symbols.BeginTextureModeW(target.id, target.texture.width, target.texture.height);
  }
  static endTextureMode(): void {
    r().symbols.EndTextureModeW();
  }
  static beginBlendMode(mode: number): void {
    r().symbols.BeginBlendModeW(mode | 0);
  }
  static endBlendMode(): void {
    r().symbols.EndBlendModeW();
  }
  static beginScissorMode(x: number, y: number, w: number, h: number): void {
    r().symbols.BeginScissorModeW(x | 0, y | 0, w | 0, h | 0);
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
    r().symbols.SetRandomSeedW(seed | 0);
  }
  static getRandomValue(min: number, max: number): number {
    return r().symbols.GetRandomValueW(min | 0, max | 0);
  }

  // --- Misc ---

  static takeScreenshot(fileName: string): void {
    r().symbols.TakeScreenshotW(cstr(fileName));
  }
  static setConfigFlags(flags: number): void {
    r().symbols.SetConfigFlagsW(flags | 0);
  }
  static openURL(url: string): void {
    r().symbols.OpenURLW(cstr(url));
  }

  // --- Input: Keyboard ---

  static isKeyPressed(key: number): boolean {
    return r().symbols.IsKeyPressedW(key | 0);
  }
  static isKeyPressedRepeat(key: number): boolean {
    return r().symbols.IsKeyPressedRepeatW(key | 0);
  }
  static isKeyDown(key: number): boolean {
    return r().symbols.IsKeyDownW(key | 0);
  }
  static isKeyReleased(key: number): boolean {
    return r().symbols.IsKeyReleasedW(key | 0);
  }
  static isKeyUp(key: number): boolean {
    return r().symbols.IsKeyUpW(key | 0);
  }
  static getKeyPressed(): number {
    return r().symbols.GetKeyPressedW();
  }
  static getCharPressed(): number {
    return r().symbols.GetCharPressedW();
  }
  static setExitKey(key: number): void {
    r().symbols.SetExitKeyW(key | 0);
  }

  // --- Input: Gamepad ---

  static isGamepadAvailable(gamepad: number): boolean {
    return r().symbols.IsGamepadAvailableW(gamepad);
  }
  static getGamepadName(gamepad: number): string {
    const cstr = r().symbols.GetGamepadNameW(gamepad | 0);
    if (!cstr) return '';
    return cstr.toString();
  }
  static isGamepadButtonPressed(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonPressedW(gamepad | 0, button | 0);
  }
  static isGamepadButtonDown(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonDownW(gamepad | 0, button | 0);
  }
  static isGamepadButtonReleased(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonReleasedW(gamepad | 0, button | 0);
  }
  static isGamepadButtonUp(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonUpW(gamepad | 0, button | 0);
  }
  static getGamepadButtonPressed(): number {
    return r().symbols.GetGamepadButtonPressedW();
  }
  static getGamepadAxisCount(gamepad: number): number {
    return r().symbols.GetGamepadAxisCountW(gamepad | 0);
  }
  static getGamepadAxisMovement(gamepad: number, axis: number): number {
    return r().symbols.GetGamepadAxisMovementW(gamepad | 0, axis | 0);
  }
  static setGamepadMappings(mappings: string): number {
    return r().symbols.SetGamepadMappingsW(cstr(mappings));
  }

  // --- Input: Mouse ---

  static isMouseButtonPressed(button: number): boolean {
    return r().symbols.IsMouseButtonPressedW(button | 0);
  }
  static isMouseButtonDown(button: number): boolean {
    return r().symbols.IsMouseButtonDownW(button | 0);
  }
  static isMouseButtonReleased(button: number): boolean {
    return r().symbols.IsMouseButtonReleasedW(button | 0);
  }
  static isMouseButtonUp(button: number): boolean {
    return r().symbols.IsMouseButtonUpW(button | 0);
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
    r().symbols.SetMousePositionW(x | 0, y | 0);
  }
  static setMouseOffset(x: number, y: number): void {
    r().symbols.SetMouseOffsetW(x | 0, y | 0);
  }
  static setMouseScale(scaleX: number, scaleY: number): void {
    r().symbols.SetMouseScaleW(F(scaleX), F(scaleY));
  }
  static getMouseWheelMove(): number {
    return r().symbols.GetMouseWheelMoveW();
  }

  static getMouseWheelMoveV(): Vec2 {
    r().symbols.GetMouseWheelMoveVW(this._vec2Buf);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static setMouseCursor(cursor: number): void {
    r().symbols.SetMouseCursorW(cursor | 0);
  }

  // --- Input: Touch ---

  static getTouchX(): number {
    return r().symbols.GetTouchXW();
  }
  static getTouchY(): number {
    return r().symbols.GetTouchYW();
  }

  static getTouchPosition(index: number): Vec2 {
    r().symbols.GetTouchPositionW(this._vec2Buf, index | 0);
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getTouchPointId(index: number): number {
    return r().symbols.GetTouchPointIdW(index | 0);
  }
  static getTouchPointCount(): number {
    return r().symbols.GetTouchPointCountW();
  }

  // --- Gestures ---

  static setGesturesEnabled(flags: number): void {
    r().symbols.SetGesturesEnabledW(flags | 0);
  }
  static isGestureDetected(gesture: number): boolean {
    return r().symbols.IsGestureDetectedW(gesture | 0);
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
    r().symbols.UpdateCameraW(pos, tar, up, fovy, proj, mode | 0);
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
      F(movement.x),
      F(movement.y),
      F(movement.z),
      F(rotation.x),
      F(rotation.y),
      F(rotation.z),
      F(zoom),
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
      position.x,
      position.y,
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
    );
    return {
      position: { x: outPos[0]!, y: outPos[1]!, z: outPos[2]! },
      direction: { x: outDir[0]!, y: outDir[1]!, z: outDir[2]! },
    };
  }

  static getWorldToScreen(position: Vec3, camera: Camera3D): Vec2 {
    r().symbols.GetWorldToScreenW(
      this._vec2Buf,
      F(position.x),
      F(position.y),
      F(position.z),
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getWorldToScreen2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetWorldToScreen2DW(
      this._vec2Buf,
      F(position.x),
      F(position.y),
      F(camera.offset.x),
      F(camera.offset.y),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.rotation),
      F(camera.zoom),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  static getScreenToWorld2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetScreenToWorld2DW(
      this._vec2Buf,
      F(position.x),
      F(position.y),
      F(camera.offset.x),
      F(camera.offset.y),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.rotation),
      F(camera.zoom),
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  // --- DrawFPS ---

  static drawFPS(posX: number, posY: number): void {
    r().symbols.DrawFPSW(posX | 0, posY | 0);
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
    r().symbols.UnloadTextureW(texture.id);
  }

  static isTextureValid(texture: Texture2D): boolean {
    return r().symbols.IsTextureValidW(texture.id, texture.width, texture.height);
  }

  static loadRenderTexture(width: number, height: number): RenderTexture2D {
    r().symbols.LoadRenderTextureW(
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
    r().symbols.UnloadRenderTextureW(target.id);
  }

  static isRenderTextureValid(target: RenderTexture2D): boolean {
    return r().symbols.IsRenderTextureValidW(target.id);
  }

  static genTextureMipmaps(texture: Texture2D): void {
    r().symbols.GenTextureMipmapsW(texture.id);
  }

  static setTextureFilter(texture: Texture2D, filter: number): void {
    r().symbols.SetTextureFilterW(texture.id, filter);
  }

  static setTextureWrap(texture: Texture2D, wrap: number): void {
    r().symbols.SetTextureWrapW(texture.id, wrap);
  }

  static drawTexture(texture: Texture2D, posX: number, posY: number, tint: Color): void {
    r().symbols.DrawTextureW(texture.id, texture.width, texture.height, posX, posY, tint);
  }

  static drawTextureEx(
    texture: Texture2D,
    position: Vec2,
    rotation: number,
    scale: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextureExW(
      texture.id,
      texture.width,
      texture.height,
      position.x,
      position.y,
      F(rotation),
      F(scale),
      tint,
    );
  }

  static drawTextureRec(texture: Texture2D, source: Rectangle, position: Vec2, tint: Color): void {
    r().symbols.DrawTextureRecW(
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
    r().symbols.DrawTextureProW(
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
      F(rotation),
      tint,
    );
  }

  // --- Model ---

  private static _bbMin = new Float32Array(3);
  private static _bbMax = new Float32Array(3);

  static loadModel(fileName: string): Model {
    return r().symbols.LoadModelW(cstr(fileName));
  }

  static unloadModel(model: Model): void {
    r().symbols.UnloadModelW(model);
  }

  static isModelValid(model: Model): boolean {
    return r().symbols.IsModelValidW(model);
  }

  static getModelBoundingBox(model: Model): BoundingBox {
    r().symbols.GetModelBoundingBoxW(this._bbMin, this._bbMax, model);
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static drawModel(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelW(
      model,
      F(position.x),
      F(position.y),
      F(position.z),
      F(scale),
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
    r().symbols.DrawModelExW(
      model,
      F(position.x),
      F(position.y),
      F(position.z),
      F(rotationAxis.x),
      F(rotationAxis.y),
      F(rotationAxis.z),
      F(rotationAngle),
      F(scale.x),
      F(scale.y),
      F(scale.z),
      tint,
    );
  }

  static drawModelWires(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelWiresW(
      model,
      F(position.x),
      F(position.y),
      F(position.z),
      F(scale),
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
    r().symbols.DrawModelWiresExW(
      model,
      F(position.x),
      F(position.y),
      F(position.z),
      F(rotationAxis.x),
      F(rotationAxis.y),
      F(rotationAxis.z),
      F(rotationAngle),
      F(scale.x),
      F(scale.y),
      F(scale.z),
      tint,
    );
  }

  // --- Shapes texture ---

  static setShapesTexture(texture: Texture2D, source: Rectangle): void {
    r().symbols.SetShapesTextureW(
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
    return r().symbols.ColorToIntW(c);
  }

  static colorNormalize(c: Color): { x: number; y: number; z: number; w: number } {
    r().symbols.ColorNormalizeW(this._vec4Buf, c);
    return {
      x: this._vec4Buf[0]!,
      y: this._vec4Buf[1]!,
      z: this._vec4Buf[2]!,
      w: this._vec4Buf[3]!,
    };
  }

  static colorFromNormalized(normalized: { x: number; y: number; z: number; w: number }): Color {
    return r().symbols.ColorFromNormalizedW(
      F(normalized.x),
      F(normalized.y),
      F(normalized.z),
      F(normalized.w),
    );
  }

  static colorToHSV(c: Color): { h: number; s: number; v: number } {
    r().symbols.ColorToHSVW(this._vec3Buf2, c);
    return { h: this._vec3Buf2[0]!, s: this._vec3Buf2[1]!, v: this._vec3Buf2[2]! };
  }

  static colorFromHSV(hue: number, saturation: number, value: number): Color {
    return r().symbols.ColorFromHSVW(F(hue), F(saturation), F(value));
  }

  static colorTint(color: Color, tint: Color): Color {
    return r().symbols.ColorTintW(color, tint);
  }
  static colorBrightness(color: Color, factor: number): Color {
    return r().symbols.ColorBrightnessW(color, F(factor));
  }
  static colorContrast(color: Color, contrast: number): Color {
    return r().symbols.ColorContrastW(color, F(contrast));
  }
  static colorAlpha(color: Color, alpha: number): Color {
    return r().symbols.ColorAlphaW(color, F(alpha));
  }
  static colorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
    return r().symbols.ColorAlphaBlendW(dst, src, tint);
  }
  static colorLerp(color1: Color, color2: Color, factor: number): Color {
    return r().symbols.ColorLerpW(color1, color2, F(factor));
  }
  static getColor(hexValue: number): Color {
    return r().symbols.GetColorW(hexValue);
  }
  static fade(color: Color, alpha: number): Color {
    return r().symbols.FadeW(color, F(alpha));
  }
  static colorIsEqual(col1: Color, col2: Color): boolean {
    return r().symbols.ColorIsEqualW(col1, col2);
  }
  static getPixelDataSize(width: number, height: number, format: number): number {
    return r().symbols.GetPixelDataSizeW(width, height, format);
  }

  // --- Font ---

  static loadFont(fileName: string): Font {
    return r().symbols.LoadFontW(cstr(fileName));
  }

  static loadFontEx(fileName: string, fontSize: number): Font {
    return r().symbols.LoadFontExW(cstr(fileName), fontSize);
  }

  static getFontDefault(): Font {
    return r().symbols.GetFontDefaultW();
  }

  static unloadFont(font: Font): void {
    r().symbols.UnloadFontW(font);
  }

  static isFontValid(font: Font): boolean {
    return r().symbols.IsFontValidW(font);
  }

  static measureText(text: string, fontSize: number): number {
    return r().symbols.MeasureTextW(cstr(text), fontSize);
  }

  static measureTextEx(font: Font, text: string, fontSize: number, spacing: number): Vec2 {
    r().symbols.MeasureTextExW(this._vec2Buf, font, cstr(text), F(fontSize), F(spacing));
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
    r().symbols.DrawTextExW(font, cstr(text), F(position.x), F(position.y), F(fontSize), F(spacing), tint);
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
      font,
      cstr(text),
      F(position.x),
      F(position.y),
      F(origin.x),
      F(origin.y),
      F(rotation),
      F(fontSize),
      F(spacing),
      tint,
    );
  }

  static setTextLineSpacing(spacing: number): void {
    r().symbols.SetTextLineSpacingW(spacing);
  }

  // --- Core extensions ---

  static setGamepadVibration(
    gamepad: number,
    leftMotor: number,
    rightMotor: number,
    duration: number,
  ): void {
    r().symbols.SetGamepadVibrationW(gamepad, F(leftMotor), F(rightMotor), F(duration));
  }

  static traceLog(logLevel: number, text: string): void {
    r().symbols.TraceLogW(logLevel, cstr(text));
  }

  static setTraceLogLevel(logLevel: number): void {
    r().symbols.SetTraceLogLevelW(logLevel);
  }

  static setWindowIcon(image: Image): void {
    r().symbols.SetWindowIconW(image);
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
      position.x,
      position.y,
      width,
      height,
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
    );
    return {
      position: { x: this._rayPosBuf2[0]!, y: this._rayPosBuf2[1]!, z: this._rayPosBuf2[2]! },
      direction: { x: this._rayDirBuf2[0]!, y: this._rayDirBuf2[1]!, z: this._rayDirBuf2[2]! },
    };
  }

  static getWorldToScreenEx(position: Vec3, camera: Camera3D, width: number, height: number): Vec2 {
    r().symbols.GetWorldToScreenExW(
      this._vec2Buf,
      F(position.x),
      F(position.y),
      F(position.z),
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
      width,
      height,
    );
    return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
  }

  private static _matBuf = new Float32Array(16);

  static getCameraMatrix(camera: Camera3D): Float32Array {
    r().symbols.GetCameraMatrixW(
      this._matBuf,
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
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
      F(camera.rotation),
      F(camera.zoom),
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
    return r().symbols.ComputeCRC32W(data, dataSize);
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
    return r().symbols.IsShaderValidW(shader);
  }
  static getShaderLocation(shader: Shader, uniformName: string): number {
    return r().symbols.GetShaderLocationW(shader, cstr(uniformName));
  }
  static getShaderLocationAttrib(shader: Shader, attribName: string): number {
    return r().symbols.GetShaderLocationAttribW(shader, cstr(attribName));
  }

  static setShaderValueMatrix(shader: Shader, locIndex: number, mat: Float32Array): void {
    r().symbols.SetShaderValueMatrixW(shader, locIndex, mat);
  }

  static setShaderValueTexture(shader: Shader, locIndex: number, texture: Texture2D): void {
    r().symbols.SetShaderValueTextureW(shader, locIndex, texture.id, texture.width, texture.height);
  }

  static unloadShader(shader: Shader): void {
    r().symbols.UnloadShaderW(shader);
  }
  static beginShaderMode(shader: Shader): void {
    r().symbols.BeginShaderModeW(shader);
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
    return r().symbols.LoadImageRawW(cstr(fileName), width, height, format, headerSize);
  }

  private static _imgAnimSlot = new Int32Array(1);
  private static _imgAnimFrames = new Int32Array(1);

  static loadImageAnim(fileName: string): { image: Image; frames: number } {
    r().symbols.LoadImageAnimW(this._imgAnimSlot, this._imgAnimFrames, cstr(fileName));
    return { image: this._imgAnimSlot[0]!, frames: this._imgAnimFrames[0]! };
  }

  static loadImageFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Image {
    return r().symbols.LoadImageFromMemoryW(cstr(fileType), fileData, dataSize);
  }

  static loadImageFromTexture(texture: Texture2D): Image {
    return r().symbols.LoadImageFromTextureW(texture.id, texture.width, texture.height);
  }

  static loadImageFromScreen(): Image {
    return r().symbols.LoadImageFromScreenW();
  }
  static isImageValid(image: Image): boolean {
    return r().symbols.IsImageValidW(image);
  }
  static unloadImage(image: Image): void {
    r().symbols.UnloadImageW(image);
  }
  static exportImage(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageW(image, cstr(fileName));
  }
  static exportImageAsCode(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageAsCodeW(image, cstr(fileName));
  }

  // --- Image generation ---

  static genImageColor(width: number, height: number, color: Color): Image {
    return r().symbols.GenImageColorW(width, height, color);
  }
  static genImageGradientLinear(
    width: number,
    height: number,
    direction: number,
    start: Color,
    end: Color,
  ): Image {
    return r().symbols.GenImageGradientLinearW(width, height, direction, start, end);
  }
  static genImageGradientRadial(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientRadialW(width, height, F(density), inner, outer);
  }
  static genImageGradientSquare(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientSquareW(width, height, F(density), inner, outer);
  }
  static genImageChecked(
    width: number,
    height: number,
    checksX: number,
    checksY: number,
    col1: Color,
    col2: Color,
  ): Image {
    return r().symbols.GenImageCheckedW(width, height, checksX, checksY, col1, col2);
  }
  static genImageWhiteNoise(width: number, height: number, factor: number): Image {
    return r().symbols.GenImageWhiteNoiseW(width, height, F(factor));
  }
  static genImagePerlinNoise(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
  ): Image {
    return r().symbols.GenImagePerlinNoiseW(width, height, offsetX, offsetY, F(scale));
  }
  static genImageCellular(width: number, height: number, tileSize: number): Image {
    return r().symbols.GenImageCellularW(width, height, tileSize);
  }
  static genImageText(width: number, height: number, text: string): Image {
    return r().symbols.GenImageTextW(width, height, cstr(text));
  }

  // --- Image manipulation ---

  static imageCopy(image: Image): Image {
    return r().symbols.ImageCopyW(image);
  }
  static imageFromImage(image: Image, rec: Rectangle): Image {
    return r().symbols.ImageFromImageW(image, rec.x, rec.y, rec.width, rec.height);
  }
  static imageFromChannel(image: Image, selectedChannel: number): Image {
    return r().symbols.ImageFromChannelW(image, selectedChannel);
  }
  static imageText(text: string, fontSize: number, color: Color): Image {
    return r().symbols.ImageTextW(cstr(text), fontSize, color);
  }
  static imageTextEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): Image {
    return r().symbols.ImageTextExW(font, cstr(text), fontSize, F(spacing), tint);
  }

  static imageFormat(image: Image, newFormat: number): void {
    r().symbols.ImageFormatW(image, newFormat);
  }
  static imageCrop(image: Image, rec: Rectangle): void {
    r().symbols.ImageCropW(image, rec.x, rec.y, rec.width, rec.height);
  }
  static imageAlphaCrop(image: Image, threshold: number): void {
    r().symbols.ImageAlphaCropW(image, F(threshold));
  }
  static imageAlphaClear(image: Image, color: Color, threshold: number): void {
    r().symbols.ImageAlphaClearW(image, color, F(threshold));
  }
  static imageAlphaMask(image: Image, alphaMask: Image): void {
    r().symbols.ImageAlphaMaskW(image, alphaMask);
  }
  static imageAlphaPremultiply(image: Image): void {
    r().symbols.ImageAlphaPremultiplyW(image);
  }
  static imageBlurGaussian(image: Image, blurSize: number): void {
    r().symbols.ImageBlurGaussianW(image, blurSize);
  }
  static imageResize(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeW(image, newWidth, newHeight);
  }
  static imageResizeNN(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeNNW(image, newWidth, newHeight);
  }
  static imageResizeCanvas(
    image: Image,
    newWidth: number,
    newHeight: number,
    offsetX: number,
    offsetY: number,
    fill: Color,
  ): void {
    r().symbols.ImageResizeCanvasW(image, newWidth, newHeight, offsetX, offsetY, fill);
  }
  static imageMipmaps(image: Image): void {
    r().symbols.ImageMipmapsW(image);
  }
  static imageDither(image: Image, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void {
    r().symbols.ImageDitherW(image, rBpp, gBpp, bBpp, aBpp);
  }
  static imageFlipVertical(image: Image): void {
    r().symbols.ImageFlipVerticalW(image);
  }
  static imageFlipHorizontal(image: Image): void {
    r().symbols.ImageFlipHorizontalW(image);
  }
  static imageRotate(image: Image, degrees: number): void {
    r().symbols.ImageRotateW(image, F(degrees));
  }
  static imageRotateCW(image: Image): void {
    r().symbols.ImageRotateCWW(image);
  }
  static imageRotateCCW(image: Image): void {
    r().symbols.ImageRotateCCWW(image);
  }
  static imageColorTint(image: Image, color: Color): void {
    r().symbols.ImageColorTintW(image, color);
  }
  static imageColorInvert(image: Image): void {
    r().symbols.ImageColorInvertW(image);
  }
  static imageColorGrayscale(image: Image): void {
    r().symbols.ImageColorGrayscaleW(image);
  }
  static imageColorContrast(image: Image, contrast: number): void {
    r().symbols.ImageColorContrastW(image, F(contrast));
  }
  static imageColorBrightness(image: Image, brightness: number): void {
    r().symbols.ImageColorBrightnessW(image, brightness);
  }
  static imageColorReplace(image: Image, color: Color, replace: Color): void {
    r().symbols.ImageColorReplaceW(image, color, replace);
  }

  // --- Image info ---

  static getImageAlphaBorder(image: Image, threshold: number): Rectangle {
    r().symbols.GetImageAlphaBorderW(this._recBuf, image, F(threshold));
    return {
      x: this._recBuf[0]!,
      y: this._recBuf[1]!,
      width: this._recBuf[2]!,
      height: this._recBuf[3]!,
    };
  }

  static getImageColor(image: Image, x: number, y: number): Color {
    return r().symbols.GetImageColorW(image, x, y);
  }

  // --- Image drawing ---

  static imageClearBackground(dst: Image, color: Color): void {
    r().symbols.ImageClearBackgroundW(dst, color);
  }
  static imageDrawPixel(dst: Image, posX: number, posY: number, color: Color): void {
    r().symbols.ImageDrawPixelW(dst, posX, posY, color);
  }
  static imageDrawPixelV(dst: Image, position: Vec2, color: Color): void {
    r().symbols.ImageDrawPixelVW(dst, position.x, position.y, color);
  }
  static imageDrawLine(
    dst: Image,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawLineW(dst, startX, startY, endX, endY, color);
  }
  static imageDrawLineV(dst: Image, start: Vec2, end: Vec2, color: Color): void {
    r().symbols.ImageDrawLineVW(dst, start.x, start.y, end.x, end.y, color);
  }
  static imageDrawLineEx(dst: Image, start: Vec2, end: Vec2, thick: number, color: Color): void {
    r().symbols.ImageDrawLineExW(dst, start.x, start.y, end.x, end.y, thick, color);
  }
  static imageDrawCircle(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleW(dst, centerX, centerY, radius, color);
  }
  static imageDrawCircleV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleVW(dst, center.x, center.y, radius, color);
  }
  static imageDrawCircleLines(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleLinesW(dst, centerX, centerY, radius, color);
  }
  static imageDrawCircleLinesV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleLinesVW(dst, center.x, center.y, radius, color);
  }
  static imageDrawRectangle(
    dst: Image,
    posX: number,
    posY: number,
    w: number,
    h: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawRectangleW(dst, posX, posY, w, h, color);
  }
  static imageDrawRectangleV(dst: Image, position: Vec2, size: Vec2, color: Color): void {
    r().symbols.ImageDrawRectangleVW(dst, position.x, position.y, size.x, size.y, color);
  }
  static imageDrawRectangleRec(dst: Image, rec: Rectangle, color: Color): void {
    r().symbols.ImageDrawRectangleRecW(dst, rec.x, rec.y, rec.width, rec.height, color);
  }
  static imageDrawRectangleLines(dst: Image, rec: Rectangle, thick: number, color: Color): void {
    r().symbols.ImageDrawRectangleLinesW(dst, rec.x, rec.y, rec.width, rec.height, thick, color);
  }
  static imageDrawTriangle(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, color);
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
    r().symbols.ImageDrawTriangleExW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, c1, c2, c3);
  }
  static imageDrawTriangleLines(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleLinesW(dst, v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, color);
  }
  static imageDrawTriangleFan(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleFanW(dst, points, points.length / 2, color);
  }
  static imageDrawTriangleStrip(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleStripW(dst, points, points.length / 2, color);
  }
  static imageDraw(
    dst: Image,
    src: Image,
    srcRec: Rectangle,
    dstRec: Rectangle,
    tint: Color,
  ): void {
    r().symbols.ImageDrawW(
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
    r().symbols.ImageDrawTextW(dst, cstr(text), posX, posY, fontSize, color);
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
      dst,
      font,
      cstr(text),
      position.x,
      position.y,
      fontSize,
      F(spacing),
      tint,
    );
  }

  // --- Texture extensions ---

  static loadTextureFromImage(image: Image): Texture2D {
    r().symbols.LoadTextureFromImageW(this._texOutId, this._texOutW, this._texOutH, image);
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static loadTextureCubemap(image: Image, layout: number): Texture2D {
    r().symbols.LoadTextureCubemapW(this._texOutId, this._texOutW, this._texOutH, image, layout);
    return { id: this._texOutId[0]!, width: this._texOutW[0]!, height: this._texOutH[0]! };
  }

  static updateTexture(texture: Texture2D, pixels: Uint8Array): void {
    r().symbols.UpdateTextureW(texture.id, texture.width, texture.height, pixels);
  }

  static updateTextureRec(texture: Texture2D, rec: Rectangle, pixels: Uint8Array): void {
    r().symbols.UpdateTextureRecW(
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
    r().symbols.DrawTextureNPatchW(
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
      F(rotation),
      tint,
    );
  }

  static getPixelColor(srcPtr: number, format: number): Color {
    return r().symbols.GetPixelColorW(srcPtr as any, format);
  }
  static setPixelColor(dstPtr: number, color: Color, format: number): void {
    r().symbols.SetPixelColorW(dstPtr as any, color, format);
  }

  static drawBoundingBox(box: BoundingBox, color: Color): void {
    r().symbols.DrawBoundingBoxW(
      F(box.min.x),
      F(box.min.y),
      F(box.min.z),
      F(box.max.x),
      F(box.max.y),
      F(box.max.z),
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
    r().symbols.DrawBillboardW(
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      F(position.x),
      F(position.y),
      F(position.z),
      F(scale),
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
    r().symbols.DrawBillboardRecW(
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      F(position.x),
      F(position.y),
      F(position.z),
      F(size.x),
      F(size.y),
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
    r().symbols.DrawBillboardProW(
      F(camera.position.x),
      F(camera.position.y),
      F(camera.position.z),
      F(camera.target.x),
      F(camera.target.y),
      F(camera.target.z),
      F(camera.up.x),
      F(camera.up.y),
      F(camera.up.z),
      F(camera.fovy),
      camera.projection,
      texture.id,
      texture.width,
      texture.height,
      source.x,
      source.y,
      source.width,
      source.height,
      F(position.x),
      F(position.y),
      F(position.z),
      F(up.x),
      F(up.y),
      F(up.z),
      F(size.x),
      F(size.y),
      F(origin.x),
      F(origin.y),
      F(rotation),
      tint,
    );
  }

  // --- Model from mesh ---

  static loadModelFromMesh(mesh: Mesh): Model {
    return r().symbols.LoadModelFromMeshW(mesh);
  }

  // --- Mesh management ---

  static unloadMesh(mesh: Mesh): void {
    r().symbols.UnloadMeshW(mesh);
  }
  static uploadMesh(mesh: Mesh, dynamic: boolean): void {
    r().symbols.UploadMeshW(mesh, dynamic);
  }

  static getMeshBoundingBox(mesh: Mesh): BoundingBox {
    r().symbols.GetMeshBoundingBoxW(this._bbMin, this._bbMax, mesh);
    return {
      min: { x: this._bbMin[0]!, y: this._bbMin[1]!, z: this._bbMin[2]! },
      max: { x: this._bbMax[0]!, y: this._bbMax[1]!, z: this._bbMax[2]! },
    };
  }

  static genMeshTangents(mesh: Mesh): void {
    r().symbols.GenMeshTangentsW(mesh);
  }
  static exportMesh(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshW(mesh, cstr(fileName));
  }
  static exportMeshAsCode(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshAsCodeW(mesh, cstr(fileName));
  }

  // --- Mesh generation ---

  static genMeshPoly(sides: number, radius: number): Mesh {
    return r().symbols.GenMeshPolyW(sides, F(radius));
  }
  static genMeshPlane(width: number, length: number, resX: number, resZ: number): Mesh {
    return r().symbols.GenMeshPlaneW(F(width), F(length), resX, resZ);
  }
  static genMeshCube(width: number, height: number, length: number): Mesh {
    return r().symbols.GenMeshCubeW(F(width), F(height), F(length));
  }
  static genMeshSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshSphereW(F(radius), rings, slices);
  }
  static genMeshHemiSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshHemiSphereW(F(radius), rings, slices);
  }
  static genMeshCylinder(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshCylinderW(F(radius), F(height), slices);
  }
  static genMeshCone(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshConeW(F(radius), F(height), slices);
  }
  static genMeshTorus(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshTorusW(F(radius), F(size), radSeg, sides);
  }
  static genMeshKnot(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshKnotW(F(radius), F(size), radSeg, sides);
  }
  static genMeshHeightmap(heightmap: Image, size: Vec3): Mesh {
    return r().symbols.GenMeshHeightmapW(heightmap, F(size.x), F(size.y), F(size.z));
  }
  static genMeshCubicmap(cubicmap: Image, cubeSize: Vec3): Mesh {
    return r().symbols.GenMeshCubicmapW(
      cubicmap,
      F(cubeSize.x),
      F(cubeSize.y),
      F(cubeSize.z),
    );
  }

  // --- Material management ---

  static loadMaterialDefault(): Material {
    return r().symbols.LoadMaterialDefaultW();
  }
  static isMaterialValid(material: Material): boolean {
    return r().symbols.IsMaterialValidW(material);
  }
  static unloadMaterial(material: Material): void {
    r().symbols.UnloadMaterialW(material);
  }
  static setMaterialTexture(material: Material, mapType: number, texture: Texture2D): void {
    r().symbols.SetMaterialTextureW(material, mapType, texture.id, texture.width, texture.height);
  }
  static setModelMeshMaterial(model: Model, meshId: number, materialId: number): void {
    r().symbols.SetModelMeshMaterialW(model, meshId, materialId);
  }

  // --- Model animations ---

  static loadModelAnimations(fileName: string): { startSlot: number; count: number } {
    r().symbols.LoadModelAnimationsW(this._animSlotStart, this._animCount, cstr(fileName));
    return { startSlot: this._animSlotStart[0]!, count: this._animCount[0]! };
  }

  static updateModelAnimation(model: Model, anim: ModelAnimation, frame: number): void {
    r().symbols.UpdateModelAnimationW(model, anim, F(frame));
  }
  static updateModelAnimationEx(
    model: Model,
    animA: ModelAnimation,
    frameA: number,
    animB: ModelAnimation,
    frameB: number,
    blend: number,
  ): void {
    r().symbols.UpdateModelAnimationExW(model, animA, F(frameA), animB, F(frameB), F(blend));
  }
  static unloadModelAnimations(startSlot: number, count: number): void {
    r().symbols.UnloadModelAnimationsW(startSlot, count);
  }
  static isModelAnimationValid(model: Model, anim: ModelAnimation): boolean {
    return r().symbols.IsModelAnimationValidW(model, anim);
  }

  // --- Collision detection ---

  static checkCollisionSpheres(
    center1: Vec3,
    radius1: number,
    center2: Vec3,
    radius2: number,
  ): boolean {
    return r().symbols.CheckCollisionSpheresW(
      F(center1.x),
      F(center1.y),
      F(center1.z),
      F(radius1),
      F(center2.x),
      F(center2.y),
      F(center2.z),
      F(radius2),
    );
  }

  static checkCollisionBoxes(box1: BoundingBox, box2: BoundingBox): boolean {
    return r().symbols.CheckCollisionBoxesW(
      F(box1.min.x),
      F(box1.min.y),
      F(box1.min.z),
      F(box1.max.x),
      F(box1.max.y),
      F(box1.max.z),
      F(box2.min.x),
      F(box2.min.y),
      F(box2.min.z),
      F(box2.max.x),
      F(box2.max.y),
      F(box2.max.z),
    );
  }

  static checkCollisionBoxSphere(box: BoundingBox, center: Vec3, radius: number): boolean {
    return r().symbols.CheckCollisionBoxSphereW(
      F(box.min.x),
      F(box.min.y),
      F(box.min.z),
      F(box.max.x),
      F(box.max.y),
      F(box.max.z),
      F(center.x),
      F(center.y),
      F(center.z),
      F(radius),
    );
  }
  static getRayCollisionSphere(ray: Ray, center: Vec3, radius: number): RayCollision {
    r().symbols.GetRayCollisionSphereW(
      this._rcHit,
      this._rcDist,
      this._rcPt,
      this._rcNorm,
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      F(center.x),
      F(center.y),
      F(center.z),
      F(radius),
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
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      F(box.min.x),
      F(box.min.y),
      F(box.min.z),
      F(box.max.x),
      F(box.max.y),
      F(box.max.z),
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
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      F(p1.x),
      F(p1.y),
      F(p1.z),
      F(p2.x),
      F(p2.y),
      F(p2.z),
      F(p3.x),
      F(p3.y),
      F(p3.z),
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
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      F(p1.x),
      F(p1.y),
      F(p1.z),
      F(p2.x),
      F(p2.y),
      F(p2.z),
      F(p3.x),
      F(p3.y),
      F(p3.z),
      F(p4.x),
      F(p4.y),
      F(p4.z),
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
    r().symbols.SetMasterVolumeW(F(volume));
  }
  static getMasterVolume(): number {
    return r().symbols.GetMasterVolumeW();
  }

  // --- Wave ---

  static loadWave(fileName: string): Wave {
    return r().symbols.LoadWaveW(cstr(fileName));
  }
  static loadWaveFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Wave {
    return r().symbols.LoadWaveFromMemoryW(cstr(fileType), fileData, dataSize);
  }
  static isWaveValid(wave: Wave): boolean {
    return r().symbols.IsWaveValidW(wave);
  }
  static unloadWave(wave: Wave): void {
    r().symbols.UnloadWaveW(wave);
  }
  static exportWave(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveW(wave, cstr(fileName));
  }
  static exportWaveAsCode(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveAsCodeW(wave, cstr(fileName));
  }
  static waveCopy(wave: Wave): Wave {
    return r().symbols.WaveCopyW(wave);
  }
  static waveCrop(wave: Wave, initFrame: number, finalFrame: number): void {
    r().symbols.WaveCropW(wave, initFrame, finalFrame);
  }
  static waveFormat(wave: Wave, sampleRate: number, sampleSize: number, channels: number): void {
    r().symbols.WaveFormatW(wave, sampleRate, sampleSize, channels);
  }

  // --- Sound ---

  static loadSound(fileName: string): Sound {
    return r().symbols.LoadSoundW(cstr(fileName));
  }
  static loadSoundFromWave(wave: Wave): Sound {
    return r().symbols.LoadSoundFromWaveW(wave);
  }
  static loadSoundAlias(source: Sound): Sound {
    return r().symbols.LoadSoundAliasW(source);
  }
  static isSoundValid(sound: Sound): boolean {
    return r().symbols.IsSoundValidW(sound);
  }
  static unloadSound(sound: Sound): void {
    r().symbols.UnloadSoundW(sound);
  }
  static unloadSoundAlias(alias: Sound): void {
    r().symbols.UnloadSoundAliasW(alias);
  }
  static playSound(sound: Sound): void {
    r().symbols.PlaySoundW(sound);
  }
  static stopSound(sound: Sound): void {
    r().symbols.StopSoundW(sound);
  }
  static pauseSound(sound: Sound): void {
    r().symbols.PauseSoundW(sound);
  }
  static resumeSound(sound: Sound): void {
    r().symbols.ResumeSoundW(sound);
  }
  static isSoundPlaying(sound: Sound): boolean {
    return r().symbols.IsSoundPlayingW(sound);
  }
  static setSoundVolume(sound: Sound, volume: number): void {
    r().symbols.SetSoundVolumeW(sound, F(volume));
  }
  static setSoundPitch(sound: Sound, pitch: number): void {
    r().symbols.SetSoundPitchW(sound, F(pitch));
  }
  static setSoundPan(sound: Sound, pan: number): void {
    r().symbols.SetSoundPanW(sound, F(pan));
  }

  // --- Music ---

  static loadMusicStream(fileName: string): Music {
    return r().symbols.LoadMusicStreamW(cstr(fileName));
  }
  static loadMusicStreamFromMemory(fileType: string, data: Uint8Array, dataSize: number): Music {
    return r().symbols.LoadMusicStreamFromMemoryW(cstr(fileType), data, dataSize);
  }
  static isMusicValid(music: Music): boolean {
    return r().symbols.IsMusicValidW(music);
  }
  static unloadMusicStream(music: Music): void {
    r().symbols.UnloadMusicStreamW(music);
  }
  static playMusicStream(music: Music): void {
    r().symbols.PlayMusicStreamW(music);
  }
  static isMusicStreamPlaying(music: Music): boolean {
    return r().symbols.IsMusicStreamPlayingW(music);
  }
  static updateMusicStream(music: Music): void {
    r().symbols.UpdateMusicStreamW(music);
  }
  static stopMusicStream(music: Music): void {
    r().symbols.StopMusicStreamW(music);
  }
  static pauseMusicStream(music: Music): void {
    r().symbols.PauseMusicStreamW(music);
  }
  static resumeMusicStream(music: Music): void {
    r().symbols.ResumeMusicStreamW(music);
  }
  static seekMusicStream(music: Music, position: number): void {
    r().symbols.SeekMusicStreamW(music, F(position));
  }
  static setMusicVolume(music: Music, volume: number): void {
    r().symbols.SetMusicVolumeW(music, F(volume));
  }
  static setMusicPitch(music: Music, pitch: number): void {
    r().symbols.SetMusicPitchW(music, F(pitch));
  }
  static setMusicPan(music: Music, pan: number): void {
    r().symbols.SetMusicPanW(music, F(pan));
  }
  static getMusicTimeLength(music: Music): number {
    return r().symbols.GetMusicTimeLengthW(music);
  }
  static getMusicTimePlayed(music: Music): number {
    return r().symbols.GetMusicTimePlayedW(music);
  }

  // --- AudioStream ---

  static loadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStream {
    return r().symbols.LoadAudioStreamW(sampleRate, sampleSize, channels);
  }
  static isAudioStreamValid(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamValidW(stream);
  }
  static unloadAudioStream(stream: AudioStream): void {
    r().symbols.UnloadAudioStreamW(stream);
  }
  static isAudioStreamProcessed(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamProcessedW(stream);
  }
  static playAudioStream(stream: AudioStream): void {
    r().symbols.PlayAudioStreamW(stream);
  }
  static pauseAudioStream(stream: AudioStream): void {
    r().symbols.PauseAudioStreamW(stream);
  }
  static resumeAudioStream(stream: AudioStream): void {
    r().symbols.ResumeAudioStreamW(stream);
  }
  static isAudioStreamPlaying(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamPlayingW(stream);
  }
  static stopAudioStream(stream: AudioStream): void {
    r().symbols.StopAudioStreamW(stream);
  }
  static setAudioStreamVolume(stream: AudioStream, volume: number): void {
    r().symbols.SetAudioStreamVolumeW(stream, F(volume));
  }
  static setAudioStreamPitch(stream: AudioStream, pitch: number): void {
    r().symbols.SetAudioStreamPitchW(stream, F(pitch));
  }
  static setAudioStreamPan(stream: AudioStream, pan: number): void {
    r().symbols.SetAudioStreamPanW(stream, F(pan));
  }
  static setAudioStreamBufferSizeDefault(size: number): void {
    r().symbols.SetAudioStreamBufferSizeDefaultW(size);
  }

  // --- Font/Text remaining ---

  static loadFontFromImage(image: Image, key: Color, firstChar: number): Font {
    return r().symbols.LoadFontFromImageW(image, key, firstChar);
  }
  static loadFontFromMemory(
    fileType: string,
    fileData: Uint8Array,
    dataSize: number,
    fontSize: number,
  ): Font {
    return r().symbols.LoadFontFromMemoryW(cstr(fileType), fileData, dataSize, fontSize);
  }
  static exportFontAsCode(font: Font, fileName: string): boolean {
    return r().symbols.ExportFontAsCodeW(font, cstr(fileName));
  }
  static drawTextCodepoint(
    font: Font,
    codepoint: number,
    position: Vec2,
    fontSize: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextCodepointW(font, codepoint, F(position.x), F(position.y), F(fontSize), tint);
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
      font,
      codepoints,
      count,
      F(position.x),
      F(position.y),
      F(fontSize),
      F(spacing),
      tint,
    );
  }
  static getGlyphIndex(font: Font, codepoint: number): number {
    return r().symbols.GetGlyphIndexW(font, codepoint);
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
    r().symbols.GetGlyphAtlasRecW(this._recBuf, font, codepoint);
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
    r().symbols.ImageToPOTW(image, fill);
  }

  static imageKernelConvolution(image: Image, kernel: Float32Array): void {
    r().symbols.ImageKernelConvolutionW(image, kernel, kernel.length);
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
      data.length,
      frames ?? new Int32Array(1),
    );
  }

  static unloadFontData(ptr: number, glyphCount: number): void {
    r().symbols.UnloadFontDataW(ptr as any, glyphCount);
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
    r().symbols.UpdateMeshBufferW(mesh, index, data, data.length, offset);
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
      F(ray.position.x),
      F(ray.position.y),
      F(ray.position.z),
      F(ray.direction.x),
      F(ray.direction.y),
      F(ray.direction.z),
      mesh,
      F(m[0]!),
      F(m[4]!),
      F(m[8]!),
      F(m[12]!),
      F(m[1]!),
      F(m[5]!),
      F(m[9]!),
      F(m[13]!),
      F(m[2]!),
      F(m[6]!),
      F(m[10]!),
      F(m[14]!),
      F(m[3]!),
      F(m[7]!),
      F(m[11]!),
      F(m[15]!),
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
    return r().symbols.SaveFileDataW(cstr(fileName), data, data.length);
  }
  static exportDataAsCode(data: Uint8Array | Buffer, fileName: string): boolean {
    return r().symbols.ExportDataAsCodeW(data, data.length, cstr(fileName));
  }
  static loadWaveSamples(wave: Wave): number {
    return r().symbols.LoadWaveSamplesW(wave) as number;
  }
  static unloadWaveSamples(ptr: number): void {
    r().symbols.UnloadWaveSamplesW(ptr as any);
  }
  static setWindowIcons(images: number, count: number): void {
    r().symbols.SetWindowIconsW(images as any, count);
  }
}
