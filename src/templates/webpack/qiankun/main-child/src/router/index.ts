import { createRouter, createWebHistory } from 'vue-router';
import Home from './modules/home';
import About from './modules/about';

const routes = [...Home, ...About];

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;
