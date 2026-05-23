#include "common.h"

bool CheckCollisionRecsW(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {
    Rectangle r1 = {x1, y1, w1, h1};
    Rectangle r2 = {x2, y2, w2, h2};
    return CheckCollisionRecs(r1, r2);
}

bool CheckCollisionCirclesW(float cx1, float cy1, float r1, float cx2, float cy2, float r2) {
    return CheckCollisionCircles((Vector2){cx1, cy1}, r1, (Vector2){cx2, cy2}, r2);
}

bool CheckCollisionCircleRecW(float cx, float cy, float radius, float rx, float ry, float rw, float rh) {
    return CheckCollisionCircleRec((Vector2){cx, cy}, radius, (Rectangle){rx, ry, rw, rh});
}

bool CheckCollisionCircleLineW(float cx, float cy, float radius, float p1x, float p1y, float p2x, float p2y) {
    return CheckCollisionCircleLine((Vector2){cx, cy}, radius, (Vector2){p1x, p1y}, (Vector2){p2x, p2y});
}

bool CheckCollisionPointRecW(float px, float py, float rx, float ry, float rw, float rh) {
    return CheckCollisionPointRec((Vector2){px, py}, (Rectangle){rx, ry, rw, rh});
}

bool CheckCollisionPointCircleW(float px, float py, float cx, float cy, float radius) {
    return CheckCollisionPointCircle((Vector2){px, py}, (Vector2){cx, cy}, radius);
}

bool CheckCollisionPointTriangleW(float px, float py, float p1x, float p1y, float p2x, float p2y, float p3x, float p3y) {
    return CheckCollisionPointTriangle((Vector2){px, py}, (Vector2){p1x, p1y}, (Vector2){p2x, p2y}, (Vector2){p3x, p3y});
}

bool CheckCollisionPointLineW(float px, float py, float p1x, float p1y, float p2x, float p2y, int threshold) {
    return CheckCollisionPointLine((Vector2){px, py}, (Vector2){p1x, p1y}, (Vector2){p2x, p2y}, threshold);
}

bool CheckCollisionPointPolyW(float px, float py, const float* points, int pointCount) {
    return CheckCollisionPointPoly((Vector2){px, py}, (const Vector2*)points, pointCount);
}

bool CheckCollisionLinesW(float* out, float s1x, float s1y, float e1x, float e1y, float s2x, float s2y, float e2x, float e2y) {
    Vector2 cp;
    bool result = CheckCollisionLines((Vector2){s1x, s1y}, (Vector2){e1x, e1y}, (Vector2){s2x, s2y}, (Vector2){e2x, e2y}, &cp);
    out[0] = cp.x;
    out[1] = cp.y;
    return result;
}

void GetCollisionRecW(float* out, float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {
    Rectangle r1 = {x1, y1, w1, h1};
    Rectangle r2 = {x2, y2, w2, h2};
    Rectangle result = GetCollisionRec(r1, r2);
    out[0] = result.x;
    out[1] = result.y;
    out[2] = result.width;
    out[3] = result.height;
}

bool CheckCollisionSpheresW(float cx1, float cy1, float cz1, float r1, float cx2, float cy2, float cz2, float r2) {
    return CheckCollisionSpheres(
        (Vector3){cx1, cy1, cz1}, r1,
        (Vector3){cx2, cy2, cz2}, r2);
}

bool CheckCollisionBoxesW(
    float minX1, float minY1, float minZ1, float maxX1, float maxY1, float maxZ1,
    float minX2, float minY2, float minZ2, float maxX2, float maxY2, float maxZ2) {
    BoundingBox bb1 = {
        {minX1, minY1, minZ1},
        {maxX1, maxY1, maxZ1}
    };
    BoundingBox bb2 = {
        {minX2, minY2, minZ2},
        {maxX2, maxY2, maxZ2}
    };
    return CheckCollisionBoxes(bb1, bb2);
}

bool CheckCollisionBoxSphereW(
    float minX, float minY, float minZ, float maxX, float maxY, float maxZ,
    float cx, float cy, float cz, float radius) {
    BoundingBox bb = {
        {minX, minY, minZ},
        {maxX, maxY, maxZ}
    };
    return CheckCollisionBoxSphere(bb,
        (Vector3){cx, cy, cz}, radius);
}

void GetRayCollisionSphereW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    float rPx, float rPy, float rPz, float rDx, float rDy, float rDz,
    float cx, float cy, float cz, float radius) {
    Ray ray = {
        {rPx, rPy, rPz},
        {rDx, rDy, rDz}
    };
    RayCollision rc = GetRayCollisionSphere(ray,
        (Vector3){cx, cy, cz}, radius);
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionBoxW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    float rPx, float rPy, float rPz, float rDx, float rDy, float rDz,
    float minX, float minY, float minZ, float maxX, float maxY, float maxZ) {
    Ray ray = {
        {rPx, rPy, rPz},
        {rDx, rDy, rDz}
    };
    BoundingBox bb = {
        {minX, minY, minZ},
        {maxX, maxY, maxZ}
    };
    RayCollision rc = GetRayCollisionBox(ray, bb);
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionTriangleW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    float rPx, float rPy, float rPz, float rDx, float rDy, float rDz,
    float p1x, float p1y, float p1z, float p2x, float p2y, float p2z, float p3x, float p3y, float p3z) {
    Ray ray = {
        {rPx, rPy, rPz},
        {rDx, rDy, rDz}
    };
    RayCollision rc = GetRayCollisionTriangle(ray,
        (Vector3){p1x, p1y, p1z},
        (Vector3){p2x, p2y, p2z},
        (Vector3){p3x, p3y, p3z});
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionQuadW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    float rPx, float rPy, float rPz, float rDx, float rDy, float rDz,
    float p1x, float p1y, float p1z, float p2x, float p2y, float p2z,
    float p3x, float p3y, float p3z, float p4x, float p4y, float p4z) {
    Ray ray = {
        {rPx, rPy, rPz},
        {rDx, rDy, rDz}
    };
    RayCollision rc = GetRayCollisionQuad(ray,
        (Vector3){p1x, p1y, p1z},
        (Vector3){p2x, p2y, p2z},
        (Vector3){p3x, p3y, p3z},
        (Vector3){p4x, p4y, p4z});
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}

void GetRayCollisionMeshW(bool* outHit, float* outDist, float* outPt, float* outNorm,
    float rPx, float rPy, float rPz, float rDx, float rDy, float rDz,
    int meshId,
    float im0, float im4, float im8, float im12,
    float im1, float im5, float im9, float im13,
    float im2, float im6, float im10, float im14,
    float im3, float im7, float im11, float im15) {
    Ray ray = { {rPx, rPy, rPz}, {rDx, rDy, rDz} };
    Matrix transform = {im0, im1, im2, im3, im4, im5, im6, im7, im8, im9, im10, im11, im12, im13, im14, im15};
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) {
        *outHit = false; *outDist = 0; return;
    }
    RayCollision rc = GetRayCollisionMesh(ray, meshRegistry[meshId], transform);
    *outHit = rc.hit;
    outDist[0] = rc.distance;
    outPt[0] = rc.point.x; outPt[1] = rc.point.y; outPt[2] = rc.point.z;
    outNorm[0] = rc.normal.x; outNorm[1] = rc.normal.y; outNorm[2] = rc.normal.z;
}
