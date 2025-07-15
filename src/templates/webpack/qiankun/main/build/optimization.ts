const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
	minimize: true,
	minimizer: [
		new TerserPlugin({
			terserOptions: {
				// 混淆配置
				mangle: true, // 混淆变量名
				compress: {
					drop_console: true, // 移除 console
					drop_debugger: true, // 移除 debugger
					pure_funcs: ['console.log'], // 移除特定函数
				},
				output: {
					comments: false, // 移除注释
				},
			},
			extractComments: false, // 不生成 LICENSE 文件
		}),
	],
};
