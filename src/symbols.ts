import { cc } from "bun:ffi";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { tmpdir } from "os";

import { windowSymbols } from "./symbols/window";
import { shapesSymbols } from "./symbols/shapes";
import { collisionSymbols } from "./symbols/collision";
import { cameraSymbols } from "./symbols/camera";
import { draw3dSymbols } from "./symbols/draw3d";
import { textureSymbols } from "./symbols/texture";
import { modelSymbols } from "./symbols/model";
import { imageSymbols } from "./symbols/image";
import { colorSymbols } from "./symbols/color";
import { fontSymbols } from "./symbols/font";
import { inputSymbols } from "./symbols/input";
import { audioSymbols } from "./symbols/audio";
import { shaderSymbols } from "./symbols/shader";
import { filesystemSymbols } from "./symbols/filesystem";

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
  ...filesystemSymbols,
};

type SymbolsType = ReturnType<typeof cc<typeof allSymbols>>;

export interface RaylibConfig {
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
}

const defaults: Required<Omit<RaylibConfig, "raylibPath">> = {
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
  if (_r) throw new Error("Raylib already initialized. Call configure() before any Raylib method.");
  _config = config;
}

function generateConfigHeader(config: Required<Omit<RaylibConfig, "raylibPath">>): string {
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
    if (config[key] != null) (resolved as any)[key] = config[key];
  }

  const configHeader = generateConfigHeader(resolved);
  const cacheDir = join(tmpdir(), "rraylib");
  const configHash = Object.values(resolved).join("_");
  const headerPath = join(cacheDir, `config_${configHash}.h`);

  if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });
  writeFileSync(headerPath, configHeader);

  const srcDir = dirname(new URL(import.meta.url).pathname);
  const cDir = join(srcDir, "c");

  const wrapperSrc = `#include "${headerPath}"\n#include "${cDir}/registries.c"\n#include "${cDir}/window.c"\n#include "${cDir}/shapes.c"\n#include "${cDir}/collision.c"\n#include "${cDir}/camera.c"\n#include "${cDir}/draw3d.c"\n#include "${cDir}/texture.c"\n#include "${cDir}/model.c"\n#include "${cDir}/image.c"\n#include "${cDir}/color.c"\n#include "${cDir}/font.c"\n#include "${cDir}/input.c"\n#include "${cDir}/audio.c"\n#include "${cDir}/shader.c"\n#include "${cDir}/filesystem.c"\n`;

  const wrapperPath = join(cacheDir, `main_${configHash}.c`);
  writeFileSync(wrapperPath, wrapperSrc);

  const library = config.raylibPath ? [config.raylibPath] : ["raylib"];

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
