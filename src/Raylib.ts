import { symbols as r } from "./symbols";
import type { Vec2, Rectangle } from "./types";
import { cstr, color, f2i, type Color } from "./utils";
export { color };
export type { Color, Vec2, Rectangle };

export class Raylib {
  private static initialized = false;

  static initWindow(width: number, height: number, title: string): void {
    r.symbols.InitWindowW(width, height, cstr(title));
    Raylib.initialized = true;
  }

  static closeWindow(): void {
    r.symbols.CloseWindowW();
    Raylib.initialized = false;
  }

  static windowShouldClose(): boolean {
    return r.symbols.WindowShouldCloseW();
  }

  static beginDrawing(): void {
    r.symbols.BeginDrawingW();
  }

  static endDrawing(): void {
    r.symbols.EndDrawingW();
  }

  static clearBackground(col: Color): void {
    r.symbols.ClearBackgroundW(col);
  }

  static setTargetFPS(fps: number): void {
    r.symbols.SetTargetFPSW(fps);
  }

  static getFrameTime(): number {
    return r.symbols.GetFrameTimeW();
  }

  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r.symbols.DrawRectangleW(x, y, width, height, col);
  }

  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r.symbols.DrawTextW(cstr(text), x, y, fontSize, col);
  }

  static drawPixel(x: number, y: number, col: Color): void {
    r.symbols.DrawPixelW(x, y, col);
  }

  static drawPixelV(position: Vec2, col: Color): void {
    r.symbols.DrawPixelW(position.x, position.y, col);
  }

  static drawLine(startX: number, startY: number, endX: number, endY: number, col: Color): void {
    r.symbols.DrawLineW(startX, startY, endX, endY, col);
  }

  static drawLineV(startPos: Vec2, endPos: Vec2, col: Color): void {
    r.symbols.DrawLineW(startPos.x, startPos.y, endPos.x, endPos.y, col);
  }

  static drawLineEx(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r.symbols.DrawLineExW(startPos.x, startPos.y, endPos.x, endPos.y, thick, col);
  }

  static drawLineStrip(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawLineStripW(points, pointCount, col);
  }

  static drawLineBezier(startPos: Vec2, endPos: Vec2, thick: number, col: Color): void {
    r.symbols.DrawLineBezierW(startPos.x, startPos.y, endPos.x, endPos.y, thick, col);
  }

  static drawCircle(centerX: number, centerY: number, radius: number, col: Color): void {
    r.symbols.DrawCircleW(centerX, centerY, radius, col);
  }

  static drawCircleV(center: Vec2, radius: number, col: Color): void {
    r.symbols.DrawCircleW(center.x, center.y, radius, col);
  }

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

  static drawCircleGradient(
    centerX: number,
    centerY: number,
    radius: number,
    inner: Color,
    outer: Color,
  ): void {
    r.symbols.DrawCircleGradientW(centerX, centerY, radius, inner, outer);
  }

  static drawCircleLines(centerX: number, centerY: number, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesW(centerX, centerY, radius, col);
  }

  static drawCircleLinesV(center: Vec2, radius: number, col: Color): void {
    r.symbols.DrawCircleLinesW(center.x, center.y, radius, col);
  }

  static drawEllipse(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r.symbols.DrawEllipseW(centerX, centerY, radiusH, radiusV, col);
  }

  static drawEllipseLines(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    col: Color,
  ): void {
    r.symbols.DrawEllipseLinesW(centerX, centerY, radiusH, radiusV, col);
  }

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

  static drawRectangleV(pos: Vec2, size: Vec2, col: Color): void {
    r.symbols.DrawRectangleW(pos.x, pos.y, size.x, size.y, col);
  }

  static drawRectangleRec(rec: Rectangle, col: Color): void {
    r.symbols.DrawRectangleW(rec.x, rec.y, rec.width, rec.height, col);
  }

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

  static drawRectangleLines(x: number, y: number, width: number, height: number, col: Color): void {
    r.symbols.DrawRectangleLinesW(x, y, width, height, col);
  }

  static drawRectangleLinesEx(rec: Rectangle, lineThick: number, col: Color): void {
    r.symbols.DrawRectangleLinesExW(rec.x, rec.y, rec.width, rec.height, lineThick, col);
  }

  static drawRectangleRounded(
    rec: Rectangle,
    roundness: number,
    segments: number,
    col: Color,
  ): void {
    r.symbols.DrawRectangleRoundedW(rec.x, rec.y, rec.width, rec.height, roundness, segments, col);
  }

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

  static drawTriangle(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r.symbols.DrawTriangleW(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, col);
  }

  static drawTriangleLines(v1: Vec2, v2: Vec2, v3: Vec2, col: Color): void {
    r.symbols.DrawTriangleLinesW(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, col);
  }

  static drawTriangleFan(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawTriangleFanW(points, pointCount, col);
  }

  static drawTriangleStrip(points: Float32Array, pointCount: number, col: Color): void {
    r.symbols.DrawTriangleStripW(points, pointCount, col);
  }

  static drawPoly(center: Vec2, sides: number, radius: number, rotation: number, col: Color): void {
    r.symbols.DrawPolyW(center.x, center.y, sides, radius, rotation, col);
  }

  static drawPolyLines(
    center: Vec2,
    sides: number,
    radius: number,
    rotation: number,
    col: Color,
  ): void {
    r.symbols.DrawPolyLinesW(center.x, center.y, sides, radius, rotation, col);
  }

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
}
