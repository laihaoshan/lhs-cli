<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button
			type="button"
			@click="addCount"
		>
			count is {{ count }}
		</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code>
			to test HMR
		</p>
	</div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store';

defineProps<{ msg: string }>();

const count = ref(0);
const store = useGlobalStore();

onMounted(() => {
	store.actions;
});

const addCount = () => {
	count.value++;
	store.actions.setGlobalState({
		count: count.value
	});
};
</script>

<style lang="less" scoped>
@import '@/styles/index';
.read-the-docs {
	color: #888;
}
</style>
