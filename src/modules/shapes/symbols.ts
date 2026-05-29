import { FFIType } from 'bun:ffi';
const { i32, ptr, f32 } = FFIType;

export const shapesDirectSymbols = {
  DrawFPS: { args: [i32, i32], returns: FFIType.void },
  DrawRectangle: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawText: { args: [FFIType.cstring, i32, i32, i32, i32], returns: FFIType.void },
  DrawPixel: { args: [i32, i32, i32], returns: FFIType.void },
  DrawLine: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawLineStrip: { args: [ptr, i32, i32], returns: FFIType.void },
  DrawCircle: { args: [i32, i32, f32, i32], returns: FFIType.void },
  DrawCircleLines: { args: [i32, i32, f32, i32], returns: FFIType.void },
  DrawEllipse: { args: [i32, i32, f32, f32, i32], returns: FFIType.void },
  DrawEllipseLines: { args: [i32, i32, f32, f32, i32], returns: FFIType.void },
  DrawRectangleGradientV: { args: [i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawRectangleGradientH: { args: [i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawRectangleLines: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
  DrawTriangleFan: { args: [ptr, i32, i32], returns: FFIType.void },
  DrawTriangleStrip: { args: [ptr, i32, i32], returns: FFIType.void },
  DrawSplineLinear: { args: [ptr, i32, f32, i32], returns: FFIType.void },
  DrawSplineBasis: { args: [ptr, i32, f32, i32], returns: FFIType.void },
  DrawSplineCatmullRom: { args: [ptr, i32, f32, i32], returns: FFIType.void },
  DrawSplineBezierQuadratic: { args: [ptr, i32, f32, i32], returns: FFIType.void },
  DrawSplineBezierCubic: { args: [ptr, i32, f32, i32], returns: FFIType.void },
} as const;

export const shapesWrapperSymbols = {
  DrawLineExW: {
    args: [f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawLineBezierW: {
    args: [f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawLineDashedW: { args: [f32, f32, f32, f32, i32, i32, i32], returns: FFIType.void },
  DrawCircleSectorW: {
    args: [f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCircleSectorLinesW: {
    args: [f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawCircleGradientW: {
    args: [f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawEllipseVW: { args: [f32, f32, f32, f32, i32], returns: FFIType.void },
  DrawEllipseLinesVW: { args: [f32, f32, f32, f32, i32], returns: FFIType.void },
  DrawRingW: {
    args: [f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawRingLinesW: {
    args: [f32, f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawRectangleProW: {
    args: [f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawRectangleGradientExW: {
    args: [f32, f32, f32, f32, i32, i32, i32, i32],
    returns: FFIType.void,
  },
  DrawRectangleLinesExW: {
    args: [f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawRectangleRoundedW: {
    args: [f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawRectangleRoundedLinesW: {
    args: [f32, f32, f32, f32, f32, i32, i32],
    returns: FFIType.void,
  },
  DrawRectangleRoundedLinesExW: {
    args: [f32, f32, f32, f32, f32, i32, f32, i32],
    returns: FFIType.void,
  },
  DrawTriangleW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawTriangleLinesW: {
    args: [f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawPolyW: {
    args: [f32, f32, i32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawPolyLinesW: {
    args: [f32, f32, i32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawPolyLinesExW: {
    args: [f32, f32, i32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSplineSegmentLinearW: {
    args: [f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSplineSegmentBasisW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSplineSegmentCatmullRomW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSplineSegmentBezierQuadraticW: {
    args: [f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawSplineSegmentBezierCubicW: {
    args: [f32, f32, f32, f32, f32, f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  GetSplinePointLinearW: {
    args: [ptr, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  GetSplinePointBasisW: {
    args: [ptr, f32, f32, f32, f32, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  GetSplinePointCatmullRomW: {
    args: [ptr, f32, f32, f32, f32, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  GetSplinePointBezierQuadW: {
    args: [ptr, f32, f32, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  GetSplinePointBezierCubicW: {
    args: [ptr, f32, f32, f32, f32, f32, f32, f32, f32, f32],
    returns: FFIType.void,
  },
  DrawPixelVW: { args: [f32, f32, i32], returns: FFIType.void },
  DrawLineVW: {
    args: [f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawCircleVW: { args: [i32, i32, f32, i32], returns: FFIType.void },
  DrawCircleLinesVW: { args: [f32, f32, f32, i32], returns: FFIType.void },
  DrawRectangleVW: {
    args: [f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  DrawRectangleRecW: {
    args: [f32, f32, f32, f32, i32],
    returns: FFIType.void,
  },
  SetShapesTextureW: { args: [i32, i32, i32, i32, i32, i32, i32], returns: FFIType.void },
  GetShapesTextureW: { args: [ptr, ptr, ptr], returns: FFIType.void },
  GetShapesTextureRectangleW: { args: [ptr], returns: FFIType.void },
} as const;
