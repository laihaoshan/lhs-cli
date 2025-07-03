<template>
	<div class="home">
		<h3>我是首页</h3>
		<HelloWorld msg="Vue" />
	</div>
</template>

<script setup lang="ts">
	import { getByPrefixUrl } from '@/axios/test';

	onMounted(() => {
		getByPrefixUrl({ url: 'xxx' }).then(res => {
			console.log(res, 'getByPrefixUrl');
		});
	});
</script>

<style lang="less" scoped>
	.home {
		position: relative;
		h3 {
			color: #000;
		}
	}
</style>
