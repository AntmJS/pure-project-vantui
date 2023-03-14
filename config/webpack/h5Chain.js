/* eslint-disable import/no-commonjs */
const H5FixPlugin = require('@antmjs/plugin-h5-fix')
const commonChain = require('./commonChain')

module.exports = function (chain) {
  chain.plugin('H5FixPlugin').use(new H5FixPlugin())
  commonChain(chain)
}
