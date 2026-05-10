import { cc } from "bun:ffi";
import wrapper from "./main.c" with { type: "file" };

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

export const symbols = cc({
  source: wrapper,
  library: ["raylib"],
  symbols: {
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
  },
});
