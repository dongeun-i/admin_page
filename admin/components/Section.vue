<template>
	<v-card class="bg-gray col-12 col-md-4" elevation="0" :width="section.width+'%'" height="350px">
		<v-card v-if="section.layout == 1" height="100%">
			<v-card-title>
				{{section.title}}
			</v-card-title>
			<v-list>
				<v-list-item v-for="(count,i) in section.counts" :key="i" class="d-flex justify-space-between">
					<v-list-item-title class="col-10">
						{{count.title}}
					</v-list-item-title>
					<p class="m-0 ">
						{{count.count}} 개
					</p>
				</v-list-item>
			</v-list>
		</v-card>
		<v-card v-else height="100%">
			<v-card-title>
				{{section.title}}
			</v-card-title>
			<p class="m-0">
				{{section.text}}
			</p>
		</v-card>
	</v-card>
</template>
<script>
export default {
	props:{
		section:Object,
		width:Number,
		height:Number,
	}
}
</script>
<style scoped>
	.bg-gray{
		background-color: #ccc ;
	}
</style>