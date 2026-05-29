import { FFIType } from 'bun:ffi';
const { i32, cstring, f32, ptr } = FFIType;

export const fontDirectSymbols = {
  MeasureText: { args: [cstring, i32], returns: i32 },
  SetTextLineSpacing: { args: [i32], returns: FFIType.void },
  GetCodepoint: { args: [cstring, ptr], returns: i32 },
  GetCodepointNext: { args: [cstring, ptr], returns: i32 },
  GetCodepointPrevious: { args: [cstring, ptr], returns: i32 },
  GetCodepointCount: { args: [cstring], returns: i32 },
  TextIsEqual: { args: [cstring, cstring], returns: FFIType.bool },
  TextLength: { args: [cstring], returns: i32 },
  TextToInteger: { args: [cstring], returns: i32 },
  TextToFloat: { args: [cstring], returns: f32 },
  TextFindIndex: { args: [cstring, cstring], returns: i32 },
  TextCopy: { args: [ptr, cstring], returns: i32 },
  TextAppend: { args: [ptr, cstring, ptr], returns: FFIType.void },
} as const;

export const fontWrapperSymbols = {
  LoadFontW: { args: [cstring], returns: i32 },
  LoadFontExW: { args: [cstring, i32], returns: i32 },
  GetFontDefaultW: { args: [], returns: i32 },
  UnloadFontW: { args: [i32], returns: FFIType.void },
  IsFontValidW: { args: [i32], returns: FFIType.bool },
  MeasureTextExW: { args: [ptr, i32, cstring, f32, f32], returns: FFIType.void },
  DrawTextExW: { args: [i32, cstring, f32, f32, f32, f32, i32], returns: FFIType.void },
  DrawTextProW: {
    args: [i32, cstring, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  LoadFontFromImageW: { args: [i32, i32, i32], returns: i32 },
  LoadFontFromMemoryW: { args: [cstring, ptr, i32, i32], returns: i32 },
  ExportFontAsCodeW: { args: [i32, cstring], returns: FFIType.bool },
  DrawTextCodepointW: { args: [i32, i32, f32, f32, f32, i32], returns: FFIType.void },
  DrawTextCodepointsW: { args: [i32, ptr, i32, f32, f32, f32, f32, i32], returns: FFIType.void },
  GetGlyphIndexW: { args: [i32, i32], returns: i32 },
  GetGlyphInfoW: { args: [ptr, ptr, ptr, ptr, ptr, i32, i32], returns: FFIType.void },
  GetGlyphAtlasRecW: { args: [ptr, i32, i32], returns: FFIType.void },
  UnloadFontDataW: { args: [ptr, i32], returns: FFIType.void },
  UnloadUTF8W: { args: [ptr], returns: FFIType.void },
  UnloadCodepointsW: { args: [ptr], returns: FFIType.void },
  GenImageFontAtlasW: { args: [ptr, ptr, i32, i32, i32, i32], returns: i32 },
  MeasureTextCodepointsW: { args: [ptr, i32, ptr, i32, f32, f32], returns: FFIType.void },
  UnloadTextLinesW: { args: [ptr, i32], returns: FFIType.void },
} as const;
