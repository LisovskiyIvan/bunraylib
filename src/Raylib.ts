import { symbols as r } from "./symbols";
import type { Vec2 } from "./types";
import { cstr, color, type Color } from "./utils";

export { color };
export type { Color };

export class Raylib {
  private static initialized = false;

  static initWindow(width: number, height: number, title: string): void {
    r.symbols.InitWindowW(width, height, cstr(title));
    Raylib.initialized = true;
  }

  static closeWindow(): void {
    r.symbols.CloseWindowW();
    Raylib.initialized = false;
  }

  static windowShouldClose(): boolean {
    return r.symbols.WindowShouldCloseW();
  }

  static beginDrawing(): void {
    r.symbols.BeginDrawingW();
  }

  static endDrawing(): void {
    r.symbols.EndDrawingW();
  }

  static clearBackground(col: Color): void {
    r.symbols.ClearBackgroundW(col);
  }

  static setTargetFPS(fps: number): void {
    r.symbols.SetTargetFPSW(fps);
  }

  static getFrameTime(): number {
    return r.symbols.GetFrameTimeW();
  }

  static drawRectangle(x: number, y: number, width: number, height: number, col: Color): void {
    r.symbols.DrawRectangleW(x, y, width, height, col);
  }

  static drawRectangleV(pos: Vec2, size: Vec2, col: Color): void {
    r.symbols.DrawRectangleW(pos.x, pos.y, size.x, size.y, col);
  }

  static drawText(text: string, x: number, y: number, fontSize: number, col: Color): void {
    r.symbols.DrawTextW(cstr(text), x, y, fontSize, col);
  }
}
