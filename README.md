## 说明

这是一个Taro纯净版的模版工程，里面仅集成了vantui组件库以及修复各端兼容性问题

* 注意：Taro工程的项目名称定义的时候不要带上taro关键字(会影响编译性能)。

> 原因是如果项目名带有taro字样，exculde是不包含在内的，相当于所有的node_modules每次都会重新编译

```js
chain.module
  .rule('script')
  .exclude.clear()
  .add((filename) => /css-loader/.test(filename) || (/node_modules/.test(filename) && !(/taro/.test(filename) && !/tarojs[\\/](runtime|shared)/.test(filename))))
```

### update config/index.js

```js
{
	mini: {
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
	}
}
```

### add babel-plugin-import and @antmjs/vantui. and update babel.config.js

```js
{
	plugins: [
		[
			'import',
			{
				libraryName: '@antmjs/vantui',
				libraryDirectory: 'es',
				style: (name) => `${name}/style/less`,
				// style: true,
			},
			'@antmjs/vantui',
		]
	]
}
```

### use useBuiltIns: 'usage' in babel.config.js. update config/index.js

> 关于Taro默认的babel配置里面使用useBuiltIns: 'usage'会报错的问题，可以参考下面的解决方案

```js
const miniChain = require('./webpack/miniChain')
const h5Chain = require('./webpack/h5Chain')

const config = {
	mini: {
		webpackChain (chain) {
			miniChain(chain)
    },
	},
	h5: {
		webpackChain (chain) {
      h5Chain(chain)
    },
	}
}
```

