import { getSymbols } from '../../symbols';
import { bufs, cstr, f, i } from '../../utils';
import type {
  Vec2,
  Rectangle,
  Texture2D,
  RenderTexture2D,
  Image,
  Color,
} from '../../types';

const r = () => getSymbols();

export class TextureModule {
  static loadTexture(fileName: string): Texture2D {
    r().symbols.LoadTextureW(bufs._texOutId, bufs._texOutW, bufs._texOutH, cstr(fileName));
    return {
      id: bufs._texOutId[0]!,
      width: bufs._texOutW[0]!,
      height: bufs._texOutH[0]!,
    };
  }
  static unloadTexture(texture: Texture2D): void {
    r().symbols.UnloadTextureW(i(texture.id));
  }
  static isTextureValid(texture: Texture2D): boolean {
    return r().symbols.IsTextureValidW(i(texture.id), i(texture.width), i(texture.height));
  }
  static loadRenderTexture(width: number, height: number): RenderTexture2D {
    r().symbols.LoadRenderTextureW(
      bufs._texOutId,
      bufs._texOutTexId,
      bufs._texOutW,
      bufs._texOutH,
      i(width),
      i(height),
    );
    return {
      id: bufs._texOutId[0]!,
      texture: {
        id: bufs._texOutTexId[0]!,
        width: bufs._texOutW[0]!,
        height: bufs._texOutH[0]!,
      },
    };
  }
  static unloadRenderTexture(target: RenderTexture2D): void {
    r().symbols.UnloadRenderTextureW(i(target.id));
  }
  static isRenderTextureValid(target: RenderTexture2D): boolean {
    return r().symbols.IsRenderTextureValidW(i(target.id));
  }
  static genTextureMipmaps(texture: Texture2D): void {
    r().symbols.GenTextureMipmapsW(i(texture.id));
  }
  static setTextureFilter(texture: Texture2D, filter: number): void {
    r().symbols.SetTextureFilterW(i(texture.id), i(filter));
  }
  static setTextureWrap(texture: Texture2D, wrap: number): void {
    r().symbols.SetTextureWrapW(i(texture.id), i(wrap));
  }
  static drawTexture(texture: Texture2D, posX: number, posY: number, tint: Color): void {
    r().symbols.DrawTextureW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(posX),
      i(posY),
      i(tint),
    );
  }
  static drawTextureEx(
    texture: Texture2D,
    position: Vec2,
    rotation: number,
    scale: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextureExW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(position.x),
      i(position.y),
      f(rotation),
      f(scale),
      i(tint),
    );
  }
  static drawTextureRec(texture: Texture2D, source: Rectangle, position: Vec2, tint: Color): void {
    r().symbols.DrawTextureRecW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      i(position.x),
      i(position.y),
      i(tint),
    );
  }
  static drawTexturePro(
    texture: Texture2D,
    source: Rectangle,
    dest: Rectangle,
    origin: Vec2,
    rotation: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextureProW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(source.x),
      i(source.y),
      i(source.width),
      i(source.height),
      i(dest.x),
      i(dest.y),
      i(dest.width),
      i(dest.height),
      i(origin.x),
      i(origin.y),
      f(rotation),
      i(tint),
    );
  }
  static loadTextureFromImage(image: Image): Texture2D {
    r().symbols.LoadTextureFromImageW(bufs._texOutId, bufs._texOutW, bufs._texOutH, i(image));
    return { id: bufs._texOutId[0]!, width: bufs._texOutW[0]!, height: bufs._texOutH[0]! };
  }
  static loadTextureCubemap(image: Image, layout: number): Texture2D {
    r().symbols.LoadTextureCubemapW(
      bufs._texOutId,
      bufs._texOutW,
      bufs._texOutH,
      i(image),
      i(layout),
    );
    return { id: bufs._texOutId[0]!, width: bufs._texOutW[0]!, height: bufs._texOutH[0]! };
  }
  static updateTexture(texture: Texture2D, pixels: Uint8Array): void {
    r().symbols.UpdateTextureW(i(texture.id), i(texture.width), i(texture.height), pixels);
  }
  static updateTextureRec(texture: Texture2D, rec: Rectangle, pixels: Uint8Array): void {
    r().symbols.UpdateTextureRecW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(rec.x),
      i(rec.y),
      i(rec.width),
      i(rec.height),
      pixels,
    );
  }
  static drawTextureNPatch(
    texture: Texture2D,
    nPatchInfo: {
      source: Rectangle;
      left: number;
      top: number;
      right: number;
      bottom: number;
      layout: number;
    },
    dest: Rectangle,
    origin: Vec2,
    rotation: number,
    tint: Color,
  ): void {
    r().symbols.DrawTextureNPatchW(
      i(texture.id),
      i(texture.width),
      i(texture.height),
      i(nPatchInfo.source.x),
      i(nPatchInfo.source.y),
      i(nPatchInfo.source.width),
      i(nPatchInfo.source.height),
      i(nPatchInfo.left),
      i(nPatchInfo.top),
      i(nPatchInfo.right),
      i(nPatchInfo.bottom),
      i(nPatchInfo.layout),
      i(dest.x),
      i(dest.y),
      i(dest.width),
      i(dest.height),
      i(origin.x),
      i(origin.y),
      f(rotation),
      i(tint),
    );
  }
  static getPixelColor(srcPtr: number, format: number): Color {
    return r().symbols.GetPixelColorW(srcPtr as unknown as Buffer, i(format));
  }
  static setPixelColor(dstPtr: number, color: Color, format: number): void {
    r().symbols.SetPixelColorW(dstPtr as unknown as Buffer, i(color), i(format));
  }
}
