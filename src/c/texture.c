#include "common.h"

void LoadTextureW(unsigned int* outId, int* outW, int* outH, const char* fileName) {
    Texture2D tex = LoadTexture(fileName);
    *outId = tex.id;
    *outW = tex.width;
    *outH = tex.height;
}

void UnloadTextureW(unsigned int id) {
    Texture2D tex = { id, 0, 0, 0, 0 };
    UnloadTexture(tex);
}

bool IsTextureValidW(unsigned int id, int w, int h) {
    Texture2D tex = { id, w, h, 1, 7 };
    return IsTextureValid(tex);
}

void LoadRenderTextureW(unsigned int* outId, unsigned int* outTexId, int* outW, int* outH, int width, int height) {
    RenderTexture2D rt = LoadRenderTexture(width, height);
    *outId = rt.id;
    *outTexId = rt.texture.id;
    *outW = rt.texture.width;
    *outH = rt.texture.height;
}

void UnloadRenderTextureW(unsigned int id) {
    RenderTexture2D rt = { id, {0, 0, 0, 0, 0}, {0, 0, 0, 0, 0} };
    UnloadRenderTexture(rt);
}

bool IsRenderTextureValidW(unsigned int id) {
    RenderTexture2D rt = { id, {0}, {0} };
    return IsRenderTextureValid(rt);
}

void GenTextureMipmapsW(unsigned int id) {
    Texture2D tex = { id, 0, 0, 0, 0 };
    GenTextureMipmaps(&tex);
}

void SetTextureFilterW(unsigned int id, int filter) {
    Texture2D tex = { id, 0, 0, 0, 0 };
    SetTextureFilter(tex, filter);
}

void SetTextureWrapW(unsigned int id, int wrap) {
    Texture2D tex = { id, 0, 0, 0, 0 };
    SetTextureWrap(tex, wrap);
}

void DrawTextureW(unsigned int id, int w, int h, int posX, int posY, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    DrawTexture(tex, posX, posY, tint);
}

void DrawTextureVW(unsigned int id, int w, int h, int posX, int posY, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    DrawTextureV(tex, (Vector2){posX, posY}, tint);
}

void DrawTextureExW(unsigned int id, int w, int h, int posX, int posY, float rotation, float scale, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    DrawTextureEx(tex, (Vector2){posX, posY}, rotation, scale, tint);
}

void DrawTextureRecW(unsigned int id, int w, int h, int srcX, int srcY, int srcW, int srcH, int posX, int posY, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    Rectangle src = { srcX, srcY, srcW, srcH };
    DrawTextureRec(tex, src, (Vector2){posX, posY}, tint);
}

void DrawTextureProW(unsigned int id, int w, int h,
    int srcX, int srcY, int srcW, int srcH,
    int dstX, int dstY, int dstW, int dstH,
    int originX, int originY, float rotation, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    Rectangle src = { srcX, srcY, srcW, srcH };
    Rectangle dst = { dstX, dstY, dstW, dstH };
    DrawTexturePro(tex, src, dst, (Vector2){originX, originY}, rotation, tint);
}

void LoadTextureFromImageW(unsigned int* outId, int* outW, int* outH, int imageId) {
    *outId = 0; *outW = 0; *outH = 0;
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return;
    Texture2D tex = LoadTextureFromImage(imageRegistry[imageId]);
    *outId = tex.id;
    *outW = tex.width;
    *outH = tex.height;
}

void LoadTextureCubemapW(unsigned int* outId, int* outW, int* outH, int imageId, int layout) {
    *outId = 0; *outW = 0; *outH = 0;
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return;
    Texture2D tex = LoadTextureCubemap(imageRegistry[imageId], layout);
    *outId = tex.id;
    *outW = tex.width;
    *outH = tex.height;
}

void UpdateTextureW(unsigned int id, int w, int h, const void* pixels) {
    Texture2D tex = { id, w, h, 1, 7 };
    UpdateTexture(tex, pixels);
}

void UpdateTextureRecW(unsigned int id, int w, int h, int rx, int ry, int rw, int rh, const void* pixels) {
    Texture2D tex = { id, w, h, 1, 7 };
    Rectangle rec = { rx, ry, rw, rh };
    UpdateTextureRec(tex, rec, pixels);
}

void DrawTextureNPatchW(unsigned int id, int w, int h,
    int srcX, int srcY, int srcW, int srcH,
    int left, int top, int right, int bottom, int layout,
    int dstX, int dstY, int dstW, int dstH,
    int originX, int originY, float rotation, Color tint) {
    Texture2D tex = { id, w, h, 1, 7 };
    Rectangle src = { srcX, srcY, srcW, srcH };
    NPatchInfo npi = { src, left, top, right, bottom, layout };
    Rectangle dst = { dstX, dstY, dstW, dstH };
    DrawTextureNPatch(tex, npi, dst, (Vector2){originX, originY}, rotation, tint);
}

int GetPixelColorW(const void* srcPtr, int format) {
    Color c = GetPixelColor((void*)srcPtr, format);
    return *((int*)&c);
}

void SetPixelColorW(void* dstPtr, Color color, int format) {
    SetPixelColor(dstPtr, color, format);
}
