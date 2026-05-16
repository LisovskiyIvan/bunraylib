#version 330

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);

    float r = uv.x;
    float g = uv.y;
    float b = (uv.x + uv.y) * 0.5;

    fragColor = vec4(r, g, b, 1.0);
}
