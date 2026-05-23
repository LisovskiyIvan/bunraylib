import { FFIType } from 'bun:ffi';
const { i32, bool, ptr } = FFIType;

export const collisionSymbols = {
  CheckCollisionRecsW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionCirclesW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionCircleRecW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionCircleLineW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionPointRecW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionPointCircleW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionPointTriangleW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionPointLineW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, i32], returns: bool },
  CheckCollisionPointPolyW: { args: [FFIType.f32, FFIType.f32, ptr, i32], returns: bool },
  CheckCollisionLinesW: { args: [ptr, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  GetCollisionRecW: { args: [ptr, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
  CheckCollisionSpheresW: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: bool },
  CheckCollisionBoxesW: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: bool,
  },
  CheckCollisionBoxSphereW: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: bool,
  },
  GetRayCollisionSphereW: {
    args: [ptr, ptr, ptr, ptr, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  GetRayCollisionBoxW: {
    args: [ptr, ptr, ptr, ptr, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  GetRayCollisionTriangleW: {
    args: [
      ptr, ptr, ptr, ptr,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
    ],
    returns: FFIType.void,
  },
  GetRayCollisionQuadW: {
    args: [
      ptr, ptr, ptr, ptr,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
    ],
    returns: FFIType.void,
  },
  GetRayCollisionMeshW: {
    args: [
      ptr, ptr, ptr, ptr,
      FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32,
      i32,
      FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32,
      FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32,
    ],
    returns: FFIType.void,
  },
} as const;
