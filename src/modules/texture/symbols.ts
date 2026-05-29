import { FFIType } from 'bun:ffi';
const { i32, ptr, bool, cstring, f32 } = FFIType;

export const textureDirectSymbols = {
  GetPixelColor: { args: [ptr, i32], returns: i32 },
  SetPixelColor: { args: [ptr, i32, i32], returns: FFIType.void },
} as const;

export const textureWrapperSymbols = {
  LoadTextureW: { args: [ptr, ptr, ptr, cstring], returns: FFIType.void },
  UnloadTextureW: { args: [i32], returns: FFIType.void },
  IsTextureValidW: { args: [i32, i32, i32], returns: bool },
  LoadRenderTextureW: { args: [ptr, ptr, ptr, ptr, i32, i32], returns: FFIType.void },
  UnloadRenderTextureW: { args: [i32], returns: FFIType.void },
  IsRenderTextureValidW: { args: [i32], returns: bool },
  GenTextureMipmapsW: { args: [i32], returns: FFIType.void },
  SetTextureFilterW: { args: [i32, i32], returns: FFIType.void },
  SetTextureWrapW: { args: [i32, i32], returns: FFIType.void },
  DrawTextureW: { args: [i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawTextureVW: { args: [i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawTextureExW: {
    args: [i32, i32, i32, i32, i32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawTextureRecW: {
    args: [i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawTextureProW: {
    args: [i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, f32, i32],
    returns: FFIType.void,
  },
  LoadTextureFromImageW: { args: [ptr, ptr, ptr, i32], returns: FFIType.void },
  LoadTextureCubemapW: { args: [ptr, ptr, ptr, i32, i32], returns: FFIType.void },
  UpdateTextureW: { args: [i32, i32, i32, ptr], returns: FFIType.void },
  UpdateTextureRecW: { args: [i32, i32, i32, i32, i32, i32, i32, ptr], returns: FFIType.void },
  DrawTextureNPatchW: {
    args: [
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      f32,
      i32,
    ],
    returns: FFIType.void,
  },
} as const;
