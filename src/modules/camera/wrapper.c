#include "../../c/common.h"

void BeginMode2DW(float offX, float offY, float tarX, float tarY, float rotation, float zoom) {
    Camera2D cam = { {offX, offY}, {tarX, tarY}, rotation, zoom };
    BeginMode2D(cam);
}

void BeginMode3DW(float posX, float posY, float posZ, float tarX, float tarY, float tarZ, float upX, float upY, float upZ, float fovy, int projection) {
    Camera3D cam = { {posX, posY, posZ}, {tarX, tarY, tarZ}, {upX, upY, upZ}, fovy, projection };
    BeginMode3D(cam);
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
    float camPosX, float camPosY, float camPosZ, float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ, float camFovy, int camProj) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Ray r = GetScreenToWorldRay((Vector2){screenX, screenY}, cam);
    outPos[0] = r.position.x; outPos[1] = r.position.y; outPos[2] = r.position.z;
    outDir[0] = r.direction.x; outDir[1] = r.direction.y; outDir[2] = r.direction.z;
}

void GetWorldToScreenW(float* out, float posX, float posY, float posZ,
    float camPosX, float camPosY, float camPosZ, float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ, float camFovy, int camProj) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Vector2 v = GetWorldToScreen((Vector3){posX, posY, posZ}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetWorldToScreen2DW(float* out, float posX, float posY,
    float offX, float offY, float tarX, float tarY, float rotation, float zoom) {
    Camera2D cam = { {offX, offY}, {tarX, tarY}, rotation, zoom };
    Vector2 v = GetWorldToScreen2D((Vector2){posX, posY}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetScreenToWorld2DW(float* out, float posX, float posY,
    float offX, float offY, float tarX, float tarY, float rotation, float zoom) {
    Camera2D cam = { {offX, offY}, {tarX, tarY}, rotation, zoom };
    Vector2 v = GetScreenToWorld2D((Vector2){posX, posY}, cam);
    out[0] = v.x; out[1] = v.y;
}

void GetScreenToWorldRayExW(float* outPos, float* outDir,
    int screenX, int screenY, int screenW, int screenH,
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Ray r = GetScreenToWorldRayEx((Vector2){screenX, screenY}, cam, screenW, screenH);
    outPos[0] = r.position.x; outPos[1] = r.position.y; outPos[2] = r.position.z;
    outDir[0] = r.direction.x; outDir[1] = r.direction.y; outDir[2] = r.direction.z;
}

void GetWorldToScreenExW(float* out,
    float posX, float posY, float posZ,
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj,
    int screenW, int screenH) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Vector2 v = GetWorldToScreenEx((Vector3){posX, posY, posZ}, cam, screenW, screenH);
    out[0] = v.x; out[1] = v.y;
}

void GetCameraMatrixW(float* out,
    float camPosX, float camPosY, float camPosZ,
    float camTarX, float camTarY, float camTarZ,
    float camUpX, float camUpY, float camUpZ,
    float camFovy, int camProj) {
    Camera3D cam = {
        {camPosX, camPosY, camPosZ},
        {camTarX, camTarY, camTarZ},
        {camUpX, camUpY, camUpZ},
        camFovy, camProj
    };
    Matrix m = GetCameraMatrix(cam);
    memcpy(out, &m, sizeof(Matrix));
}

void GetCameraMatrix2DW(float* out,
    float offX, float offY, float tarX, float tarY, float rotation, float zoom) {
    Camera2D cam = { {offX, offY}, {tarX, tarY}, rotation, zoom };
    Matrix m = GetCameraMatrix2D(cam);
    memcpy(out, &m, sizeof(Matrix));
}
