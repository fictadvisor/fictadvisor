module.exports = {
  transpilePackages: ['@fictadvisor/utils'],
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'https://dev.ficeadvisor.com',
        'https://ficeadvisor.com',
        'https://*.vercel.app',
      ],
    },
  },
};
