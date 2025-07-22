precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // サイコロの5の点を表示
    float one = length(uv - vec2(-0.5, -0.5));
    float two = length(uv - vec2(0.5, -0.5));
    float three = length(uv - vec2(-0.5, 0.5));
    float four = length(uv - vec2(0.5, 0.5));
    float five = length(uv - vec2(0.0, 0.0));

    // 円の半径
    float radius = 0.1;

    // 円の内側を白、外側を黒に
    float circle =
        step(one, radius) +
        step(two, radius) +
        step(three, radius) +
        step(four, radius) +
        step(five, radius);

    // 背景色と点の色（黒）を混合
    float background = 0.03 / abs(tan(u_time * 4.0) - length(uv));

    vec3 dotColor = vec3(0.0, 0.0, 0.0);

    vec3 color = mix(
        vec3(mix(vec3(0.9), vec3(0.0), background)),
        dotColor,
        circle
    );

    gl_FragColor = vec4(color, 1.0);
}
