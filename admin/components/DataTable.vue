<template>
	<v-card class="elevation-0">
		<v-btn @click="filter()">필터테스트</v-btn>
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
			let data = this.tableData;
			let filterData
			filterData = data.filter( data=>{
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