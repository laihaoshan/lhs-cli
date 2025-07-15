module.exports = {
	port: 8081, // 自定义端口
	hot: true, // 启用热更新
	compress: true, // 启用gzip压缩
	historyApiFallback: true, // 支持HTML5 History API
	client: {
		overlay: false
	},
	headers: {
		'Access-Control-Allow-Origin': '*', // 允许主应用跨域访问
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	},
	proxy: [
		{
			context: ['/api'],
			// context: ['/api', '/graphql'], // 多路径代理
			target: 'http://your-api-domain.com/',
			ws: false,
			changeOrigin: true,
			pathRewrite: { '^/api': '' }
		},
		{
			context: ['/ws-api'],
			// context: ['/api', '/graphql'], // 多路径代理
			target: 'ws://your-api-domain/',
			ws: true,
			changeOrigin: true,
			pathRewrite: { '^/ws-api': '' }
		}
	]
};
