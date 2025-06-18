precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec2 uv = vUv;

    // 時間に基づく青色の波紋エフェクト
    float dist = distance(uv, vec2(0.5));
    float wave = sin(dist * 20.0 - u_time * 3.0) * 0.5 + 0.5;

    vec3 color = vec3(0.1, 0.3, wave);

    gl_FragColor = vec4(color, 1.0);
}
