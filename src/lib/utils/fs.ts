import fs from 'fs-extra';
import path from 'path';

/**
 * 写入文件方法
 * @param targetDir 目标路径
 * @param dirName 文件名称
 * @param write 写入内容
 */
export const fsWriteFile = async (
	dir: string,
	targetDir: string,
	dirName: string,
	write: string,
) => {
	await fs.writeFile(
		path.join(targetDir, dirName),
		write,
		{ mode: 0o755 }, // 确保文件有可执行权限
	);
};

/**
 * 复制文件方法
 * @param targetDir 目标路径
 * @param dirName 文件名称
 * @param afterFileName 复制后文件名称
 */
export const fsCopyFile = async (
	dir: string,
	targetDir: string,
	dirName: string,
	afterFileName: string,
) => {
	await fs.copy(path.join(dir, dirName), path.join(targetDir, afterFileName));
};
