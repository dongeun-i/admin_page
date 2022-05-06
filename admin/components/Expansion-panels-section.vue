<template>
	<v-expansion-panels>
		<v-expansion-panel v-for="(section,i) in sections" :key="i">
			<v-expansion-panel-header>
				{{section.title}}
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-sheet v-for="(item,j) in section.children" :key="j">
					<template v-if="item.layout == 'text'">
						
					</template>
				</v-sheet>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
<script>
export default {
	props:{
		sections:Array
	},
}
</script>