'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import ShaderMesh from './ShaderMesh';
import MultiShaderBox from './MultiShaderBox';

export default function Scene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* 環境光 */}
        <ambientLight intensity={0.5} />

        {/* 指向性ライト */}
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* 元のシェーダーメッシュ（左側） */}
        <Suspense fallback={null}>
          <ShaderMesh position={[-3, 0, 0]} scale={[1.5, 1.5, 1]} />
        </Suspense>

        {/* マルチシェーダーボックス（右側） */}
        <Suspense fallback={null}>
          <MultiShaderBox position={[3, 0, 0]} scale={[1, 1, 1]} />
        </Suspense>

        {/* カメラコントロール */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {/* パフォーマンス統計 */}
        <Stats />
      </Canvas>
    </div>
  );
}
