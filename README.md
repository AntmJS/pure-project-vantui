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

