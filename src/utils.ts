export function cstr(str: string) {
  return Buffer.from(str + "\0", "utf8");
}

const _f2iBuf = new ArrayBuffer(4);
const _f2iF32 = new Float32Array(_f2iBuf);
const _f2iI32 = new Int32Array(_f2iBuf);

export function f2i(val: number): number {
  _f2iF32[0] = val;
  return _f2iI32[0]!;
}

export const color = (r: number, g: number, b: number, a: number = 255) => {
  return (a << 24) | (b << 16) | (g << 8) | r;
};
