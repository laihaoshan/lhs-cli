const path = require('path');
const webpackPlugins = require('./build/plugins');
const webpackDevServer = require('./build/devServer');
const webpackOptimization = require('./build/optimization');
const timestamp = Date.now();
const env = process.env.NODE_ENV === 'development';
const loc = env ? '' : `${timestamp}/`;

module.exports = {
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		/**打包文件 */
		filename: `${loc}/js/[name].[contenthash].js`,
		/**打包异步文件 */
		chunkFilename: `${loc}/js/[name].[contenthash].js`,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/], // 支持 Vue SFC
							compilerOptions: {
								jsx: 'preserve', // 保留 JSX 供后续 loader 处理
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', // 将 CSS 注入 DOM
					'css-loader', // 解析 CSS 导入
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('postcss-preset-env')(), // 自动添加浏览器前缀
								],
							},
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				type: 'asset/resource',
				generator: {
					/**打包图片资源 */
					filename: `${timestamp}/images/[name].[hash:8][ext]`,
				},
			},
		],
	},
	plugins: webpackPlugins,
	devServer: webpackDevServer,
	optimization: webpackOptimization,
};
