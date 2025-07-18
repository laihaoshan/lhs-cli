import { defineStore } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: '',
		userInfo: {}
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
			this.userInfo = {};
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'user',
				storage: localStorage
			}
		]
	} as PersistenceOptions
});
