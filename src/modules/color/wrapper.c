#include "../../c/common.h"

void ColorNormalizeW(float* out, Color color) {
    Vector4 v = ColorNormalize(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z; out[3] = v.w;
}

int ColorFromNormalizedW(float x, float y, float z, float w) {
    Color c = ColorFromNormalized((Vector4){x, y, z, w});
    return *((int*)&c);
}

void ColorToHSWW(float* out, Color color) {
    Vector3 v = ColorToHSV(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z;
}

int ColorFromHSWW(float hue, float saturation, float value) {
    Color c = ColorFromHSV(hue, saturation, value);
    return *((int*)&c);
}

int ColorTintW(Color color, Color tint) {
    Color c = ColorTint(color, tint);
    return *((int*)&c);
}

int ColorBrightnessW(Color color, float factor) {
    Color c = ColorBrightness(color, factor);
    return *((int*)&c);
}

int ColorContrastW(Color color, float contrast) {
    Color c = ColorContrast(color, contrast);
    return *((int*)&c);
}

int ColorAlphaW(Color color, float alpha) {
    Color c = ColorAlpha(color, alpha);
    return *((int*)&c);
}

int ColorAlphaBlendW(Color dst, Color src, Color tint) {
    Color c = ColorAlphaBlend(dst, src, tint);
    return *((int*)&c);
}

int ColorLerpW(Color color1, Color color2, float factor) {
    Color c = ColorLerp(color1, color2, factor);
    return *((int*)&c);
}

int GetColorW(unsigned int hexValue) {
    Color c = GetColor(hexValue);
    return *((int*)&c);
}

int FadeW(Color color, float alpha) {
    Color c = Fade(color, alpha);
    return *((int*)&c);
}

void ColorToHSVW(float* out, Color color) {
    Vector3 v = ColorToHSV(color);
    out[0] = v.x; out[1] = v.y; out[2] = v.z;
}

int ColorFromHSVW(float hue, float saturation, float value) {
    Color c = ColorFromHSV(hue, saturation, value);
    return *((int*)&c);
}
