import { FFIType } from 'bun:ffi';
const { i32, f32, ptr } = FFIType;

export const draw3dDirectSymbols = {
  DrawGrid: { args: [i32, f32], returns: FFIType.void },
  DrawTriangleStrip3D: { args: [ptr, i32, i32], returns: FFIType.void },
} as const;

export const draw3dSymbols = {
  DrawLine3DW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawPoint3DW: { args: [f32, f32, f32, i32], returns: FFIType.void },
  DrawCircle3DW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawTriangle3DW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawCubeW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawCubeVW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawCubeWiresW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawCubeWiresVW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSphereW: {
    args: [f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSphereExW: {
    args: [f32, f32, f32, f32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawSphereWiresW: {
    args: [f32, f32, f32, f32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawCylinderW: {
    args: [f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCylinderExW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCylinderWiresW: {
    args: [f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCylinderWiresExW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCapsuleW: {
    args: [f32, f32, f32, f32, f32, f32, f32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawCapsuleWiresW: {
    args: [f32, f32, f32, f32, f32, f32, f32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawPlaneW: {
    args: [f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawRayW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawModelW: {
    args: [i32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawModelExW: {
    args: [i32, f32, f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawModelWiresW: {
    args: [i32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawModelWiresExW: {
    args: [i32, f32, f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawBoundingBoxW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawBillboardW: {
    args: [
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      i32,
      i32,
      i32,
      i32,
      f32,
      f32,
      f32,
      f32,
      i32,
    ],
    returns: FFIType.void,
  },
  DrawBillboardRecW: {
    args: [
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      f32,
      f32,
      f32,
      f32,
      f32,
      i32,
    ],
    returns: FFIType.void,
  },
  DrawBillboardProW: {
    args: [
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      i32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      f32,
      i32,
    ],
    returns: FFIType.void,
  },
  DrawMeshW: {
    args: [i32, i32, ptr],
    returns: FFIType.void,
  },
  DrawMeshInstancedW: {
    args: [i32, i32, ptr, i32],
    returns: FFIType.void,
  },
} as const;
