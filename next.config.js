// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
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
  }
}

module.exports = nextConfig