#include "../../c/common.h"

int LoadShaderW(const char* vsFileName, const char* fsFileName) {
    int slot = shaderAlloc();
    if (slot < 0) return -1;
    shaderRegistry[slot] = LoadShader(vsFileName, fsFileName);
    return slot;
}

int LoadShaderFromMemoryW(const char* vsCode, const char* fsCode) {
    int slot = shaderAlloc();
    if (slot < 0) return -1;
    shaderRegistry[slot] = LoadShaderFromMemory(vsCode, fsCode);
    return slot;
}

bool IsShaderValidW(int id) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return false;
    return IsShaderValid(shaderRegistry[id]);
}

int GetShaderLocationW(int id, const char* uniformName) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return -1;
    return GetShaderLocation(shaderRegistry[id], uniformName);
}

int GetShaderLocationAttribW(int id, const char* attribName) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return -1;
    return GetShaderLocationAttrib(shaderRegistry[id], attribName);
}

void SetShaderValueW(int id, int locIndex, const void* value, int uniformType) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    SetShaderValue(shaderRegistry[id], locIndex, value, uniformType);
}

void SetShaderValueVW(int id, int locIndex, const void* value, int uniformType, int count) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    SetShaderValueV(shaderRegistry[id], locIndex, value, uniformType, count);
}

void SetShaderValueMatrixW(int id, int locIndex, const float* mat) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    Matrix m;
    memcpy(&m, mat, sizeof(Matrix));
    SetShaderValueMatrix(shaderRegistry[id], locIndex, m);
}

void SetShaderValueTextureW(int id, int locIndex, unsigned int texId, int texW, int texH) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    Texture2D tex = { texId, texW, texH, 1, 7 };
    SetShaderValueTexture(shaderRegistry[id], locIndex, tex);
}

void UnloadShaderW(int id) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    UnloadShader(shaderRegistry[id]);
    shaderUsed[id] = false;
}

void BeginShaderModeW(int id) {
    if (id < 0 || id >= MAX_SHADERS || !shaderUsed[id]) return;
    BeginShaderMode(shaderRegistry[id]);
}

void EndShaderModeW() { EndShaderMode(); }
