precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // 正規化されたUV座標を使用
    vec2 st = vUv;

    // 時間を使用してアニメーション
    float time = u_time * 0.5;

    // 法線を使用してライティング効果
    vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
    float lightIntensity = max(dot(vNormal, lightDirection), 0.0);

    // カラフルなグラデーション（時間とUV座標を組み合わせ）
    vec3 color = vec3(
        sin(st.x * 3.14159 + time) * 0.5 + 0.5,
        sin(st.y * 3.14159 + time + 2.0) * 0.5 + 0.5,
        sin((st.x + st.y) * 3.14159 + time + 4.0) * 0.5 + 0.5
    );

    // ライティングを適用
    color *= lightIntensity * 0.7 + 0.3;

    // 頂点の位置に基づく追加の色の変化
    color += vPosition.z * 0.1;

    gl_FragColor = vec4(color, 1.0);
}
