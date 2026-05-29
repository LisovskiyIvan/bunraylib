#include "../../c/common.h"

void DrawLine3DW(float sx, float sy, float sz, float ex, float ey, float ez, Color color) {
    DrawLine3D((Vector3){sx, sy, sz}, (Vector3){ex, ey, ez}, color);
}

void DrawPoint3DW(float px, float py, float pz, Color color) {
    DrawPoint3D((Vector3){px, py, pz}, color);
}

void DrawCircle3DW(float cx, float cy, float cz, float radius, float rax, float ray, float raz, float angle, Color color) {
    DrawCircle3D((Vector3){cx, cy, cz}, radius, (Vector3){rax, ray, raz}, angle, color);
}

void DrawTriangle3DW(float v1x, float v1y, float v1z, float v2x, float v2y, float v2z, float v3x, float v3y, float v3z, Color color) {
    DrawTriangle3D(
        (Vector3){v1x, v1y, v1z},
        (Vector3){v2x, v2y, v2z},
        (Vector3){v3x, v3y, v3z},
        color
    );
}

void DrawCubeW(float px, float py, float pz, float w, float h, float l, Color color) {
    DrawCube((Vector3){px, py, pz}, w, h, l, color);
}

void DrawCubeVW(float px, float py, float pz, float sx, float sy, float sz, Color color) {
    DrawCubeV((Vector3){px, py, pz}, (Vector3){sx, sy, sz}, color);
}

void DrawCubeWiresW(float px, float py, float pz, float w, float h, float l, Color color) {
    DrawCubeWires((Vector3){px, py, pz}, w, h, l, color);
}

void DrawCubeWiresVW(float px, float py, float pz, float sx, float sy, float sz, Color color) {
    DrawCubeWiresV((Vector3){px, py, pz}, (Vector3){sx, sy, sz}, color);
}

void DrawSphereW(float cx, float cy, float cz, float radius, Color color) {
    DrawSphere((Vector3){cx, cy, cz}, radius, color);
}

void DrawSphereExW(float cx, float cy, float cz, float radius, int rings, int slices, Color color) {
    DrawSphereEx((Vector3){cx, cy, cz}, radius, rings, slices, color);
}

void DrawSphereWiresW(float cx, float cy, float cz, float radius, int rings, int slices, Color color) {
    DrawSphereWires((Vector3){cx, cy, cz}, radius, rings, slices, color);
}

void DrawCylinderW(float px, float py, float pz, float rt, float rb, float h, int slices, Color color) {
    DrawCylinder((Vector3){px, py, pz}, rt, rb, h, slices, color);
}

void DrawCylinderExW(float sx, float sy, float sz, float ex, float ey, float ez, float sr, float er, int sides, Color color) {
    DrawCylinderEx((Vector3){sx, sy, sz}, (Vector3){ex, ey, ez}, sr, er, sides, color);
}

void DrawCylinderWiresW(float px, float py, float pz, float rt, float rb, float h, int slices, Color color) {
    DrawCylinderWires((Vector3){px, py, pz}, rt, rb, h, slices, color);
}

void DrawCylinderWiresExW(float sx, float sy, float sz, float ex, float ey, float ez, float sr, float er, int sides, Color color) {
    DrawCylinderWiresEx((Vector3){sx, sy, sz}, (Vector3){ex, ey, ez}, sr, er, sides, color);
}

void DrawCapsuleW(float sx, float sy, float sz, float ex, float ey, float ez, float radius, int slices, int rings, Color color) {
    DrawCapsule((Vector3){sx, sy, sz}, (Vector3){ex, ey, ez}, radius, slices, rings, color);
}

void DrawCapsuleWiresW(float sx, float sy, float sz, float ex, float ey, float ez, float radius, int slices, int rings, Color color) {
    DrawCapsuleWires((Vector3){sx, sy, sz}, (Vector3){ex, ey, ez}, radius, slices, rings, color);
}

void DrawPlaneW(float cx, float cy, float cz, float sw, float sh, Color color) {
    DrawPlane((Vector3){cx, cy, cz}, (Vector2){sw, sh}, color);
}

void DrawRayW(float px, float py, float pz, float dx, float dy, float dz, Color color) {
    Ray ray = {{px, py, pz}, {dx, dy, dz}};
    DrawRay(ray, color);
}

void DrawModelW(int id, float posX, float posY, float posZ, float scale, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    DrawModel(modelRegistry[id], (Vector3){posX, posY, posZ}, scale, tint);
}

void DrawModelExW(int id,
    float posX, float posY, float posZ,
    float rotAxisX, float rotAxisY, float rotAxisZ, float rotAngle,
    float scaleX, float scaleY, float scaleZ, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    DrawModelEx(modelRegistry[id],
        (Vector3){posX, posY, posZ},
        (Vector3){rotAxisX, rotAxisY, rotAxisZ}, rotAngle,
        (Vector3){scaleX, scaleY, scaleZ}, tint);
}

void DrawModelWiresW(int id, float posX, float posY, float posZ, float scale, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    DrawModelWires(modelRegistry[id], (Vector3){posX, posY, posZ}, scale, tint);
}

void DrawModelWiresExW(int id,
    float posX, float posY, float posZ,
    float rotAxisX, float rotAxisY, float rotAxisZ, float rotAngle,
    float scaleX, float scaleY, float scaleZ, Color tint) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    DrawModelWiresEx(modelRegistry[id],
        (Vector3){posX, posY, posZ},
        (Vector3){rotAxisX, rotAxisY, rotAxisZ}, rotAngle,
        (Vector3){scaleX, scaleY, scaleZ}, tint);
}

void DrawBoundingBoxW(float minX, float minY, float minZ, float maxX, float maxY, float maxZ, Color color) {
    BoundingBox bb = {
        {minX, minY, minZ},
        {maxX, maxY, maxZ}
    };
    DrawBoundingBox(bb, color);
}

void DrawBillboardW(
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    float posX, float posY, float posZ,
    float scale, Color tint) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Texture2D tex = {texId, texW, texH, 1, 7};
    DrawBillboard(cam, tex, (Vector3){posX, posY, posZ}, scale, tint);
}

void DrawBillboardRecW(
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    int srcX, int srcY, int srcW, int srcH,
    float posX, float posY, float posZ,
    float sizeX, float sizeY, Color tint) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Texture2D tex = {texId, texW, texH, 1, 7};
    Rectangle src = {srcX, srcY, srcW, srcH};
    DrawBillboardRec(cam, tex, src, (Vector3){posX, posY, posZ}, (Vector2){sizeX, sizeY}, tint);
}

void DrawBillboardProW(
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj,
    unsigned int texId, int texW, int texH,
    int srcX, int srcY, int srcW, int srcH,
    float posX, float posY, float posZ,
    float upX, float upY, float upZ,
    float sizeX, float sizeY,
    float originX, float originY,
    float rotation, Color tint) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Texture2D tex = {texId, texW, texH, 1, 7};
    Rectangle src = {srcX, srcY, srcW, srcH};
    DrawBillboardPro(cam, tex, src,
        (Vector3){posX, posY, posZ},
        (Vector3){upX, upY, upZ},
        (Vector2){sizeX, sizeY},
        (Vector2){originX, originY},
        rotation, tint);
}

void DrawMeshW(int meshId, int materialId, const float* transform) {
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) return;
    if (materialId < 0 || materialId >= MAX_MATERIALS || !materialUsed[materialId]) return;
    DrawMesh(meshRegistry[meshId], materialRegistry[materialId], *(Matrix*)transform);
}

void DrawMeshInstancedW(int meshId, int materialId, const float* transforms, int instances) {
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) return;
    if (materialId < 0 || materialId >= MAX_MATERIALS || !materialUsed[materialId]) return;
    DrawMeshInstanced(meshRegistry[meshId], materialRegistry[materialId],
        (const Matrix*)transforms, instances);
}
