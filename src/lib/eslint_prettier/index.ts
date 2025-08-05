import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { readPackageJson, setDevDependencies } from '../utils/index';
import { formatPrettier } from '../utils/prettier';
import { fsWriteFile } from '../utils/fs';
import prettierrc from './json/prettierrc.json';
import stringifyObject from 'stringify-object';

const ignore = `/dist/*
/node_modules/*
**/*.md
**/*.yaml
**/*.json`;

const webpackESLintPlugin = {
	webpack: {
		module: `const ESLintPlugin = require('eslint-webpack-plugin');`,
		plugin: `new ESLintPlugin({
    extensions: ['js', 'ts', 'vue'],
    fix: true,
  }),`,
	},
	vite: {
		module: `import eslint from 'vite-plugin-eslint';`,
		plugin: `eslint({ fix: true }),`,
	},
};

/**获取eslintrc的配置 */
const getEslintrcConfig = (template: 'webpack' | 'vite') => {
	/**.eslintrc的基础配置 */
	let eslintrcDefaultConfig: any = {
		root: true,
		env: {
			browser: true,
			es2021: true,
			node: true,
			'vue/setup-compiler-macros': true,
		},
		rules: {
			'import/no-self-import': 'error',
			'no-duplicate-imports': 'error',
			'import/no-duplicates': 'error',
			eqeqeq: ['error', 'always'],
			'no-extra-boolean-cast': 'off',
			'no-var': 'error',
			'no-multi-spaces': 'error',
			'no-console': 'warn',
			'no-debugger': 'warn',
			'vue/no-mutating-props': 'off',
			'vue/valid-define-props': 'off',
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
		},
	};
	if (template === 'vite') {
		eslintrcDefaultConfig['parser'] = 'vue-eslint-parser';
		eslintrcDefaultConfig['parserOptions'] = {
			parser: '@typescript-eslint/parser',
			project: './tsconfig.json',
			extraFileExtensions: ['.vue'],
			ecmaVersion: 'latest',
			sourceType: 'module',
		};
		eslintrcDefaultConfig['extends'] = [
			'eslint:recommended',
			'plugin:vue/vue3-recommended',
			'plugin:@typescript-eslint/recommended',
			'@vue/eslint-config-prettier', // 兼容现有 Prettier 配置
			'plugin:import/recommended',
			'plugin:import/typescript',
			// 全局导入配置
			'./.eslintrc-auto-import.json',
		];
		eslintrcDefaultConfig['settings'] = {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json', // 显式指定 tsconfig 路径
				},
				node: true,
			},
		};
	}
	if (template === 'webpack') {
		eslintrcDefaultConfig['extends'] = [
			'plugin:vue/vue3-recommended',
			'plugin:@typescript-eslint/recommended',
			'@vue/prettier',
			'plugin:vue/vue3-essential',
			'eslint:recommended',
			'@vue/typescript/recommended',
			'plugin:prettier/recommended',
			// 全局导入配置
			'./.eslintrc-auto-import.json',
		];
		eslintrcDefaultConfig['parserOptions'] = {
			ecmaVersion: 2020,
		};
		eslintrcDefaultConfig['plugins'] = [
			'import', // 检查导入问题的插件
		];
	}
	return eslintrcDefaultConfig;
};

export default async function setupEslintPrettier(
	template: 'webpack' | 'vite',
	targetDir: string,
	need?: boolean,
) {
	try {
		console.log(chalk.blue('🚀 开始在目标项目配置eslint&prettier...'));

		// 保存当前工作目录
		const originalDir = process.cwd();

		try {
			// 切换到目标目录
			process.chdir(targetDir);
			const dir: string = {
				webpack: './build/plugins.ts',
				vite: './vite.config.ts',
			}[template];
			if (need) {
				await fsWriteFile(__dirname, targetDir, '.prettierignore', ignore);
				await fsWriteFile(__dirname, targetDir, '.eslintignore', ignore);
				await fsWriteFile(__dirname, targetDir, '.prettierrc', JSON.stringify(prettierrc, null, 2));

				const eslintConfig = getEslintrcConfig(template);

				const rawContent = `module.exports = ${stringifyObject(eslintConfig, {
					indent: '  ',
					singleQuotes: true,
					filter: (obj: any, prop: any) => obj[prop] !== undefined,
				})}`;
				// 2. 用 Prettier 格式化
				const formattedContent = await formatPrettier(rawContent);

				await fsWriteFile(__dirname, targetDir, '.eslintrc.js', formattedContent);

				const { pkgPath, pkg } = await readPackageJson(targetDir);
				fs;

				const dep: Record<string, any> = {
					// Webpack 专用
					webpack: {
						'@vue/cli-plugin-eslint': '^5.0.8',
						'eslint-webpack-plugin': '^4.0.1',
						'@vue/eslint-config-typescript': '^11.0.2',
					},
					// Vite 专用
					vite: {
						'vite-plugin-eslint': '^1.8.1',
						'eslint-import-resolver-typescript': '^4.4.4',
					},
				}[template];

				await setDevDependencies(
					targetDir,
					{
						eslint: '^8.57.0',
						'@typescript-eslint/parser': '^8.37.0',
						'@typescript-eslint/eslint-plugin': '^8.37.0',
						'eslint-plugin-vue': '^9.17.0',
						prettier: '^2.8.8',
						'@vue/eslint-config-prettier': '^7.1.0',
						'eslint-config-prettier': '^8.8.0',
						'eslint-plugin-import': '^2.28.1',
						'eslint-plugin-prettier': '^4.2.1',
						...dep,
					},
					{ pkgPath, pkg },
				);

				const pluginsTemplate = await fs.readFileSync(dir, 'utf-8');
				const modifiedTemplate = pluginsTemplate
					.replace(`// ESLINT_PLUGIN_REQUIRE`, webpackESLintPlugin[template].module)
					.replace(`'ESLINT_PLUGIN',`, webpackESLintPlugin[template].plugin);
				await fs.writeFileSync(dir, modifiedTemplate);

				if (template === 'vite') {
					const eslintrcPath = path.join(targetDir, '.eslintrc.js');

					// 读取内容 → 替换 → 写回文件
					let content = await fs.readFile(eslintrcPath, 'utf-8');
					content = content.replace(/(,[^,]*?)'@vue\/typescript\/recommended'/, '');

					// 处理数组尾部可能残留的逗号
					content = content.replace(/,(\s*\])(?![\s\S]*,\s*\])/, '$1');

					await fs.writeFile(eslintrcPath, content);
				}
			} else {
				const pluginsTemplate = await fs.readFileSync(dir, 'utf-8');
				const modifiedTemplate = pluginsTemplate
					.replace(`// ESLINT_PLUGIN_REQUIRE`, '')
					.replace(/(,[^,]*?)'ESLINT_PLUGIN'/, '');
				await fs.writeFileSync(dir, modifiedTemplate);
			}

			console.log(chalk.green(`✅ eslint&prettier  配置完成!`));
		} finally {
			/**确保恢复原始工作目录 */
			process.chdir(originalDir);
		}
	} catch (error) {
		console.error(chalk.red('❌ eslint&prettier 配置失败:'), error);
		throw error;
	}
}
