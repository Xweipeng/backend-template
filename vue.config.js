const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = dir => {
  	return path.join(__dirname, dir)
}

// 项目部署基础
console.log(process.env.NODE_ENV, process.env.DeployType)
const cdnDomian = 'http://pma28q747.bkt.clouddn.com' // cdn域名路径
let BASE_URL = ''
if (process.env.NODE_ENV === 'production') {
  BASE_URL = process.env.DeployType === 'cdn' ? cdnDomian : './'
} else {
  BASE_URL = '/'
}

module.exports = {
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
    // #region 忽略生产环境打包的文件
    console.log('忽略打包文件')
    console.log(process.env.DeployType === 'cdn')
    if (process.env.DeployType === 'cdn') {
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'iview': 'iview',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)
      const cdn = {
        css: [
				  // iview css
				  '//unpkg.com/iview/dist/styles/iview.css'
        ],
        js: [
				  // vue
				  '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
				  // vue-router
				  '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
				  // vuex
				  '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
				  // axios
				  '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
				  // iview js
				  '//unpkg.com/iview/dist/iview.min.js'
        ]
      }
      config.plugin('html').tap(args => {
				  args[0].cdn = cdn
				  return args
      })
    }

		  // #endregion
  },
  // 打包时不生成.map文件
  productionSourceMap: false
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
}
