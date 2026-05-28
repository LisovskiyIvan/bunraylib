import { cc } from 'bun:ffi';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';

import { windowSymbols } from './modules/window/symbols';
import { shapesSymbols } from './modules/shapes/symbols';
import { collisionSymbols } from './modules/collision/symbols';
import { cameraSymbols } from './modules/camera/symbols';
import { draw3dSymbols } from './modules/draw3d/symbols';
import { textureSymbols } from './modules/texture/symbols';
import { modelSymbols } from './modules/model/symbols';
import { imageSymbols } from './modules/image/symbols';
import { colorSymbols } from './modules/color/symbols';
import { fontSymbols } from './modules/font/symbols';
import { inputSymbols } from './modules/input/symbols';
import { audioSymbols } from './modules/audio/symbols';
import { shaderSymbols } from './modules/shader/symbols';

const allSymbols = {
  ...windowSymbols,
  ...shapesSymbols,
  ...collisionSymbols,
  ...cameraSymbols,
  ...draw3dSymbols,
  ...textureSymbols,
  ...modelSymbols,
  ...imageSymbols,
  ...colorSymbols,
  ...fontSymbols,
  ...inputSymbols,
  ...audioSymbols,
  ...shaderSymbols,
};

type SymbolsType = ReturnType<typeof cc<typeof allSymbols>>;

export type RaylibConfig = {
  maxModels?: number;
  maxFonts?: number;
  maxImages?: number;
  maxMeshes?: number;
  maxMaterials?: number;
  maxAnimations?: number;
  maxShaders?: number;
  maxWaves?: number;
  maxSounds?: number;
  maxMusic?: number;
  maxAudioStreams?: number;
  raylibPath?: string;
};

const defaults: Required<Omit<RaylibConfig, 'raylibPath'>> = {
  maxModels: 64,
  maxFonts: 32,
  maxImages: 128,
  maxMeshes: 64,
  maxMaterials: 32,
  maxAnimations: 32,
  maxShaders: 32,
  maxWaves: 32,
  maxSounds: 32,
  maxMusic: 16,
  maxAudioStreams: 16,
};

let _config: RaylibConfig = {};
let _r: SymbolsType | null = null;

export function configure(config: RaylibConfig): void {
  if (_r) throw new Error('Raylib already initialized. Call configure() before any Raylib method.');
  _config = config;
}

function generateConfigHeader(config: Required<Omit<RaylibConfig, 'raylibPath'>>): string {
  return `#ifndef CONFIG_H
#define CONFIG_H

#define MAX_MODELS ${config.maxModels}
#define MAX_FONTS ${config.maxFonts}
#define MAX_IMAGES ${config.maxImages}
#define MAX_MESHES ${config.maxMeshes}
#define MAX_MATERIALS ${config.maxMaterials}
#define MAX_ANIMATIONS ${config.maxAnimations}
#define MAX_SHADERS ${config.maxShaders}
#define MAX_WAVES ${config.maxWaves}
#define MAX_SOUNDS ${config.maxSounds}
#define MAX_MUSIC ${config.maxMusic}
#define MAX_AUDIOSTREAMS ${config.maxAudioStreams}

#endif
`;
}

function buildCC(config: RaylibConfig): SymbolsType {
  const resolved = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    if (config[key] !== null && config[key] !== undefined) {
      (resolved as unknown as Record<string, number>)[key] = config[key];
    }
  }

  const configHeader = generateConfigHeader(resolved);
  const cacheDir = join(tmpdir(), 'rraylib');
  const configHash = Object.values(resolved).join('_');
  const headerPath = join(cacheDir, `config_${configHash}.h`);

  if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });
  writeFileSync(headerPath, configHeader);

  const srcDir = dirname(new URL(import.meta.url).pathname);
  const cDir = join(srcDir, 'c');
  const modulesDir = join(srcDir, 'modules');

  const wrapperSrc = `#include "${headerPath}"\n#include "${cDir}/registries.c"\n#include "${modulesDir}/window/wrapper.c"\n#include "${modulesDir}/shapes/wrapper.c"\n#include "${modulesDir}/collision/wrapper.c"\n#include "${modulesDir}/camera/wrapper.c"\n#include "${modulesDir}/draw3d/wrapper.c"\n#include "${modulesDir}/texture/wrapper.c"\n#include "${modulesDir}/model/wrapper.c"\n#include "${modulesDir}/image/wrapper.c"\n#include "${modulesDir}/color/wrapper.c"\n#include "${modulesDir}/font/wrapper.c"\n#include "${modulesDir}/input/wrapper.c"\n#include "${modulesDir}/audio/wrapper.c"\n#include "${modulesDir}/shader/wrapper.c"\n`;

  const wrapperPath = join(cacheDir, `main_${configHash}.c`);
  writeFileSync(wrapperPath, wrapperSrc);

  const library = config.raylibPath ? [config.raylibPath] : ['raylib'];

  return cc({
    source: wrapperPath,
    library,
    symbols: allSymbols,
  });
}

export function getSymbols(): SymbolsType {
  if (!_r) _r = buildCC(_config);
  return _r;
}
