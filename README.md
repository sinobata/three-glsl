# Three.js + GLSL Shader with Next.js

Next.js、Three.js、React Three FiberでGLSLシェーダーを使用するプロジェクトです。
フラグメントシェーダーは`.frag`、頂点シェーダーは`.vert`拡張子で管理しています。

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## 📁 プロジェクト構造

```
src/
├── app/
│   └── page.tsx          # メインページ
├── components/
│   ├── Scene.tsx         # Three.jsシーンコンポーネント
│   └── ShaderMesh.tsx    # GLSLシェーダーを使用するメッシュ
└── shaders/
    ├── basic.frag        # フラグメントシェーダー
    └── basic.vert        # 頂点シェーダー
```

## 🎨 GLSLシェーダーの使用方法

### シェーダーファイルの作成

1. `src/shaders/` ディレクトリにシェーダーファイルを作成
   - フラグメントシェーダー: `.frag` 拡張子
   - 頂点シェーダー: `.vert` 拡張子

2. TypeScriptでインポート
```typescript
import vertexShader from '@/shaders/basic.vert';
import fragmentShader from '@/shaders/basic.frag';
```

### シェーダーマテリアルの作成

```typescript
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(width, height) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  },
});
```

## 🛠 技術スタック

- **Next.js 15** - Reactフレームワーク
- **Three.js** - 3Dライブラリ
- **React Three Fiber** - React用Three.jsレンダラー
- **React Three Drei** - Three.js用ヘルパーライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **raw-loader** - GLSLファイルのWebpack処理

## 📚 参考資料

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [GLSL Reference](https://www.khronos.org/files/opengles_shading_language.pdf)
- [Shader Tutorial](https://thebookofshaders.com/)
- [Next.jsのTypeScript環境でGLSLの環境構築をする #WebGL - Qiita](https://qiita.com/okamonster0615/items/05a5c4d797c4e866e4c8)
- 