import fs from 'fs-extra';
import chalk from 'chalk';
import webpackLoader from './webpack';
import ViteOption from './vite';
import { stringifyLoader } from './utils/stringifyLoader';
import { setDevDependencies } from '../utils/index';

const setWebpackLoader = async (preprocessor: 'less' | 'sass' | 'css', targetDir: string) => {
	let rule = '';
	let dep;
	if (preprocessor !== 'css') {
		const { rules, devDependencies } = webpackLoader(preprocessor);
		// 手动生成代码字符串（保留 RegExp 和格式）
		rule = `{
          test: ${rules.test.toString()},
          use: [
            ${rules.use.map(loader => stringifyLoader(loader)).join(',\n            ')}
          ]
        },`;
		dep = devDependencies;
		const template = await fs.readFileSync('./webpack.config.ts', 'utf-8');
		await fs.writeFileSync(
			'./webpack.config.ts',
			template.replace(`'CSS_PREPROCESSOR_RULE',`, rule),
		);
	} else {
		const template = await fs.readFileSync('./webpack.config.ts', 'utf-8');
		await fs.writeFileSync(
			'./webpack.config.ts',
			template.replace(/(,[^,]*?)'CSS_PREPROCESSOR_RULE'/, rule),
		);
	}

	if (dep) await setDevDependencies(targetDir, dep);
};

const setViteOption = async (preprocessor: 'less' | 'sass' | 'css', targetDir: string) => {
	let opt = '';
	if (preprocessor !== 'css') {
		const { options, devDependencies } = ViteOption(preprocessor);
		opt = options;

		await setDevDependencies(targetDir, devDependencies);

		const template = await fs.readFileSync('./vite.config.ts', 'utf-8');

		await fs.writeFileSync('./vite.config.ts', template.replace(`'CSS_PREPROCESSOR_OPTIONS'`, opt));
	} else {
		const template = await fs.readFileSync('./vite.config.ts', 'utf-8');
		await fs.writeFileSync(
			'./vite.config.ts',
			template.replace(/(,[^,]*?)'CSS_PREPROCESSOR_OPTIONS'/, opt),
		);
	}
};

export default async function setupStyles(
	template: 'webpack' | 'vite',
	targetDir: string,
	preprocessor: 'less' | 'sass' | 'css',
) {
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置 预处理器...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);

			if (template === 'webpack') {
				await setWebpackLoader(preprocessor, targetDir);
			} else if (template === 'vite') {
				await setViteOption(preprocessor, targetDir);
			}

			console.log(chalk.green(`✅ ${preprocessor}预处理器 已在 ${targetDir} 配置完成!`));
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red(`❌ ${preprocessor}预处理器 配置失败:`), error);
		throw error;
	}
}
