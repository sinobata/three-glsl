'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Vector3 } from 'three';
import MultiShaderBox from './MultiShaderBox';

// カメラポジションの定義（各面に対応）
const CAMERA_POSITIONS = {
  1: new Vector3(0, 0, 5), // 正面 (1の目)
  2: new Vector3(5, 0, 0), // 左側 (2の目)
  3: new Vector3(0, 5, 0), // 上側 (3の目)
  4: new Vector3(0, -5, 0), // 下側 (4の目)
  5: new Vector3(-5, 0, 0), // 右側 (5の目)
  6: new Vector3(0, 0, -5), // 背面 (6の目)
};

// カメラコントローラーコンポーネント
function CameraController({
  targetPosition,
  isAnimating,
  onAnimationComplete,
}: {
  targetPosition: Vector3;
  isAnimating: boolean;
  onAnimationComplete: () => void;
}) {
  const { camera } = useThree();
  const currentPosition = useRef(new Vector3());
  const targetRef = useRef(new Vector3());

  useEffect(() => {
    if (isAnimating) {
      currentPosition.current.copy(camera.position);
      targetRef.current.copy(targetPosition);
    }
  }, [targetPosition, camera, isAnimating]);

  useFrame(() => {
    if (!isAnimating) return;

    // スムーズなカメラ移動
    currentPosition.current.lerp(targetRef.current, 0.08);
    camera.position.copy(currentPosition.current);
    camera.lookAt(0, 0, 0); // 常にサイコロの中心を見る

    // アニメーション完了判定
    const distance = currentPosition.current.distanceTo(targetRef.current);
    if (distance < 0.1) {
      camera.position.copy(targetRef.current);
      onAnimationComplete();
    }
  });

  return null;
}

// キーボードコントロールコンポーネント
function KeyboardControls({ onFaceChange }: { onFaceChange: (face: number) => void }) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= '1' && key <= '6') {
        const face = parseInt(key);
        onFaceChange(face);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onFaceChange]);

  return null;
}

export default function Scene() {
  const [currentFace, setCurrentFace] = useState(1);
  const [targetPosition, setTargetPosition] = useState(CAMERA_POSITIONS[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const orbitControlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);

  const handleFaceChange = (face: number) => {
    setCurrentFace(face);
    setTargetPosition(CAMERA_POSITIONS[face as keyof typeof CAMERA_POSITIONS]);
    setIsAnimating(true);

    // OrbitControlsを一時的に無効化
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false;
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);

    // OrbitControlsを再有効化
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = true;
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* UI コントロール */}
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded">
        <h3 className="text-lg font-bold mb-2">カメラ制御</h3>
        <p className="text-sm mb-2">キーボード: 1-6でサイコロの面を切り替え</p>
        <p className="text-sm mb-2">マウス: ドラッグで自由に回転</p>
        <p className="text-sm mb-4">
          現在の面: {currentFace} {isAnimating ? '(移動中...)' : ''}
        </p>

        {/* ボタンコントロール */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((face) => (
            <button
              key={face}
              onClick={() => handleFaceChange(face)}
              disabled={isAnimating}
              className={`px-3 py-2 rounded text-sm font-bold transition-colors ${
                currentFace === face
                  ? 'bg-blue-500 text-white'
                  : isAnimating
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {face}
            </button>
          ))}
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* 環境光 */}
        <ambientLight intensity={0.5} />

        {/* 指向性ライト */}
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* マルチシェーダーボックス */}
        <Suspense fallback={null}>
          <MultiShaderBox position={[0, 0, 0]} scale={[1, 1, 1]} />
        </Suspense>

        {/* カメラコントローラー */}
        <CameraController
          targetPosition={targetPosition}
          isAnimating={isAnimating}
          onAnimationComplete={handleAnimationComplete}
        />

        {/* OrbitControls */}
        <OrbitControls
          ref={orbitControlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
        />

        {/* キーボードコントロール */}
        <KeyboardControls onFaceChange={handleFaceChange} />

        {/* パフォーマンス統計 */}
        <Stats />
      </Canvas>
    </div>
  );
}
