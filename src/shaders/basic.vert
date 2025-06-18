precision mediump float;

// Three.jsが自動的に提供する変数：
// attribute vec3 position;
// attribute vec2 uv;
// attribute vec3 normal;
// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat3 normalMatrix;

uniform float u_time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;

    // normalMatrixは3x3行列なので、正しく処理する
    vNormal = normalize(normalMatrix * normal);

    // 頂点の位置（時間によるアニメーション付き）
    vec3 pos = position;
    // pos.z += sin(pos.x * 2.0 + u_time) * 0.1;

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
