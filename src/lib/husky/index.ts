import { execSync } from 'child_process';
import { confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { writePreCommitDefault } from './commit-msg';

export default async function setupHusky(targetDir: string) {
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置 husky...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);

			// /**确保是 Git 仓库 */
			// try {
			// 	execSync('git rev-parse --git-dir', { stdio: 'ignore' });
			// } catch {
			console.log(chalk.yellow('ℹ️ 在目标目录初始化 Git 仓库...'));
			execSync('git init', { stdio: 'inherit' });
			// }

			/**在目标项目安装 husky */
			console.log(chalk.blue(`📦 在 ${targetDir} 配置 husky...`));
			execSync(`npx husky-init`, { stdio: 'inherit' });
			/**是否提交校验信息 */
			const needCommitMsg = await confirm({
				message: 'commit-msg 是否需要配置提交校验规则?',
				default: true
			});

			if (needCommitMsg) {
				// execSync(`printf '%s' '${writePreCommitDefault.replace(/'/g, "'\\''")}' > .husky/commit-msg`);
				const huskyDir = path.join(targetDir, '.husky');
				await fs.ensureDir(huskyDir);
				await fs.writeFile(
					path.join(huskyDir, 'commit-msg'),
					writePreCommitDefault,
					{ mode: 0o755 } // 确保文件有可执行权限
				);
			}

			/**添加 prepare 脚本 */
			const pkgPath = path.join(targetDir, 'package.json');
			const pkg = await fs.readJson(pkgPath);
			pkg.scripts = pkg.scripts || {};

			if (!pkg.scripts.prepare) {
				/**确保 devDependencies 存在 */
				pkg.scripts = pkg.scripts || {};
				pkg.devDependencies = pkg.devDependencies || {};
				pkg.husky = pkg.husky || {};

				/**添加必要依赖版本 */
				Object.assign(pkg.devDependencies, {
					'@commitlint/cli': '^19.8.1',
					'@commitlint/config-conventional': '^19.8.1',
					husky: '^9.1.7',
					'lint-staged': '^16.1.2'
				});

				/**添加 scripts */
				Object.assign(pkg.scripts, {
					prepare: 'husky install',
					commitlint: 'commitlint -e -V'
				});

				/**安全地添加 husky 配置 */
				pkg.husky.hooks = {
					...pkg.husky.hooks,
					'pre-commit': 'lint-staged',
					'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS'
				};

				await fs.writeJson(pkgPath, pkg, { spaces: 2 });
			}

			console.log(chalk.green(`✅ husky 已在 ${targetDir} 配置完成!`));
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red('❌ husky 配置失败:'), error);
		throw error;
	}
}
