import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import webpackLoader from './webpack';
import ViteOption from './vite';
import { stringifyLoader } from './utils/stringifyLoader';

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
		const template = fs.readFileSync('./webpack.config.ts', 'utf-8');
		fs.writeFileSync('./webpack.config.ts', template.replace(`'CSS_PREPROCESSOR_RULE',`, rule));
	} else {
		const template = fs.readFileSync('./webpack.config.ts', 'utf-8');
		fs.writeFileSync('./webpack.config.ts', template.replace(/(,[^,]*?)'CSS_PREPROCESSOR_RULE'/, rule));
	}

	if (dep) {
		/**添加 prepare 脚本 */
		const pkgPath = path.join(targetDir, 'package.json');
		const pkg = await fs.readJson(pkgPath);

		/**确保 devDependencies 存在 */
		pkg.devDependencies = pkg.devDependencies || {};

		/**添加必要依赖版本 */
		Object.assign(pkg.devDependencies, dep);

		await fs.writeJson(pkgPath, pkg, { spaces: 2 });
	}
};

const setViteOption = async (preprocessor: 'less' | 'sass' | 'css', targetDir: string) => {
	let option = '';
	if (preprocessor !== 'css') {
		const { options, devDependencies } = ViteOption(preprocessor);
		option = options;
		/**添加 prepare 脚本 */
		const pkgPath = path.join(targetDir, 'package.json');
		const pkg = await fs.readJson(pkgPath);

		/**确保 devDependencies 存在 */
		pkg.devDependencies = pkg.devDependencies || {};

		/**添加必要依赖版本 */
		Object.assign(pkg.devDependencies, devDependencies);

		await fs.writeJson(pkgPath, pkg, { spaces: 2 });

		const template = fs.readFileSync('./vite.config.ts', 'utf-8');

		fs.writeFileSync('./vite.config.ts', template.replace(`'CSS_PREPROCESSOR_OPTIONS'`, option));
	} else {
		const template = fs.readFileSync('./vite.config.ts', 'utf-8');
		fs.writeFileSync('./vite.config.ts', template.replace(/(,[^,]*?)'CSS_PREPROCESSOR_OPTIONS'/, option));
	}
};

export default async function setupStyles(
	template: 'webpack' | 'vite',
	targetDir: string,
	preprocessor: 'less' | 'sass' | 'css'
) {
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置 预处理器...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);

			if (template === 'webpack') {
				setWebpackLoader(preprocessor, targetDir);
			} else if (template === 'vite') {
				setViteOption(preprocessor, targetDir);
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
