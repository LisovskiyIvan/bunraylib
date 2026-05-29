export function cstr(str: string) {
  return Buffer.from(str + '\0', 'utf8');
}

/**
 * Force heap-allocated double: adds/subtracts a tiny epsilon
 * to kill V8 SMI-encoding without changing the numeric value.
 * Ensures bun:ffi passes the correct f32/f64 bit pattern to C.
 */
export function f(n: number): number {
  return n + 1e-300 - 1e-300;
}

export function i(n: number): number {
  return n | 0;
}

export const color = (r: number, g: number, b: number, a: number = 255) => {
  return (a << 24) | (b << 16) | (g << 8) | r;
};

export const bufs = {
  _rcHit: new Uint8Array(1),
  _rcDist: new Float32Array(1),
  _rcPt: new Float32Array(3),
  _rcNorm: new Float32Array(3),
  _texOutId: new Uint32Array(1),
  _texOutTexId: new Uint32Array(1),
  _texOutW: new Int32Array(1),
  _texOutH: new Int32Array(1),
  _shapesTexId: new Uint32Array(1),
  _shapesTexW: new Int32Array(1),
  _shapesTexH: new Int32Array(1),
  _rayPosBuf2: new Float32Array(3),
  _rayDirBuf2: new Float32Array(3),
  _animSlotStart: new Int32Array(1),
  _animCount: new Int32Array(1),
  _colPtBuf: new Float32Array(2),
  _recBuf: new Float32Array(4),
  _vec2Buf: new Float32Array(2),
  _matBuf: new Float32Array(16),
  _vec4Buf: new Float32Array(4),
  _vec3Buf2: new Float32Array(3),
  _imgAnimSlot: new Int32Array(1),
  _imgAnimFrames: new Int32Array(1),
  _glyphValue: new Int32Array(1),
  _glyphOffsetX: new Int32Array(1),
  _glyphOffsetY: new Int32Array(1),
  _glyphAdvanceX: new Int32Array(1),
  _glyphImageSlot: new Int32Array(1),
  _cpSize: new Int32Array(1),
  _textAppendPos: new Int32Array(1),
  _bbMin: new Float32Array(3),
  _bbMax: new Float32Array(3),
};

export function validatePoints(
  name: string,
  points: Float32Array,
  stride: number,
  minPoints: number,
): void {
  if (points.length % stride !== 0) {
    throw new Error(
      `${name}: points length must be a multiple of ${stride} (got ${points.length})`,
    );
  }
  if (points.length < stride * minPoints) {
    throw new Error(
      `${name}: points must contain at least ${minPoints} points (got ${points.length / stride})`,
    );
  }
}
