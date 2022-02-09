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
