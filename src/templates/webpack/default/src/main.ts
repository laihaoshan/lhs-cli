import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

const store = createPinia();
store.use(piniaPluginPersistedstate); // 注册插件
const app = createApp(App);

// 使用插件
app.use(store);
app.use(router);
app.mount('#app');
