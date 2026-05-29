import { WindowModule } from './modules/window/WindowModule';
import { ShapesModule } from './modules/shapes/ShapesModule';
import { CollisionModule } from './modules/collision/CollisionModule';
import { CameraModule } from './modules/camera/CameraModule';
import { TextureModule } from './modules/texture/TextureModule';
import { ImageModule } from './modules/image/ImageModule';
import { ColorModule } from './modules/color/ColorModule';
import { FontModule } from './modules/font/FontModule';
import { InputModule } from './modules/input/InputModule';
import { Draw3DModule } from './modules/draw3d/Draw3DModule';
import { ModelModule } from './modules/model/ModelModule';
import { AudioModule } from './modules/audio/AudioModule';
import { ShaderModule } from './modules/shader/ShaderModule';

export type Raylib = typeof WindowModule &
  typeof ShapesModule &
  typeof CollisionModule &
  typeof CameraModule &
  typeof TextureModule &
  typeof ImageModule &
  typeof ColorModule &
  typeof FontModule &
  typeof InputModule &
  typeof Draw3DModule &
  typeof ModelModule &
  typeof AudioModule &
  typeof ShaderModule;

function applyMixins(derivedCtor: unknown, constructors: unknown[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor).forEach((name) => {
      if (name !== 'prototype' && name !== 'name' && name !== 'length') {
        const descriptor = Object.getOwnPropertyDescriptor(baseCtor, name);
        if (descriptor) {
          Object.defineProperty(derivedCtor, name, descriptor);
        }
      }
    });
  });
}

const _RaylibBase = class {};
applyMixins(_RaylibBase, [
  WindowModule,
  ShapesModule,
  CollisionModule,
  CameraModule,
  TextureModule,
  ImageModule,
  ColorModule,
  FontModule,
  InputModule,
  Draw3DModule,
  ModelModule,
  AudioModule,
  ShaderModule,
]);

export const Raylib = _RaylibBase as unknown as Raylib;
