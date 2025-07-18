<template>
	<div class="home">
		<h3>我是首页</h3>
		<HelloWorld :msg="msg" />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'home'
});

const msg = ref('Vite + Vue');
</script>

<style scoped>
.home {
	position: relative;
	background-color: #ffffff;
}
</style>
