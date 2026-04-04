import { cc, FFIType } from "bun:ffi";
import wrapper from "./main.c" with { type: "file" };

const { i32, cstring, bool, f32, pointer } = FFIType;

export const symbols = cc({
  source: wrapper,
  library: ["raylib"],
  flags: ["-I./../assets/include"],
  symbols: {
    InitWindowW: { args: [i32, i32, cstring], returns: FFIType.void },
    CloseWindowW: { args: [], returns: FFIType.void },
    WindowShouldCloseW: { args: [], returns: bool },
    BeginDrawingW: { args: [], returns: FFIType.void },
    EndDrawingW: { args: [], returns: FFIType.void },
    ClearBackgroundW: { args: [i32], returns: FFIType.void },
    DrawRectangleW: { args: [i32, i32, i32, i32, i32], returns: FFIType.void },
    SetTargetFPSW: { args: [i32], returns: FFIType.void },
    GetFrameTimeW: { args: [], returns: f32 },
    DrawTextW: { args: [cstring, i32, i32, i32, i32], returns: FFIType.void },
  },
});