#include <string.h>
#include <raylib.h>

static float i2f(int i) { float f; memcpy(&f, &i, sizeof(float)); return f; }

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

bool CheckCollisionRecsW(int x1, int y1, int w1, int h1, int x2, int y2, int w2, int h2) {
    Rectangle r1 = { x1, y1, w1, h1 };
    Rectangle r2 = { x2, y2, w2, h2 };
    return CheckCollisionRecs(r1, r2);
}

bool CheckCollisionCirclesW(int cx1, int cy1, int r1, int cx2, int cy2, int r2) {
    return CheckCollisionCircles((Vector2){cx1, cy1}, r1, (Vector2){cx2, cy2}, r2);
}

bool CheckCollisionCircleRecW(int cx, int cy, int radius, int rx, int ry, int rw, int rh) {
    return CheckCollisionCircleRec((Vector2){cx, cy}, radius, (Rectangle){rx, ry, rw, rh});
}

bool CheckCollisionCircleLineW(int cx, int cy, int radius, int p1x, int p1y, int p2x, int p2y) {
    return CheckCollisionCircleLine((Vector2){cx, cy}, radius, (Vector2){p1x, p1y}, (Vector2){p2x, p2y});
}

bool CheckCollisionPointRecW(int px, int py, int rx, int ry, int rw, int rh) {
    return CheckCollisionPointRec((Vector2){px, py}, (Rectangle){rx, ry, rw, rh});
}

bool CheckCollisionPointCircleW(int px, int py, int cx, int cy, int radius) {
    return CheckCollisionPointCircle((Vector2){px, py}, (Vector2){cx, cy}, radius);
}

bool CheckCollisionPointTriangleW(int px, int py, int p1x, int p1y, int p2x, int p2y, int p3x, int p3y) {
    return CheckCollisionPointTriangle((Vector2){px, py}, (Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y});
}

bool CheckCollisionPointLineW(int px, int py, int p1x, int p1y, int p2x, int p2y, int threshold) {
    return CheckCollisionPointLine((Vector2){px, py}, (Vector2){p1x, p1y}, (Vector2){p2x, p2y}, threshold);
}

bool CheckCollisionPointPolyW(int px, int py, const float* points, int pointCount) {
    return CheckCollisionPointPoly((Vector2){px, py}, (const Vector2*)points, pointCount);
}

bool CheckCollisionLinesW(float* out, int s1x, int s1y, int e1x, int e1y, int s2x, int s2y, int e2x, int e2y) {
    Vector2 cp;
    bool result = CheckCollisionLines((Vector2){s1x, s1y}, (Vector2){e1x, e1y}, (Vector2){s2x, s2y}, (Vector2){e2x, e2y}, &cp);
    out[0] = cp.x;
    out[1] = cp.y;
    return result;
}

void GetCollisionRecW(float* out, int x1, int y1, int w1, int h1, int x2, int y2, int w2, int h2) {
    Rectangle r1 = { x1, y1, w1, h1 };
    Rectangle r2 = { x2, y2, w2, h2 };
    Rectangle result = GetCollisionRec(r1, r2);
    out[0] = result.x;
    out[1] = result.y;
    out[2] = result.width;
    out[3] = result.height;
}

void BeginMode2DW(int offX, int offY, int tarX, int tarY, int rotation, int zoom) {
    float r, z;
    memcpy(&r, &rotation, sizeof(float));
    memcpy(&z, &zoom, sizeof(float));
    Camera2D cam = { {offX, offY}, {tarX, tarY}, r, z };
    BeginMode2D(cam);
}

void EndMode2DW() {
    EndMode2D();
}

void BeginMode3DW(int posX, int posY, int posZ, int tarX, int tarY, int tarZ, int upX, int upY, int upZ, int fovy, int projection) {
    Camera3D cam = { {i2f(posX), i2f(posY), i2f(posZ)}, {i2f(tarX), i2f(tarY), i2f(tarZ)}, {i2f(upX), i2f(upY), i2f(upZ)}, i2f(fovy), projection };
    BeginMode3D(cam);
}

void EndMode3DW() {
    EndMode3D();
}

void DrawLine3DW(int sx, int sy, int sz, int ex, int ey, int ez, Color color) {
    DrawLine3D((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, color);
}

void DrawPoint3DW(int px, int py, int pz, Color color) {
    DrawPoint3D((Vector3){i2f(px), i2f(py), i2f(pz)}, color);
}

void DrawCircle3DW(int cx, int cy, int cz, int radius, int rax, int ray_, int raz, int angle, Color color) {
    DrawCircle3D((Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius), (Vector3){i2f(rax), i2f(ray_), i2f(raz)}, i2f(angle), color);
}

void DrawTriangle3DW(int v1x, int v1y, int v1z, int v2x, int v2y, int v2z, int v3x, int v3y, int v3z, Color color) {
    DrawTriangle3D(
        (Vector3){i2f(v1x), i2f(v1y), i2f(v1z)},
        (Vector3){i2f(v2x), i2f(v2y), i2f(v2z)},
        (Vector3){i2f(v3x), i2f(v3y), i2f(v3z)},
        color
    );
}

void DrawTriangleStrip3DW(const float* points, int pointCount, Color color) {
    DrawTriangleStrip3D((const Vector3*)points, pointCount, color);
}

void DrawCubeW(int px, int py, int pz, int w, int h, int l, Color color) {
    DrawCube((Vector3){i2f(px), i2f(py), i2f(pz)}, i2f(w), i2f(h), i2f(l), color);
}

void DrawCubeVW(int px, int py, int pz, int sx, int sy, int sz, Color color) {
    DrawCubeV((Vector3){i2f(px), i2f(py), i2f(pz)}, (Vector3){i2f(sx), i2f(sy), i2f(sz)}, color);
}

void DrawCubeWiresW(int px, int py, int pz, int w, int h, int l, Color color) {
    DrawCubeWires((Vector3){i2f(px), i2f(py), i2f(pz)}, i2f(w), i2f(h), i2f(l), color);
}

void DrawCubeWiresVW(int px, int py, int pz, int sx, int sy, int sz, Color color) {
    DrawCubeWiresV((Vector3){i2f(px), i2f(py), i2f(pz)}, (Vector3){i2f(sx), i2f(sy), i2f(sz)}, color);
}

void DrawSphereW(int cx, int cy, int cz, int radius, Color color) {
    DrawSphere((Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius), color);
}

void DrawSphereExW(int cx, int cy, int cz, int radius, int rings, int slices, Color color) {
    DrawSphereEx((Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius), rings, slices, color);
}

void DrawSphereWiresW(int cx, int cy, int cz, int radius, int rings, int slices, Color color) {
    DrawSphereWires((Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius), rings, slices, color);
}

void DrawCylinderW(int px, int py, int pz, int rt, int rb, int h, int slices, Color color) {
    DrawCylinder((Vector3){i2f(px), i2f(py), i2f(pz)}, i2f(rt), i2f(rb), i2f(h), slices, color);
}

void DrawCylinderExW(int sx, int sy, int sz, int ex, int ey, int ez, int sr, int er, int sides, Color color) {
    DrawCylinderEx((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, i2f(sr), i2f(er), sides, color);
}

void DrawCylinderWiresW(int px, int py, int pz, int rt, int rb, int h, int slices, Color color) {
    DrawCylinderWires((Vector3){i2f(px), i2f(py), i2f(pz)}, i2f(rt), i2f(rb), i2f(h), slices, color);
}

void DrawCylinderWiresExW(int sx, int sy, int sz, int ex, int ey, int ez, int sr, int er, int sides, Color color) {
    DrawCylinderWiresEx((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, i2f(sr), i2f(er), sides, color);
}

void DrawCapsuleW(int sx, int sy, int sz, int ex, int ey, int ez, int radius, int slices, int rings, Color color) {
    DrawCapsule((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, i2f(radius), slices, rings, color);
}

void DrawCapsuleWiresW(int sx, int sy, int sz, int ex, int ey, int ez, int radius, int slices, int rings, Color color) {
    DrawCapsuleWires((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, i2f(radius), slices, rings, color);
}

void DrawPlaneW(int cx, int cy, int cz, int sw, int sh, Color color) {
    DrawPlane((Vector3){i2f(cx), i2f(cy), i2f(cz)}, (Vector2){i2f(sw), i2f(sh)}, color);
}

void DrawRayW(int px, int py, int pz, int dx, int dy, int dz, Color color) {
    Ray ray = { {i2f(px), i2f(py), i2f(pz)}, {i2f(dx), i2f(dy), i2f(dz)} };
    DrawRay(ray, color);
}

void DrawGridW(int slices, int spacing) {
    DrawGrid(slices, spacing);
}
