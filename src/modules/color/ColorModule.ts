import { getSymbols } from '../../symbols';
import { bufs as b, f, i } from '../../utils';
import type {
  Color } from '../../types';

const r = () => getSymbols();

export class ColorModule {
  static colorToInt(c: Color): number {
    return r().symbols.ColorToIntW(i(c));
  }
  static colorNormalize(c: Color): { x: number; y: number; z: number; w: number } {
    r().symbols.ColorNormalizeW(b._vec4Buf, i(c));
    return {
      x: b._vec4Buf[0]!,
      y: b._vec4Buf[1]!,
      z: b._vec4Buf[2]!,
      w: b._vec4Buf[3]! };
  }
  static colorFromNormalized(normalized: { x: number; y: number; z: number; w: number }): Color {
    return r().symbols.ColorFromNormalizedW(
      f(normalized.x),
      f(normalized.y),
      f(normalized.z),
      f(normalized.w),
    );
  }
  static colorToHSV(c: Color): { h: number; s: number; v: number } {
    r().symbols.ColorToHSVW(b._vec3Buf2, i(c));
    return { h: b._vec3Buf2[0]!, s: b._vec3Buf2[1]!, v: b._vec3Buf2[2]! };
  }
  static colorFromHSV(hue: number, saturation: number, value: number): Color {
    return r().symbols.ColorFromHSVW(f(hue), f(saturation), f(value));
  }
  static colorTint(color: Color, tint: Color): Color {
    return r().symbols.ColorTintW(i(color), i(tint));
  }
  static colorBrightness(color: Color, factor: number): Color {
    return r().symbols.ColorBrightnessW(i(color), f(factor));
  }
  static colorContrast(color: Color, contrast: number): Color {
    return r().symbols.ColorContrastW(i(color), f(contrast));
  }
  static colorAlpha(color: Color, alpha: number): Color {
    return r().symbols.ColorAlphaW(i(color), f(alpha));
  }
  static colorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
    return r().symbols.ColorAlphaBlendW(i(dst), i(src), i(tint));
  }
  static colorLerp(color1: Color, color2: Color, factor: number): Color {
    return r().symbols.ColorLerpW(i(color1), i(color2), f(factor));
  }
  static getColor(hexValue: number): Color {
    return r().symbols.GetColorW(i(hexValue));
  }
  static fade(color: Color, alpha: number): Color {
    return r().symbols.FadeW(i(color), f(alpha));
  }
  static colorIsEqual(col1: Color, col2: Color): boolean {
    return r().symbols.ColorIsEqualW(i(col1), i(col2));
  }
  static getPixelDataSize(width: number, height: number, format: number): number {
    return r().symbols.GetPixelDataSizeW(i(width), i(height), i(format));
  }
}
