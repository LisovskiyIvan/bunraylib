import { FFIType } from 'bun:ffi';
const { i32, ptr, f32 } = FFIType;

export const cameraSymbols = {
  BeginMode2DW: { args: [i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  EndMode2DW: { args: [], returns: FFIType.void },
  BeginMode3DW: {
    args: [i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  EndMode3DW: { args: [], returns: FFIType.void },
  UpdateCameraW: { args: [ptr, ptr, ptr, ptr, ptr, i32], returns: FFIType.void },
  UpdateCameraProW: {
    args: [ptr, ptr, ptr, ptr, ptr, f32, f32, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  GetScreenToWorldRayW: {
    args: [ptr, ptr, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetWorldToScreenW: {
    args: [ptr, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetWorldToScreen2DW: {
    args: [ptr, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetScreenToWorld2DW: {
    args: [ptr, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetScreenToWorldRayExW: {
    args: [ptr, ptr, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetWorldToScreenExW: {
    args: [ptr, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetCameraMatrixW: {
    args: [ptr, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  GetCameraMatrix2DW: { args: [ptr, i32, i32, i32, i32, i32, i32], returns: FFIType.void },
} as const;
