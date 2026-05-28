# rraylib

> TypeScript FFI bindings for [raylib](https://www.raylib.com/) — powered by [Bun](https://bun.sh/).

Zero external dependencies. The C wrappers are compiled on-the-fly via `bun ffi cc`, so all you need is Bun ≥1.3.

## Install

```bash
bun install @dayme/bunraylib
```

## Quick start

```typescript
import { Raylib, COLORS } from "@dayme/bunraylib";

Raylib.initWindow(800, 600, "Hello rraylib");
Raylib.setTargetFPS(60);

while (!Raylib.windowShouldClose()) {
  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);
  Raylib.drawText("Hello World!", 350, 280, 20, COLORS.WHITE);
  Raylib.endDrawing();
}

Raylib.closeWindow();
```

Run it:

```bash
bun run main.ts
```

## API coverage

**494 / 496 functions implemented (99.6%)**

| Module | Progress |
| --- | --- |
| Window and Graphics Device | 97/99 (98%) |
| Input Handling | 37/37 (100%) |
| Gestures and Touch | 8/8 (100%) |
| Camera System | 2/2 (100%) |
| Shapes Drawing | 69/69 (100%) |
| Texture Loading and Drawing | 112/112 (100%) |
| Font Loading and Text Drawing | 37/37 (100%) |
| Basic 3D Shapes | 21/21 (100%) |
| Model Loading and Drawing | 50/50 (100%) |
| Audio Loading and Playing | 61/61 (100%) |

Full breakdown: [PROGRESS.md](./PROGRESS.md)

## Examples

Explore the [`examples/`](./examples) directory:

```bash
bun run examples/shapes.ts       # 2D shapes
bun run examples/shapes3d.ts     # 3D primitives
bun run examples/textures.ts     # Textures & render targets
bun run examples/models.ts       # GLB model viewer
bun run examples/audio.ts        # Sound & music
bun run examples/index.ts        # Input, window & clipboard demo
```

## Requirements

- [Bun](https://bun.sh/) ≥ 1.3

## Development

```bash
bun install
bun test           # run all tests
bun run lint       # oxlint
bun run progress   # regenerate PROGRESS.md
```
