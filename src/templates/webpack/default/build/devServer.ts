module.exports = {
	port: 8080, // 自定义端口
	hot: true, // 启用热更新
	compress: true, // 启用gzip压缩
	historyApiFallback: true, // 支持HTML5 History API
	client: {
		overlay: false,
	},
	proxy: [
		{
			context: ['/api'],
			// context: ['/api', '/graphql'], // 多路径代理
			target: 'http://your-api-domain.com/',
			ws: false,
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	],
};
