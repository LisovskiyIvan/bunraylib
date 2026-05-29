import { FFIType } from 'bun:ffi';
const { i32, bool, ptr } = FFIType;

export const colorSymbols = {
  ColorNormalizeW: { args: [ptr, i32], returns: FFIType.void },
  ColorToHSVW: { args: [ptr, i32], returns: FFIType.void },
  ColorFromNormalizedW: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: i32,
  },
} as const;

export const colorDirectSymbols = {
  ColorIsEqual: { args: [i32, i32], returns: bool },
  ColorToInt: { args: [i32], returns: i32 },
  GetPixelDataSize: { args: [i32, i32, i32], returns: i32 },
  ColorTint: { args: [i32, i32], returns: i32 },
  ColorBrightness: { args: [i32, FFIType.f32], returns: i32 },
  ColorContrast: { args: [i32, FFIType.f32], returns: i32 },
  ColorAlpha: { args: [i32, FFIType.f32], returns: i32 },
  ColorAlphaBlend: { args: [i32, i32, i32], returns: i32 },
  ColorLerp: { args: [i32, i32, FFIType.f32], returns: i32 },
  GetColor: { args: [i32], returns: i32 },
  Fade: { args: [i32, FFIType.f32], returns: i32 },
  ColorFromHSV: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: i32 },
} as const;
