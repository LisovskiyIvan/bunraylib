#include "../../c/common.h"

void GetMonitorPositionW(float* out, int monitor) {
    Vector2 v = GetMonitorPosition(monitor);
    out[0] = v.x; out[1] = v.y;
}

void GetWindowPositionW(float* out) {
    Vector2 v = GetWindowPosition();
    out[0] = v.x; out[1] = v.y;
}

void GetWindowScaleDPIW(float* out) {
    Vector2 v = GetWindowScaleDPI();
    out[0] = v.x; out[1] = v.y;
}

void BeginTextureModeW(unsigned int id, int w, int h) {
    RenderTexture2D rt = { id, {id, w, h, 1, 7}, {0, 0, 0, 0, 0} };
    BeginTextureMode(rt);
}

void TraceLogW(int logLevel, const char* text) {
    TraceLog(logLevel, "%s", text);
}

void SetWindowIconW(int imageId) {
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return;
    SetWindowIcon(imageRegistry[imageId]);
}

int GetClipboardImageW() {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GetClipboardImage();
    return slot;
}

void SetWindowIconsW(Image* images, int count) { SetWindowIcons(images, count); }
