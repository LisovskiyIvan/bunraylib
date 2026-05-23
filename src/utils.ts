export function cstr(str: string) {
  return Buffer.from(str + '\0', 'utf8');
}

/**
 * Force heap-allocated double: adds/subtracts a tiny epsilon
 * to kill V8 SMI-encoding without changing the numeric value.
 * Ensures bun:ffi passes the correct f32/f64 bit pattern to C.
 */
export function F(n: number): number {
  return n + 1e-300 - 1e-300;
}

export const color = (r: number, g: number, b: number, a: number = 255) => {
  return (a << 24) | (b << 16) | (g << 8) | r;
};
