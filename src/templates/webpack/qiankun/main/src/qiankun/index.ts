import { registerMicroApps, start } from 'qiankun';
import { subApp, subAppRule } from '@/constant/qiankun';
import { microAppActions } from './options';

export default function () {
	const isDev = process.env.NODE_ENV === 'development';
	const defaultIp = `${window.location.protocol}//${window.location.hostname}`;

	const activeRule = `/${subAppRule}`;

	// 注册子应用
	registerMicroApps([
		{
			name: 'subApp', // 子应用名称
			entry: isDev ? `${defaultIp}:8081/` : `/${subAppRule}/index.html`, // 子应用入口
			container: `#${subApp}`, // 子应用挂载节点
			activeRule, // 子应用路由前缀
			props: {
				actions: microAppActions
			}
		}
	]);

	// 启动qiankun
	start({
		sandbox: {
			experimentalStyleIsolation: true // 开启样式隔离
		}
	});
}
