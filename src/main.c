#include <raylib.h>

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

void DrawRectangleW(int posX, int posY, int width, int height, Color color) {
    DrawRectangle(posX, posY, width, height, color);
}