precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec2 uv = vUv;

    // 時間に基づく赤色のグラデーション
    float red = sin(u_time * 2.0 + uv.x * 3.14159) * 0.5 + 0.5;
    float intensity = sin(u_time + uv.y * 6.28318) * 0.3 + 0.7;

    vec3 color = vec3(red * intensity, 0.1, 0.2);

    gl_FragColor = vec4(color, 1.0);
}
