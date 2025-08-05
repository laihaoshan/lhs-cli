const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// ESLINT_PLUGIN_REQUIRE

module.exports = [
	new CleanWebpackPlugin(),
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
		template: './public/index.html',
	}),
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
	}),
	new webpack.DefinePlugin({
		'import.meta.env.BASE_URL': JSON.stringify('/'), // 设置你的基础路径
	}),
	'ESLINT_PLUGIN',
	AutoImport({
		include: [
			/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
			/\.vue$/,
			/\.vue\?vue/, // .vue
		],
		dts: true, // or a custom path
		imports: ['vue', 'vue-router', 'pinia'],
		// 想全局引入的工具写入数组内
		// imports: [
		// 	'vue',
		// 	{
		// 		'vue-router': ['useRouter', 'useRoute'],
		// 	},
		// ],
		vueTemplate: false,
		eslintrc: {
			enabled: true, // 默认 `false`
			filepath: './.eslintrc-auto-import.json', // 默认 `./.eslintrc-auto-import.json`
			// globalsPropValue: true, // 默认 `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
		},
	}),
	Components({
		dts: './components.d.ts',
	}),
];
