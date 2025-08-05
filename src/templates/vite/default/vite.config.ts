import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
// ESLINT_PLUGIN_REQUIRE

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
    'ESLINT_PLUGIN',
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: './auto-imports.d.ts',
			eslintrc: {
				enabled: true,
			},
		}),
		Components({
			dts: './components.d.ts',
		}),
  ],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 8080,
		open: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': '*'
		},
		proxy: {
			'/api': {
				target: 'http://your-api-domain.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
				ws: false
			}
		}
	},
	'CSS_PREPROCESSOR_OPTIONS'
});
