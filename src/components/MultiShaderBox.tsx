'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';
import * as THREE from 'three';

// 各面用のシェーダーをインポート
import vertexShader from '@/shaders/basic.vert';
import oneFragmentShader from '@/shaders/one.frag';
import twoFragmentShader from '@/shaders/two.frag';
import threeFragmentShader from '@/shaders/three.frag';
import fourFragmentShader from '@/shaders/four.frag';
import fiveFragmentShader from '@/shaders/five.frag';
import sixFragmentShader from '@/shaders/six.frag';
interface MultiShaderBoxProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

// 各マテリアルに渡すための、独立したuniformsを生成する関数
const getUniforms = () => ({
  u_time: { value: 0 },
  u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
});

export default function MultiShaderBox({
  position = [0, 0, 0],
  scale = [1, 1, 1],
}: MultiShaderBoxProps) {
  // マテリアルの配列をuseRefで保持することで、useFrame内での参照を安定させる
  const materialsRef = useRef<ShaderMaterial[]>([]);

  // useMemoでマテリアルを一度だけ生成する
  useMemo(() => {
    // 各面に適用するフラグメントシェーダーのリスト
    const fragmentShaders = [
      twoFragmentShader, // 前面 (Right)
      fiveFragmentShader, // 後面 (Left)
      threeFragmentShader, // 上面 (Top)
      fourFragmentShader, // 下面 (Bottom)
      oneFragmentShader, // 右面 (Front)
      sixFragmentShader, // 左面 (Back)
    ];

    materialsRef.current = fragmentShaders.map(
      (fragmentShader) =>
        new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: getUniforms(),
          side: THREE.DoubleSide,
        })
    );
  }, []);

  // アニメーションフレームで全てのマテリアルのuniformsを更新
  useFrame((state) => {
    materialsRef.current.forEach((material) => {
      if (material?.uniforms.u_time) {
        material.uniforms.u_time.value = state.clock.elapsedTime;
      }
    });
  });

  return (
    <mesh position={position} scale={scale} material={materialsRef.current}>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}
