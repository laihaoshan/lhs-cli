import path from 'path';
import fs from 'fs-extra';

/**
 * 读取package.json
 * @param targetDir
 * @returns
 */
const getPackageJson = async (targetDir: string) => {
	const pkgPath = path.join(targetDir, 'package.json');
	const pkg = await fs.readJson(pkgPath);
	return {
		pkgPath,
		pkg
	};
};

/**设置DevDependencies */
export const setDevDependencies = async (targetDir: string, devDependencies: Record<string, string>) => {
	const { pkgPath, pkg } = await getPackageJson(targetDir);

	pkg.devDependencies = pkg.devDependencies || {};

	/**添加必要依赖版本 */
	Object.assign(pkg.devDependencies, devDependencies);

	await fs.writeJson(pkgPath, pkg, { spaces: 2 });
};

/**
 * 设置Scripts
 * @param targetDir
 * @param devDependencies
 */
export const setScripts = async (targetDir: string, scripts: Record<string, string>) => {
	const { pkgPath, pkg } = await getPackageJson(targetDir);

	pkg.scripts = pkg.scripts || {};

	/**添加 scripts */
	Object.assign(pkg.scripts, scripts);

	await fs.writeJson(pkgPath, pkg, { spaces: 2 });
};
