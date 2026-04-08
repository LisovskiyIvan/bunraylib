import { symbols as r } from "./symbols";
import type { Vec2, Vec3, Rectangle, Camera2D, Camera3D, Ray } from "./types";
import { cstr, color, f2i, type Color } from "./utils";
export { color };
export type { Color, Vec2, Vec3, Rectangle, Camera2D, Camera3D, Ray };

const _vec2Buf = new Float32Array(2);
const _recBuf = new Float32Array(4);
const _colPtBuf = new Float32Array(2);

export class Raylib {
  private static initialized = false;

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
      f2i(camera.position.x), f2i(camera.position.y), f2i(camera.position.z),
      f2i(camera.target.x), f2i(camera.target.y), f2i(camera.target.z),
      f2i(camera.up.x), f2i(camera.up.y), f2i(camera.up.z),
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
    r.symbols.DrawPixelW(position.x, position.y, col);
  }

  /** Draw a line */
  static drawLine(startX: number, startY: number, endX: number, endY: number, col: Color): void {
    r.symbols.DrawLineW(startX, startY, endX, endY, col);
  }

  /** Draw a line (using vector positions) */
  static drawLineV(startPos: Vec2, endPos: Vec2, col: Color): void {
    r.symbols.DrawLineW(startPos.x, startPos.y, endPos.x, endPos.y, col);
  }

  /** Draw a line with defined thickness */
  static drawLineEx(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r.symbols.DrawLineExW(startPos.x, startPos.y, endPos.x, endPos.y, thick, col);
  }

  /** Draw lines sequence as a strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawLineStrip(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawLineStripW(points, pointCount, col);
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
    r.symbols.DrawCircleW(center.x, center.y, radius, col);
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
    r.symbols.DrawCircleGradientW(centerX, centerY, radius, inner, outer);
  }

  /** Draw circle outline */
  static drawCircleLines(centerX: number, centerY: number, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesW(centerX, centerY, radius, col);
  }

  /** Draw circle outline (using vector center) */
  static drawCircleLinesV(center: Vec2, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesW(center.x, center.y, radius, col);
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
    r.symbols.DrawRectangleW(pos.x, pos.y, size.x, size.y, col);
  }

  /** Draw a color-filled rectangle (using Rectangle struct) */
  static drawRectangleRec(rec: Rectangle, col: Color): void {
    r.symbols.DrawRectangleW(rec.x, rec.y, rec.width, rec.height, col);
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
  static drawTriangleFan(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawTriangleFanW(points, pointCount, col);
  }

  /** Draw a triangle strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleStrip(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawTriangleStripW(points, pointCount, col);
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
    pointCount: number,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineLinearW(points, pointCount, f2i(thick), col);
  }

  /**
   * Draw spline: B-Spline. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBasis(
    points: Float32Array,
    pointCount: number,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBasisW(points, pointCount, f2i(thick), col);
  }

  /**
   * Draw spline: Catmull-Rom. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineCatmullRom(
    points: Float32Array,
    pointCount: number,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineCatmullRomW(points, pointCount, f2i(thick), col);
  }

  /**
   * Draw spline: Quadratic Bezier. Minimum 3 points (1 control point).
   * Points layout: [p1, c2, p3, c4, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierQuadratic(
    points: Float32Array,
    pointCount: number,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBezierQuadraticW(points, pointCount, f2i(thick), col);
  }

  /**
   * Draw spline: Cubic Bezier. Minimum 4 points (2 control points).
   * Points layout: [p1, c2, c3, p4, c5, c6, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierCubic(
    points: Float32Array,
    pointCount: number,
    thick: number,
    col: Color,
  ): void {
    r.symbols.DrawSplineBezierCubicW(points, pointCount, f2i(thick), col);
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
  static checkCollisionPointPoly(point: Vec2, points: Float32Array, pointCount: number): boolean {
    return r.symbols.CheckCollisionPointPolyW(point.x, point.y, points, pointCount);
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
    return { x: _recBuf[0]!, y: _recBuf[1]!, width: _recBuf[2]!, height: _recBuf[3]! };
  }

  /** Draw a line in 3D world space */
  static drawLine3D(startPos: Vec3, endPos: Vec3, col: Color): void {
    r.symbols.DrawLine3DW(
      f2i(startPos.x), f2i(startPos.y), f2i(startPos.z),
      f2i(endPos.x), f2i(endPos.y), f2i(endPos.z),
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
      f2i(center.x), f2i(center.y), f2i(center.z),
      f2i(radius),
      f2i(rotationAxis.x), f2i(rotationAxis.y), f2i(rotationAxis.z),
      f2i(rotationAngle),
      col,
    );
  }

  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle3D(v1: Vec3, v2: Vec3, v3: Vec3, col: Color): void {
    r.symbols.DrawTriangle3DW(
      f2i(v1.x), f2i(v1.y), f2i(v1.z),
      f2i(v2.x), f2i(v2.y), f2i(v2.z),
      f2i(v3.x), f2i(v3.y), f2i(v3.z),
      col,
    );
  }

  /** Draw a triangle strip defined by points. Points packed as [x0,y0,z0, x1,y1,z1, ...] in Float32Array */
  static drawTriangleStrip3D(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawTriangleStrip3DW(points, pointCount, col);
  }

  /** Draw cube */
  static drawCube(position: Vec3, width: number, height: number, length: number, col: Color): void {
    r.symbols.DrawCubeW(
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(width), f2i(height), f2i(length),
      col,
    );
  }

  /** Draw cube (Vector version) */
  static drawCubeV(position: Vec3, size: Vec3, col: Color): void {
    r.symbols.DrawCubeVW(
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(size.x), f2i(size.y), f2i(size.z),
      col,
    );
  }

  /** Draw cube wires */
  static drawCubeWires(position: Vec3, width: number, height: number, length: number, col: Color): void {
    r.symbols.DrawCubeWiresW(
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(width), f2i(height), f2i(length),
      col,
    );
  }

  /** Draw cube wires (Vector version) */
  static drawCubeWiresV(position: Vec3, size: Vec3, col: Color): void {
    r.symbols.DrawCubeWiresVW(
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(size.x), f2i(size.y), f2i(size.z),
      col,
    );
  }

  /** Draw sphere */
  static drawSphere(centerPos: Vec3, radius: number, col: Color): void {
    r.symbols.DrawSphereW(f2i(centerPos.x), f2i(centerPos.y), f2i(centerPos.z), f2i(radius), col);
  }

  /** Draw sphere with extended parameters */
  static drawSphereEx(centerPos: Vec3, radius: number, rings: number, slices: number, col: Color): void {
    r.symbols.DrawSphereExW(
      f2i(centerPos.x), f2i(centerPos.y), f2i(centerPos.z),
      f2i(radius), rings, slices, col,
    );
  }

  /** Draw sphere wires */
  static drawSphereWires(centerPos: Vec3, radius: number, rings: number, slices: number, col: Color): void {
    r.symbols.DrawSphereWiresW(
      f2i(centerPos.x), f2i(centerPos.y), f2i(centerPos.z),
      f2i(radius), rings, slices, col,
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
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(radiusTop), f2i(radiusBottom), f2i(height), slices, col,
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
      f2i(startPos.x), f2i(startPos.y), f2i(startPos.z),
      f2i(endPos.x), f2i(endPos.y), f2i(endPos.z),
      f2i(startRadius), f2i(endRadius), sides, col,
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
      f2i(position.x), f2i(position.y), f2i(position.z),
      f2i(radiusTop), f2i(radiusBottom), f2i(height), slices, col,
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
      f2i(startPos.x), f2i(startPos.y), f2i(startPos.z),
      f2i(endPos.x), f2i(endPos.y), f2i(endPos.z),
      f2i(startRadius), f2i(endRadius), sides, col,
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
      f2i(startPos.x), f2i(startPos.y), f2i(startPos.z),
      f2i(endPos.x), f2i(endPos.y), f2i(endPos.z),
      f2i(radius), slices, rings, col,
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
      f2i(startPos.x), f2i(startPos.y), f2i(startPos.z),
      f2i(endPos.x), f2i(endPos.y), f2i(endPos.z),
      f2i(radius), slices, rings, col,
    );
  }

  /** Draw a plane XZ */
  static drawPlane(centerPos: Vec3, size: Vec2, col: Color): void {
    r.symbols.DrawPlaneW(
      f2i(centerPos.x), f2i(centerPos.y), f2i(centerPos.z),
      f2i(size.x), f2i(size.y),
      col,
    );
  }

  /** Draw a ray line */
  static drawRay(ray: Ray, col: Color): void {
    r.symbols.DrawRayW(
      f2i(ray.position.x), f2i(ray.position.y), f2i(ray.position.z),
      f2i(ray.direction.x), f2i(ray.direction.y), f2i(ray.direction.z),
      col,
    );
  }

  /** Draw a grid */
  static drawGrid(slices: number, spacing: number): void {
    r.symbols.DrawGridW(slices, spacing);
  }
}
