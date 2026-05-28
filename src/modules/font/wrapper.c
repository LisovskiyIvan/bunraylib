#include "../../c/common.h"
#include <stdlib.h>

int LoadFontW(const char* fileName) {
    int slot = fontAlloc();
    if (slot < 0) return -1;
    fontRegistry[slot] = LoadFont(fileName);
    return slot;
}

int LoadFontExW(const char* fileName, int fontSize) {
    int slot = fontAlloc();
    if (slot < 0) return -1;
    fontRegistry[slot] = LoadFontEx(fileName, fontSize, NULL, 0);
    return slot;
}

int GetFontDefaultW() {
    int slot = fontAlloc();
    if (slot < 0) return -1;
    fontRegistry[slot] = GetFontDefault();
    return slot;
}

void UnloadFontW(int id) {
    if (id < 0 || id >= MAX_FONTS || !fontUsed[id]) return;
    UnloadFont(fontRegistry[id]);
    fontUsed[id] = false;
}

bool IsFontValidW(int id) {
    if (id < 0 || id >= MAX_FONTS || !fontUsed[id]) return false;
    return IsFontValid(fontRegistry[id]);
}

int MeasureTextW(const char* text, int fontSize) {
    return MeasureText(text, fontSize);
}

void MeasureTextExW(float* out, int fontId, const char* text, float fontSize, float spacing) {
    Vector2 v = MeasureTextEx(fontRegistry[fontId], text, fontSize, spacing);
    out[0] = v.x; out[1] = v.y;
}

void DrawTextExW(int fontId, const char* text, float posX, float posY, float fontSize, float spacing, Color tint) {
    DrawTextEx(fontRegistry[fontId], text, (Vector2){posX, posY}, fontSize, spacing, tint);
}

void DrawTextProW(int fontId, const char* text, float posX, float posY, float originX, float originY, float rotation, float fontSize, float spacing, Color tint) {
    DrawTextPro(fontRegistry[fontId], text, (Vector2){posX, posY}, (Vector2){originX, originY}, rotation, fontSize, spacing, tint);
}

void SetTextLineSpacingW(int spacing) { SetTextLineSpacing(spacing); }

int LoadFontFromImageW(int imageId, Color key, int firstChar) {
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return -1;
    int slot = fontAlloc();
    if (slot < 0) return -1;
    fontRegistry[slot] = LoadFontFromImage(imageRegistry[imageId], key, firstChar);
    return slot;
}

int LoadFontFromMemoryW(const char* fileType, const unsigned char* fileData, int dataSize, int fontSize) {
    int slot = fontAlloc();
    if (slot < 0) return -1;
    fontRegistry[slot] = LoadFontFromMemory(fileType, fileData, dataSize, fontSize, NULL, 0);
    return slot;
}

bool ExportFontAsCodeW(int fontId, const char* fileName) {
    if (fontId < 0 || fontId >= MAX_FONTS || !fontUsed[fontId]) return false;
    return ExportFontAsCode(fontRegistry[fontId], fileName);
}

void DrawTextCodepointW(int fontId, int codepoint, float posX, float posY, float fontSize, Color tint) {
    DrawTextCodepoint(fontRegistry[fontId], codepoint, (Vector2){posX, posY}, fontSize, tint);
}

void DrawTextCodepointsW(int fontId, const int* codepoints, int count, float posX, float posY, float fontSize, float spacing, Color tint) {
    DrawTextCodepoints(fontRegistry[fontId], codepoints, count, (Vector2){posX, posY}, fontSize, spacing, tint);
}

int GetGlyphIndexW(int fontId, int codepoint) {
    return GetGlyphIndex(fontRegistry[fontId], codepoint);
}

void GetGlyphInfoW(int* outValue, int* outOffsetX, int* outOffsetY, int* outAdvanceX, int* outImageSlot, int fontId, int codepoint) {
    GlyphInfo info = GetGlyphInfo(fontRegistry[fontId], codepoint);
    *outValue = info.value;
    *outOffsetX = info.offsetX;
    *outOffsetY = info.offsetY;
    *outAdvanceX = info.advanceX;
    int imgSlot = imageAlloc();
    if (imgSlot >= 0) {
        imageRegistry[imgSlot] = info.image;
    }
    *outImageSlot = imgSlot;
}

void GetGlyphAtlasRecW(float* out, int fontId, int codepoint) {
    Rectangle rec = GetGlyphAtlasRec(fontRegistry[fontId], codepoint);
    out[0] = rec.x; out[1] = rec.y; out[2] = rec.width; out[3] = rec.height;
}

int GetCodepointW(const char* text, int* outSize) {
    return GetCodepoint(text, outSize);
}

int GetCodepointNextW(const char* text, int* outSize) {
    return GetCodepointNext(text, outSize);
}

int GetCodepointPreviousW(const char* text, int* outSize) {
    return GetCodepointPrevious(text, outSize);
}

int GetCodepointCountW(const char* text) {
    return GetCodepointCount(text);
}

bool TextIsEqualW(const char* text1, const char* text2) {
    return TextIsEqual(text1, text2);
}

unsigned int TextLengthW(const char* text) {
    return TextLength(text);
}

int TextToIntegerW(const char* text) {
    return TextToInteger(text);
}

float TextToFloatW(const char* text) {
    return TextToFloat(text);
}

int TextFindIndexW(const char* text, const char* find) {
    return TextFindIndex(text, find);
}

void UnloadFontDataW(void* ptr, int glyphCount) {
    UnloadFontData((GlyphInfo*)ptr, glyphCount);
}

void UnloadUTF8W(char* text) { UnloadUTF8(text); }
void UnloadCodepointsW(int* codepoints) { UnloadCodepoints(codepoints); }

int TextCopyW(char* dst, const char* src) { return TextCopy(dst, src); }

void TextAppendW(char* text, const char* append, int* position) {
    TextAppend(text, append, position);
}

int GenImageFontAtlasW(float* outRecs, int* glyphData, int glyphCount, int fontSize, int padding, int packMethod) {
    GlyphInfo* glyphs = (GlyphInfo*)RL_MALLOC(glyphCount * sizeof(GlyphInfo));
    for (int i = 0; i < glyphCount; i++) {
        glyphs[i].value = glyphData[i * 5];
        glyphs[i].offsetX = glyphData[i * 5 + 1];
        glyphs[i].offsetY = glyphData[i * 5 + 2];
        glyphs[i].advanceX = glyphData[i * 5 + 3];
        int imgSlot = glyphData[i * 5 + 4];
        if (imgSlot >= 0 && imgSlot < MAX_IMAGES && imageUsed[imgSlot]) {
            glyphs[i].image = imageRegistry[imgSlot];
        } else {
            glyphs[i].image = (Image){NULL, 0, 0, 1, 0};
        }
    }

    Rectangle* recs = NULL;
    Image atlas = GenImageFontAtlas(glyphs, &recs, glyphCount, fontSize, padding, packMethod);

    RL_FREE(glyphs);

    if (recs && outRecs) {
        for (int i = 0; i < glyphCount; i++) {
            outRecs[i * 4] = recs[i].x;
            outRecs[i * 4 + 1] = recs[i].y;
            outRecs[i * 4 + 2] = recs[i].width;
            outRecs[i * 4 + 3] = recs[i].height;
        }
        RL_FREE(recs);
    }

    int imgSlot = imageAlloc();
    if (imgSlot >= 0) {
        imageRegistry[imgSlot] = atlas;
    }
    return imgSlot;
}

void MeasureTextCodepointsW(float* out, int fontId, const int* codepoints, int length, float fontSize, float spacing) {
    if (fontId < 0 || fontId >= MAX_FONTS || !fontUsed[fontId]) {
        out[0] = 0; out[1] = 0;
        return;
    }
    Vector2 v = MeasureTextCodepoints(fontRegistry[fontId], codepoints, length, fontSize, spacing);
    out[0] = v.x; out[1] = v.y;
}

void UnloadTextLinesW(char** text, int lineCount) {
    UnloadTextLines(text, lineCount);
}
