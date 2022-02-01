/** @type {import('next').NextConfig} */

// pwa
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  // trailingSlash: true, // add slash the end of URL
  images: {
    domains: ['storage.googleapis.com', 'dropbox.com'],
  },
  sassOptions: {
    prependData: `
@import 'assets/scss/foundations/functions.scss';
@import 'assets/scss/foundations/mixins.scss';
@import 'assets/scss/foundations/colors.scss';
@import 'assets/scss/foundations/variables.scss';`,
  },
  // security headers config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // allow solving domanin name on prefetch
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            // allow accesses on https, includes subdomains, age: 2 years
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // prevent js inline code
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // allow frame, iframe
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // which functions allow
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // appoint content type
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // tells where the visitors came from
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // { // custom security configuration
          //   key: 'Content-Security-Policy',
          //   value: // Your CSP Policy
          // }
        ],
      },
    ];
  },
  // ignore files for storybook from build
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\.stor(ies|y)\.tsx$/ }));
    return config;
  },
  // pwa settings
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
};

module.exports = withPWA(nextConfig);
