export function cstr(str: string) {
  return Buffer.from(str + "\0", "utf8");
}

export const color = (r: number, g: number, b: number, a: number = 255) => {
  // R8G8B8A8 = A | B<<8 | G<<16 | R<<24 (little-endian)
  return (a << 24) | (b << 16) | (g << 8) | r;
};
