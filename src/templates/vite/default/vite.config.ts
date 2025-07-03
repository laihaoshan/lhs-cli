import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: 'src/auto-imports.d.ts'
		}),
		Components({
			dts: 'src/components.d.ts'
		})
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
	css: {
		preprocessorOptions: {
			less: {
				lessOptions: {
					javascriptEnabled: true // 启用内联 JavaScript
				}
			}
		}
	}
});
