import { Raylib, COLORS, KEYS } from "../src";

Raylib.initWindow(1200, 800, "Shader Demo");
Raylib.setTargetFPS(60);

const swirlFs = `#version 330
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);
    vec2 d = uv - 0.5;
    float dist = length(d);
    float angle = atan(d.y, d.x) + dist * 10.0;
    fragColor = vec4(
        sin(angle) * 0.5 + 0.5,
        sin(angle + 2.094) * 0.5 + 0.5,
        sin(angle + 4.189) * 0.5 + 0.5,
        1.0
    );
}`;

const gradientFs = `#version 330
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);
    fragColor = vec4(uv.x, uv.y, (uv.x + uv.y) * 0.5, 1.0);
}`;

const plasmaFs = `#version 330
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);
    float v = (sin(uv.x * 10.0) + sin(uv.y * 10.0) + sin((uv.x + uv.y) * 10.0) + sin(length(uv - 0.5) * 14.0)) * 0.25;
    fragColor = vec4(
        sin(v * 3.14159) * 0.5 + 0.5,
        sin(v * 3.14159 + 2.094) * 0.5 + 0.5,
        sin(v * 3.14159 + 4.189) * 0.5 + 0.5,
        1.0
    );
}`;

const shaders = [
  { name: "Swirl", shader: Raylib.loadShaderFromMemory(null, swirlFs) },
  { name: "Gradient", shader: Raylib.loadShaderFromMemory(null, gradientFs) },
  { name: "Plasma", shader: Raylib.loadShaderFromMemory(null, plasmaFs) },
];

let current = 0;

while (!Raylib.windowShouldClose()) {
  if (Raylib.isKeyPressed(KEYS.SPACE)) {
    current = (current + 1) % shaders.length;
  }

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  const { name, shader } = shaders[current];
  Raylib.beginShaderMode(shader);
  Raylib.drawRectangle(0, 0, 1200, 500, COLORS.WHITE);
  Raylib.endShaderMode();

  Raylib.drawText(`Shader: ${name}`, 20, 520, 40, COLORS.GOLD);
  Raylib.drawText("Press SPACE to switch", 20, 570, 24, COLORS.LIGHTGRAY);
  Raylib.drawText(`[${current + 1}/${shaders.length}]`, 20, 610, 20, COLORS.CYAN);
  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();
}

for (const { shader } of shaders) Raylib.unloadShader(shader);
Raylib.closeWindow();
