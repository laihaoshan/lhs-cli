import { defineStore } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: '',
		userInfo: null as any,
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
		},
	},
	/**Pinia 本身并不原生支持这个属性 pinia-plugin-persistedstate  */
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'user',
				storage: localStorage,
			},
		],
	} as PersistenceOptions,
});
