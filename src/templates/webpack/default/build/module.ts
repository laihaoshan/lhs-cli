// module.exports = {
// 	rules: [
// 		{
// 			test: /\.vue$/,
// 			loader: 'vue-loader',
// 		},
// 		{
// 			test: /\.(ts|tsx)$/,
// 			exclude: /node_modules/,
// 			use: [
// 				{
// 					loader: 'ts-loader',
// 					options: {
// 						appendTsSuffixTo: [/\.vue$/], // 支持 Vue SFC
// 						compilerOptions: {
// 							jsx: 'preserve', // 保留 JSX 供后续 loader 处理
// 						},
// 					},
// 				},
// 			],
// 		},
// 		{
// 			test: /\.css$/,
// 			use: [
// 				'style-loader', // 将 CSS 注入 DOM
// 				'css-loader', // 解析 CSS 导入
// 				{
// 					loader: 'postcss-loader',
// 					options: {
// 						postcssOptions: {
// 							plugins: [
// 								require('postcss-preset-env')(), // 自动添加浏览器前缀
// 							],
// 						},
// 					},
// 				},
// 			],
// 		},
// 		{
// 			test: /\.less$/,
// 			use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
// 		},
// 		{
// 			test: /\.(png|jpe?g|gif|svg)$/,
// 			type: 'asset/resource',
// 			generator: {
// 				filename: `${timestamp}/images/[name].[hash:8][ext]`,
// 			},
// 		},
// 	],
// };
