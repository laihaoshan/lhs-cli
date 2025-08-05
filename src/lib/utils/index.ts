import path from 'path';
import fs from 'fs-extra';

interface IPackageJson {
	pkgPath: string;
	pkg: any;
}

/**
 * 读取package.json
 * @param targetDir
 * @returns
 */
export const readPackageJson = async (targetDir: string) => {
	const pkgPath = path.join(targetDir, 'package.json');
	const pkg = await fs.readJson(pkgPath);
	return {
		pkgPath,
		pkg,
	};
};

export const getPackageJson = async (targetDir: string, packageJson?: IPackageJson) => {
	if (!packageJson) {
		return await readPackageJson(targetDir);
	}
	return packageJson;
};

/**设置DevDependencies */
export const setDevDependencies = async (
	targetDir: string,
	devDependencies: Record<string, string>,
	packageJson?: IPackageJson,
) => {
	const { pkgPath, pkg } = await getPackageJson(targetDir, packageJson);

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
export const setScripts = async (
	targetDir: string,
	scripts: Record<string, string>,
	packageJson?: IPackageJson,
) => {
	const { pkgPath, pkg } = await getPackageJson(targetDir, packageJson);

	pkg.scripts = pkg.scripts || {};

	/**添加 scripts */
	Object.assign(pkg.scripts, scripts);

	await fs.writeJson(pkgPath, pkg, { spaces: 2 });
};
