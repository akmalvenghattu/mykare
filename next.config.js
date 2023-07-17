/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       destination: '/404',
  //       permanent: false,
  //     },
  //   ];
  // },
}

module.exports = nextConfig
