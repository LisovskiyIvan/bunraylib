#include <raylib.h>
#include <string.h>
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

void DrawLineW(int startPosX, int startPosY, int endPosX, int endPosY, Color color) {
    DrawLine(startPosX, startPosY, endPosX, endPosY, color);
}

void DrawLineExW(int startX, int startY, int endX, int endY, int thick, Color color) {
    DrawLineEx((Vector2){startX, startY}, (Vector2){endX, endY}, thick, color);
}

void DrawLineStripW(const float* points, int pointCount, Color color) {
    DrawLineStrip((const Vector2*)points, pointCount, color);
}

void DrawLineBezierW(int startX, int startY, int endX, int endY, int thick, Color color) {
    DrawLineBezier((Vector2){startX, startY}, (Vector2){endX, endY}, thick, color);
}

void DrawCircleW(int centerX, int centerY, int radius, Color color) {
    float r = i2f(radius);
    DrawCircle(centerX, centerY, r, color);
}

void DrawCircleVW(int x, int y, int radius, Color color) {
    float r = i2f(radius);
    DrawCircleV((Vector2){x, y}, r, color);
}

void DrawCircleSectorW(int centerX, int centerY, int radius, int startAngle, int endAngle, int segments, Color color) {
    float sa, ea;
    memcpy(&sa, &startAngle, sizeof(float));
    memcpy(&ea, &endAngle, sizeof(float));
    DrawCircleSector((Vector2){centerX, centerY}, radius, sa, ea, segments, color);
}

void DrawCircleSectorLinesW(int centerX, int centerY, int radius, int startAngle, int endAngle, int segments, Color color) {
    float sa, ea;
    memcpy(&sa, &startAngle, sizeof(float));
    memcpy(&ea, &endAngle, sizeof(float));
    DrawCircleSectorLines((Vector2){centerX, centerY}, radius, sa, ea, segments, color);
}

void DrawCircleGradientW(int centerX, int centerY, int radius, Color inner, Color outer) {
    float r;
    memcpy(&r, &radius, sizeof(float));
    DrawCircleGradient((Vector2){centerX, centerY}, r, inner, outer);
}

void DrawCircleLinesW(int centerX, int centerY, int radius, Color color) {
    DrawCircleLines(centerX, centerY, radius, color);
}

void DrawEllipseW(int centerX, int centerY, int radiusH, int radiusV, Color color) {
    DrawEllipse(centerX, centerY, radiusH, radiusV, color);
}

void DrawEllipseLinesW(int centerX, int centerY, int radiusH, int radiusV, Color color) {
    DrawEllipseLines(centerX, centerY, radiusH, radiusV, color);
}

void DrawRingW(int centerX, int centerY, int innerRadius, int outerRadius, int startAngle, int endAngle, int segments, Color color) {
    float sa, ea;
    memcpy(&sa, &startAngle, sizeof(float));
    memcpy(&ea, &endAngle, sizeof(float));
    DrawRing((Vector2){centerX, centerY}, innerRadius, outerRadius, sa, ea, segments, color);
}

void DrawRingLinesW(int centerX, int centerY, int innerRadius, int outerRadius, int startAngle, int endAngle, int segments, Color color) {
    float sa, ea;
    memcpy(&sa, &startAngle, sizeof(float));
    memcpy(&ea, &endAngle, sizeof(float));
    DrawRingLines((Vector2){centerX, centerY}, innerRadius, outerRadius, sa, ea, segments, color);
}

void DrawRectangleProW(int x, int y, int width, int height, int originX, int originY, int rotation, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectanglePro(rec, (Vector2){originX, originY}, rotation, color);
}

void DrawRectangleGradientVW(int posX, int posY, int width, int height, Color top, Color bottom) {
    DrawRectangleGradientV(posX, posY, width, height, top, bottom);
}

void DrawRectangleGradientHW(int posX, int posY, int width, int height, Color left, Color right) {
    DrawRectangleGradientH(posX, posY, width, height, left, right);
}

void DrawRectangleGradientExW(int x, int y, int width, int height, Color topLeft, Color bottomLeft, Color topRight, Color bottomRight) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleGradientEx(rec, topLeft, bottomLeft, topRight, bottomRight);
}

void DrawRectangleLinesW(int posX, int posY, int width, int height, Color color) {
    DrawRectangleLines(posX, posY, width, height, color);
}

void DrawRectangleLinesExW(int x, int y, int width, int height, int lineThick, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleLinesEx(rec, lineThick, color);
}

void DrawRectangleRoundedW(int x, int y, int width, int height, int roundness, int segments, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRounded(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesW(int x, int y, int width, int height, int roundness, int segments, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRoundedLines(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesExW(int x, int y, int width, int height, int roundness, int segments, int lineThick, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRoundedLinesEx(rec, roundness, segments, lineThick, color);
}

void DrawTriangleW(int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    DrawTriangle((Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void DrawTriangleLinesW(int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    DrawTriangleLines((Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void DrawTriangleFanW(const float* points, int pointCount, Color color) {
    DrawTriangleFan((const Vector2*)points, pointCount, color);
}

void DrawTriangleStripW(const float* points, int pointCount, Color color) {
    DrawTriangleStrip((const Vector2*)points, pointCount, color);
}

void DrawPolyW(int centerX, int centerY, int sides, int radius, int rotation, Color color) {
    DrawPoly((Vector2){centerX, centerY}, sides, radius, rotation, color);
}

void DrawPolyLinesW(int centerX, int centerY, int sides, int radius, int rotation, Color color) {
    DrawPolyLines((Vector2){centerX, centerY}, sides, radius, rotation, color);
}

void DrawPolyLinesExW(int centerX, int centerY, int sides, int radius, int rotation, int lineThick, Color color) {
    DrawPolyLinesEx((Vector2){centerX, centerY}, sides, radius, rotation, lineThick, color);
}

void DrawSplineLinearW(const float* points, int pointCount, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineLinear((const Vector2*)points, pointCount, t, color);
}

void DrawSplineBasisW(const float* points, int pointCount, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineBasis((const Vector2*)points, pointCount, t, color);
}

void DrawSplineCatmullRomW(const float* points, int pointCount, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineCatmullRom((const Vector2*)points, pointCount, t, color);
}

void DrawSplineBezierQuadraticW(const float* points, int pointCount, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineBezierQuadratic((const Vector2*)points, pointCount, t, color);
}

void DrawSplineBezierCubicW(const float* points, int pointCount, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineBezierCubic((const Vector2*)points, pointCount, t, color);
}

void DrawSplineSegmentLinearW(int p1x, int p1y, int p2x, int p2y, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineSegmentLinear((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, t, color);
}

void DrawSplineSegmentBasisW(int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineSegmentBasis((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, t, color);
}

void DrawSplineSegmentCatmullRomW(int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineSegmentCatmullRom((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, t, color);
}

void DrawSplineSegmentBezierQuadraticW(int p1x, int p1y, int c2x, int c2y, int p3x, int p3y, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineSegmentBezierQuadratic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){p3x, p3y}, t, color);
}

void DrawSplineSegmentBezierCubicW(int p1x, int p1y, int c2x, int c2y, int c3x, int c3y, int p4x, int p4y, int thick, Color color) {
    float t; memcpy(&t, &thick, sizeof(float));
    DrawSplineSegmentBezierCubic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){c3x, c3y}, (Vector2){p4x, p4y}, t, color);
}

void GetSplinePointLinearW(float* out, int startPx, int startPy, int endPx, int endPy, int t) {
    float tf; memcpy(&tf, &t, sizeof(float));
    Vector2 result = GetSplinePointLinear((Vector2){startPx, startPy}, (Vector2){endPx, endPy}, tf);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBasisW(float* out, int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int t) {
    float tf; memcpy(&tf, &t, sizeof(float));
    Vector2 result = GetSplinePointBasis((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, tf);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointCatmullRomW(float* out, int p1x, int p1y, int p2x, int p2y, int p3x, int p3y, int p4x, int p4y, int t) {
    float tf; memcpy(&tf, &t, sizeof(float));
    Vector2 result = GetSplinePointCatmullRom((Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y}, (Vector2){p4x, p4y}, tf);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierQuadW(float* out, int p1x, int p1y, int c2x, int c2y, int p3x, int p3y, int t) {
    float tf; memcpy(&tf, &t, sizeof(float));
    Vector2 result = GetSplinePointBezierQuad((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){p3x, p3y}, tf);
    out[0] = result.x;
    out[1] = result.y;
}

void GetSplinePointBezierCubicW(float* out, int p1x, int p1y, int c2x, int c2y, int c3x, int c3y, int p4x, int p4y, int t) {
    float tf; memcpy(&tf, &t, sizeof(float));
    Vector2 result = GetSplinePointBezierCubic((Vector2){p1x, p1y}, (Vector2){c2x, c2y}, (Vector2){c3x, c3y}, (Vector2){p4x, p4y}, tf);
    out[0] = result.x;
    out[1] = result.y;
}

void DrawPixelVW(int x, int y, Color color) {
    DrawPixelV((Vector2){x, y}, color);
}

void DrawLineVW(int startX, int startY, int endX, int endY, Color color) {
    DrawLineV((Vector2){startX, startY}, (Vector2){endX, endY}, color);
}


void DrawCircleLinesVW(int x, int y, int radius, Color color) {
    float r;
    memcpy(&r, &radius, sizeof(float));
    DrawCircleLinesV((Vector2){x, y}, r, color);
}

void DrawRectangleVW(int posX, int posY, int sizeX, int sizeY, Color color) {
    DrawRectangleV((Vector2){posX, posY}, (Vector2){sizeX, sizeY}, color);
}

void DrawRectangleRecW(int x, int y, int w, int h, Color color) {
    DrawRectangleRec((Rectangle){x, y, w, h}, color);
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
