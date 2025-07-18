export default (preprocessor: 'less' | 'sass') => {
	const rules = {
		less: {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'less-loader',
					options: {
						lessOptions: {
							javascriptEnabled: true // 启用 Less 中的 JavaScript 表达式
						}
					}
				}
			]
		},
		sass: {
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'sass-loader',
					options: {
						// 这里是 sass-loader 的选项
						sassOptions: {
							outputStyle: 'compressed' // 开发环境保持展开，生产环境压缩
						}
					}
				}
			]
		}
	};

	const devDependencies = {
		less: {
			less: '^4.3.0',
			'less-loader': '^12.3.0'
		},
		sass: {
			sass: '^1.89.2',
			'sass-loader': '^16.0.5'
		}
	};

	return {
		rules: rules[preprocessor],
		devDependencies: devDependencies[preprocessor]
	};
};
