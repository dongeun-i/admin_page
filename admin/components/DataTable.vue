<template>
	<v-card class="elevation-0">
		<template v-if="filter">
			<v-card class="p-3 filter-container bg-gray">
				<v-card v-for="(filter,i) in filters" :key="i" class="d-flex flex-nowrap elevation-0" >
					<v-card-title class="col-1 filter-title bg-gray">
						{{filter.title}}
					</v-card-title>
					<!-- checkbox -->
					<v-row v-if="filter.type == 'checkbox'" class="bg-gray flex-nowrap align-center justify-start">
						<v-checkbox 
							v-for="checkbox in filter.values" 
							:key="checkbox.value"
							:label="checkbox.text"
							:value="checkbox.value"
							checked
							hide-detailsd
						>
							<template v-slot:label>
								<label class="filter-text">{{checkbox.text}}</label>
							</template>
						</v-checkbox>
					</v-row>

					<!-- date picker -->
					<v-row v-else-if="filter.type == 'date'" class="bg-gray flex-nowrap align-center justify-start">
						<v-col>
							<v-btn-toggle class="bg-gray" 
								background-color=#eee 
								@change="test"
								v-model="filter.active"
							>
								<v-btn class="filter-text" v-for="item in filter.btns" :key="item.title">
									{{item.title}}
								</v-btn>
							</v-btn-toggle>
						</v-col>
						<v-col class="d-flex align-center">
							<v-menu
								offset-y
								:close-on-content-click="false"
								v-model="isBeginDatePikcer"
								max-width="300px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
									prepend-icon="mdi-calendar"
									placeholder="시작일"
									v-bind="attrs"
									v-model="beginDate"
									v-on="on"
									class="col-5"
									hide-details
									></v-text-field>
								</template>
								<datepicker v-model="beginDate" :format="chageBeginDate" :inline="true" :language="languages[language]"></datepicker>
							</v-menu>
							~
							<v-menu
								offset-y
								:close-on-content-click="false"
								v-model="isEndDatePikcer"
								max-width="300px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
									prepend-icon="mdi-calendar"
									placeholder="종료일"
									v-bind="attrs"
									v-model="endDate"
									v-on="on"
									hide-details
									class="col-5"
									></v-text-field>
								</template>
								<datepicker v-model="endDate" :format="chageEndDate" :inline="true" :language="languages[language]"></datepicker>
							</v-menu>
						</v-col>
						
						
					</v-row>
				</v-card>
			</v-card>
			
		</template>


		<!-- 검색창 -->
		<v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="검색"
				single-line
				hide-details
				class="col-6 ml-auto"
			></v-text-field>
		</v-card-title>

		<!-- data table 영역 -->
		<v-data-table
		:headers="tableHeader"
		:items="items"
		:search="search"

		>
			<template v-slot:[`item.btn`]="{ item }">
				<v-btn icon >
					<v-icon small>
						{{item.btnIcon}}
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
  	</v-card>
</template>
<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";

export default {
	props:{
		tableHeader:Array,
		tableData:Array,
		filters:Array
	},
	components:{
		Datepicker
	},
	data(){
		return{
			search:'',
			language: "ko",
			languages: lang,
			items:[],
			beginDate:null,
			endDate:null,
			isBeginDatePikcer:false,
			isEndDatePikcer:false,
			// format:"yyyy-MM-dd",
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
		},
		test(v){
			console.log('바뀜',v)
		},
		format(date){
			// console.log(date.toFormat('Y-M-D'),);
			if(!date) return
			return date.toFormat('Y-M-D')
		},
		chageBeginDate(date){
			let dateFormat = this.format(date);
			this.beginDate = dateFormat;
		},
		chageEndDate(date){
			let dateFormat = this.format(date);
			this.endDate = dateFormat;
		}
	},
	mounted(){
		this.items = this.tableData;
	},
	// computed: {
    //   dateRangeText () {
    //     return this.dates.join(' ~ ')
    //   },
    // },
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
		background-color: #eee ;
	}
	.is-active{
		background-color: #000; color: #fff;
	}
</style>