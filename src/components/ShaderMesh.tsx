'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';

// GLSLファイルをインポート
import vertexShader from '@/shaders/basic.vert';
import fragmentShader from '@/shaders/basic.frag';

interface ShaderMeshProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export default function ShaderMesh({ position = [0, 0, 0], scale = [1, 1, 1] }: ShaderMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  // シェーダーマテリアルの作成
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      side: THREE.DoubleSide,
    });
  }, []);

  // アニメーションフレームでuniformsを更新
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderMaterial.uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
