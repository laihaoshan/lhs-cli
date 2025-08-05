import prettier from 'prettier';

/**
 * prettier格式化处理
 * @param data 要格式化的数据
 * @returns
 */
export const formatPrettier = (data: any): Promise<string> => {
	return new Promise(async resolve => {
		const formatData = await prettier.format(data, {
			parser: 'babel',
			semi: false,
			singleQuote: true,
			printWidth: 100,
			trailingComma: 'all',
		});
		resolve(formatData);
	});
};
