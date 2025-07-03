<template>
	<div class="home">
		<h3>我是首页</h3>
		<HelloWorld msg="Vite + Vue" />
	</div>
</template>

<script setup lang="ts">
import { getByPrefixUrl } from '@/axios/test';

onMounted(() => {
	getByPrefixUrl({ url: 'test' }).then(res => {
		console.log(res, 'getByPrefixUrl');
	});
});
</script>

<style lang="less" scoped>
.home {
}
</style>
