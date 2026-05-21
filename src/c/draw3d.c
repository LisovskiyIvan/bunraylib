#include "common.h"

void DrawLine3DW(int sx, int sy, int sz, int ex, int ey, int ez, Color color) {
    DrawLine3D((Vector3){i2f(sx), i2f(sy), i2f(sz)}, (Vector3){i2f(ex), i2f(ey), i2f(ez)}, color);
}

void DrawPoint3DW(int px, int py, int pz, Color color) {
    DrawPoint3D((Vector3){i2f(px), i2f(py), i2f(pz)}, color);
}

void DrawCircle3DW(int cx, int cy, int cz, int radius, int rax, int ray, int raz, int angle, Color color) {
    DrawCircle3D((Vector3){i2f(cx), i2f(cy), i2f(cz)}, i2f(radius), (Vector3){i2f(rax), i2f(ray), i2f(raz)}, i2f(angle), color);
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
    DrawGrid(slices, i2f(spacing));
}

void DrawModelW(int id, int posX, int posY, int posZ, int scale, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    DrawModel(modelRegistry[id], (Vector3){i2f(posX), i2f(posY), i2f(posZ)}, i2f(scale), tint);
}

void DrawModelExW(int id,
    int posX, int posY, int posZ,
    int rotAxisX, int rotAxisY, int rotAxisZ, int rotAngle,
    int scaleX, int scaleY, int scaleZ, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    float ra, sx, sy, sz;
    memcpy(&ra, &rotAngle, sizeof(float));
    memcpy(&sx, &scaleX, sizeof(float));
    memcpy(&sy, &scaleY, sizeof(float));
    memcpy(&sz, &scaleZ, sizeof(float));
    DrawModelEx(modelRegistry[id],
        (Vector3){i2f(posX), i2f(posY), i2f(posZ)},
        (Vector3){i2f(rotAxisX), i2f(rotAxisY), i2f(rotAxisZ)}, ra,
        (Vector3){sx, sy, sz}, tint);
}

void DrawModelWiresW(int id, int posX, int posY, int posZ, int scale, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    float s;
    memcpy(&s, &scale, sizeof(float));
    DrawModelWires(modelRegistry[id], (Vector3){i2f(posX), i2f(posY), i2f(posZ)}, s, tint);
}

void DrawModelWiresExW(int id,
    int posX, int posY, int posZ,
    int rotAxisX, int rotAxisY, int rotAxisZ, int rotAngle,
    int scaleX, int scaleY, int scaleZ, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    float ra, sx, sy, sz;
    memcpy(&ra, &rotAngle, sizeof(float));
    memcpy(&sx, &scaleX, sizeof(float));
    memcpy(&sy, &scaleY, sizeof(float));
    memcpy(&sz, &scaleZ, sizeof(float));
    DrawModelWiresEx(modelRegistry[id],
        (Vector3){i2f(posX), i2f(posY), i2f(posZ)},
        (Vector3){i2f(rotAxisX), i2f(rotAxisY), i2f(rotAxisZ)}, ra,
        (Vector3){sx, sy, sz}, tint);
}

void DrawBoundingBoxW(int minX, int minY, int minZ, int maxX, int maxY, int maxZ, Color color) {
    BoundingBox bb = {
        {i2f(minX), i2f(minY), i2f(minZ)},
        {i2f(maxX), i2f(maxY), i2f(maxZ)}
    };
    DrawBoundingBox(bb, color);
}

void DrawBillboardW(
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    int posX, int posY, int posZ,
    int scale, Color tint) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Texture2D tex = { texId, texW, texH, 1, 7 };
    float s;
    memcpy(&s, &scale, sizeof(float));
    DrawBillboard(cam, tex, (Vector3){i2f(posX), i2f(posY), i2f(posZ)}, s, tint);
}

void DrawBillboardRecW(
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    int srcX, int srcY, int srcW, int srcH,
    int posX, int posY, int posZ,
    int sizeX, int sizeY, Color tint) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Texture2D tex = { texId, texW, texH, 1, 7 };
    Rectangle src = { srcX, srcY, srcW, srcH };
    float sx, sy;
    memcpy(&sx, &sizeX, sizeof(float));
    memcpy(&sy, &sizeY, sizeof(float));
    DrawBillboardRec(cam, tex, src, (Vector3){i2f(posX), i2f(posY), i2f(posZ)}, (Vector2){sx, sy}, tint);
}

void DrawBillboardProW(
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    int srcX, int srcY, int srcW, int srcH,
    int posX, int posY, int posZ,
    int upX, int upY, int upZ,
    int sizeX, int sizeY,
    int originX, int originY,
    int rotation, Color tint) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Texture2D tex = { texId, texW, texH, 1, 7 };
    Rectangle src = { srcX, srcY, srcW, srcH };
    float sx, sy, ox, oy, rot;
    memcpy(&sx, &sizeX, sizeof(float));
    memcpy(&sy, &sizeY, sizeof(float));
    memcpy(&ox, &originX, sizeof(float));
    memcpy(&oy, &originY, sizeof(float));
    memcpy(&rot, &rotation, sizeof(float));
    DrawBillboardPro(cam, tex, src,
        (Vector3){i2f(posX), i2f(posY), i2f(posZ)},
        (Vector3){i2f(upX), i2f(upY), i2f(upZ)},
        (Vector2){sx, sy},
        (Vector2){ox, oy},
        rot, tint);
}
