import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useGlobalStore } from '@/store';
import { MicroAppStateActions } from 'qiankun';
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import './public-path.js';

let instance: any = null;

async function render(props: { actions?: MicroAppStateActions }) {
	const store = createPinia();
	store.use(piniaPluginPersistedstate); // 注册插件

	const CAPP = createApp(App);
	const instance = CAPP;

	// 使用插件
	instance.use(store);
	instance.use(router);
	if (props.actions) {
		const stateActions = useGlobalStore();
		stateActions.actions = props.actions;
	}
	instance.mount('#subapp-container');
}

// 独立运行时
if (!(window as any)?.__POWERED_BY_QIANKUN__) {
	render({});
}

// qiankun 生命周期钩子
export async function bootstrap() {
	console.log('[vue] sub app bootstraped');
}

export async function mount(props: any) {
	console.log('[vue] props from main framework', props);
	render(props);
}

export async function unmount() {
	if (instance) {
		instance.unmount();
		instance = null;
	}
}
