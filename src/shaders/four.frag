precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // サイコロの4の点を表示
    float one = length(uv - vec2(-0.4, -0.4));
    float two = length(uv - vec2(0.4, -0.4));
    float three = length(uv - vec2(-0.4, 0.4));
    float four = length(uv - vec2(0.4, 0.4));

    // 円の半径
    float radius = 0.1;

    // 円の内側を白、外側を黒に
    float circle =
        step(one, radius) +
        step(two, radius) +
        step(three, radius) +
        step(four, radius);

    // ジグザグの線を表示
    // X軸方向のジグザグライン（水平）
    float zigzagX = asin(sin(uv.x * 20.0)) * 0.05;
    float revertX = 0.25 / (100.0 * abs(uv.y - zigzagX)) * 1.2;

    // Y軸方向のsin波
    float zigzagY = sin(uv.y * 20.0 - 3.0) * 0.05;
    float revertY = 0.25 / (100.0 * abs(uv.x - zigzagY)) * 1.2;

    // 両方のラインを合成
    float combinedEffect = max(revertX, revertY);

    vec3 backgroundColor = mix(
        vec3(0.9, 0.9, 0.9),
        vec3(0.0, 0.0, 0.0),
        combinedEffect
    );

    vec3 dotColor = vec3(0.0, 0.0, 0.0);
    vec3 color = mix(backgroundColor, dotColor, circle);
    gl_FragColor = vec4(color, 1.0);
}
