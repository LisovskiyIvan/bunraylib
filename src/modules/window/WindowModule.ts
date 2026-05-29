import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import { CString } from 'bun:ffi';
import type { Vec2, Camera2D, Camera3D, RenderTexture2D, Image, Color } from '../../types';

const r = () => getSymbols();

export class WindowModule {
  static initWindow(width: number, height: number, title: string): void {
    r().symbols.InitWindow(i(width), i(height), cstr(title));
  }
  static closeWindow(): void {
    r().symbols.CloseWindow();
  }
  static windowShouldClose(): boolean {
    return r().symbols.WindowShouldClose();
  }
  static beginDrawing(): void {
    r().symbols.BeginDrawing();
  }
  static endDrawing(): void {
    r().symbols.EndDrawing();
  }
  static beginMode2D(camera: Camera2D): void {
    r().symbols.BeginMode2DW(
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
  }
  static endMode2D(): void {
    r().symbols.EndMode2DW();
  }
  static beginMode3D(camera: Camera3D): void {
    r().symbols.BeginMode3DW(
      f(camera.position.x),
      f(camera.position.y),
      f(camera.position.z),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.target.z),
      f(camera.up.x),
      f(camera.up.y),
      f(camera.up.z),
      f(camera.fovy),
      i(camera.projection),
    );
  }
  static endMode3D(): void {
    r().symbols.EndMode3DW();
  }
  static clearBackground(col: Color): void {
    r().symbols.ClearBackgroundW(i(col));
  }
  static setTargetFPS(fps: number): void {
    r().symbols.SetTargetFPS(i(fps));
  }
  static getFrameTime(): number {
    return r().symbols.GetFrameTime();
  }
  static isWindowReady(): boolean {
    return r().symbols.IsWindowReady();
  }
  static isWindowFullscreen(): boolean {
    return r().symbols.IsWindowFullscreen();
  }
  static isWindowHidden(): boolean {
    return r().symbols.IsWindowHidden();
  }
  static isWindowMinimized(): boolean {
    return r().symbols.IsWindowMinimized();
  }
  static isWindowMaximized(): boolean {
    return r().symbols.IsWindowMaximized();
  }
  static isWindowFocused(): boolean {
    return r().symbols.IsWindowFocused();
  }
  static isWindowResized(): boolean {
    return r().symbols.IsWindowResized();
  }
  static isWindowState(flag: number): boolean {
    return r().symbols.IsWindowState(i(flag));
  }
  static setWindowState(flags: number): void {
    r().symbols.SetWindowState(i(flags));
  }
  static clearWindowState(flags: number): void {
    r().symbols.ClearWindowState(i(flags));
  }
  static toggleFullscreen(): void {
    r().symbols.ToggleFullscreen();
  }
  static toggleBorderlessWindowed(): void {
    r().symbols.ToggleBorderlessWindowed();
  }
  static maximizeWindow(): void {
    r().symbols.MaximizeWindow();
  }
  static minimizeWindow(): void {
    r().symbols.MinimizeWindow();
  }
  static restoreWindow(): void {
    r().symbols.RestoreWindow();
  }
  static setWindowTitle(title: string): void {
    r().symbols.SetWindowTitle(cstr(title));
  }
  static setWindowPosition(x: number, y: number): void {
    r().symbols.SetWindowPosition(i(x), i(y));
  }
  static setWindowMonitor(monitor: number): void {
    r().symbols.SetWindowMonitor(i(monitor));
  }
  static setWindowMinSize(w: number, h: number): void {
    r().symbols.SetWindowMinSize(i(w), i(h));
  }
  static setWindowMaxSize(w: number, h: number): void {
    r().symbols.SetWindowMaxSize(i(w), i(h));
  }
  static setWindowSize(w: number, h: number): void {
    r().symbols.SetWindowSize(i(w), i(h));
  }
  static setWindowOpacity(opacity: number): void {
    r().symbols.SetWindowOpacity(f(opacity));
  }
  static setWindowFocused(): void {
    r().symbols.SetWindowFocused();
  }
  static getScreenWidth(): number {
    return r().symbols.GetScreenWidth();
  }
  static getScreenHeight(): number {
    return r().symbols.GetScreenHeight();
  }
  static getRenderWidth(): number {
    return r().symbols.GetRenderWidth();
  }
  static getRenderHeight(): number {
    return r().symbols.GetRenderHeight();
  }
  static getMonitorCount(): number {
    return r().symbols.GetMonitorCount();
  }
  static getCurrentMonitor(): number {
    return r().symbols.GetCurrentMonitor();
  }
  static getMonitorPosition(monitor: number): Vec2 {
    r().symbols.GetMonitorPositionW(b._vec2Buf, i(monitor));
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getMonitorWidth(monitor: number): number {
    return r().symbols.GetMonitorWidth(i(monitor));
  }
  static getMonitorHeight(monitor: number): number {
    return r().symbols.GetMonitorHeight(i(monitor));
  }
  static getMonitorPhysicalWidth(monitor: number): number {
    return r().symbols.GetMonitorPhysicalWidth(i(monitor));
  }
  static getMonitorPhysicalHeight(monitor: number): number {
    return r().symbols.GetMonitorPhysicalHeight(i(monitor));
  }
  static getMonitorRefreshRate(monitor: number): number {
    return r().symbols.GetMonitorRefreshRate(i(monitor));
  }
  static getWindowPosition(): Vec2 {
    r().symbols.GetWindowPositionW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getWindowScaleDPI(): Vec2 {
    r().symbols.GetWindowScaleDPIW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getMonitorName(monitor: number): string {
    const ptr = r().symbols.GetMonitorName(i(monitor));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static setClipboardText(text: string): void {
    r().symbols.SetClipboardText(cstr(text));
  }
  static getClipboardText(): string {
    const ptr = r().symbols.GetClipboardText();
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static enableEventWaiting(): void {
    r().symbols.EnableEventWaiting();
  }
  static disableEventWaiting(): void {
    r().symbols.DisableEventWaiting();
  }
  static showCursor(): void {
    r().symbols.ShowCursor();
  }
  static hideCursor(): void {
    r().symbols.HideCursor();
  }
  static isCursorHidden(): boolean {
    return r().symbols.IsCursorHidden();
  }
  static enableCursor(): void {
    r().symbols.EnableCursor();
  }
  static disableCursor(): void {
    r().symbols.DisableCursor();
  }
  static isCursorOnScreen(): boolean {
    return r().symbols.IsCursorOnScreen();
  }
  static beginTextureMode(target: RenderTexture2D): void {
    r().symbols.BeginTextureModeW(i(target.id), i(target.texture.width), i(target.texture.height));
  }
  static endTextureMode(): void {
    r().symbols.EndTextureMode();
  }
  static beginBlendMode(mode: number): void {
    r().symbols.BeginBlendMode(i(mode));
  }
  static endBlendMode(): void {
    r().symbols.EndBlendMode();
  }
  static beginScissorMode(x: number, y: number, w: number, h: number): void {
    r().symbols.BeginScissorMode(i(x), i(y), i(w), i(h));
  }
  static endScissorMode(): void {
    r().symbols.EndScissorMode();
  }
  static setConfigFlags(flags: number): void {
    r().symbols.SetConfigFlags(i(flags));
  }
  static setWindowIcon(image: Image): void {
    r().symbols.SetWindowIconW(i(image));
  }
  static getClipboardImage(): Image {
    return r().symbols.GetClipboardImageW();
  }
  static setWindowIcons(images: number, count: number): void {
    r().symbols.SetWindowIconsW(images as unknown as Buffer, i(count));
  }
  static getTime(): number {
    return r().symbols.GetTime();
  }
  static getFPS(): number {
    return r().symbols.GetFPS();
  }
  static swapScreenBuffer(): void {
    r().symbols.SwapScreenBuffer();
  }
  static pollInputEvents(): void {
    r().symbols.PollInputEvents();
  }
  static waitTime(seconds: number): void {
    r().symbols.WaitTime(seconds);
  }
  static setRandomSeed(seed: number): void {
    r().symbols.SetRandomSeed(i(seed));
  }
  static getRandomValue(min: number, max: number): number {
    return r().symbols.GetRandomValue(i(min), i(max));
  }
  static takeScreenshot(fileName: string): void {
    r().symbols.TakeScreenshot(cstr(fileName));
  }
  static openURL(url: string): void {
    r().symbols.OpenURL(cstr(url));
  }
  static setTraceLogLevel(logLevel: number): void {
    r().symbols.SetTraceLogLevel(i(logLevel));
  }
  static traceLog(logLevel: number, text: string): void {
    r().symbols.TraceLogW(i(logLevel), cstr(text));
  }
}
