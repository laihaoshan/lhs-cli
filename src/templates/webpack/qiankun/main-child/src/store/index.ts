import { defineStore } from 'pinia';
import { MicroAppStateActions } from 'qiankun';

export const useGlobalStore = defineStore('user', {
	state: () => ({
		actions: {} as MicroAppStateActions
	})
});
