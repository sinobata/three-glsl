precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // vUvを-1.0から1.0の範囲に正規化
    vec2 uv = vUv * 2.0 - 1.0;

    // 時間ベースのランダム値
    float timeRand = rand(vec2(floor(u_time * 2.0), 0.0));
    float timeRand2 = rand(vec2(floor(u_time * 3.0), 1.0));

    // グリッチの強度をランダムに変化
    float glitchIntensity1 = pow(1.0 - fract(u_time), 16.0);
    float glitchIntensity2 = pow(1.0 - fract(u_time + 0.3), 12.0);
    float glitchIntensity3 = pow(1.0 - fract(u_time + 0.7), 8.0);

    // ランダムに動く場所を決定
    if (timeRand > 0.3) {
        // 水平方向のグリッチ（Y軸方向の線）
        uv.x +=
            rand(vec2(floor(uv.y * 30.0 + u_time), 0.0)) *
            glitchIntensity1 *
            1.3;
    }

    if (timeRand2 > 0.4) {
        // 垂直方向のグリッチ（X軸方向の線）
        uv.y +=
            rand(vec2(floor(uv.x * 25.0 + u_time * 1.5), 1.0)) *
            glitchIntensity2 *
            0.8;
    }

    // 斜め方向のグリッチ
    if (timeRand2 > 0.7) {
        float diagonalGlitch = rand(
            vec2(floor((uv.x + uv.y) * 15.0 + u_time * 2.5), 2.0)
        );
        if (diagonalGlitch > 0.8) {
            uv.x += (diagonalGlitch - 0.5) * glitchIntensity1 * 1.0;
            uv.y +=
                (rand(vec2(diagonalGlitch, u_time)) - 0.5) *
                glitchIntensity2 *
                0.6;
        }
    }

    // 細かいノイズ
    if (timeRand > 0.5) {
        uv.x +=
            rand(vec2(floor(uv.x * 50.0 + u_time * 4.0), 3.0)) *
            glitchIntensity3 *
            0.3;
    }

    // サイコロの6の点を表示
    float one = length(uv - vec2(-0.4, -0.4));
    float two = length(uv - vec2(-0.4, 0.4));
    float three = length(uv - vec2(-0.4, 0.0));
    float four = length(uv - vec2(0.4, 0.4));
    float five = length(uv - vec2(0.4, -0.4));
    float six = length(uv - vec2(0.4, 0.0));

    // 円の半径
    float radius = 0.1;

    // 円の内側を白、外側を黒に
    float circle =
        step(one, radius) +
        step(two, radius) +
        step(three, radius) +
        step(four, radius) +
        step(five, radius) +
        step(six, radius);

    // 背景色と点の色（黒）を混合
    vec3 backgroundColor = vec3(0.9, 0.9, 0.9);

    vec3 dotColor = vec3(0.0, 0.0, 0.0);

    vec3 color = mix(backgroundColor, dotColor, circle);

    gl_FragColor = vec4(color, 1.0);
}
