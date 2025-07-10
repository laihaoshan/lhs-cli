import { select } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default async function setupAxios(targetDir: string) {
	const axiosTemplate = await select({
		message: '请选择axios配置模板',
		choices: [
			{ value: 'default', name: '基础配置' },
			{ value: 'blobHandle', name: '带Blob类型响应处理' }
		],
		default: 'default'
	});
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置axios模板...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		const templateDir = path.join(__dirname, `./templates`);
		try {
			// 切换到目标目录
			process.chdir(targetDir);

			const templateFile = `${axiosTemplate}.ts`;
			await fs.copy(path.join(templateDir, templateFile), path.join(targetDir, '\\src\\axios\\request.ts'));

			/**添加 prepare 脚本 */
			const pkgPath = path.join(targetDir, 'package.json');
			const pkg = await fs.readJson(pkgPath);
			pkg.scripts = pkg.scripts || {};

			if (!pkg.scripts.prepare) {
				/**确保 dependencies 存在 */
				pkg.dependencies = pkg.dependencies || {};

				/**添加必要依赖版本 */
				Object.assign(pkg.dependencies, {
					axios: '^1.10.0'
				});

				await fs.writeJson(pkgPath, pkg, { spaces: 2 });
			}
			console.log(chalk.green(`✅ axios模板配置完成!`));
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red('❌ axios模板配置失败:'), error);
		throw error;
	}
}
