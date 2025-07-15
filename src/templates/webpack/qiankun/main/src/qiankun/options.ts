import { initGlobalState } from 'qiankun';

let globalState = {
	count: 0,
	mainInput: ''
};

export const actions = initGlobalState(globalState);

// 暴露给子应用
export const microAppActions = actions;
