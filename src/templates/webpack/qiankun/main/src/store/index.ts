import { defineStore } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore('useUserStore', {
	state: () => ({
		token: '',
		userInfo: {
			name: '张三',
      age: 18
		} as any
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserInfo(userInfo: Record<string, any>) {
			this.userInfo = userInfo;
		},
		clearUser() {
			this.token = '';
			this.userInfo = null;
		}
	},
	getters: {
		getUserInfo: state => state.userInfo
	},
	/**Pinia 本身并不原生支持这个属性 pinia-plugin-persistedstate  */
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'useUserStore',
				storage: localStorage
			}
		]
	} as PersistenceOptions
});
