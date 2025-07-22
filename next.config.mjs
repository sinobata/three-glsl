/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/three-glsl',
  assetPrefix: '/three-glsl/',
  images: {
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    // GLSL, fragment shader, vertex shader files support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|frag|vert)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });

    // Turbopack support for development
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Turbopack configuration for .frag and .vert files
  experimental: {
    turbo: {
      rules: {
        '*.frag': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
        '*.vert': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
        '*.glsl': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
