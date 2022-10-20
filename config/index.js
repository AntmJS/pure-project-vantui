/* eslint-disable import/no-commonjs */
/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require('path')
const pkg = require('../package.json')
const miniChain = require('./webpack/miniChain')
const h5Chain = require('./webpack/h5Chain')

const config = {
  projectName: pkg.name,
  date: '2022-8-10',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: process.env.TARO_ENV === 'h5' ? 'build' : process.env.TARO_ENV,
  alias: {
    '@babel/runtime-corejs3/regenerator': npath.resolve(
      process.cwd(),
      './node_modules/regenerator-runtime',
    ),
    '@babel/runtime/regenerator': npath.resolve(
      process.cwd(),
      './node_modules/regenerator-runtime',
    ),
    '@': npath.resolve(process.cwd(), 'src'),
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      // 暂时不要开启，开启会报错
      enable: false,
    },
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    webpackChain(chain) {
      miniChain(chain)
    },
    lessLoaderOption: {
      lessOptions: {
        modifyVars: {
          hack: `true; @import "${npath.join(
            process.cwd(),
            'src/styles/index.less',
          )}";`,
        },
      },
      // 适用于全局引入样式
      // additionalData: "@import '~/src/styles/index.less';",
    },
    postcss: {
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
    webpackChain(chain) {
      h5Chain(chain)
      if (process.env.NODE_ENV === 'production') {
        chain.performance.maxEntrypointSize(1000000).maxAssetSize(512000)
      }
    },
    esnextModules: [/@antmjs[\\/]vantui/],
    lessLoaderOption: {
      lessOptions: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${npath.join(
            process.cwd(),
            'src/styles/index.less',
          )}";`,
        },
      },
    },
    router: {
      mode: 'browser',
    },
    devServer: {
      hot: false,
    },
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
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
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/chunk/[name].css',
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
  plugins: [
    ['@tarojs/plugin-framework-react', { reactMode: 'concurrent' }],
    '@tarojs/plugin-platform-alipay-dd',
    ['@tarojs/plugin-platform-kwai'],
  ],
}

module.exports = function (merge) {
  return merge({}, config, require(`./${process.env.NODE_ENV}`))
}
