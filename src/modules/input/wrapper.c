#include "../../c/common.h"

bool IsKeyPressedW(int key) { return IsKeyPressed(key); }
bool IsKeyPressedRepeatW(int key) { return IsKeyPressedRepeat(key); }
bool IsKeyDownW(int key) { return IsKeyDown(key); }
bool IsKeyReleasedW(int key) { return IsKeyReleased(key); }
bool IsKeyUpW(int key) { return IsKeyUp(key); }
int GetKeyPressedW() { return GetKeyPressed(); }
int GetCharPressedW() { return GetCharPressed(); }
void SetExitKeyW(int key) { SetExitKey(key); }

bool IsGamepadAvailableW(int gamepad) { return IsGamepadAvailable(gamepad); }
const char* GetGamepadNameW(int gamepad) { return GetGamepadName(gamepad); }
bool IsGamepadButtonPressedW(int gamepad, int button) { return IsGamepadButtonPressed(gamepad, button); }
bool IsGamepadButtonDownW(int gamepad, int button) { return IsGamepadButtonDown(gamepad, button); }
bool IsGamepadButtonReleasedW(int gamepad, int button) { return IsGamepadButtonReleased(gamepad, button); }
bool IsGamepadButtonUpW(int gamepad, int button) { return IsGamepadButtonUp(gamepad, button); }
int GetGamepadButtonPressedW() { return GetGamepadButtonPressed(); }
int GetGamepadAxisCountW(int gamepad) { return GetGamepadAxisCount(gamepad); }
float GetGamepadAxisMovementW(int gamepad, int axis) { return GetGamepadAxisMovement(gamepad, axis); }
int SetGamepadMappingsW(const char* mappings) { return SetGamepadMappings(mappings); }

void SetGamepadVibrationW(int gamepad, float leftMotor, float rightMotor, float duration) {
    SetGamepadVibration(gamepad, leftMotor, rightMotor, duration);
}

bool IsMouseButtonPressedW(int button) { return IsMouseButtonPressed(button); }
bool IsMouseButtonDownW(int button) { return IsMouseButtonDown(button); }
bool IsMouseButtonReleasedW(int button) { return IsMouseButtonReleased(button); }
bool IsMouseButtonUpW(int button) { return IsMouseButtonUp(button); }
int GetMouseXW() { return GetMouseX(); }
int GetMouseYW() { return GetMouseY(); }

void GetMousePositionW(float* out) {
    Vector2 v = GetMousePosition();
    out[0] = v.x; out[1] = v.y;
}

void GetMouseDeltaW(float* out) {
    Vector2 v = GetMouseDelta();
    out[0] = v.x; out[1] = v.y;
}

void SetMousePositionW(int x, int y) { SetMousePosition(x, y); }
void SetMouseOffsetW(int x, int y) { SetMouseOffset(x, y); }
void SetMouseScaleW(float scaleX, float scaleY) { SetMouseScale(scaleX, scaleY); }
float GetMouseWheelMoveW() { return GetMouseWheelMove(); }

void GetMouseWheelMoveVW(float* out) {
    Vector2 v = GetMouseWheelMoveV();
    out[0] = v.x; out[1] = v.y;
}

void SetMouseCursorW(int cursor) { SetMouseCursor(cursor); }

int GetTouchXW() { return GetTouchX(); }
int GetTouchYW() { return GetTouchY(); }

void GetTouchPositionW(float* out, int index) {
    Vector2 v = GetTouchPosition(index);
    out[0] = v.x; out[1] = v.y;
}

int GetTouchPointIdW(int index) { return GetTouchPointId(index); }
int GetTouchPointCountW() { return GetTouchPointCount(); }

void SetGesturesEnabledW(unsigned int flags) { SetGesturesEnabled(flags); }
bool IsGestureDetectedW(unsigned int gesture) { return IsGestureDetected(gesture); }
int GetGestureDetectedW() { return GetGestureDetected(); }
float GetGestureHoldDurationW() { return GetGestureHoldDuration(); }

void GetGestureDragVectorW(float* out) {
    Vector2 v = GetGestureDragVector();
    out[0] = v.x; out[1] = v.y;
}

float GetGestureDragAngleW() { return GetGestureDragAngle(); }

void GetGesturePinchVectorW(float* out) {
    Vector2 v = GetGesturePinchVector();
    out[0] = v.x; out[1] = v.y;
}

float GetGesturePinchAngleW() { return GetGesturePinchAngle(); }
