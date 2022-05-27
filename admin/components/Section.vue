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
		<v-carousel
		v-else-if="section.layout == 2"
		height="100%"
		hide-delimiters
		cycle
		>
			<v-carousel-item
			nuxt
			link
			:to="banner.linkTo"
			v-for="(banner, i) in section.banners"
			:key="i"
			>
			<v-sheet color="#fff" height="100%">
				<v-img
					height="100%"
					aspect-ratio="1"
					contain
					:src="banner.src"
				>
				</v-img>
			</v-sheet>
			</v-carousel-item>
		</v-carousel>
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