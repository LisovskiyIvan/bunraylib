#include "../../c/common.h"

int LoadImageW(const char* fileName) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = LoadImage(fileName);
    return slot;
}

int LoadImageRawW(const char* fileName, int width, int height, int format, int headerSize) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = LoadImageRaw(fileName, width, height, format, headerSize);
    return slot;
}

void LoadImageAnimW(int* outSlot, int* outFrames, const char* fileName) {
    int slot = imageAlloc();
    if (slot < 0) { *outSlot = -1; *outFrames = 0; return; }
    imageRegistry[slot] = LoadImageAnim(fileName, outFrames);
    *outSlot = slot;
}

int LoadImageFromMemoryW(const char* fileType, const unsigned char* fileData, int dataSize) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = LoadImageFromMemory(fileType, fileData, dataSize);
    return slot;
}

int LoadImageFromTextureW(unsigned int texId, int texW, int texH) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    Texture2D tex = { texId, texW, texH, 1, 7 };
    imageRegistry[slot] = LoadImageFromTexture(tex);
    return slot;
}

int LoadImageFromScreenW() {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = LoadImageFromScreen();
    return slot;
}

bool IsImageValidW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return false;
    return IsImageValid(imageRegistry[id]);
}

void UnloadImageW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    UnloadImage(imageRegistry[id]);
    imageUsed[id] = false;
}

bool ExportImageW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return false;
    return ExportImage(imageRegistry[id], fileName);
}

bool ExportImageAsCodeW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return false;
    return ExportImageAsCode(imageRegistry[id], fileName);
}

int GenImageColorW(int width, int height, Color color) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageColor(width, height, color);
    return slot;
}

int GenImageGradientLinearW(int width, int height, int direction, Color start, Color end) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageGradientLinear(width, height, direction, start, end);
    return slot;
}

int GenImageGradientRadialW(int width, int height, float density, Color inner, Color outer) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageGradientRadial(width, height, density, inner, outer);
    return slot;
}

int GenImageGradientSquareW(int width, int height, float density, Color inner, Color outer) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageGradientSquare(width, height, density, inner, outer);
    return slot;
}

int GenImageCheckedW(int width, int height, int checksX, int checksY, Color col1, Color col2) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageChecked(width, height, checksX, checksY, col1, col2);
    return slot;
}

int GenImageWhiteNoiseW(int width, int height, float factor) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageWhiteNoise(width, height, factor);
    return slot;
}

int GenImagePerlinNoiseW(int width, int height, int offsetX, int offsetY, float scale) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImagePerlinNoise(width, height, offsetX, offsetY, scale);
    return slot;
}

int GenImageCellularW(int width, int height, int tileSize) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageCellular(width, height, tileSize);
    return slot;
}

int GenImageTextW(int width, int height, const char* text) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = GenImageText(width, height, text);
    return slot;
}

int ImageCopyW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return -1;
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = ImageCopy(imageRegistry[id]);
    return slot;
}

int ImageFromImageW(int id, int rx, int ry, int rw, int rh) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return -1;
    int slot = imageAlloc();
    if (slot < 0) return -1;
    Rectangle rec = { rx, ry, rw, rh };
    imageRegistry[slot] = ImageFromImage(imageRegistry[id], rec);
    return slot;
}

int ImageFromChannelW(int id, int selectedChannel) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return -1;
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = ImageFromChannel(imageRegistry[id], selectedChannel);
    return slot;
}

int ImageTextW(const char* text, int fontSize, Color color) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = ImageText(text, fontSize, color);
    return slot;
}

int ImageTextExW(int fontId, const char* text, int fontSize, float spacing, Color tint) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = ImageTextEx(fontRegistry[fontId], text, fontSize, spacing, tint);
    return slot;
}

void ImageFormatW(int id, int newFormat) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageFormat(&imageRegistry[id], newFormat);
}

void ImageCropW(int id, int rx, int ry, int rw, int rh) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    Rectangle rec = { rx, ry, rw, rh };
    ImageCrop(&imageRegistry[id], rec);
}

void ImageAlphaCropW(int id, float threshold) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageAlphaCrop(&imageRegistry[id], threshold);
}

void ImageAlphaClearW(int id, Color color, float threshold) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageAlphaClear(&imageRegistry[id], color, threshold);
}

void ImageAlphaMaskW(int id, int alphaMaskId) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    if (alphaMaskId < 0 || alphaMaskId >= MAX_IMAGES || !imageUsed[alphaMaskId]) return;
    ImageAlphaMask(&imageRegistry[id], imageRegistry[alphaMaskId]);
}

void ImageAlphaPremultiplyW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageAlphaPremultiply(&imageRegistry[id]);
}

void ImageBlurGaussianW(int id, int blurSize) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageBlurGaussian(&imageRegistry[id], blurSize);
}

void ImageResizeW(int id, int newWidth, int newHeight) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageResize(&imageRegistry[id], newWidth, newHeight);
}

void ImageResizeNNW(int id, int newWidth, int newHeight) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageResizeNN(&imageRegistry[id], newWidth, newHeight);
}

void ImageResizeCanvasW(int id, int newWidth, int newHeight, int offsetX, int offsetY, Color fill) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageResizeCanvas(&imageRegistry[id], newWidth, newHeight, offsetX, offsetY, fill);
}

void ImageMipmapsW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageMipmaps(&imageRegistry[id]);
}

void ImageDitherW(int id, int rBpp, int gBpp, int bBpp, int aBpp) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageDither(&imageRegistry[id], rBpp, gBpp, bBpp, aBpp);
}

void ImageFlipVerticalW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageFlipVertical(&imageRegistry[id]);
}

void ImageFlipHorizontalW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageFlipHorizontal(&imageRegistry[id]);
}

void ImageRotateW(int id, float degrees) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageRotate(&imageRegistry[id], degrees);
}

void ImageRotateCWW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageRotateCW(&imageRegistry[id]);
}

void ImageRotateCCWW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageRotateCCW(&imageRegistry[id]);
}

void ImageColorTintW(int id, Color color) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorTint(&imageRegistry[id], color);
}

void ImageColorInvertW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorInvert(&imageRegistry[id]);
}

void ImageColorGrayscaleW(int id) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorGrayscale(&imageRegistry[id]);
}

void ImageColorContrastW(int id, float contrast) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorContrast(&imageRegistry[id], contrast);
}

void ImageColorBrightnessW(int id, int brightness) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorBrightness(&imageRegistry[id], brightness);
}

void ImageColorReplaceW(int id, Color color, Color replace) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageColorReplace(&imageRegistry[id], color, replace);
}

void GetImageAlphaBorderW(float* out, int id, float threshold) {
    Rectangle rec = {0};
    if (id >= 0 && id < MAX_IMAGES && imageUsed[id]) {
        rec = GetImageAlphaBorder(imageRegistry[id], threshold);
    }
    out[0] = rec.x; out[1] = rec.y; out[2] = rec.width; out[3] = rec.height;
}

int GetImageColorW(int id, int x, int y) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return 0;
    Color c = GetImageColor(imageRegistry[id], x, y);
    return *((int*)&c);
}

void ImageClearBackgroundW(int dstId, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageClearBackground(&imageRegistry[dstId], color);
}

void ImageDrawPixelW(int dstId, int posX, int posY, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawPixel(&imageRegistry[dstId], posX, posY, color);
}

void ImageDrawPixelVW(int dstId, int posX, int posY, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawPixelV(&imageRegistry[dstId], (Vector2){posX, posY}, color);
}

void ImageDrawLineW(int dstId, int startX, int startY, int endX, int endY, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawLine(&imageRegistry[dstId], startX, startY, endX, endY, color);
}

void ImageDrawLineVW(int dstId, int startX, int startY, int endX, int endY, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawLineV(&imageRegistry[dstId], (Vector2){startX, startY}, (Vector2){endX, endY}, color);
}

void ImageDrawLineExW(int dstId, int startX, int startY, int endX, int endY, int thick, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawLineEx(&imageRegistry[dstId], (Vector2){startX, startY}, (Vector2){endX, endY}, thick, color);
}

void ImageDrawCircleW(int dstId, int centerX, int centerY, int radius, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawCircle(&imageRegistry[dstId], centerX, centerY, radius, color);
}

void ImageDrawCircleVW(int dstId, int centerX, int centerY, int radius, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawCircleV(&imageRegistry[dstId], (Vector2){centerX, centerY}, radius, color);
}

void ImageDrawCircleLinesW(int dstId, int centerX, int centerY, int radius, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawCircleLines(&imageRegistry[dstId], centerX, centerY, radius, color);
}

void ImageDrawCircleLinesVW(int dstId, int centerX, int centerY, int radius, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawCircleLinesV(&imageRegistry[dstId], (Vector2){centerX, centerY}, radius, color);
}

void ImageDrawRectangleW(int dstId, int posX, int posY, int w, int h, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawRectangle(&imageRegistry[dstId], posX, posY, w, h, color);
}

void ImageDrawRectangleVW(int dstId, int posX, int posY, int w, int h, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawRectangleV(&imageRegistry[dstId], (Vector2){posX, posY}, (Vector2){w, h}, color);
}

void ImageDrawRectangleRecW(int dstId, int rx, int ry, int rw, int rh, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    Rectangle rec = { rx, ry, rw, rh };
    ImageDrawRectangleRec(&imageRegistry[dstId], rec, color);
}

void ImageDrawRectangleLinesW(int dstId, int rx, int ry, int rw, int rh, int thick, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    Rectangle rec = { rx, ry, rw, rh };
    ImageDrawRectangleLines(&imageRegistry[dstId], rec, thick, color);
}

void ImageDrawTriangleW(int dstId, int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTriangle(&imageRegistry[dstId], (Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void ImageDrawTriangleExW(int dstId, int x1, int y1, int x2, int y2, int x3, int y3, Color c1, Color c2, Color c3) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTriangleEx(&imageRegistry[dstId], (Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, c1, c2, c3);
}

void ImageDrawTriangleLinesW(int dstId, int x1, int y1, int x2, int y2, int x3, int y3, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTriangleLines(&imageRegistry[dstId], (Vector2){x1, y1}, (Vector2){x2, y2}, (Vector2){x3, y3}, color);
}

void ImageDrawTriangleFanW(int dstId, const float* points, int pointCount, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTriangleFan(&imageRegistry[dstId], (Vector2*)points, pointCount, color);
}

void ImageDrawTriangleStripW(int dstId, const float* points, int pointCount, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTriangleStrip(&imageRegistry[dstId], (Vector2*)points, pointCount, color);
}

void ImageDrawW(int dstId, int srcId, int srcRX, int srcRY, int srcRW, int srcRH, int dstRX, int dstRY, int dstRW, int dstRH, Color tint) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    if (srcId < 0 || srcId >= MAX_IMAGES || !imageUsed[srcId]) return;
    Rectangle srcRec = { srcRX, srcRY, srcRW, srcRH };
    Rectangle dstRec = { dstRX, dstRY, dstRW, dstRH };
    ImageDraw(&imageRegistry[dstId], imageRegistry[srcId], srcRec, dstRec, tint);
}

void ImageDrawTextW(int dstId, const char* text, int posX, int posY, int fontSize, Color color) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawText(&imageRegistry[dstId], text, posX, posY, fontSize, color);
}

void ImageDrawTextExW(int dstId, int fontId, const char* text, int posX, int posY, int fontSize, float spacing, Color tint) {
    if (dstId < 0 || dstId >= MAX_IMAGES || !imageUsed[dstId]) return;
    ImageDrawTextEx(&imageRegistry[dstId], fontRegistry[fontId], text, (Vector2){posX, posY}, fontSize, spacing, tint);
}

void ImageToPOTW(int id, int fill) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    Color c;
    memcpy(&c, &fill, sizeof(int));
    ImageToPOT(&imageRegistry[id], c);
}

void ImageKernelConvolutionW(int id, const float* kernel, int kernelSize) {
    if (id < 0 || id >= MAX_IMAGES || !imageUsed[id]) return;
    ImageKernelConvolution(&imageRegistry[id], kernel, kernelSize);
}

void UnloadImageColorsW(void* ptr) { MemFree(ptr); }
void UnloadImagePaletteW(void* ptr) { MemFree(ptr); }

int LoadImageAnimFromMemoryW(const char* fileType, const unsigned char* fileData, int dataSize, int* frames) {
    int slot = imageAlloc();
    if (slot < 0) return -1;
    imageRegistry[slot] = LoadImageAnimFromMemory(fileType, fileData, dataSize, frames);
    if (imageRegistry[slot].data == NULL) { imageUsed[slot] = false; return -1; }
    return slot;
}
