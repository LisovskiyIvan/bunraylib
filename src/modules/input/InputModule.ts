import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import { CString } from 'bun:ffi';
import type { Vec2 } from '../../types';

const r = () => getSymbols();

export class InputModule {
  static isKeyPressed(key: number): boolean {
    return r().symbols.IsKeyPressed(i(key));
  }
  static isKeyPressedRepeat(key: number): boolean {
    return r().symbols.IsKeyPressedRepeat(i(key));
  }
  static isKeyDown(key: number): boolean {
    return r().symbols.IsKeyDown(i(key));
  }
  static isKeyReleased(key: number): boolean {
    return r().symbols.IsKeyReleased(i(key));
  }
  static isKeyUp(key: number): boolean {
    return r().symbols.IsKeyUp(i(key));
  }
  static getKeyPressed(): number {
    return r().symbols.GetKeyPressed();
  }
  static getCharPressed(): number {
    return r().symbols.GetCharPressed();
  }
  static setExitKey(key: number): void {
    r().symbols.SetExitKey(i(key));
  }
  static isGamepadAvailable(gamepad: number): boolean {
    return r().symbols.IsGamepadAvailable(i(gamepad));
  }
  static getGamepadName(gamepad: number): string {
    const ptr = r().symbols.GetGamepadName(i(gamepad));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static isGamepadButtonPressed(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonPressed(i(gamepad), i(button));
  }
  static isGamepadButtonDown(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonDown(i(gamepad), i(button));
  }
  static isGamepadButtonReleased(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonReleased(i(gamepad), i(button));
  }
  static isGamepadButtonUp(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonUp(i(gamepad), i(button));
  }
  static getGamepadButtonPressed(): number {
    return r().symbols.GetGamepadButtonPressed();
  }
  static getGamepadAxisCount(gamepad: number): number {
    return r().symbols.GetGamepadAxisCount(i(gamepad));
  }
  static getGamepadAxisMovement(gamepad: number, axis: number): number {
    return r().symbols.GetGamepadAxisMovement(i(gamepad), i(axis));
  }
  static setGamepadMappings(mappings: string): number {
    return r().symbols.SetGamepadMappings(cstr(mappings));
  }
  static isMouseButtonPressed(button: number): boolean {
    return r().symbols.IsMouseButtonPressed(i(button));
  }
  static isMouseButtonDown(button: number): boolean {
    return r().symbols.IsMouseButtonDown(i(button));
  }
  static isMouseButtonReleased(button: number): boolean {
    return r().symbols.IsMouseButtonReleased(i(button));
  }
  static isMouseButtonUp(button: number): boolean {
    return r().symbols.IsMouseButtonUp(i(button));
  }
  static getMouseX(): number {
    return r().symbols.GetMouseX();
  }
  static getMouseY(): number {
    return r().symbols.GetMouseY();
  }
  static getMousePosition(): Vec2 {
    r().symbols.GetMousePositionW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getMouseDelta(): Vec2 {
    r().symbols.GetMouseDeltaW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static setMousePosition(x: number, y: number): void {
    r().symbols.SetMousePosition(i(x), i(y));
  }
  static setMouseOffset(x: number, y: number): void {
    r().symbols.SetMouseOffset(i(x), i(y));
  }
  static setMouseScale(scaleX: number, scaleY: number): void {
    r().symbols.SetMouseScale(f(scaleX), f(scaleY));
  }
  static getMouseWheelMove(): number {
    return r().symbols.GetMouseWheelMove();
  }
  static getMouseWheelMoveV(): Vec2 {
    r().symbols.GetMouseWheelMoveVW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static setMouseCursor(cursor: number): void {
    r().symbols.SetMouseCursor(i(cursor));
  }
  static getTouchX(): number {
    return r().symbols.GetTouchX();
  }
  static getTouchY(): number {
    return r().symbols.GetTouchY();
  }
  static getTouchPosition(index: number): Vec2 {
    r().symbols.GetTouchPositionW(b._vec2Buf, i(index));
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getTouchPointId(index: number): number {
    return r().symbols.GetTouchPointId(i(index));
  }
  static getTouchPointCount(): number {
    return r().symbols.GetTouchPointCount();
  }
  static setGesturesEnabled(flags: number): void {
    r().symbols.SetGesturesEnabled(i(flags));
  }
  static isGestureDetected(gesture: number): boolean {
    return r().symbols.IsGestureDetected(i(gesture));
  }
  static getGestureDetected(): number {
    return r().symbols.GetGestureDetected();
  }
  static getGestureHoldDuration(): number {
    return r().symbols.GetGestureHoldDuration();
  }
  static getGestureDragVector(): Vec2 {
    r().symbols.GetGestureDragVectorW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getGestureDragAngle(): number {
    return r().symbols.GetGestureDragAngle();
  }
  static getGesturePinchVector(): Vec2 {
    r().symbols.GetGesturePinchVectorW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getGesturePinchAngle(): number {
    return r().symbols.GetGesturePinchAngle();
  }
  static setGamepadVibration(
    gamepad: number,
    leftMotor: number,
    rightMotor: number,
    duration: number,
  ): void {
    r().symbols.SetGamepadVibration(i(gamepad), f(leftMotor), f(rightMotor), f(duration));
  }
}
