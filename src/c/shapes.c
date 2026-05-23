#include "common.h"

void DrawRectangleW(int posX, int posY, int width, int height, Color color) {
    DrawRectangle(posX, posY, width, height, color);
}

void DrawTextW(const char* text, int posX, int posY, int fontSize, Color color) {
    DrawText(text, posX, posY, fontSize, color);
}

void DrawPixelW(int posX, int posY, Color color) {
    DrawPixel(posX, posY, color);
}

void DrawPixelVW(int x, int y, Color color) {
    DrawPixelV((Vector2){ i2f(x), i2f(y) }, color);
}

void DrawLineW(int startPosX, int startPosY, int endPosX, int endPosY, Color color) {
    DrawLine(startPosX, startPosY, endPosX, endPosY, color);
}

void DrawLineVW(int startX, int startY, int endX, int endY, Color color) {
    DrawLineV((Vector2){ i2f(startX), i2f(startY)}, (Vector2){i2f(endX), i2f(endY)}, color);
}

void DrawLineExW(int startX, int startY, int endX, int endY, int thick, Color color) {
    DrawLineEx((Vector2){ i2f(startX), i2f(startY)}, (Vector2){i2f(endX), i2f(endY)}, i2f(thick), color);
}

void DrawLineStripW(const float* points, int pointCount, Color color) {
    DrawLineStrip((const Vector2*)points, pointCount, color);
}

void DrawLineBezierW(int startX, int startY, int endX, int endY, int thick, Color color) {
    DrawLineBezier((Vector2){ i2f(startX), i2f(startY) }, (Vector2){i2f(endX), i2f(endY)}, i2f(thick), color);
}

void DrawCircleW(int centerX, int centerY, int radius, Color color) {
    DrawCircle(centerX, centerY, i2f(radius), color);
}

void DrawCircleVW(int x, int y, int radius, Color color) {
    DrawCircleV((Vector2){x, y}, i2f(radius), color);
}

void DrawCircleSectorW(int centerX, int centerY, int radius, int startAngle, int endAngle, int segments, Color color) {
    DrawCircleSector((Vector2){ i2f(centerX), i2f(centerY)}, i2f(radius), i2f(startAngle), i2f(endAngle), segments, color);
}

void DrawCircleSectorLinesW(int centerX, int centerY, int radius, int startAngle, int endAngle, int segments, Color color) {
    DrawCircleSectorLines((Vector2){ i2f(centerX), i2f(centerY)}, i2f(radius), i2f(startAngle), i2f(endAngle), segments, color);
}

void DrawCircleGradientW(int centerX, int centerY, int radius, Color inner, Color outer) {
    DrawCircleGradient((Vector2){ i2f(centerX), i2f(centerY)}, i2f(radius), inner, outer);
}

void DrawCircleLinesW(int centerX, int centerY, int radius, Color color) {
    DrawCircleLines(centerX, centerY, i2f(radius), color);
}

void DrawCircleLinesVW(int x, int y, int radius, Color color) {
    DrawCircleLinesV((Vector2){ i2f(x), i2f(y) }, i2f(radius), color);
}

void DrawEllipseW(int centerX, int centerY, int radiusH, int radiusV, Color color) {
    DrawEllipse(centerX, centerY, i2f(radiusH), i2f(radiusV), color);
}

void DrawEllipseLinesW(int centerX, int centerY, int radiusH, int radiusV, Color color) {
    DrawEllipseLines(centerX, centerY, i2f(radiusH), i2f(radiusV), color);
}

void DrawRingW(int centerX, int centerY, int innerRadius, int outerRadius, int startAngle, int endAngle, int segments, Color color) {
    DrawRing((Vector2){ i2f(centerX), i2f(centerY)}, i2f(innerRadius), i2f(outerRadius), i2f(startAngle), i2f(endAngle), segments, color);
}

void DrawRingLinesW(int centerX, int centerY, int innerRadius, int outerRadius, int startAngle, int endAngle, int segments, Color color) {
    DrawRingLines((Vector2){i2f(centerX), i2f(centerY)}, i2f(innerRadius), i2f(outerRadius), i2f(startAngle), i2f(endAngle), segments, color);
}

void DrawRectangleVW(int posX, int posY, int sizeX, int sizeY, Color color) {
    DrawRectangleV((Vector2){ i2f(posX), i2f(posY)}, (Vector2){ i2f(sizeX), i2f(sizeY)}, color);
}

void DrawRectangleRecW(int x, int y, int w, int h, Color color) {
    DrawRectangleRec((Rectangle){i2f(x), i2f(y), i2f(w), i2f(h)}, color);
}

void DrawRectangleProW(int x, int y, int width, int height, int originX, int originY, int rotation, Color color) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectanglePro(rec, (Vector2){ i2f(originX), i2f(originY)}, i2f(rotation), color);
}

void DrawRectangleGradientVW(int posX, int posY, int width, int height, Color top, Color bottom) {
    DrawRectangleGradientV(posX, posY, width, height, top, bottom);
}

void DrawRectangleGradientHW(int posX, int posY, int width, int height, Color left, Color right) {
    DrawRectangleGradientH(posX, posY, width, height, left, right);
}

void DrawRectangleGradientExW(int x, int y, int width, int height, Color topLeft, Color bottomLeft, Color topRight, Color bottomRight) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectangleGradientEx(rec, topLeft, bottomLeft, topRight, bottomRight);
}

void DrawRectangleLinesW(int posX, int posY, int width, int height, Color color) {
    DrawRectangleLines(posX, posY, width, height, color);
}

void DrawRectangleLinesExW(int x, int y, int width, int height, int lineThick, Color color) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectangleLinesEx(rec, i2f(lineThick), color);
}

void DrawRectangleRoundedW(int x, int y, int width, int height, int roundness, int segments, Color color) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectangleRounded(rec, i2f(roundness), segments, color);
}

void DrawRectangleRoundedLinesW(int x, int y, int width, int height, int roundness, int segments, Color color) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectangleRoundedLines(rec, i2f(roundness), segments, color);
}

void DrawRectangleRoundedLinesExW(int x, int y, int width, int height, int roundness, int segments, int lineThick, Color color) {
    Rectangle rec = { i2f(x), i2f(y), i2f(width), i2f(height) };
    DrawRectangleRoundedLinesEx(rec, i2f(roundness), segments, i2f(lineThick), color);
}

void DrawTriangleW(int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    DrawTriangle((Vector2){i2f(x1), i2f(y1)}, (Vector2){i2f(x2), i2f(y2)}, (Vector2){i2f(x3), i2f(y3)}, color);
}

void DrawTriangleLinesW(int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    DrawTriangleLines((Vector2){i2f(x1), i2f(y1)}, (Vector2){i2f(x2), i2f(y2)}, (Vector2){i2f(x3), i2f(y3)}, color);
}

void DrawTriangleFanW(const float* points, int pointCount, Color color) {
    DrawTriangleFan((const Vector2*)points, pointCount, color);
}

void DrawTriangleStripW(const float* points, int pointCount, Color color) {
    DrawTriangleStrip((const Vector2*)points, pointCount, color);
}

void DrawPolyW(int centerX, int centerY, int sides, int radius, int rotation, Color color) {
    DrawPoly((Vector2){i2f(centerX), i2f(centerY)}, sides, i2f(radius), i2f(rotation), color);
}

void DrawPolyLinesW(int centerX, int centerY, int sides, int radius, int rotation, Color color) {
    DrawPolyLines((Vector2){i2f(centerX), i2f(centerY)}, sides, i2f(radius), i2f(rotation), color);
}

void DrawPolyLinesExW(int centerX, int centerY, int sides, int radius, int rotation, int lineThick, Color color) {
    DrawPolyLinesEx((Vector2){i2f(centerX), i2f(centerY)}, sides, i2f(radius), i2f(rotation), i2f(lineThick), color);
}

void DrawSplineLinearW(const float* points, int pointCount, int thick, Color color) {
    DrawSplineLinear((const Vector2*)points, pointCount, i2f(thick), color);
}

void DrawSplineBasisW(const float* points, int pointCount, int thick, Color color) {
    DrawSplineBasis((const Vector2*)points, pointCount, i2f(thick), color);
}

void DrawSplineCatmullRomW(const float* points, int pointCount, int thick, Color color) {
    DrawSplineCatmullRom((const Vector2*)points, pointCount, i2f(thick), color);
}

void DrawSplineBezierQuadraticW(const float* points, int pointCount, int thick, Color color) {
    DrawSplineBezierQuadratic((const Vector2*)points, pointCount, i2f(thick), color);
}

void DrawSplineBezierCubicW(const float* points, int pointCount, int thick, Color color) {
    DrawSplineBezierCubic((const Vector2*)points, pointCount, i2f(thick), color);
}

void DrawSplineSegmentLinearW(int p1x, int p1y, int p2x, int p2y, int thick, Color color) {
    DrawSplineSegmentLinear((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(p2x), i2f(p2y)}, i2f(thick), color);
}

void DrawSplineSegmentBasisW(int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int thick, Color color) {
    DrawSplineSegmentBasis((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(p2x), i2f(p2y)}, (Vector2){i2f(p3x), i2f(p3y)}, (Vector2){i2f(p4x), i2f(p4y)}, i2f(thick), color);
}

void DrawSplineSegmentCatmullRomW(int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int thick, Color color) {
    DrawSplineSegmentCatmullRom((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(p2x), i2f(p2y)}, (Vector2){i2f(p3x), i2f(p3y)}, (Vector2){i2f(p4x), i2f(p4y)}, i2f(thick), color);
}

void DrawSplineSegmentBezierQuadraticW(int p1x, int p1y, int c2x, int c2y, int p3x, int p3y, int thick, Color color) {
    DrawSplineSegmentBezierQuadratic((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(c2x), i2f(c2y)}, (Vector2){i2f(p3x), i2f(p3y)}, i2f(thick), color);
}

void DrawSplineSegmentBezierCubicW(int p1x, int p1y, int c2x, int c2y, int c3x, int c3y, int p4x, int p4y, int thick, Color color) {
    DrawSplineSegmentBezierCubic((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(c2x), i2f(c2y)}, (Vector2){i2f(c3x), i2f(c3y)}, (Vector2){i2f(p4x), i2f(p4y)}, i2f(thick), color);
}

void GetSplinePointLinearW(float* out, int startPx, int startPy, int endPx, int endPy, int t) {
    Vector2 result = GetSplinePointLinear((Vector2){i2f(startPx), i2f(startPy)}, (Vector2){i2f(endPx), i2f(endPy)}, i2f(t));
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBasisW(float* out, int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int t) {
    Vector2 result = GetSplinePointBasis((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(p2x), i2f(p2y)}, (Vector2){i2f(p3x), i2f(p3y)}, (Vector2){i2f(p4x), i2f(p4y)}, i2f(t));
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointCatmullRomW(float* out, int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int t) {
    Vector2 result = GetSplinePointCatmullRom((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(p2x), i2f(p2y)}, (Vector2){i2f(p3x), i2f(p3y)}, (Vector2){i2f(p4x), i2f(p4y)}, i2f(t));
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierQuadW(float* out, int p1x, int p1y, int c2x, int c2y, int p3x, int p3y, int t) {
    Vector2 result = GetSplinePointBezierQuad((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(c2x), i2f(c2y)}, (Vector2){i2f(p3x), i2f(p3y)}, i2f(t));
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierCubicW(float* out, int p1x, int p1y, int c2x, int c2y, int c3x, int c3y, int p4x, int p4y, int t) {
    Vector2 result = GetSplinePointBezierCubic((Vector2){i2f(p1x), i2f(p1y)}, (Vector2){i2f(c2x), i2f(c2y)}, (Vector2){i2f(c3x), i2f(c3y)}, (Vector2){i2f(p4x), i2f(p4y)},i2f(t));
    out[0] = result.x;
    out[1] = result.y;
}



void SetShapesTextureW(unsigned int texId, int texW, int texH, int recX, int recY, int recW, int recH) {
    Texture2D tex = { texId, texW, texH, 1, 7 };
    Rectangle rec = { recX, recY, recW, recH };
    SetShapesTexture(tex, rec);
}

void GetShapesTextureW(unsigned int* outId, int* outW, int* outH) {
    Texture2D tex = GetShapesTexture();
    *outId = tex.id;
    *outW = tex.width;
    *outH = tex.height;
}

void GetShapesTextureRectangleW(float* out) {
    Rectangle rec = GetShapesTextureRectangle();
    out[0] = rec.x; out[1] = rec.y; out[2] = rec.width; out[3] = rec.height;
}

void DrawFPSW(int posX, int posY) { DrawFPS(posX, posY); }
