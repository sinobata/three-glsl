precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

const float PI = 3.1415926;
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // サイコロの2の点を表示
    float one = length(uv - vec2(-0.5, -0.5));
    float two = length(uv - vec2(0.5, 0.5));

    // 円の半径
    float radius = 0.1;

    // 円の内側を白、外側を黒に
    float circle = step(one, radius) + step(two, radius);

    vec2 rotateUv = uv * rotate2d(PI + u_time * 2.0);

    // 対角線グラデーション背景色
    float gradientFactor = (rotateUv.x + rotateUv.y + 2.0) / 4.0;

    // グラデーションの色を定義
    vec3 color1 = vec3(0.0, 0.0, 1.0); // 左下の色（青）
    vec3 color2 = vec3(1.0, 0.0, 0.0); // 右上の色（赤）

    vec3 backgroundColor = mix(color1, color2, gradientFactor);

    vec3 dotColor = vec3(0.0, 0.0, 0.0);

    vec3 color = mix(backgroundColor, dotColor, circle);

    gl_FragColor = vec4(color, 1.0);
}
