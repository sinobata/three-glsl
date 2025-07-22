precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

const float PI = 3.1415926;
vec3 hsb2rgb(vec3 c) {
    vec3 rgb = clamp(
        abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
    );
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // サイコロの3の点を表示
    float one = length(uv - vec2(-0.5, -0.5));
    float two = length(uv - vec2(0.0, 0.0));
    float three = length(uv - vec2(0.5, 0.5));

    // 円の半径
    float radius = 0.1;

    // 円の内側を白、外側を黒に
    float circle = step(one, radius) + step(two, radius) + step(three, radius);

    // 背景色
    vec3 backgroundColor = hsb2rgb(
        vec3((atan(uv.y, uv.x) + PI) / (PI * 2.0) + u_time * 0.2, 1.0, 1.0)
    );

    // 点の色（黒）
    vec3 dotColor = vec3(0.0, 0.0, 0.0);
    vec3 color = mix(backgroundColor, dotColor, circle);
    gl_FragColor = vec4(color, 1.0);
}
