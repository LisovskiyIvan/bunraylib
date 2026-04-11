#include "common.h"

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

bool CheckCollisionSpheresW(int cx1, int cy1, int cz1, int r1, int cx2, int cy2, int cz2, int r2) {
    return CheckCollisionSpheres(
        (Vector3){i2f(cx1), i2f(cy1), i2f(cz1)}, i2f(r1),
        (Vector3){i2f(cx2), i2f(cy2), i2f(cz2)}, i2f(r2));
}

bool CheckCollisionBoxesW(
    int minX1, int minY1, int minZ1, int maxX1, int maxY1, int maxZ1,
    int minX2, int minY2, int minZ2, int maxX2, int maxY2, int maxZ2) {
    BoundingBox bb1 = {
        {i2f(minX1), i2f(minY1), i2f(minZ1)},
        {i2f(maxX1), i2f(maxY1), i2f(maxZ1)}
    };
    BoundingBox bb2 = {
        {i2f(minX2), i2f(minY2), i2f(minZ2)},
        {i2f(maxX2), i2f(maxY2), i2f(maxZ2)}
    };
    return CheckCollisionBoxes(bb1, bb2);
}

bool CheckCollisionBoxSphereW(
    int minX, int minY, int minZ, int maxX, int maxY, int maxZ,
    int cx, int cy, int cz, int radius) {
    BoundingBox bb = {
        {i2f(minX), i2f(minY), i2f(minZ)},
        {i2f(maxX), i2f(maxY), i2f(maxZ)}
    };
    return CheckCollisionBoxSphere(bb,
        (Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius));
}

void GetRayCollisionSphereW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    int rPx, int rPy, int rPz, int rDx, int rDy, int rDz,
    int cx, int cy, int cz, int radius) {
    Ray ray = {
        {i2f(rPx), i2f(rPy), i2f(rPz)},
        {i2f(rDx), i2f(rDy), i2f(rDz)}
    };
    RayCollision rc = GetRayCollisionSphere(ray,
        (Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius));
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionBoxW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    int rPx, int rPy, int rPz, int rDx, int rDy, int rDz,
    int minX, int minY, int minZ, int maxX, int maxY, int maxZ) {
    Ray ray = {
        {i2f(rPx), i2f(rPy), i2f(rPz)},
        {i2f(rDx), i2f(rDy), i2f(rDz)}
    };
    BoundingBox bb = {
        {i2f(minX), i2f(minY), i2f(minZ)},
        {i2f(maxX), i2f(maxY), i2f(maxZ)}
    };
    RayCollision rc = GetRayCollisionBox(ray, bb);
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionTriangleW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    int rPx, int rPy, int rPz, int rDx, int rDy, int rDz,
    int p1x, int p1y, int p1z, int p2x, int p2y, int p2z, int p3x, int p3y, int p3z) {
    Ray ray = {
        {i2f(rPx), i2f(rPy), i2f(rPz)},
        {i2f(rDx), i2f(rDy), i2f(rDz)}
    };
    RayCollision rc = GetRayCollisionTriangle(ray,
        (Vector3){i2f(p1x), i2f(p1y), i2f(p1z)},
        (Vector3){i2f(p2x), i2f(p2y), i2f(p2z)},
        (Vector3){i2f(p3x), i2f(p3y), i2f(p3z)});
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionQuadW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    int rPx, int rPy, int rPz, int rDx, int rDy, int rDz,
    int p1x, int p1y, int p1z, int p2x, int p2y, int p2z,
    int p3x, int p3y, int p3z, int p4x, int p4y, int p4z) {
    Ray ray = {
        {i2f(rPx), i2f(rPy), i2f(rPz)},
        {i2f(rDx), i2f(rDy), i2f(rDz)}
    };
    RayCollision rc = GetRayCollisionQuad(ray,
        (Vector3){i2f(p1x), i2f(p1y), i2f(p1z)},
        (Vector3){i2f(p2x), i2f(p2y), i2f(p2z)},
        (Vector3){i2f(p3x), i2f(p3y), i2f(p3z)},
        (Vector3){i2f(p4x), i2f(p4y), i2f(p4z)});
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionMeshW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    int rPx, int rPy, int rPz, int rDx, int rDy, int rDz,
    int meshId,
    int im0, int im4, int im8, int im12,
    int im1, int im5, int im9, int im13,
    int im2, int im6, int im10, int im14,
    int im3, int im7, int im11, int im15) {
    Ray ray = { { i2f(rPx), i2f(rPy), i2f(rPz) }, { i2f(rDx), i2f(rDy), i2f(rDz) } };
    Matrix transform = { i2f(im0), i2f(im1), i2f(im2), i2f(im3), i2f(im4), i2f(im5), i2f(im6), i2f(im7), i2f(im8), i2f(im9), i2f(im10), i2f(im11), i2f(im12), i2f(im13), i2f(im14), i2f(im15) };
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) {
        *outHit = false; *outDist = 0; return;
    }
    RayCollision rc = GetRayCollisionMesh(ray, meshRegistry[meshId], transform);
    *outHit = rc.hit;
    *outDist = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}
