import { createRouter, createWebHistory } from 'vue-router';
import Home from './modules/home';
import About from './modules/about';

const routes = [...Home, ...About];

const router = createRouter({
	history: createWebHistory(import.meta?.env?.BASE_URL || '/'),
	routes,
});

export default router;
