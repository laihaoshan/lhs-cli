<template>
	<div class="about">{{ title }}</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'about'
});

const title = ref('关于');
</script>

<style scoped>
.about {
	position: relative;
	background: #ffffff;
}
</style>
