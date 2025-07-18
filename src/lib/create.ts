import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import setupHusky from './husky';
import setupNpmrc from './npmrc';
import setupAxios from './axios';
import setupStyles from './styles';
import setupGitignore from './gitignore';
import { select, confirm } from '@inquirer/prompts';

export async function createProject(projectName: string | undefined): Promise<void> {
	try {
		const template: 'webpack' | 'vite' = await select({
			message: '请选择构建工具',
			choices: [
				{ value: 'webpack', name: 'webpack' },
				{ value: 'vite', name: 'vite' }
			],
			default: 'vite'
		});

		/**展示只有默认 */
		let templateLocName = 'default';
		if (template === 'webpack') {
			templateLocName = await select({
				message: '请选择模板',
				choices: [
					{ value: 'default', name: '默认配置' },
					{ value: 'qiankun', name: '微前端(qiankun)' }
				],
				default: 'default'
			});
		}

		const templateDir = path.resolve(__dirname, `../templates/${template}/${templateLocName}`);
		const targetDir = path.resolve(process.cwd(), projectName || '.');

		/**验证模板是否存在 */
		if (!(await fs.pathExists(templateDir))) {
			console.error(chalk.red(`✖ 模板目录不存在: ${templateDir}`));
			console.error(chalk.yellow(`请创建以下目录结构:`));
			console.log(`
templates/
├── webpack/
│   ├──default
│   └──qiankun
│
└── vite/
    └──default
    `);
			process.exit(1);
		}

		/**检查目录是否存在 */
		if (fs.existsSync(targetDir)) {
			const overwrite = await confirm({
				message: '目录已存在，是否覆盖？',
				default: false
			});
			if (!overwrite) process.exit(1);
			await fs.emptyDir(targetDir);
		}

		/**复制模板文件 */
		await fs.copy(templateDir, targetDir);

		/**是否是qiankun */
		const isQiankun = templateLocName === 'qiankun';
		let result;
		if (isQiankun) {
			const mainApp = `${targetDir}\\main`;
			const subApp = `${targetDir}\\main-child`;
			result = await setOption(template, targetDir, projectName, [mainApp, subApp]);
		} else {
			result = await setOption(template, targetDir, projectName);
		}

		if (result) {
			console.log(chalk.green('✔ 项目创建成功！'));
			console.log(chalk.blue(`◇ 进入项目目录：cd ./${projectName}`));
			if (!isQiankun) {
				console.log(chalk.blue(`△ 安装依赖：npm i / yarn / pnpm i`));
				console.log(chalk.blue(`☆ 本地启动项目：npm run dev / yarn run dev / pnpm run dev`));
			}
		}
	} catch (err: any) {
		console.error(chalk.red('✖ 项目创建失败:'));
		if (err?.message.includes('User force closed the prompt with SIGINT')) {
			console.log(chalk.yellow('⚠ 操作已取消'));
		}
		process.exit(1);
	}
}

/**配置项 */
export async function setOption(
	template: 'webpack' | 'vite',
	targetDir: string,
	projectName: string | undefined,
	microApp?: string[]
) {
	/**动态修改文件内容 */
	if (!microApp && projectName) {
		// 读取并解析JSON
		const pkgPath = path.join(targetDir, 'package.json');
		const pkg = await fs.readJson(pkgPath);

		// 修改name字段
		pkg.name = projectName
			.toLowerCase() // 强制小写
			.replace(/\s+/g, '-') // 空格转连字符
			.replace(/[^a-z0-9-]/g, ''); // 移除非字母数字字符

		// 写回文件
		await fs.writeJson(pkgPath, pkg, { spaces: 2 });
	}

	/**询问是否添加loader */
	const needStylesLoader: 'less' | 'sass' | 'css' = await select({
		message: '请选择样式预处理器',
		choices: [
			{ name: 'Sass', value: 'sass' },
			{ name: 'Less', value: 'less' },
			{ name: 'CSS', value: 'css' }
		],
		default: 'css'
	});

	/**询问是否添加axios作为HTTP客户端 */
	const needAxios = await confirm({
		message: '是否以 axios 作为HTTP客户端?',
		default: true
	});
	let axiosTemplate = 'default';
	if (needAxios) {
		axiosTemplate = await select({
			message: '请选择axios配置模板',
			choices: [
				{ value: 'default', name: '基础配置' },
				{ value: 'blobHandle', name: '带Blob类型响应处理' }
			],
			default: 'default'
		});
	}
	/**询问是否添加国内淘宝镜像 */
	const needNpmrc = await confirm({
		message: '是否需要配置国内淘宝镜像?',
		default: true
	});

	/**询问是否添加husky */
	const needHusky = await confirm({
		message: '是否需要添加 husky (Git hooks 工具)?',
		default: true
	});
	/**是否提交校验信息 */
	let needCommitMsg = false;
	if (needHusky) {
		needCommitMsg = await confirm({
			message: 'commit-msg 是否需要配置提交校验规则?',
			default: true
		});
	}

	return new Promise(resolve => {
		const dirArr = microApp ?? [targetDir];
		dirArr.forEach(async (item, index) => {
			if (needStylesLoader) {
				await setupStyles(template, item, needStylesLoader);
			}

			if (needAxios) {
				await setupAxios(item, axiosTemplate);
			}

			if (needNpmrc) {
				await setupNpmrc(item);
			}

			if (needHusky) {
				await setupHusky(item, needCommitMsg);
			}
			await setupGitignore(item);
			if (index === dirArr.length - 1) {
				resolve(true);
			}
		});
	});
}
