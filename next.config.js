/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');


const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  sassOptions: {
    prependData: `
    @import '../foundations/functions.scss';
      @import '../foundations/mixins.scss';
      @import '../foundations/colors.scss';
      @import '../foundations/variables.scss';`,
  },
  experimental: {
    scrollRestoration: true
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
}

module.exports = withPWA(nextConfig)
// module.exports = nextConfig
