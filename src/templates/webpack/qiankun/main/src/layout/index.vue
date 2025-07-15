<template>
	<div class="layout">
		<button @click="routerJump('/home')">点击跳转主应用-首页</button>
		<button @click="routerJump('/about')">点击跳转主应用-about</button>
		<button @click="routerJump(`/${subAppRule}/home`)">点击跳转子应用应用-home</button>
		<button @click="routerJump(`/${subAppRule}/about`)">点击跳转子应用应用-about</button>
		<div>主应用收到更新：{{ JSON.stringify(stateData) }}</div>
		<div>主应用上一次更新：{{ JSON.stringify(prevData) }}</div>
		<div
			v-show="$route.path.startsWith(`/${subAppRule}`)"
			:id="subApp"
		></div>
		<router-view />
	</div>
</template>

<script lang="ts" setup>
import { subApp, subAppRule } from '@/constant/qiankun';
import { microAppActions } from '@/qiankun/options';

defineOptions({
	name: 'Layout'
});

const router = useRouter();
const stateData = ref();
const prevData = ref();

onMounted(() => {
	// 监听状态变化
	microAppActions.onGlobalStateChange((state, prev) => {
		stateData.value = state;
		prevData.value = prev;
	});
});

const routerJump = (name: string) => {
	router.push(name);
};
</script>

<style lang="less" scoped>
.layout {
	position: relative;
	button {
		margin-right: 8px;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
