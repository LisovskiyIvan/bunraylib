#version 330

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);
    vec2 center = vec2(0.5, 0.5);
    vec2 d = uv - center;
    float dist = length(d);
    float angle = atan(d.y, d.x);

    float swirl = angle + dist * 10.0;

    float r = sin(swirl) * 0.5 + 0.5;
    float g = sin(swirl + 2.094) * 0.5 + 0.5;
    float b = sin(swirl + 4.189) * 0.5 + 0.5;

    fragColor = vec4(r, g, b, 1.0);
}
