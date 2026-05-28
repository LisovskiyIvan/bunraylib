import { getSymbols } from '../../symbols';
import { bufs as b, f, i } from '../../utils';
import type {
  Vec2,
  Vec3,
  Camera2D,
  Camera3D,
  Ray } from '../../types';

const r = () => getSymbols();

export class CameraModule {
  static updateCamera(camera: Camera3D, mode: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r().symbols.UpdateCameraW(pos, tar, up, fovy, proj, i(mode));
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D['projection'] };
  }
  static updateCameraPro(camera: Camera3D, movement: Vec3, rotation: Vec3, zoom: number): Camera3D {
    const pos = new Float32Array([camera.position.x, camera.position.y, camera.position.z]);
    const tar = new Float32Array([camera.target.x, camera.target.y, camera.target.z]);
    const up = new Float32Array([camera.up.x, camera.up.y, camera.up.z]);
    const fovy = new Float32Array([camera.fovy]);
    const proj = new Int32Array([camera.projection]);
    r().symbols.UpdateCameraProW(
      pos,
      tar,
      up,
      fovy,
      proj,
      f(movement.x),
      f(movement.y),
      f(movement.z),
      f(rotation.x),
      f(rotation.y),
      f(rotation.z),
      f(zoom),
    );
    return {
      position: { x: pos[0]!, y: pos[1]!, z: pos[2]! },
      target: { x: tar[0]!, y: tar[1]!, z: tar[2]! },
      up: { x: up[0]!, y: up[1]!, z: up[2]! },
      fovy: fovy[0]!,
      projection: proj[0]! as Camera3D['projection'] };
  }
  static getScreenToWorldRay(position: Vec2, camera: Camera3D): Ray {
    const outPos = new Float32Array(3);
    const outDir = new Float32Array(3);
    r().symbols.GetScreenToWorldRayW(
      outPos,
      outDir,
      i(position.x),
      i(position.y),
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
    return {
      position: { x: outPos[0]!, y: outPos[1]!, z: outPos[2]! },
      direction: { x: outDir[0]!, y: outDir[1]!, z: outDir[2]! } };
  }
  static getWorldToScreen(position: Vec3, camera: Camera3D): Vec2 {
    r().symbols.GetWorldToScreenW(
      b._vec2Buf,
      f(position.x),
      f(position.y),
      f(position.z),
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
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getWorldToScreen2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetWorldToScreen2DW(
      b._vec2Buf,
      f(position.x),
      f(position.y),
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getScreenToWorld2D(position: Vec2, camera: Camera2D): Vec2 {
    r().symbols.GetScreenToWorld2DW(
      b._vec2Buf,
      f(position.x),
      f(position.y),
      f(camera.offset.x),
      f(camera.offset.y),
      f(camera.target.x),
      f(camera.target.y),
      f(camera.rotation),
      f(camera.zoom),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getScreenToWorldRayEx(
    position: Vec2,
    camera: Camera3D,
    width: number,
    height: number,
  ): Ray {
    r().symbols.GetScreenToWorldRayExW(
      b._rayPosBuf2,
      b._rayDirBuf2,
      i(position.x),
      i(position.y),
      i(width),
      i(height),
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
    return {
      position: { x: b._rayPosBuf2[0]!, y: b._rayPosBuf2[1]!, z: b._rayPosBuf2[2]! },
      direction: { x: b._rayDirBuf2[0]!, y: b._rayDirBuf2[1]!, z: b._rayDirBuf2[2]! } };
  }
  static getWorldToScreenEx(position: Vec3, camera: Camera3D, width: number, height: number): Vec2 {
    r().symbols.GetWorldToScreenExW(
      b._vec2Buf,
      f(position.x),
      f(position.y),
      f(position.z),
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
      i(width),
      i(height),
    );
    return { x: b._vec2Buf[0]!, y: b._vec2Buf[1]! };
  }
  static getCameraMatrix(camera: Camera3D): Float32Array {
    r().symbols.GetCameraMatrixW(
      b._matBuf,
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
    return new Float32Array(b._matBuf);
  }
  static getCameraMatrix2D(camera: Camera2D): Float32Array {
    r().symbols.GetCameraMatrix2DW(
      b._matBuf,
      camera.offset.x,
      camera.offset.y,
      camera.target.x,
      camera.target.y,
      f(camera.rotation),
      f(camera.zoom),
    );
    return new Float32Array(b._matBuf);
  }
}
