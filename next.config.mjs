/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.prismic.io',
        protocol: 'https',
      },
    ],
  },
  webpack: (config) => {
    // Adding GLSL shader handling to Webpack configuration
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,  // match shader file extensions
      use: ['raw-loader', 'glslify-loader'],  // load them as raw strings and process glslify includes
    });

    return config;
  },
};

export default nextConfig;
