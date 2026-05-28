import { getSymbols } from '../../symbols';
import { bufs, cstr, f, i } from '../../utils';
import { CString } from 'bun:ffi';
import type {
  Vec2,
  Camera2D,
  Camera3D,
  RenderTexture2D,
  Image,
  Color,
} from '../../types';

const r = () => getSymbols();

export class WindowModule {
  /** Initialize window and OpenGL context */
  static initWindow(width: number, height: number, title: string): void {
    r().symbols.InitWindowW(i(width), i(height), cstr(title));
  }
  /** Close window and unload OpenGL context */
  static closeWindow(): void {
    r().symbols.CloseWindowW();
  }
  /** Check if application should close (KEY_ESCAPE pressed or window close button) */
  static windowShouldClose(): boolean {
    return r().symbols.WindowShouldCloseW();
  }
  /** Setup canvas (framebuffer) to start drawing */
  static beginDrawing(): void {
    r().symbols.BeginDrawingW();
  }
  /** End canvas drawing and swap buffers (double buffering) */
  static endDrawing(): void {
    r().symbols.EndDrawingW();
  }
  /** Begin 2D mode with custom camera */
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
  /** Ends 2D mode with custom camera */
  static endMode2D(): void {
    r().symbols.EndMode2DW();
  }
  /** Begin 3D mode with custom camera */
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
  /** Ends 3D mode with custom camera */
  static endMode3D(): void {
    r().symbols.EndMode3DW();
  }
  /** Set background color (used before drawing) */
  static clearBackground(col: Color): void {
    r().symbols.ClearBackgroundW(i(col));
  }
  /** Set target FPS (frames per second) */
  static setTargetFPS(fps: number): void {
    r().symbols.SetTargetFPSW(i(fps));
  }
  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime(): number {
    return r().symbols.GetFrameTimeW();
  }
  static isWindowReady(): boolean {
    return r().symbols.IsWindowReadyW();
  }
  static isWindowFullscreen(): boolean {
    return r().symbols.IsWindowFullscreenW();
  }
  static isWindowHidden(): boolean {
    return r().symbols.IsWindowHiddenW();
  }
  static isWindowMinimized(): boolean {
    return r().symbols.IsWindowMinimizedW();
  }
  static isWindowMaximized(): boolean {
    return r().symbols.IsWindowMaximizedW();
  }
  static isWindowFocused(): boolean {
    return r().symbols.IsWindowFocusedW();
  }
  static isWindowResized(): boolean {
    return r().symbols.IsWindowResizedW();
  }
  static isWindowState(flag: number): boolean {
    return r().symbols.IsWindowStateW(i(flag));
  }
  static setWindowState(flags: number): void {
    r().symbols.SetWindowStateW(i(flags));
  }
  static clearWindowState(flags: number): void {
    r().symbols.ClearWindowStateW(i(flags));
  }
  static toggleFullscreen(): void {
    r().symbols.ToggleFullscreenW();
  }
  static toggleBorderlessWindowed(): void {
    r().symbols.ToggleBorderlessWindowedW();
  }
  static maximizeWindow(): void {
    r().symbols.MaximizeWindowW();
  }
  static minimizeWindow(): void {
    r().symbols.MinimizeWindowW();
  }
  static restoreWindow(): void {
    r().symbols.RestoreWindowW();
  }
  static setWindowTitle(title: string): void {
    r().symbols.SetWindowTitleW(cstr(title));
  }
  static setWindowPosition(x: number, y: number): void {
    r().symbols.SetWindowPositionW(i(x), i(y));
  }
  static setWindowMonitor(monitor: number): void {
    r().symbols.SetWindowMonitorW(i(monitor));
  }
  static setWindowMinSize(w: number, h: number): void {
    r().symbols.SetWindowMinSizeW(i(w), i(h));
  }
  static setWindowMaxSize(w: number, h: number): void {
    r().symbols.SetWindowMaxSizeW(i(w), i(h));
  }
  static setWindowSize(w: number, h: number): void {
    r().symbols.SetWindowSizeW(i(w), i(h));
  }
  static setWindowOpacity(opacity: number): void {
    r().symbols.SetWindowOpacityW(f(opacity));
  }
  static setWindowFocused(): void {
    r().symbols.SetWindowFocusedW();
  }
  static getScreenWidth(): number {
    return r().symbols.GetScreenWidthW();
  }
  static getScreenHeight(): number {
    return r().symbols.GetScreenHeightW();
  }
  static getRenderWidth(): number {
    return r().symbols.GetRenderWidthW();
  }
  static getRenderHeight(): number {
    return r().symbols.GetRenderHeightW();
  }
  static getMonitorCount(): number {
    return r().symbols.GetMonitorCountW();
  }
  static getCurrentMonitor(): number {
    return r().symbols.GetCurrentMonitorW();
  }
  static getMonitorPosition(monitor: number): Vec2 {
    r().symbols.GetMonitorPositionW(bufs._vec2Buf, i(monitor));
    return { x: bufs._vec2Buf[0]!, y: bufs._vec2Buf[1]! };
  }
  static getMonitorWidth(monitor: number): number {
    return r().symbols.GetMonitorWidthW(i(monitor));
  }
  static getMonitorHeight(monitor: number): number {
    return r().symbols.GetMonitorHeightW(i(monitor));
  }
  static getMonitorPhysicalWidth(monitor: number): number {
    return r().symbols.GetMonitorPhysicalWidthW(i(monitor));
  }
  static getMonitorPhysicalHeight(monitor: number): number {
    return r().symbols.GetMonitorPhysicalHeightW(i(monitor));
  }
  static getMonitorRefreshRate(monitor: number): number {
    return r().symbols.GetMonitorRefreshRateW(i(monitor));
  }
  static getWindowPosition(): Vec2 {
    r().symbols.GetWindowPositionW(bufs._vec2Buf);
    return { x: bufs._vec2Buf[0]!, y: bufs._vec2Buf[1]! };
  }
  static getWindowScaleDPI(): Vec2 {
    r().symbols.GetWindowScaleDPIW(bufs._vec2Buf);
    return { x: bufs._vec2Buf[0]!, y: bufs._vec2Buf[1]! };
  }
  static getMonitorName(monitor: number): string {
    const ptr = r().symbols.GetMonitorNameW(i(monitor));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static setClipboardText(text: string): void {
    r().symbols.SetClipboardTextW(cstr(text));
  }
  static getClipboardText(): string {
    const ptr = r().symbols.GetClipboardTextW();
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static enableEventWaiting(): void {
    r().symbols.EnableEventWaitingW();
  }
  static disableEventWaiting(): void {
    r().symbols.DisableEventWaitingW();
  }
  static showCursor(): void {
    r().symbols.ShowCursorW();
  }
  static hideCursor(): void {
    r().symbols.HideCursorW();
  }
  static isCursorHidden(): boolean {
    return r().symbols.IsCursorHiddenW();
  }
  static enableCursor(): void {
    r().symbols.EnableCursorW();
  }
  static disableCursor(): void {
    r().symbols.DisableCursorW();
  }
  static isCursorOnScreen(): boolean {
    return r().symbols.IsCursorOnScreenW();
  }
  static beginTextureMode(target: RenderTexture2D): void {
    r().symbols.BeginTextureModeW(i(target.id), i(target.texture.width), i(target.texture.height));
  }
  static endTextureMode(): void {
    r().symbols.EndTextureModeW();
  }
  static beginBlendMode(mode: number): void {
    r().symbols.BeginBlendModeW(i(mode));
  }
  static endBlendMode(): void {
    r().symbols.EndBlendModeW();
  }
  static beginScissorMode(x: number, y: number, w: number, h: number): void {
    r().symbols.BeginScissorModeW(i(x), i(y), i(w), i(h));
  }
  static endScissorMode(): void {
    r().symbols.EndScissorModeW();
  }
  static setConfigFlags(flags: number): void {
    r().symbols.SetConfigFlagsW(i(flags));
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
}
