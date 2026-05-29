import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import type { Vec2, Rectangle, Font, Image, GlyphInfo, Color } from '../../types';

const r = () => getSymbols();

export class FontModule {
  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r().symbols.DrawText(cstr(text), i(x), i(y), i(fontSize), i(col));
  }
  static loadFont(fileName: string): Font {
    return r().symbols.LoadFontW(cstr(fileName));
  }
  static loadFontEx(fileName: string, fontSize: number): Font {
    return r().symbols.LoadFontExW(cstr(fileName), i(fontSize));
  }
  static getFontDefault(): Font {
    return r().symbols.GetFontDefaultW();
  }
  static unloadFont(font: Font): void {
    r().symbols.UnloadFontW(i(font));
  }
  static isFontValid(font: Font): boolean {
    return r().symbols.IsFontValidW(i(font));
  }
  static measureText(text: string, fontSize: number): number {
    return r().symbols.MeasureText(cstr(text), i(fontSize));
  }
  static measureTextEx(font: Font, text: string, fontSize: number, spacing: number): Vec2 {
    r().symbols.MeasureTextExW(b._vec2Buf, i(font), cstr(text), f(fontSize), f(spacing));
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static drawTextEx(
    font: Font,
    text: string,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextExW(
      i(font),
      cstr(text),
      f(position.x),
      f(position.y),
      f(fontSize),
      f(spacing),
      i(tint),
    );
  }
  static drawTextPro(
    font: Font,
    text: string,
    position: Vec2,
    origin: Vec2,
    rotation: number,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextProW(
      i(font),
      cstr(text),
      f(position.x),
      f(position.y),
      f(origin.x),
      f(origin.y),
      f(rotation),
      f(fontSize),
      f(spacing),
      i(tint),
    );
  }
  static setTextLineSpacing(spacing: number): void {
    r().symbols.SetTextLineSpacing(i(spacing));
  }
  static loadFontFromImage(image: Image, key: Color, firstChar: number): Font {
    return r().symbols.LoadFontFromImageW(i(image), i(key), i(firstChar));
  }
  static loadFontFromMemory(
    fileType: string,
    fileData: Uint8Array,
    dataSize: number,
    fontSize: number,
  ): Font {
    return r().symbols.LoadFontFromMemoryW(cstr(fileType), fileData, i(dataSize), i(fontSize));
  }
  static exportFontAsCode(font: Font, fileName: string): boolean {
    return r().symbols.ExportFontAsCodeW(i(font), cstr(fileName));
  }
  static drawTextCodepoint(
    font: Font,
    codepoint: number,
    position: Vec2,
    fontSize: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextCodepointW(
      i(font),
      i(codepoint),
      f(position.x),
      f(position.y),
      f(fontSize),
      i(tint),
    );
  }
  static drawTextCodepoints(
    font: Font,
    codepoints: Int32Array,
    count: number,
    position: Vec2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextCodepointsW(
      i(font),
      codepoints,
      i(count),
      f(position.x),
      f(position.y),
      f(fontSize),
      f(spacing),
      i(tint),
    );
  }
  static getGlyphIndex(font: Font, codepoint: number): number {
    return r().symbols.GetGlyphIndexW(i(font), i(codepoint));
  }
  static getGlyphInfo(font: Font, codepoint: number): GlyphInfo {
    r().symbols.GetGlyphInfoW(
      b._glyphValue,
      b._glyphOffsetX,
      b._glyphOffsetY,
      b._glyphAdvanceX,
      b._glyphImageSlot,
      i(font),
      i(codepoint),
    );
    return {
      value: b._glyphValue[0]!,
      offsetX: b._glyphOffsetX[0]!,
      offsetY: b._glyphOffsetY[0]!,
      advanceX: b._glyphAdvanceX[0]!,
      image: b._glyphImageSlot[0]!,
    };
  }
  static getGlyphAtlasRec(font: Font, codepoint: number): Rectangle {
    r().symbols.GetGlyphAtlasRecW(b._recBuf, i(font), i(codepoint));
    return {
      x: b._recBuf[0]!,
      y: b._recBuf[1]!,
      width: b._recBuf[2]!,
      height: b._recBuf[3]!,
    };
  }
  static getCodepoint(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepoint(cstr(text), b._cpSize);
    return { codepoint: cp, size: b._cpSize[0]! };
  }
  static getCodepointNext(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepointNext(cstr(text), b._cpSize);
    return { codepoint: cp, size: b._cpSize[0]! };
  }
  static getCodepointPrevious(text: string): { codepoint: number; size: number } {
    const cp = r().symbols.GetCodepointPrevious(cstr(text), b._cpSize);
    return { codepoint: cp, size: b._cpSize[0]! };
  }
  static getCodepointCount(text: string): number {
    return r().symbols.GetCodepointCount(cstr(text));
  }
  static textIsEqual(text1: string, text2: string): boolean {
    return r().symbols.TextIsEqual(cstr(text1), cstr(text2));
  }
  static textLength(text: string): number {
    return r().symbols.TextLength(cstr(text));
  }
  static textToInteger(text: string): number {
    return r().symbols.TextToInteger(cstr(text));
  }
  static textToFloat(text: string): number {
    return r().symbols.TextToFloat(cstr(text));
  }
  static textFindIndex(text: string, find: string): number {
    return r().symbols.TextFindIndex(cstr(text), cstr(find));
  }
  static unloadFontData(ptr: number, glyphCount: number): void {
    r().symbols.UnloadFontData(ptr as unknown as Buffer, i(glyphCount));
  }
  static unloadUTF8(ptr: number): void {
    r().symbols.UnloadUTF8(ptr as unknown as Buffer);
  }
  static unloadCodepoints(ptr: number): void {
    r().symbols.UnloadCodepoints(ptr as unknown as Buffer);
  }
  static textCopy(dst: Uint8Array, src: string): number {
    return r().symbols.TextCopy(dst, cstr(src));
  }
  static textAppend(text: Uint8Array, append: string, position: number): number {
    b._textAppendPos[0] = position;
    r().symbols.TextAppend(text, cstr(append), b._textAppendPos);
    return b._textAppendPos[0];
  }
  static genImageFontAtlas(
    glyphs: GlyphInfo[],
    fontSize: number,
    padding: number,
    packMethod: number,
  ): { image: Image; glyphRecs: Float32Array } {
    const glyphCount = glyphs.length;
    const glyphData = new Int32Array(glyphCount * 5);
    for (let idx = 0; idx < glyphCount; idx++) {
      glyphData[idx * 5] = glyphs[idx]!.value;
      glyphData[idx * 5 + 1] = glyphs[idx]!.offsetX;
      glyphData[idx * 5 + 2] = glyphs[idx]!.offsetY;
      glyphData[idx * 5 + 3] = glyphs[idx]!.advanceX;
      glyphData[idx * 5 + 4] = glyphs[idx]!.image;
    }
    const recs = new Float32Array(glyphCount * 4);
    const img = r().symbols.GenImageFontAtlasW(
      recs,
      glyphData,
      i(glyphCount),
      i(fontSize),
      i(padding),
      i(packMethod),
    );
    return { image: img, glyphRecs: recs };
  }
  static measureTextCodepoints(
    font: Font,
    codepoints: Int32Array,
    length: number,
    fontSize: number,
    spacing: number,
  ): Vec2 {
    r().symbols.MeasureTextCodepointsW(
      b._vec2Buf,
      i(font),
      codepoints,
      i(length),
      f(fontSize),
      f(spacing),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static unloadTextLines(text: number, lineCount: number): void {
    r().symbols.UnloadTextLines(text as unknown as Buffer, i(lineCount));
  }
}
