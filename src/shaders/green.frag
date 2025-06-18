precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec2 uv = vUv;

    // 時間に基づくグリーンの格子パターン
    float grid = sin(uv.x * 10.0 + u_time) * sin(uv.y * 10.0 + u_time);
    float green = abs(grid) * 0.8 + 0.2;

    vec3 color = vec3(0.1, green, 0.3);

    gl_FragColor = vec4(color, 1.0);
}
