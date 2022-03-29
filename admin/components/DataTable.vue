<template>
	<v-card class="elevation-0">
		<template v-if="filter">
			<v-sheet v-for="(filter,i) in filters" :key="i">
				<v-checkbox v-if="filter.type == 'checkbox'">
				</v-checkbox>
			</v-sheet>
		</template>
		<v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Search"
				single-line
				hide-details
			></v-text-field>
		</v-card-title>
		<v-data-table
		:headers="tableHeader"
		:items="tableData"
		:search="search"
		></v-data-table>
  	</v-card>
</template>
<script>
export default {
	props:{
		tableHeader:Array,
		tableData:Array,
		filters:Array
	},
	data(){
		return{
			search:''
		}
	},
}
</script>