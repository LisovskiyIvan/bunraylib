import { getSymbols } from '../../symbols';
import { cstr, i } from '../../utils';
import type { Shader, Texture2D } from '../../types';

const r = () => getSymbols();

export class ShaderModule {
  static loadShader(vsFileName: string | null, fsFileName: string | null): Shader {
    return r().symbols.LoadShaderW(
      vsFileName ? cstr(vsFileName) : null,
      fsFileName ? cstr(fsFileName) : null,
    );
  }
  static loadShaderFromMemory(vsCode: string | null, fsCode: string | null): Shader {
    return r().symbols.LoadShaderFromMemoryW(
      vsCode ? cstr(vsCode) : null,
      fsCode ? cstr(fsCode) : null,
    );
  }
  static isShaderValid(shader: Shader): boolean {
    return r().symbols.IsShaderValidW(i(shader));
  }
  static getShaderLocation(shader: Shader, uniformName: string): number {
    return r().symbols.GetShaderLocationW(i(shader), cstr(uniformName));
  }
  static getShaderLocationAttrib(shader: Shader, attribName: string): number {
    return r().symbols.GetShaderLocationAttribW(i(shader), cstr(attribName));
  }
  static setShaderValue(
    shader: Shader,
    locIndex: number,
    value: Buffer | Uint8Array | ArrayBufferView,
    uniformType: number,
  ): void {
    r().symbols.SetShaderValueW(i(shader), i(locIndex), value as unknown as Buffer, i(uniformType));
  }
  static setShaderValueV(
    shader: Shader,
    locIndex: number,
    value: Buffer | Uint8Array | ArrayBufferView,
    uniformType: number,
    count: number,
  ): void {
    r().symbols.SetShaderValueVW(i(shader), i(locIndex), value as unknown as Buffer, i(uniformType), i(count));
  }
  static setShaderValueMatrix(shader: Shader, locIndex: number, mat: Float32Array): void {
    if (mat.length !== 16) {
      throw new Error(`setShaderValueMatrix: mat must have exactly 16 elements (got ${mat.length})`);
    }
    r().symbols.SetShaderValueMatrixW(i(shader), i(locIndex), mat);
  }
  static setShaderValueTexture(shader: Shader, locIndex: number, texture: Texture2D): void {
    r().symbols.SetShaderValueTextureW(
      i(shader),
      i(locIndex),
      i(texture.id),
      i(texture.width),
      i(texture.height),
    );
  }
  static unloadShader(shader: Shader): void {
    r().symbols.UnloadShaderW(i(shader));
  }
  static beginShaderMode(shader: Shader): void {
    r().symbols.BeginShaderModeW(i(shader));
  }
  static endShaderMode(): void {
    r().symbols.EndShaderModeW();
  }
}
