import { cc, FFIType } from "bun:ffi";
import wrapper from "./main.c" with { type: "file" };
import { color, cstr } from "./utils";

const { i32, cstring, bool, f32 } = FFIType;

const { symbols } = cc({
  source: wrapper, // или import wrapper from "./wrapper.c" with { type: "file" }
  library: ["raylib"], // линкуем системную libraylib
  flags: ["-I/usr/local/include"], // путь к raylib.h (подкорректируй под свою ОС)
  symbols: {
    InitWindowW: { args: [i32, i32, cstring], returns: FFIType.void },
    CloseWindowW: { args: [], returns: FFIType.void },
    WindowShouldCloseW: { args: [], returns: bool },
    BeginDrawingW: { args: [], returns: FFIType.void },
    EndDrawingW: { args: [], returns: FFIType.void },
    ClearBackgroundW: { args: [i32], returns: FFIType.void },
    DrawRectangleW: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
  },
});

const title = cstr("Raylib Window");
symbols.InitWindowW(800, 600, title);

while (!symbols.WindowShouldCloseW()) {
  symbols.BeginDrawingW();
  symbols.ClearBackgroundW(color(30, 30, 30));
  symbols.DrawRectangleW(100, 100, 200, 200, color(0, 255, 0));
  symbols.EndDrawingW();
}

symbols.CloseWindowW();
