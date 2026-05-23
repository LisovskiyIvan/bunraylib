import { FFIType } from 'bun:ffi';
const { i32, bool, ptr } = FFIType;

export const colorSymbols = {
  ColorToIntW: { args: [i32], returns: i32 },
  ColorNormalizeW: { args: [ptr, i32], returns: FFIType.void },
  ColorFromNormalizedW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: i32 },
  ColorToHSWW: { args: [ptr, i32], returns: FFIType.void },
  ColorFromHSWW: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: i32 },
  ColorTintW: { args: [i32, i32], returns: i32 },
  ColorBrightnessW: { args: [i32, FFIType.f32], returns: i32 },
  ColorContrastW: { args: [i32, FFIType.f32], returns: i32 },
  ColorAlphaW: { args: [i32, FFIType.f32], returns: i32 },
  ColorAlphaBlendW: { args: [i32, i32, i32], returns: i32 },
  ColorLerpW: { args: [i32, i32, FFIType.f32], returns: i32 },
  GetColorW: { args: [i32], returns: i32 },
  FadeW: { args: [i32, FFIType.f32], returns: i32 },
  ColorIsEqualW: { args: [i32, i32], returns: bool },
  GetPixelDataSizeW: { args: [i32, i32, i32], returns: i32 },
  ColorToHSVW: { args: [ptr, i32], returns: FFIType.void },
  ColorFromHSVW: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: i32 },
} as const;
