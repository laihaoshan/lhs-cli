import { subAppRule } from '@/constant/qiankun';

export default [
	{
		path: `/${subAppRule}/home`,
		name: 'subHome',
		component: () => import('@/views/home/index.vue')
	}
];
