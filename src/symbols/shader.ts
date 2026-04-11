import { FFIType } from "bun:ffi";
const { i32, cstring, bool, ptr } = FFIType;

export const shaderSymbols = {
  LoadShaderW: { args: [cstring, cstring], returns: i32 },
  LoadShaderFromMemoryW: { args: [cstring, cstring], returns: i32 },
  IsShaderValidW: { args: [i32], returns: bool },
  GetShaderLocationW: { args: [i32, cstring], returns: i32 },
  GetShaderLocationAttribW: { args: [i32, cstring], returns: i32 },
  SetShaderValueMatrixW: { args: [i32, i32, ptr], returns: FFIType.void },
  SetShaderValueTextureW: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
  UnloadShaderW: { args: [i32], returns: FFIType.void },
  BeginShaderModeW: { args: [i32], returns: FFIType.void },
  EndShaderModeW: { args: [], returns: FFIType.void },
} as const;
