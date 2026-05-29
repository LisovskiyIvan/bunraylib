import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import type { Vec2, Rectangle, Texture2D, Font, Image, Color } from '../../types';

const r = () => getSymbols();

export class ImageModule {
  static loadImage(fileName: string): Image {
    return r().symbols.LoadImageW(cstr(fileName));
  }
  static loadImageRaw(
    fileName: string,
    width: number,
    height: number,
    format: number,
    headerSize: number,
  ): Image {
    return r().symbols.LoadImageRawW(cstr(fileName), i(width), i(height), i(format), i(headerSize));
  }
  static loadImageAnim(fileName: string): { image: Image; frames: number } {
    r().symbols.LoadImageAnimW(b._imgAnimSlot, b._imgAnimFrames, cstr(fileName));
    return { image: b._imgAnimSlot[0]!, frames: b._imgAnimFrames[0]! };
  }
  static loadImageFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Image {
    return r().symbols.LoadImageFromMemoryW(cstr(fileType), fileData, i(dataSize));
  }
  static loadImageFromTexture(texture: Texture2D): Image {
    return r().symbols.LoadImageFromTextureW(i(texture.id), i(texture.width), i(texture.height));
  }
  static loadImageFromScreen(): Image {
    return r().symbols.LoadImageFromScreenW();
  }
  static isImageValid(image: Image): boolean {
    return r().symbols.IsImageValidW(i(image));
  }
  static unloadImage(image: Image): void {
    r().symbols.UnloadImageW(i(image));
  }
  static exportImage(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageW(i(image), cstr(fileName));
  }
  static exportImageAsCode(image: Image, fileName: string): boolean {
    return r().symbols.ExportImageAsCodeW(i(image), cstr(fileName));
  }
  static genImageColor(width: number, height: number, color: Color): Image {
    return r().symbols.GenImageColorW(i(width), i(height), i(color));
  }
  static genImageGradientLinear(
    width: number,
    height: number,
    direction: number,
    start: Color,
    end: Color,
  ): Image {
    return r().symbols.GenImageGradientLinearW(i(width), i(height), i(direction), i(start), i(end));
  }
  static genImageGradientRadial(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientRadialW(i(width), i(height), f(density), i(inner), i(outer));
  }
  static genImageGradientSquare(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return r().symbols.GenImageGradientSquareW(i(width), i(height), f(density), i(inner), i(outer));
  }
  static genImageChecked(
    width: number,
    height: number,
    checksX: number,
    checksY: number,
    col1: Color,
    col2: Color,
  ): Image {
    return r().symbols.GenImageCheckedW(
      i(width),
      i(height),
      i(checksX),
      i(checksY),
      i(col1),
      i(col2),
    );
  }
  static genImageWhiteNoise(width: number, height: number, factor: number): Image {
    return r().symbols.GenImageWhiteNoiseW(i(width), i(height), f(factor));
  }
  static genImagePerlinNoise(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
  ): Image {
    return r().symbols.GenImagePerlinNoiseW(i(width), i(height), i(offsetX), i(offsetY), f(scale));
  }
  static genImageCellular(width: number, height: number, tileSize: number): Image {
    return r().symbols.GenImageCellularW(i(width), i(height), i(tileSize));
  }
  static genImageText(width: number, height: number, text: string): Image {
    return r().symbols.GenImageTextW(i(width), i(height), cstr(text));
  }
  static imageCopy(image: Image): Image {
    return r().symbols.ImageCopyW(i(image));
  }
  static imageFromImage(image: Image, rec: Rectangle): Image {
    return r().symbols.ImageFromImageW(i(image), i(rec.x), i(rec.y), i(rec.width), i(rec.height));
  }
  static imageFromChannel(image: Image, selectedChannel: number): Image {
    return r().symbols.ImageFromChannelW(i(image), i(selectedChannel));
  }
  static imageText(text: string, fontSize: number, color: Color): Image {
    return r().symbols.ImageTextW(cstr(text), i(fontSize), i(color));
  }
  static imageTextEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): Image {
    return r().symbols.ImageTextExW(i(font), cstr(text), i(fontSize), f(spacing), i(tint));
  }
  static imageFormat(image: Image, newFormat: number): void {
    r().symbols.ImageFormatW(i(image), i(newFormat));
  }
  static imageCrop(image: Image, rec: Rectangle): void {
    r().symbols.ImageCropW(i(image), i(rec.x), i(rec.y), i(rec.width), i(rec.height));
  }
  static imageAlphaCrop(image: Image, threshold: number): void {
    r().symbols.ImageAlphaCropW(i(image), f(threshold));
  }
  static imageAlphaClear(image: Image, color: Color, threshold: number): void {
    r().symbols.ImageAlphaClearW(i(image), i(color), f(threshold));
  }
  static imageAlphaMask(image: Image, alphaMask: Image): void {
    r().symbols.ImageAlphaMaskW(i(image), i(alphaMask));
  }
  static imageAlphaPremultiply(image: Image): void {
    r().symbols.ImageAlphaPremultiplyW(i(image));
  }
  static imageBlurGaussian(image: Image, blurSize: number): void {
    r().symbols.ImageBlurGaussianW(i(image), i(blurSize));
  }
  static imageResize(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeW(i(image), i(newWidth), i(newHeight));
  }
  static imageResizeNN(image: Image, newWidth: number, newHeight: number): void {
    r().symbols.ImageResizeNNW(i(image), i(newWidth), i(newHeight));
  }
  static imageResizeCanvas(
    image: Image,
    newWidth: number,
    newHeight: number,
    offsetX: number,
    offsetY: number,
    fill: Color,
  ): void {
    r().symbols.ImageResizeCanvasW(
      i(image),
      i(newWidth),
      i(newHeight),
      i(offsetX),
      i(offsetY),
      i(fill),
    );
  }
  static imageMipmaps(image: Image): void {
    r().symbols.ImageMipmapsW(i(image));
  }
  static imageDither(image: Image, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void {
    r().symbols.ImageDitherW(i(image), i(rBpp), i(gBpp), i(bBpp), i(aBpp));
  }
  static imageFlipVertical(image: Image): void {
    r().symbols.ImageFlipVerticalW(i(image));
  }
  static imageFlipHorizontal(image: Image): void {
    r().symbols.ImageFlipHorizontalW(i(image));
  }
  static imageRotate(image: Image, degrees: number): void {
    r().symbols.ImageRotateW(i(image), f(degrees));
  }
  static imageRotateCW(image: Image): void {
    r().symbols.ImageRotateCWW(i(image));
  }
  static imageRotateCCW(image: Image): void {
    r().symbols.ImageRotateCCWW(i(image));
  }
  static imageColorTint(image: Image, color: Color): void {
    r().symbols.ImageColorTintW(i(image), i(color));
  }
  static imageColorInvert(image: Image): void {
    r().symbols.ImageColorInvertW(i(image));
  }
  static imageColorGrayscale(image: Image): void {
    r().symbols.ImageColorGrayscaleW(i(image));
  }
  static imageColorContrast(image: Image, contrast: number): void {
    r().symbols.ImageColorContrastW(i(image), f(contrast));
  }
  static imageColorBrightness(image: Image, brightness: number): void {
    r().symbols.ImageColorBrightnessW(i(image), i(brightness));
  }
  static imageColorReplace(image: Image, color: Color, replace: Color): void {
    r().symbols.ImageColorReplaceW(i(image), i(color), i(replace));
  }
  static getImageAlphaBorder(image: Image, threshold: number): Rectangle {
    r().symbols.GetImageAlphaBorderW(b._recBuf, i(image), f(threshold));
    return {
      x: b._recBuf[0]!,
      y: b._recBuf[1]!,
      width: b._recBuf[2]!,
      height: b._recBuf[3]!,
    };
  }
  static getImageColor(image: Image, x: number, y: number): Color {
    return r().symbols.GetImageColorW(i(image), i(x), i(y));
  }
  static imageClearBackground(dst: Image, color: Color): void {
    r().symbols.ImageClearBackgroundW(i(dst), i(color));
  }
  static imageDrawPixel(dst: Image, posX: number, posY: number, color: Color): void {
    r().symbols.ImageDrawPixelW(i(dst), i(posX), i(posY), i(color));
  }
  static imageDrawPixelV(dst: Image, position: Vec2, color: Color): void {
    r().symbols.ImageDrawPixelVW(i(dst), i(position.x), i(position.y), i(color));
  }
  static imageDrawLine(
    dst: Image,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawLineW(i(dst), i(startX), i(startY), i(endX), i(endY), i(color));
  }
  static imageDrawLineV(dst: Image, start: Vec2, end: Vec2, color: Color): void {
    r().symbols.ImageDrawLineVW(i(dst), i(start.x), i(start.y), i(end.x), i(end.y), i(color));
  }
  static imageDrawLineEx(dst: Image, start: Vec2, end: Vec2, thick: number, color: Color): void {
    r().symbols.ImageDrawLineExW(
      i(dst),
      i(start.x),
      i(start.y),
      i(end.x),
      i(end.y),
      i(thick),
      i(color),
    );
  }
  static imageDrawCircle(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleW(i(dst), i(centerX), i(centerY), i(radius), i(color));
  }
  static imageDrawCircleV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleVW(i(dst), i(center.x), i(center.y), i(radius), i(color));
  }
  static imageDrawCircleLines(
    dst: Image,
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawCircleLinesW(i(dst), i(centerX), i(centerY), i(radius), i(color));
  }
  static imageDrawCircleLinesV(dst: Image, center: Vec2, radius: number, color: Color): void {
    r().symbols.ImageDrawCircleLinesVW(i(dst), i(center.x), i(center.y), i(radius), i(color));
  }
  static imageDrawRectangle(
    dst: Image,
    posX: number,
    posY: number,
    w: number,
    h: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawRectangleW(i(dst), i(posX), i(posY), i(w), i(h), i(color));
  }
  static imageDrawRectangleV(dst: Image, position: Vec2, size: Vec2, color: Color): void {
    r().symbols.ImageDrawRectangleVW(
      i(dst),
      i(position.x),
      i(position.y),
      i(size.x),
      i(size.y),
      i(color),
    );
  }
  static imageDrawRectangleRec(dst: Image, rec: Rectangle, color: Color): void {
    r().symbols.ImageDrawRectangleRecW(
      i(dst),
      i(rec.x),
      i(rec.y),
      i(rec.width),
      i(rec.height),
      i(color),
    );
  }
  static imageDrawRectangleLines(dst: Image, rec: Rectangle, thick: number, color: Color): void {
    r().symbols.ImageDrawRectangleLinesW(
      i(dst),
      i(rec.x),
      i(rec.y),
      i(rec.width),
      i(rec.height),
      i(thick),
      i(color),
    );
  }
  static imageDrawTriangle(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleW(
      i(dst),
      i(v1.x),
      i(v1.y),
      i(v2.x),
      i(v2.y),
      i(v3.x),
      i(v3.y),
      i(color),
    );
  }
  static imageDrawTriangleEx(
    dst: Image,
    v1: Vec2,
    v2: Vec2,
    v3: Vec2,
    c1: Color,
    c2: Color,
    c3: Color,
  ): void {
    r().symbols.ImageDrawTriangleExW(
      i(dst),
      i(v1.x),
      i(v1.y),
      i(v2.x),
      i(v2.y),
      i(v3.x),
      i(v3.y),
      i(c1),
      i(c2),
      i(c3),
    );
  }
  static imageDrawTriangleLines(dst: Image, v1: Vec2, v2: Vec2, v3: Vec2, color: Color): void {
    r().symbols.ImageDrawTriangleLinesW(
      i(dst),
      i(v1.x),
      i(v1.y),
      i(v2.x),
      i(v2.y),
      i(v3.x),
      i(v3.y),
      i(color),
    );
  }
  static imageDrawTriangleFan(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleFanW(i(dst), points, i(points.length / 2), i(color));
  }
  static imageDrawTriangleStrip(dst: Image, points: Float32Array, color: Color): void {
    r().symbols.ImageDrawTriangleStripW(i(dst), points, i(points.length / 2), i(color));
  }
  static imageDraw(
    dst: Image,
    src: Image,
    srcRec: Rectangle,
    dstRec: Rectangle,
    tint: Color,
  ): void {
    r().symbols.ImageDrawW(
      i(dst),
      i(src),
      i(srcRec.x),
      i(srcRec.y),
      i(srcRec.width),
      i(srcRec.height),
      i(dstRec.x),
      i(dstRec.y),
      i(dstRec.width),
      i(dstRec.height),
      i(tint),
    );
  }
  static imageDrawText(
    dst: Image,
    text: string,
    posX: number,
    posY: number,
    fontSize: number,
    color: Color,
  ): void {
    r().symbols.ImageDrawTextW(i(dst), cstr(text), i(posX), i(posY), i(fontSize), i(color));
  }
  static imageDrawTextEx(
    dst: Image,
    font: Font,
    text: string,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r().symbols.ImageDrawTextExW(
      i(dst),
      i(font),
      cstr(text),
      i(position.x),
      i(position.y),
      i(fontSize),
      f(spacing),
      i(tint),
    );
  }
  static imageToPOT(image: Image, fill: number): void {
    r().symbols.ImageToPOTW(i(image), i(fill));
  }
  static imageKernelConvolution(image: Image, kernel: Float32Array): void {
    r().symbols.ImageKernelConvolutionW(i(image), kernel, i(kernel.length));
  }
  static unloadImageColors(ptr: number): void {
    r().symbols.UnloadImageColorsW(ptr as unknown as Buffer);
  }
  static unloadImagePalette(ptr: number): void {
    r().symbols.UnloadImagePaletteW(ptr as unknown as Buffer);
  }
  static loadImageAnimFromMemory(
    fileType: string,
    data: Buffer | Uint8Array,
    frames?: Int32Array,
  ): Image {
    return r().symbols.LoadImageAnimFromMemoryW(
      cstr(fileType),
      data,
      i(data.length),
      frames ?? new Int32Array(1),
    );
  }
}
