import { subAppRule } from '@/constant/qiankun';

export default [
	{
		path: `/${subAppRule}/about`,
		name: 'subAbout',
		component: () => import('@/views/about/index.vue')
	}
];
