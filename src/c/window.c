#include "common.h"

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

void SetTargetFPSW(int fps) {
    SetTargetFPS(fps);
}

float GetFrameTimeW() {
    return GetFrameTime();
}

bool IsWindowReadyW() { return IsWindowReady(); }
bool IsWindowFullscreenW() { return IsWindowFullscreen(); }
bool IsWindowHiddenW() { return IsWindowHidden(); }
bool IsWindowMinimizedW() { return IsWindowMinimized(); }
bool IsWindowMaximizedW() { return IsWindowMaximized(); }
bool IsWindowFocusedW() { return IsWindowFocused(); }
bool IsWindowResizedW() { return IsWindowResized(); }
bool IsWindowStateW(unsigned int flag) { return IsWindowState(flag); }

void SetWindowStateW(unsigned int flags) { SetWindowState(flags); }
void ClearWindowStateW(unsigned int flags) { ClearWindowState(flags); }
void ToggleFullscreenW() { ToggleFullscreen(); }
void ToggleBorderlessWindowedW() { ToggleBorderlessWindowed(); }
void MaximizeWindowW() { MaximizeWindow(); }
void MinimizeWindowW() { MinimizeWindow(); }
void RestoreWindowW() { RestoreWindow(); }

void SetWindowTitleW(const char* title) { SetWindowTitle(title); }
void SetWindowPositionW(int x, int y) { SetWindowPosition(x, y); }
void SetWindowMonitorW(int monitor) { SetWindowMonitor(monitor); }
void SetWindowMinSizeW(int w, int h) { SetWindowMinSize(w, h); }
void SetWindowMaxSizeW(int w, int h) { SetWindowMaxSize(w, h); }
void SetWindowSizeW(int w, int h) { SetWindowSize(w, h); }
void SetWindowOpacityW(float opacity) { SetWindowOpacity(i2f(opacity)); }
void SetWindowFocusedW() { SetWindowFocused(); }

int GetScreenWidthW() { return GetScreenWidth(); }
int GetScreenHeightW() { return GetScreenHeight(); }
int GetRenderWidthW() { return GetRenderWidth(); }
int GetRenderHeightW() { return GetRenderHeight(); }

int GetMonitorCountW() { return GetMonitorCount(); }
int GetCurrentMonitorW() { return GetCurrentMonitor(); }

void GetMonitorPositionW(float* out, int monitor) {
    Vector2 v = GetMonitorPosition(monitor);
    out[0] = v.x; out[1] = v.y;
}

int GetMonitorWidthW(int monitor) { return GetMonitorWidth(monitor); }
int GetMonitorHeightW(int monitor) { return GetMonitorHeight(monitor); }
int GetMonitorPhysicalWidthW(int monitor) { return GetMonitorPhysicalWidth(monitor); }
int GetMonitorPhysicalHeightW(int monitor) { return GetMonitorPhysicalHeight(monitor); }
int GetMonitorRefreshRateW(int monitor) { return GetMonitorRefreshRate(monitor); }

void GetWindowPositionW(float* out) {
    Vector2 v = GetWindowPosition();
    out[0] = v.x; out[1] = v.y;
}

void GetWindowScaleDPIW(float* out) {
    Vector2 v = GetWindowScaleDPI();
    out[0] = v.x; out[1] = v.y;
}

const char* GetMonitorNameW(int monitor) { return GetMonitorName(monitor); }

void SetClipboardTextW(const char* text) { SetClipboardText(text); }
const char* GetClipboardTextW() { return GetClipboardText(); }

void EnableEventWaitingW() { EnableEventWaiting(); }
void DisableEventWaitingW() { DisableEventWaiting(); }

void ShowCursorW() { ShowCursor(); }
void HideCursorW() { HideCursor(); }
bool IsCursorHiddenW() { return IsCursorHidden(); }
void EnableCursorW() { EnableCursor(); }
void DisableCursorW() { DisableCursor(); }
bool IsCursorOnScreenW() { return IsCursorOnScreen(); }

void BeginTextureModeW(unsigned int id, int w, int h) {
    RenderTexture2D rt = { id, {id, w, h, 1, 7}, {0, 0, 0, 0, 0} };
    BeginTextureMode(rt);
}
void EndTextureModeW() { EndTextureMode(); }

void BeginBlendModeW(int mode) { BeginBlendMode(mode); }
void EndBlendModeW() { EndBlendMode(); }

void BeginScissorModeW(int x, int y, int w, int h) { BeginScissorMode(x, y, w, h); }
void EndScissorModeW() { EndScissorMode(); }

double GetTimeW() { return GetTime(); }
int GetFPSW() { return GetFPS(); }
void SwapScreenBufferW() { SwapScreenBuffer(); }
void PollInputEventsW() { PollInputEvents(); }
void WaitTimeW(double seconds) { WaitTime(seconds); }

void SetRandomSeedW(unsigned int seed) { SetRandomSeed(seed); }
int GetRandomValueW(int min, int max) { return GetRandomValue(min, max); }

void TakeScreenshotW(const char* fileName) { TakeScreenshot(fileName); }
void SetConfigFlagsW(unsigned int flags) { SetConfigFlags(flags); }
void OpenURLW(const char* url) { OpenURL(url); }

void TraceLogW(int logLevel, const char* text) {
    TraceLog(logLevel, "%s", text);
}

void SetTraceLogLevelW(int logLevel) {
    SetTraceLogLevel(logLevel);
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
