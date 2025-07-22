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
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
