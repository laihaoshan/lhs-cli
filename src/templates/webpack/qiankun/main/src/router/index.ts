import { subAppRule } from '@/constant/qiankun';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './modules/home';
import About from './modules/about';
import Child from '@/views/child.vue';

const routes = [
	{
		path: '/',
		name: 'layout',
		component: import('@/layout/index.vue'),
		children: [
			...Home,
			...About,
			{
				path: `/${subAppRule}:catchAll(.*)`,
				component: Child,
				meta: {
					appName: subAppRule
				}
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;
