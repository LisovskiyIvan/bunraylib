import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import { CString } from 'bun:ffi';
import type {
  Vec2,
} from '../../types';

const r = () => getSymbols();

export class InputModule {
  static isKeyPressed(key: number): boolean {
    return r().symbols.IsKeyPressedW(i(key));
  }
  static isKeyPressedRepeat(key: number): boolean {
    return r().symbols.IsKeyPressedRepeatW(i(key));
  }
  static isKeyDown(key: number): boolean {
    return r().symbols.IsKeyDownW(i(key));
  }
  static isKeyReleased(key: number): boolean {
    return r().symbols.IsKeyReleasedW(i(key));
  }
  static isKeyUp(key: number): boolean {
    return r().symbols.IsKeyUpW(i(key));
  }
  static getKeyPressed(): number {
    return r().symbols.GetKeyPressedW();
  }
  static getCharPressed(): number {
    return r().symbols.GetCharPressedW();
  }
  static setExitKey(key: number): void {
    r().symbols.SetExitKeyW(i(key));
  }
  static isGamepadAvailable(gamepad: number): boolean {
    return r().symbols.IsGamepadAvailableW(i(gamepad));
  }
  static getGamepadName(gamepad: number): string {
    const ptr = r().symbols.GetGamepadNameW(i(gamepad));
    if (!ptr) return '';
    return new CString(ptr).toString();
  }
  static isGamepadButtonPressed(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonPressedW(i(gamepad), i(button));
  }
  static isGamepadButtonDown(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonDownW(i(gamepad), i(button));
  }
  static isGamepadButtonReleased(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonReleasedW(i(gamepad), i(button));
  }
  static isGamepadButtonUp(gamepad: number, button: number): boolean {
    return r().symbols.IsGamepadButtonUpW(i(gamepad), i(button));
  }
  static getGamepadButtonPressed(): number {
    return r().symbols.GetGamepadButtonPressedW();
  }
  static getGamepadAxisCount(gamepad: number): number {
    return r().symbols.GetGamepadAxisCountW(i(gamepad));
  }
  static getGamepadAxisMovement(gamepad: number, axis: number): number {
    return r().symbols.GetGamepadAxisMovementW(i(gamepad), i(axis));
  }
  static setGamepadMappings(mappings: string): number {
    return r().symbols.SetGamepadMappingsW(cstr(mappings));
  }
  static isMouseButtonPressed(button: number): boolean {
    return r().symbols.IsMouseButtonPressedW(i(button));
  }
  static isMouseButtonDown(button: number): boolean {
    return r().symbols.IsMouseButtonDownW(i(button));
  }
  static isMouseButtonReleased(button: number): boolean {
    return r().symbols.IsMouseButtonReleasedW(i(button));
  }
  static isMouseButtonUp(button: number): boolean {
    return r().symbols.IsMouseButtonUpW(i(button));
  }
  static getMouseX(): number {
    return r().symbols.GetMouseXW();
  }
  static getMouseY(): number {
    return r().symbols.GetMouseYW();
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
    r().symbols.SetMousePositionW(i(x), i(y));
  }
  static setMouseOffset(x: number, y: number): void {
    r().symbols.SetMouseOffsetW(i(x), i(y));
  }
  static setMouseScale(scaleX: number, scaleY: number): void {
    r().symbols.SetMouseScaleW(f(scaleX), f(scaleY));
  }
  static getMouseWheelMove(): number {
    return r().symbols.GetMouseWheelMoveW();
  }
  static getMouseWheelMoveV(): Vec2 {
    r().symbols.GetMouseWheelMoveVW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static setMouseCursor(cursor: number): void {
    r().symbols.SetMouseCursorW(i(cursor));
  }
  static getTouchX(): number {
    return r().symbols.GetTouchXW();
  }
  static getTouchY(): number {
    return r().symbols.GetTouchYW();
  }
  static getTouchPosition(index: number): Vec2 {
    r().symbols.GetTouchPositionW(b._vec2Buf, i(index));
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getTouchPointId(index: number): number {
    return r().symbols.GetTouchPointIdW(i(index));
  }
  static getTouchPointCount(): number {
    return r().symbols.GetTouchPointCountW();
  }
  static setGesturesEnabled(flags: number): void {
    r().symbols.SetGesturesEnabledW(i(flags));
  }
  static isGestureDetected(gesture: number): boolean {
    return r().symbols.IsGestureDetectedW(i(gesture));
  }
  static getGestureDetected(): number {
    return r().symbols.GetGestureDetectedW();
  }
  static getGestureHoldDuration(): number {
    return r().symbols.GetGestureHoldDurationW();
  }
  static getGestureDragVector(): Vec2 {
    r().symbols.GetGestureDragVectorW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getGestureDragAngle(): number {
    return r().symbols.GetGestureDragAngleW();
  }
  static getGesturePinchVector(): Vec2 {
    r().symbols.GetGesturePinchVectorW(b._vec2Buf);
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getGesturePinchAngle(): number {
    return r().symbols.GetGesturePinchAngleW();
  }
  static setGamepadVibration(
    gamepad: number,
    leftMotor: number,
    rightMotor: number,
    duration: number,
  ): void {
    r().symbols.SetGamepadVibrationW(i(gamepad), f(leftMotor), f(rightMotor), f(duration));
  }
}
