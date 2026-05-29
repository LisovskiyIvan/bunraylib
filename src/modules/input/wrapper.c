#include <raylib.h>

void GetMousePositionW(float* out) {
    Vector2 v = GetMousePosition();
    out[0] = v.x; out[1] = v.y;
}

void GetMouseDeltaW(float* out) {
    Vector2 v = GetMouseDelta();
    out[0] = v.x; out[1] = v.y;
}

void GetMouseWheelMoveVW(float* out) {
    Vector2 v = GetMouseWheelMoveV();
    out[0] = v.x; out[1] = v.y;
}

void GetTouchPositionW(float* out, int index) {
    Vector2 v = GetTouchPosition(index);
    out[0] = v.x; out[1] = v.y;
}

void GetGestureDragVectorW(float* out) {
    Vector2 v = GetGestureDragVector();
    out[0] = v.x; out[1] = v.y;
}

void GetGesturePinchVectorW(float* out) {
    Vector2 v = GetGesturePinchVector();
    out[0] = v.x; out[1] = v.y;
}
