#include "common.h"

int ColorToIntW(Color color) { return ColorToInt(color); }

void ColorNormalizeW(float* out, Color color) {
    Vector4 v = ColorNormalize(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z; out[3] = v.w;
}

int ColorFromNormalizedW(int x, int y, int z, int w) {
    float fx, fy, fz, fw;
    memcpy(&fx, &x, sizeof(float));
    memcpy(&fy, &y, sizeof(float));
    memcpy(&fz, &z, sizeof(float));
    memcpy(&fw, &w, sizeof(float));
    Color c = ColorFromNormalized((Vector4){fx, fy, fz, fw});
    return *((int*)&c);
}

void ColorToHSWW(float* out, Color color) {
    Vector3 v = ColorToHSV(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z;
}

int ColorFromHSWW(int hue, int saturation, int value) {
    float h, s, v;
    memcpy(&h, &hue, sizeof(float));
    memcpy(&s, &saturation, sizeof(float));
    memcpy(&v, &value, sizeof(float));
    Color c = ColorFromHSV(h, s, v);
    return *((int*)&c);
}

int ColorTintW(Color color, Color tint) {
    Color c = ColorTint(color, tint);
    return *((int*)&c);
}

int ColorBrightnessW(Color color, int factor) {
    float f;
    memcpy(&f, &factor, sizeof(float));
    Color c = ColorBrightness(color, f);
    return *((int*)&c);
}

int ColorContrastW(Color color, int contrast) {
    float c_val;
    memcpy(&c_val, &contrast, sizeof(float));
    Color c = ColorContrast(color, c_val);
    return *((int*)&c);
}

int ColorAlphaW(Color color, int alpha) {
    float a;
    memcpy(&a, &alpha, sizeof(float));
    Color c = ColorAlpha(color, a);
    return *((int*)&c);
}

int ColorAlphaBlendW(Color dst, Color src, Color tint) {
    Color c = ColorAlphaBlend(dst, src, tint);
    return *((int*)&c);
}

int ColorLerpW(Color color1, Color color2, int factor) {
    float f;
    memcpy(&f, &factor, sizeof(float));
    Color c = ColorLerp(color1, color2, f);
    return *((int*)&c);
}

int GetColorW(unsigned int hexValue) {
    Color c = GetColor(hexValue);
    return *((int*)&c);
}

int FadeW(Color color, int alpha) {
    float a;
    memcpy(&a, &alpha, sizeof(float));
    Color c = Fade(color, a);
    return *((int*)&c);
}

bool ColorIsEqualW(Color col1, Color col2) { return ColorIsEqual(col1, col2); }

int GetPixelDataSizeW(int width, int height, int format) { return GetPixelDataSize(width, height, format); }

void ColorToHSVW(float* out, Color color) {
    Vector3 v = ColorToHSV(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z;
}

int ColorFromHSVW(int hue, int saturation, int value) {
    float h, s, v;
    memcpy(&h, &hue, sizeof(float));
    memcpy(&s, &saturation, sizeof(float));
    memcpy(&v, &value, sizeof(float));
    Color c = ColorFromHSV(h, s, v);
    return *((int*)&c);
}
