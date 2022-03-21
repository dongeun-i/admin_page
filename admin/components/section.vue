<template>
	<v-card light class="p-2" elevation="0" :width="section.width+'%'" height="350px">
		<v-card v-if="section.layout == 1" height="100%">
			<v-card-title>
				{{section.title}}
			</v-card-title>
			<v-list>
				<v-list-item v-for="(count,i) in section.counts" :key="i">
					<v-list-title>
						{{count.title}}
					</v-list-title>
					<v-list-text>
						{{count.count}}
					</v-list-text>
				</v-list-item>
			</v-list>
		</v-card>
		<v-card v-else height="100%">
			<v-card-title>
				{{section.title}}
			</v-card-title>
			<v-card-text>
				{{section.text}}
			</v-card-text>
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