/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare global {
	interface Window {
		__POWERED_BY_QIANKUN__?: boolean;
		__INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
		// 其他 Qiankun 可能注入的全局变量
	}
}
