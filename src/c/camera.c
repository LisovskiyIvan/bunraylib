#include "common.h"

void BeginMode2DW(int offX, int offY, int tarX, int tarY, int rotation, int zoom) {
    Camera2D cam = { {i2f(offX), i2f(offY) }, {i2f(tarX), i2f(tarY) }, i2f(rotation), i2f(zoom) };
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

void UpdateCameraW(float* pos, float* tar, float* up, float* fovy, int* projection, int mode) {
    Camera3D cam = {
        {pos[0], pos[1], pos[2]},
        {tar[0], tar[1], tar[2]},
        {up[0], up[1], up[2]},
        fovy[0],
        projection[0]
    };
    UpdateCamera(&cam, mode);
    pos[0] = cam.position.x; pos[1] = cam.position.y; pos[2] = cam.position.z;
    tar[0] = cam.target.x;   tar[1] = cam.target.y;   tar[2] = cam.target.z;
    up[0]  = cam.up.x;       up[1]  = cam.up.y;       up[2]  = cam.up.z;
    fovy[0] = cam.fovy;
    projection[0] = cam.projection;
}

void UpdateCameraProW(float* pos, float* tar, float* up, float* fovy, int* projection,
                      float mx, float my, float mz, float rx, float ry, float rz, float zoom) {
    Camera3D cam = {
        {pos[0], pos[1], pos[2]},
        {tar[0], tar[1], tar[2]},
        {up[0], up[1], up[2]},
        fovy[0],
        projection[0]
    };
    UpdateCameraPro(&cam, (Vector3){mx, my, mz}, (Vector3){rx, ry, rz}, zoom);
    pos[0] = cam.position.x; pos[1] = cam.position.y; pos[2] = cam.position.z;
    tar[0] = cam.target.x;   tar[1] = cam.target.y;   tar[2] = cam.target.z;
    up[0]  = cam.up.x;       up[1]  = cam.up.y;       up[2]  = cam.up.z;
    fovy[0] = cam.fovy;
    projection[0] = cam.projection;
}

void GetScreenToWorldRayW(float* outPos, float* outDir, int screenX, int screenY,
    int camPosX, int camPosY, int camPosZ, int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ, int camFovy, int camProj) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Ray r = GetScreenToWorldRay((Vector2){screenX, screenY}, cam);
    outPos[0] = r.position.x; outPos[1] = r.position.y; outPos[2] = r.position.z;
    outDir[0] = r.direction.x; outDir[1] = r.direction.y; outDir[2] = r.direction.z;
}

void GetWorldToScreenW(float* out, int posX, int posY, int posZ,
    int camPosX, int camPosY, int camPosZ, int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ, int camFovy, int camProj) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Vector2 v = GetWorldToScreen((Vector3){i2f(posX), i2f(posY), i2f(posZ)}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetWorldToScreen2DW(float* out, int posX, int posY,
    int offX, int offY, int tarX, int tarY, int rotation, int zoom) {
    float r, z;
    memcpy(&r, &rotation, sizeof(float));
    memcpy(&z, &zoom, sizeof(float));
    Camera2D cam = { {offX, offY}, {tarX, tarY}, r, z };
    Vector2 v = GetWorldToScreen2D((Vector2){posX, posY}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetScreenToWorld2DW(float* out, int posX, int posY,
    int offX, int offY, int tarX, int tarY, int rotation, int zoom) {
    float r, z;
    memcpy(&r, &rotation, sizeof(float));
    memcpy(&z, &zoom, sizeof(float));
    Camera2D cam = { {offX, offY}, {tarX, tarY}, r, z };
    Vector2 v = GetScreenToWorld2D((Vector2){posX, posY}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetScreenToWorldRayExW(float* outPos, float* outDir,
    int screenX, int screenY, int screenW, int screenH,
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Ray r = GetScreenToWorldRayEx((Vector2){screenX, screenY}, cam, screenW, screenH);
    outPos[0] = r.position.x; outPos[1] = r.position.y; outPos[2] = r.position.z;
    outDir[0] = r.direction.x; outDir[1] = r.direction.y; outDir[2] = r.direction.z;
}

void GetWorldToScreenExW(float* out,
    int posX, int posY, int posZ,
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj,
    int screenW, int screenH) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Vector2 v = GetWorldToScreenEx((Vector3){i2f(posX), i2f(posY), i2f(posZ)}, cam, screenW, screenH);
    out[0] = v.x; out[1] = v.y;
}

void GetCameraMatrixW(float* out,
    int camPosX, int camPosY, int camPosZ,
    int camTarX, int camTarY, int camTarZ,
    int camUpX, int camUpY, int camUpZ,
    int camFovy, int camProj) {
    Camera3D cam = {
        {i2f(camPosX), i2f(camPosY), i2f(camPosZ)},
        {i2f(camTarX), i2f(camTarY), i2f(camTarZ)},
        {i2f(camUpX), i2f(camUpY), i2f(camUpZ)},
        i2f(camFovy), camProj
    };
    Matrix m = GetCameraMatrix(cam);
    memcpy(out, &m, sizeof(Matrix));
}

void GetCameraMatrix2DW(float* out,
    int offX, int offY, int tarX, int tarY, int rotation, int zoom) {
    float r, z;
    memcpy(&r, &rotation, sizeof(float));
    memcpy(&z, &zoom, sizeof(float));
    Camera2D cam = { {offX, offY}, {tarX, tarY}, r, z };
    Matrix m = GetCameraMatrix2D(cam);
    memcpy(out, &m, sizeof(Matrix));
}
