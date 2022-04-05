<template>
	<v-card class="elevation-0">
		<template v-if="filter">
			<v-card class="p-3 filter-container bg-gray">
				<v-card v-for="(filter,i) in filters" :key="i" class="d-flex flex-nowrap elevation-0" >
					<v-card-title class="col-1 filter-title bg-gray">
						{{filter.title}}
					</v-card-title>
					<v-row v-if="filter.type == 'checkbox'" class="bg-gray flex-nowrap align-center justify-start">
						<v-checkbox 
							v-for="checkbox in filter.values" 
							:key="checkbox.value"
							:label="checkbox.text"
							:value="checkbox.value"
							hide-details
						>
							<template v-slot:label>
								<label class="filter-text">{{checkbox.text}}</label>
							</template>
						</v-checkbox>
					</v-row>
					<v-row v-else-if="filter.type == 'date'" class="bg-gray flex-nowrap align-center justify-start"> 
						<v-btn-toggle class="bg-gray" gray>
							<v-btn class="filter-text " v-for="item in filter.btns" :key="item.title" :value="item.value">
								{{item.title}}
							</v-btn>
						</v-btn-toggle>
					</v-row>
				</v-card>
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

		>
			<template v-slot:item.btn="{ item }">
				<v-btn icon>
					<v-icon small>
						{{item.btnIcon}}
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
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
	.filter-title,.filter-text{
		font-size: 14px;
	}
	.bg-gray{
		background-color: #eee;
	}
</style>