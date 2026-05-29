import { getSymbols } from '../../symbols';
import { bufs as b, f, i, validatePoints } from '../../utils';
import type { Vec2, Rectangle, Texture2D, Color } from '../../types';

const r = () => getSymbols();

export class ShapesModule {
  /** Draw a color-filled rectangle */
  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r().symbols.DrawRectangleW(i(x), i(y), i(width), i(height), i(col));
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
    r().symbols.DrawLineExW(
      f(startPos.x),
      f(startPos.y),
      f(endPos.x),
      f(endPos.y),
      f(thick),
      i(col),
    );
  }
  /** Draw lines sequence as a strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawLineStrip(points: Float32Array, col: Color): void {
    validatePoints('drawLineStrip', points, 2, 2);
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
  static drawLineDashed(
    startPos: Vec2,
    endPos: Vec2,
    dashSize: number,
    spaceSize: number,
    col: Color,
  ): void {
    r().symbols.DrawLineDashedW(
      f(startPos.x),
      f(startPos.y),
      f(endPos.x),
      f(endPos.y),
      i(dashSize),
      i(spaceSize),
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
  /** Draw a color-filled ellipse */
  static drawEllipseV(center: Vec2, radiusH: number, radiusV: number, col: Color): void {
    r().symbols.DrawEllipseVW(f(center.x), f(center.y), f(radiusH), f(radiusV), i(col));
  }
  /** Draw a color-filled ellipse lines */
  static drawEllipseLinesV(center: Vec2, radiusH: number, radiusV: number, col: Color): void {
    r().symbols.DrawEllipseLinesVW(f(center.x), f(center.y), f(radiusH), f(radiusV), i(col));
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
    validatePoints('drawTriangleFan', points, 2, 3);
    r().symbols.DrawTriangleFanW(points, i(points.length / 2), i(col));
  }
  /** Draw a triangle strip. Points are packed as [x0,y0, x1,y1, ...] in Float32Array */
  static drawTriangleStrip(points: Float32Array, col: Color): void {
    validatePoints('drawTriangleStrip', points, 2, 2);
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
    validatePoints('drawSplineLinear', points, 2, 2);
    r().symbols.DrawSplineLinearW(points, i(points.length / 2), f(thick), i(col));
  }
  /**
   * Draw spline: B-Spline. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBasis(points: Float32Array, thick: number, col: Color): void {
    validatePoints('drawSplineBasis', points, 2, 4);
    r().symbols.DrawSplineBasisW(points, i(points.length / 2), f(thick), i(col));
  }
  /**
   * Draw spline: Catmull-Rom. Minimum 4 points.
   * Points are packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineCatmullRom(points: Float32Array, thick: number, col: Color): void {
    validatePoints('drawSplineCatmullRom', points, 2, 4);
    r().symbols.DrawSplineCatmullRomW(points, i(points.length / 2), f(thick), i(col));
  }
  /**
   * Draw spline: Quadratic Bezier. Minimum 3 points (1 control point).
   * Points layout: [p1, c2, p3, c4, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierQuadratic(points: Float32Array, thick: number, col: Color): void {
    validatePoints('drawSplineBezierQuadratic', points, 2, 3);
    r().symbols.DrawSplineBezierQuadraticW(points, i(points.length / 2), f(thick), i(col));
  }
  /**
   * Draw spline: Cubic Bezier. Minimum 4 points (2 control points).
   * Points layout: [p1, c2, c3, p4, c5, c6, ...] packed as [x0,y0, x1,y1, ...] in Float32Array.
   */
  static drawSplineBezierCubic(points: Float32Array, thick: number, col: Color): void {
    validatePoints('drawSplineBezierCubic', points, 2, 4);
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
      b._vec2Buf,
      f(startPos.x),
      f(startPos.y),
      f(endPos.x),
      f(endPos.y),
      f(t),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
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
      b._vec2Buf,
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
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
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
      b._vec2Buf,
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
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
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
      b._vec2Buf,
      f(p1.x),
      f(p1.y),
      f(c2.x),
      f(c2.y),
      f(p3.x),
      f(p3.y),
      f(t),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
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
      b._vec2Buf,
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
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
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
    r().symbols.GetShapesTextureW(b._shapesTexId, b._shapesTexW, b._shapesTexH);
    return { id: b._shapesTexId[0]!, width: b._shapesTexW[0]!, height: b._shapesTexH[0]! };
  }
  static getShapesTextureRectangle(): Rectangle {
    r().symbols.GetShapesTextureRectangleW(b._recBuf);
    return {
      x: b._recBuf[0]!,
      y: b._recBuf[1]!,
      width: b._recBuf[2]!,
      height: b._recBuf[3]!,
    };
  }
}
