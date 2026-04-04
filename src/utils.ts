export function cstr(str: string) {
  return Buffer.from(str + "\0", "utf8");
}

export const color = (r: number, g: number, b: number, a: number = 255) => {
  return (a << 24) | (b << 16) | (g << 8) | r;
};

export type Color = number;
