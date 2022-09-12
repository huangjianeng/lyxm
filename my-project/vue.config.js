const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	publicPath: '/',
	devServer: {
		port: '9999',
		// 代理配置
		proxy: {
			// 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
			// localhost:8888/api/abc  => 代理给另一个服务器
			// 本地的前端  =》 本地的后端  =》 代理我们向另一个服务器发请求 （行得通）
			// 本地的前端  =》 另外一个服务器发请求 （跨域 行不通）
			'/api': {
				target: 'http://47.97.43.144:18088/',
				// target: 'http://175.6.136.216:20080/', // 我们要代理的地址
				// target: 'http://192.168.15.165:8081/', // 我们要代理的地址
				changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
				pathRewrite: {
					'^/api': ''
				}
			},
		},
	},
	transpileDependencies: true,
})
