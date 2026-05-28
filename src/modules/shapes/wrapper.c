#include "../../c/common.h"

void DrawRectangleW(int posX, int posY, int width, int height, Color color) {
    DrawRectangle(posX, posY, width, height, color);
}

void DrawTextW(const char* text, int posX, int posY, int fontSize, Color color) {
    DrawText(text, posX, posY, fontSize, color);
}

void DrawPixelW(int posX, int posY, Color color) {
    DrawPixel(posX, posY, color);
}

void DrawPixelVW(float x, float y, Color color) {
    DrawPixelV((Vector2){x, y}, color);
}

void DrawLineW(int startPosX, int startPosY, int endPosX, int endPosY, Color color) {
    DrawLine(startPosX, startPosY, endPosX, endPosY, color);
}

void DrawLineVW(float startX, float startY, float endX, float endY, Color color) {
    DrawLineV((Vector2){startX, startY}, (Vector2){endX, endY}, color);
}

void DrawLineExW(float startX, float startY, float endX, float endY, float thick, Color color) {
    DrawLineEx((Vector2){startX, startY}, (Vector2){endX, endY}, thick, color);
}

void DrawLineStripW(const float* points, int pointCount, Color color) {
    DrawLineStrip((const Vector2*)points, pointCount, color);
}

void DrawLineBezierW(float startX, float startY, float endX, float endY, float thick, Color color) {
    DrawLineBezier((Vector2){startX, startY}, (Vector2){endX, endY}, thick, color);
}

void DrawLineDashedW(float startX, float startY, float endX, float endY, int dashSize, int spaceSize, Color color) {
  DrawLineDashed((Vector2){startX, startY}, (Vector2){endX, endY}, dashSize, spaceSize, color);
}

void DrawCircleW(int centerX, int centerY, float radius, Color color) {
    DrawCircle(centerX, centerY, radius, color);
}

void DrawCircleVW(int x, int y, float radius, Color color) {
    DrawCircleV((Vector2){x, y}, radius, color);
}

void DrawCircleSectorW(float centerX, float centerY, float radius, float startAngle, float endAngle, int segments, Color color) {
    DrawCircleSector((Vector2){centerX, centerY}, radius, startAngle, endAngle, segments, color);
}

void DrawCircleSectorLinesW(float centerX, float centerY, float radius, float startAngle, float endAngle, int segments, Color color) {
    DrawCircleSectorLines((Vector2){centerX, centerY}, radius, startAngle, endAngle, segments, color);
}

void DrawCircleGradientW(float centerX, float centerY, float radius, Color inner, Color outer) {
    DrawCircleGradient((Vector2){centerX, centerY}, radius, inner, outer);
}

void DrawCircleLinesW(int centerX, int centerY, float radius, Color color) {
    DrawCircleLines(centerX, centerY, radius, color);
}

void DrawCircleLinesVW(float x, float y, float radius, Color color) {
    DrawCircleLinesV((Vector2){x, y}, radius, color);
}

void DrawEllipseW(int centerX, int centerY, float radiusH, float radiusV, Color color) {
    DrawEllipse(centerX, centerY, radiusH, radiusV, color);
}

void DrawEllipseVW(float centerX, float centerY, float radiusH, float radiusV, Color color) {
  DrawEllipseV((Vector2){ centerX, centerY }, radiusH, radiusV, color);
}

void DrawEllipseLinesVW(float centerX, float centerY, float radiusH, float radiusV, Color color) {
  DrawEllipseLinesV((Vector2){ centerX, centerY }, radiusH, radiusV, color);
}

void DrawEllipseLinesW(int centerX, int centerY, float radiusH, float radiusV, Color color) {
    DrawEllipseLines(centerX, centerY, radiusH, radiusV, color);
}

void DrawRingW(float centerX, float centerY, float innerRadius, float outerRadius, float startAngle, float endAngle, int segments, Color color) {
    DrawRing((Vector2){centerX, centerY}, innerRadius, outerRadius, startAngle, endAngle, segments, color);
}

void DrawRingLinesW(float centerX, float centerY, float innerRadius, float outerRadius, float startAngle, float endAngle, int segments, Color color) {
    DrawRingLines((Vector2){centerX, centerY}, innerRadius, outerRadius, startAngle, endAngle, segments, color);
}

void DrawRectangleVW(float posX, float posY, float sizeX, float sizeY, Color color) {
    DrawRectangleV((Vector2){posX, posY}, (Vector2){sizeX, sizeY}, color);
}

void DrawRectangleRecW(float x, float y, float w, float h, Color color) {
    DrawRectangleRec((Rectangle){x, y, w, h}, color);
}

void DrawRectangleProW(float x, float y, float width, float height, float originX, float originY, float rotation, Color color) {
    Rectangle rec = {x, y, width, height};
    DrawRectanglePro(rec, (Vector2){originX, originY}, rotation, color);
}

void DrawRectangleGradientVW(int posX, int posY, int width, int height, Color top, Color bottom) {
    DrawRectangleGradientV(posX, posY, width, height, top, bottom);
}

void DrawRectangleGradientHW(int posX, int posY, int width, int height, Color left, Color right) {
    DrawRectangleGradientH(posX, posY, width, height, left, right);
}

void DrawRectangleGradientExW(float x, float y, float width, float height, Color topLeft, Color bottomLeft, Color topRight, Color bottomRight) {
    Rectangle rec = {x, y, width, height};
    DrawRectangleGradientEx(rec, topLeft, bottomLeft, topRight, bottomRight);
}

void DrawRectangleLinesW(int posX, int posY, int width, int height, Color color) {
    DrawRectangleLines(posX, posY, width, height, color);
}

void DrawRectangleLinesExW(float x, float y, float width, float height, float lineThick, Color color) {
    Rectangle rec = {x, y, width, height};
    DrawRectangleLinesEx(rec, lineThick, color);
}

void DrawRectangleRoundedW(float x, float y, float width, float height, float roundness, int segments, Color color) {
    Rectangle rec = {x, y, width, height};
    DrawRectangleRounded(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesW(float x, float y, float width, float height, float roundness, int segments, Color color) {
    Rectangle rec = {x, y, width, height};
    DrawRectangleRoundedLines(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesExW(float x, float y, float width, float height, float roundness, int segments, float lineThick, Color color) {
    Rectangle rec = {x, y, width, height};
    DrawRectangleRoundedLinesEx(rec, roundness, segments, lineThick, color);
}

void DrawTriangleW(float x1, float y1, float x2, float y2, float x3, float y3, Color color) {
    DrawTriangle((Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void DrawTriangleLinesW(float x1, float y1, float x2, float y2, float x3, float y3, Color color) {
    DrawTriangleLines((Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void DrawTriangleFanW(const float* points, int pointCount, Color color) {
    DrawTriangleFan((const Vector2*)points, pointCount, color);
}

void DrawTriangleStripW(const float* points, int pointCount, Color color) {
    DrawTriangleStrip((const Vector2*)points, pointCount, color);
}

void DrawPolyW(float centerX, float centerY, int sides, float radius, float rotation, Color color) {
    DrawPoly((Vector2){centerX, centerY}, sides, radius, rotation, color);
}

void DrawPolyLinesW(float centerX, float centerY, int sides, float radius, float rotation, Color color) {
    DrawPolyLines((Vector2){centerX, centerY}, sides, radius, rotation, color);
}

void DrawPolyLinesExW(float centerX, float centerY, int sides, float radius, float rotation, float lineThick, Color color) {
    DrawPolyLinesEx((Vector2){centerX, centerY}, sides, radius, rotation, lineThick, color);
}

void DrawSplineLinearW(const float* points, int pointCount, float thick, Color color) {
    DrawSplineLinear((const Vector2*)points, pointCount, thick, color);
}

void DrawSplineBasisW(const float* points, int pointCount, float thick, Color color) {
    DrawSplineBasis((const Vector2*)points, pointCount, thick, color);
}

void DrawSplineCatmullRomW(const float* points, int pointCount, float thick, Color color) {
    DrawSplineCatmullRom((const Vector2*)points, pointCount, thick, color);
}

void DrawSplineBezierQuadraticW(const float* points, int pointCount, float thick, Color color) {
    DrawSplineBezierQuadratic((const Vector2*)points, pointCount, thick, color);
}

void DrawSplineBezierCubicW(const float* points, int pointCount, float thick, Color color) {
    DrawSplineBezierCubic((const Vector2*)points, pointCount, thick, color);
}

void DrawSplineSegmentLinearW(float p1x, float p1y, float p2x, float p2y, float thick, Color color) {
    DrawSplineSegmentLinear((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, thick, color);
}

void DrawSplineSegmentBasisW(float p1x, float p1y, float p2x, float p2y, float p3x, float p3y, float p4x, float p4y, float thick, Color color) {
    DrawSplineSegmentBasis((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, thick, color);
}

void DrawSplineSegmentCatmullRomW(float p1x, float p1y, float p2x, float p2y, float p3x, float p3y, float p4x, float p4y, float thick, Color color) {
    DrawSplineSegmentCatmullRom((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, thick, color);
}

void DrawSplineSegmentBezierQuadraticW(float p1x, float p1y, float c2x, float c2y, float p3x, float p3y, float thick, Color color) {
    DrawSplineSegmentBezierQuadratic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){p3x, p3y}, thick, color);
}

void DrawSplineSegmentBezierCubicW(float p1x, float p1y, float c2x, float c2y, float c3x, float c3y, float p4x, float p4y, float thick, Color color) {
    DrawSplineSegmentBezierCubic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){c3x, c3y}, (Vector2){p4x, p4y}, thick, color);
}

void GetSplinePointLinearW(float* out, float startPx, float startPy, float endPx, float endPy, float t) {
    Vector2 result = GetSplinePointLinear((Vector2){startPx, startPy}, (Vector2){endPx, endPy}, t);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBasisW(float* out, float p1x, float p1y, float p2x, float p2y, float p3x, float p3y, float p4x, float p4y, float t) {
    Vector2 result = GetSplinePointBasis((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, t);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointCatmullRomW(float* out, float p1x, float p1y, float p2x, float p2y, float p3x, float p3y, float p4x, float p4y, float t) {
    Vector2 result = GetSplinePointCatmullRom((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, t);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierQuadW(float* out, float p1x, float p1y, float c2x, float c2y, float p3x, float p3y, float t) {
    Vector2 result = GetSplinePointBezierQuad((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){p3x, p3y}, t);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierCubicW(float* out, float p1x, float p1y, float c2x, float c2y, float c3x, float c3y, float p4x, float p4y, float t) {
    Vector2 result = GetSplinePointBezierCubic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){c3x, c3y}, (Vector2){p4x, p4y}, t);
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
