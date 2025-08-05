import chalk from 'chalk';
import { npmrcOption } from './npmmirror';
import { fsWriteFile } from '../utils/fs';

export default async function setupNpmrc(targetDir: string) {
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置国内淘宝镜像...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);

			await fsWriteFile(__dirname, targetDir, '.npmrc', npmrcOption);

			console.log(chalk.green(`✅ 淘宝镜像 已在 ${targetDir}\\.npmrc 配置完成!`));
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red('❌ 淘宝镜像 配置失败:'), error);
		throw error;
	}
}
