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
};
