import chalk from 'chalk';
import { gitignore } from './ignore';
import { fsWriteFile } from '../utils/fs';

export default async function setupGitignore(targetDir: string) {
	try {
		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);

			await fsWriteFile(__dirname, targetDir, '.gitignore', gitignore);
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red('❌ gitignore 配置失败:'), error);
		throw error;
	}
}
