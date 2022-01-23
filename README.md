#

这是一个Taro纯净版的模版工程，里面集成了vantui组件库，并且临时解决了Taro工程使用usage报错的问题

注意：Taro工程的项目名称定义的时候不要带上taro关键字(会影响编译性能)，具体原因可以看config/webpack/miniChain.js

## update config/index.js

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
	}
}
```

## add babel-plugin-import and @antmjs/vantui. and update babel.config.js

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

## use useBuiltIns: 'usage' in babel.config.js. update config/index.js

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

