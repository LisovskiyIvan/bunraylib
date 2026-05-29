#include <raylib.h>

void ColorNormalizeW(float* out, Color color) {
    Vector4 v = ColorNormalize(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z; out[3] = v.w;
}

int ColorFromNormalizedW(float x, float y, float z, float w) {
    Color c = ColorFromNormalized((Vector4){x, y, z, w});
    return *((int*)&c);
}

void ColorToHSVW(float* out, Color color) {
    Vector3 v = ColorToHSV(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z;
}
