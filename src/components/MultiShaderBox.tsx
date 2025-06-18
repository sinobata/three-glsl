'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Mesh, Material } from 'three';
import * as THREE from 'three';

// 各面用のシェーダーをインポート
import vertexShader from '@/shaders/basic.vert';
import basicFragmentShader from '@/shaders/basic.frag';
import redFragmentShader from '@/shaders/red.frag';
import blueFragmentShader from '@/shaders/blue.frag';
import greenFragmentShader from '@/shaders/green.frag';

interface MultiShaderBoxProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export default function MultiShaderBox({
  position = [0, 0, 0],
  scale = [1, 1, 1],
}: MultiShaderBoxProps) {
  const meshRef = useRef<Mesh>(null);
  const materialsRef = useRef<ShaderMaterial[]>([]);

  // 各面用のマテリアル配列を作成
  const materials = useMemo(() => {
    const baseUniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    };

    // 6面分のマテリアルを作成
    const mats = [
      // 前面 (右): 基本シェーダー
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: basicFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
      // 後面 (左): 赤シェーダー
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: redFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
      // 上面: 青シェーダー
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: blueFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
      // 下面: 緑シェーダー
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: greenFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
      // 右面: 基本シェーダー（異なる色調）
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: basicFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
      // 左面: 赤シェーダー（少し異なるタイミング）
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: redFragmentShader,
        uniforms: { ...baseUniforms },
        side: THREE.DoubleSide,
      }),
    ];

    materialsRef.current = mats;
    return mats;
  }, []);

  // アニメーションフレームで全てのマテリアルのuniformsを更新
  useFrame((state) => {
    materialsRef.current.forEach((material, index) => {
      if (material && material.uniforms) {
        // 各面で少し異なるタイミングを設定
        material.uniforms.u_time.value = state.clock.elapsedTime + index * 0.5;
      }
    });
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} material={materials}>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}
