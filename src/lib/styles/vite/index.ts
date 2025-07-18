export default (preprocessor: 'less' | 'sass') => {
	const options = {
		less: `css: {
    preprocessorOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true // 启用内联 JavaScript
        }
      }
    }
  }`,
		sass: `css: {
    preprocessorOptions: {
      scss: {
        // 相当于 less 的 javascriptEnabled: true
        // SCSS 默认支持内联 JavaScript 表达式，所以不需要特别开启
        sassOptions: {
          outputStyle: 'compressed', // 开发环境保持展开，生产环境压缩
        }
      }
    }
  }`
	};

	const devDependencies = {
		less: {
			less: '^4.3.0'
		},
		sass: {
			sass: '^1.89.2'
		}
	};

	return {
		options: options[preprocessor],
		devDependencies: devDependencies[preprocessor]
	};
};
