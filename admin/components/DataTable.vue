<template>
	<v-card class="elevation-0">
		<v-btn @click="filter()">필터테스트</v-btn>
		<template v-if="filter">
			<v-card v-for="(filter,i) in filters" :key="i" class="d-flex flex-nowrap">
				<v-card-title>
					{{filter.title}}
				</v-card-title>
				<v-row v-if="filter.type == 'checkbox'" class="flex-nowrap align-center justify-start">
					<v-checkbox 
						v-for="checkbox in filter.values" 
						:key="checkbox.value"
						:label="checkbox.text"
						:value="checkbox.value"
						hide-details
					>
					</v-checkbox>
				</v-row>
			</v-card>
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
		:items="items"
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
			search:'',
			items:[],
		}
	},
	methods:{
		filter(){
			console.log('필터링시작')
			let originData = this.tableData;
			let filterData
			filterData = originData.filter( data=>{
				return data.status == '판매중'
			})
			this.items = filterData
		}
	},
	mounted(){
		this.items = this.tableData;
	}
}
</script>
<style scoped>
	.v-input--selection-controls{
		margin: 0;
	}
	.v-input--checkbox{
		max-width: 120px;
	}
</style>