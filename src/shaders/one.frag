precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

const float PI = 3.1415926;
const vec3 lightColor = vec3(0.9, 0.9, 0.5); // 背景の後光の色
const vec3 backColor = vec3(0.9, 0.3, 0.3); // 背景の下地の色

// 背景の後光を描く
void sunrise(vec2 uv, inout vec3 i) {
    float f = atan(uv.y, uv.x) + u_time;
    float fs = sin(f * 6.0);
    i = mix(lightColor, backColor, fs);
}

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // サイコロの1の点を表示
    float dist = length(uv - vec2(0.0, 0.0));

    // 円の半径
    float radius = 0.2;

    // 円の内側を白、外側を黒に
    float circle = step(dist, radius);

    // 背景色
    vec3 backgroundColor = vec3(0.9, 0.9, 0.9);
    // 背景の後光を描く
    sunrise(uv, backgroundColor);

    vec3 dotColor = backColor;
    // 背景色と点の色（赤）を混合
    vec3 color = mix(backgroundColor, dotColor, circle);

    gl_FragColor = vec4(color, 1.0);
}
