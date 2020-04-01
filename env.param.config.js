'use strict';
const path = require('path');

module.exports = {
  dev: {
    mode: 'MPA', //project mode
    assetsPublicPath: '/',
    port: 8500,
    host: '0.0.0.0',
    useEslint: false,
    prescript: [],
    usepxtorem: true,
    remUnit: 18,
    proxyTable: {
      '/ns-face-target': {
        target: 'http://120.27.3.224:8077/',
        changeOrigin: true,
      },
    }
  },

  prod: {
    mode: 'MPA', //project mode
    assetsPublicPath: '../',
    cssExtractPublicPath: "../../../",
    favicon: path.resolve('./favicon.ico'),
    useEslint: false,
    prescript: [],
    usepxtorem: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 3,
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: module => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              const exclude = [
                /[\\/]node_modules[\\/](vue|antv[\\/]f2|)/,
              ].some(reg => {
                return reg.test(module.resource);
              });

              return include && !exclude;
            }
            return false;
          },
          priority: -10,
          chunks: 'initial',
        },

        vue: {
          name: 'chunk-vue',
          priority: 20,
          test: /[\\/]node_modules[\\/]vue[\\/]/,
        },
        'f2': {
          name: 'chunk-f2',
          priority: 20,
          test: /[\\/]node_modules[\\/]antv[\\/]f2[\\/]/,
        },



      },
    },
    remUnit: 18,
    filterEntries: ['index'],
  },
  base: {
    JSBabelInclude: ['src', 'mock', 'env.param.config.js'],
    alias: {
      '@': path.resolve('./src'),
    },
    prettier: {
      switch: false,
      files: ['src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}'],
    },
    tools: {
      npmUpgradeList: [
        {
          module: 'cx-builder',
          edition: 'latest',//beta / latest
          version: null,
        },
      ],
    },
  },
};
