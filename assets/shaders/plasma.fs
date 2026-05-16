#version 330

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);

    float v1 = sin(uv.x * 10.0);
    float v2 = sin(uv.y * 10.0);
    float v3 = sin((uv.x + uv.y) * 10.0);
    float v4 = sin(length(uv - 0.5) * 14.0);

    float v = (v1 + v2 + v3 + v4) * 0.25;

    float r = sin(v * 3.14159) * 0.5 + 0.5;
    float g = sin(v * 3.14159 + 2.094) * 0.5 + 0.5;
    float b = sin(v * 3.14159 + 4.189) * 0.5 + 0.5;

    fragColor = vec4(r, g, b, 1.0);
}
