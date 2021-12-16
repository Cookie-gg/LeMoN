/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  sassOptions: {
    prependData: `
@import 'assets/scss/foundations/functions.scss';
@import 'assets/scss/foundations/mixins.scss';
@import 'assets/scss/foundations/colors.scss';
@import 'assets/scss/foundations/variables.scss';
` },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
}

module.exports = withPWA(nextConfig);
