<template>
	<div class="d-flex flex-wrap col-12">
		<Section v-for="i in 4" :key="i"/>
	</div>
</template>
<script>
import Section from '@/components/section.vue'
export default({
	layout:'layout',
	comments:{
		Section
	}
})
</script>
