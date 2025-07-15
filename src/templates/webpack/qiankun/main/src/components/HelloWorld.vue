<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<input
			v-model="input"
			@input="inputChange"
		/>
		<p>
			Edit
			<code>components/HelloWorld.vue</code>
			to test HMR
		</p>
	</div>

	<p>
		Check out
		<a
			href="https://vuejs.org/guide/quick-start.html#local"
			target="_blank"
		>
			create-vue
		</a>
		, the official Vue + Vite starter
	</p>
	<p>
		Learn more about IDE Support for Vue in the
		<a
			href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
			target="_blank"
		>
			Vue Docs Scaling up Guide
		</a>
		.
	</p>
	<p class="read-the-docs">Click on the and Vue logos to learn more</p>
</template>

<script setup lang="ts">
import { microAppActions } from '@/qiankun/options';
defineProps<{ msg: string }>();

const input = ref('');

const inputChange = () => {
	microAppActions.setGlobalState({
		mainInput: input.value
	});
};
</script>

<style lang="less" scoped>
@import '@/styles/index';
.read-the-docs {
	color: #888;
}
</style>
