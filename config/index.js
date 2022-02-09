/* eslint-disable import/no-commonjs */
const path = require('path')
const miniChain = require('./webpack/miniChain')
const h5Chain = require('./webpack/h5Chain')

const config = {
  projectName: 'pure-project-vantui',
  date: '2022-1-23',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: process.env.TARO_ENV === 'h5' ? 'dist' : process.env.TARO_ENV,
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    webpackChain (chain) {
      miniChain(chain)
    },
    lessLoaderOption: {
      lessOptions: {
        modifyVars: {
          // kwai: 1,
          hack: `true; @import "${path.join(
            process.cwd(),
            'src/style/index.less',
          )}";`,
        },
      },
      // 适用于全局引入样式
      // additionalData: "@import '~/src/style/index.less';",
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          // autoprefixer 配置项
        },
      },
      pxtransform: {
        enable: true,
        config: {
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    webpackChain (chain) {
      h5Chain(chain)
    },
    esnextModules: [/@antmjs[\\/]vantui/],
    lessLoaderOption: {
      lessOptions: {
        modifyVars: {
          hack: `true; @import "${path.join(
            process.cwd(),
            'src/style/index.less',
          )}";`,
        },
      },
      // 适用于全局引入样式
      // additionalData: "@import '~/src/style/index.less';",
    },
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  plugins: [
    '@tarojs/plugin-platform-alipay-dd',
    '@tarojs/plugin-platform-kwai',
  ],
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
