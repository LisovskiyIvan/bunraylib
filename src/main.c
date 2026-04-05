#include <string.h>
#include <raylib.h>
#include <stdio.h>
void InitWindowW(int width, int height, const char* title) {
    InitWindow(width, height, title);
}

void CloseWindowW() {
    CloseWindow();
}

bool WindowShouldCloseW() {
    return WindowShouldClose();
}

void BeginDrawingW() {
    BeginDrawing();
}

void EndDrawingW() {
    EndDrawing();
}

void ClearBackgroundW(Color color) {
    ClearBackground(color);
}

void DrawRectangleW(int posX, int posY, int width, int height, Color color) {
    DrawRectangle(posX, posY, width, height, color);
}

void SetTargetFPSW(int fps) {
    SetTargetFPS(fps);
}

float GetFrameTimeW() {
    return GetFrameTime();
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
    DrawCircle(centerX, centerY, radius, color);
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
    DrawCircleGradient(centerX, centerY, radius, inner, outer);
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

void DrawRingLinesW(float centerX, float centerY, float innerRadius, float outerRadius, float startAngle, float endAngle, int segments, Color color) {
    DrawRingLines((Vector2){centerX, centerY}, innerRadius, outerRadius, startAngle, endAngle, segments, color);
}

void DrawRectangleVW(float posX, float posY, float width, float height, Color color) {
    DrawRectangleV((Vector2){posX, posY}, (Vector2){width, height}, color);
}

void DrawRectangleRecW(float x, float y, float width, float height, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRec(rec, color);
}

void DrawRectangleProW(float x, float y, float width, float height, float originX, float originY, float rotation, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectanglePro(rec, (Vector2){originX, originY}, rotation, color);
}

void DrawRectangleGradientVW(int posX, int posY, int width, int height, Color top, Color bottom) {
    DrawRectangleGradientV(posX, posY, width, height, top, bottom);
}

void DrawRectangleGradientHW(int posX, int posY, int width, int height, Color left, Color right) {
    DrawRectangleGradientH(posX, posY, width, height, left, right);
}

void DrawRectangleGradientExW(float x, float y, float width, float height, Color topLeft, Color bottomLeft, Color topRight, Color bottomRight) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleGradientEx(rec, topLeft, bottomLeft, topRight, bottomRight);
}

void DrawRectangleLinesW(int posX, int posY, int width, int height, Color color) {
    DrawRectangleLines(posX, posY, width, height, color);
}

void DrawRectangleLinesExW(float x, float y, float width, float height, float lineThick, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleLinesEx(rec, lineThick, color);
}

void DrawRectangleRoundedW(float x, float y, float width, float height, float roundness, int segments, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRounded(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesW(float x, float y, float width, float height, float roundness, int segments, Color color) {
    Rectangle rec = { x, y, width, height };
    DrawRectangleRoundedLines(rec, roundness, segments, color);
}

void DrawRectangleRoundedLinesExW(float x, float y, float width, float height, float roundness, int segments, float lineThick, Color color) {
    Rectangle rec = { x, y, width, height };
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
