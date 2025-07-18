<template>
	<div class="about">
		<h3>{{ title }}</h3>
		<div
			v-for="item in cloumns"
			:key="item.key"
			class="cloumns-item"
		>
			<span>{{ item.label }}</span>
			<span>{{ userInfo[item.key] }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';

defineOptions({
	name: 'about'
});

const store = useUserStore();
const title = ref('标题');
const userInfo = ref<Record<string, unknown>>({
	name: null,
	age: null
});
const cloumns = ref([
	{ label: '姓名：', key: 'name' },
	{ label: '年龄：', key: 'age' }
]);

onMounted(() => {
	userInfo.value = store.getUserInfo;
});
</script>

<style scoped>
.about {
	position: relative;
	background: #ffffff;
	.cloumns-item {
		margin-bottom: 8px;
	}
}
</style>
