/** @type {import('@storybook/react/types').StorybookConfig} */
/** @type {import('sass-loader').Options} */

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: { builder: 'webpack5' },

  // additional settings
  staticDirs: ['../public'], // to use next/image
  addons: ['storybook-addon-next-router'],
  webpackFinal: async (config, { configType }) => {
    // Fixes npm packages that depend on some modules
    config.resolve = {
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
      fallback: {
        fs: false,
        path: false,
      },
      modules: [...(config.resolve.modules || []), path.resolve(__dirname, '../src')],
      plugins: [...(config.resolve.plugins || []), new TsconfigPathsPlugin()],
    };
    // Sass & CSS Modules
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { modules: { auto: true } },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: `
            @import 'assets/scss/foundations/functions.scss';
            @import 'assets/scss/foundations/mixins.scss';
            @import 'assets/scss/foundations/colors.scss';
            @import 'assets/scss/foundations/variables.scss';`,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    // Important: return the modified config
    return config;
  },
};
