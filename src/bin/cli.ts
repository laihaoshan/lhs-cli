#!/usr/bin/env node
import { createProject } from '../lib/create';
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// 读取package.json（注意JSON导入方式）
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
program
	.version(pkg.version)
	.command('init <project-name>') // 定义明确的 init 命令
	.description('初始化新项目')
	// .option('--ts', '使用 TypeScript')
	// .option('--pinia', '启用 Pinia')
	.action(projectName => {
		createProject(projectName);
	});
// 处理未知命令
program.on('command:*', () => {
	console.error('错误: 未知命令');
	program.outputHelp();
	process.exit(1);
});
process.on('uncaughtException', err => {
	if (err?.message.includes('User force closed the prompt with SIGINT')) {
		console.log(chalk.yellow('⚠ 操作已取消'));
		process.exitCode = 1; // 设置退出码
		process.exit(); // 优雅退出
	}
});
program.parse(process.argv);
