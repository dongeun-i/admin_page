<template>
	<v-card class="elevation-0">
		<template v-if="filter">
			<v-card class="p-3 filter-container bg-gray">
				<v-card v-for="(filter,i) in filters" :key="i" class="d-flex flex-sm-nowrap elevation-0 w-100" height="auto" >
					<v-card-title class="d-none d-sm-flex col-sm-2 col-md-1 filter-title bg-gray">
						{{filter.title}}
					</v-card-title>
					<!-- checkbox -->
					<v-sheet v-if="filter.type == 'checkbox'" class="col-md-11 col-12 bg-gray d-flex flex-nowrap align-center justify-start">
						<v-checkbox 
							v-for="checkbox in filter.values"
							:key="checkbox.value"
							:label="checkbox.text"
							:value="checkbox.value"
							v-model="filter.checked"
							@change="checkingStatus(filter.checked,filter.target)"
							hide-details
							class="mr-2"
						>
							<template v-slot:label>
								<label class="filter-text">{{checkbox.text}}</label>
							</template>
						</v-checkbox>
					</v-sheet>
					<!-- date picker -->
					<v-sheet v-else-if="filter.type == 'date'" class="col-md-11 col-12 bg-gray d-flex flex-sm-nowrap align-center justify-start">
						<!-- date btns -->
							<v-btn-toggle 
								class="bg-gray d-none d-md-flex mr-6" 
								background-color=#eee 
								v-model="dateBtns"
								@change="changeDateBtns(filter.target)"
							>
								<v-btn class="filter-text" v-for="item in filter.btns" :key="item.title"
								max-height="36px" max-width="16%">
									{{item.title}}
								</v-btn>
							</v-btn-toggle>

						<!-- date picker -->
						<v-sheet class="d-flex align-center bg-gray col-12 col-sm-6 p-0">
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
									class="w-50 pt-0 mt-0"
									hide-details
									@change="checkDate(filter.target,'bdt')"
									background-color="#fff"
									></v-text-field>
								</template>
								<datepicker v-model="beginDate" :format="changeBeginDate" :inline="true" :language="languages[language]"></datepicker>
							</v-menu>
							<p class="mb-0 mx-2">~</p>
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
									background-color="#fff"
									class="w-50 pt-0 mt-0"
									@change="checkDate(filter.target,'edt')"
									></v-text-field>
								</template>
								<datepicker v-model="endDate" :format="changeEndDate" :inline="true" :language="languages[language]"></datepicker>
							</v-menu>
						</v-sheet>
					</v-sheet>
					<v-sheet v-else-if="filter.type == 'select'" class="col-12 col-md-11 bg-gray d-flex align-center">
						<v-select
						:items="filter.values"
						item-text="label"
						item-value= "label"
						placeholder="카테고리 선택"
						v-model="filter.choose"
						hide-details
						class="col-md-3 col-12"
						@change="changeSelect(filter.target,filter.choose,filter.values)"
						>
						</v-select>
					</v-sheet>
				</v-card>
			</v-card>
		</template>


		<!-- 검색창 -->
		<v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="상풍명 검색"
				single-line
				hide-details
				class="col-md-6 col-12 ml-auto"
			></v-text-field>
		</v-card-title>

		<!-- data table 영역 -->
		<v-data-table
		:headers="tableHeader"
		disable-sort
		:items="items"
		:search="search"
		>
			<template v-slot:[`item.btn`]="{ item }">
				<v-btn nuxt link :to="item.btn.linkTo" outlined>
					{{item.btn.btnText}}
				</v-btn>
			</template>
			<template v-slot:[`item.thumbnail`]="{ item }">
				<v-img
					class="m-2"
					max-width="100px"
					max-height="100px"
					:contain="true"
					:src="item.thumbnail?item.thumbnail:'https://via.placeholder.com/100x100?text=SAMPLE%20IMG'"
				>
				</v-img>
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
			dateBtns:null,
			dateBtnsItem:null,
			beginDate:null,
			endDate:null,
			isBeginDatePikcer:false,
			isEndDatePikcer:false,
			filterBase:{},
			selctTarget:null,
			activeBtn:'all',
			// format:"yyyy-MM-dd",
		}
	},
	methods:{
		changeSelect(target,value,item){
			if(value == '전체'||value == null){
				let filterArr = [];
				item.map(i=>{
					if(i.id){
						filterArr.push(i.label);
					}
				})
				this.filterBase[target] = filterArr;
			}else{
				this.filterBase[target] = value;
			}
			this.filter();
		},
		checkDate(target,type){
			this.dateBtns = null;
			// 필터링 준비
			let bdt = this.beginDate?new Date(this.beginDate).getTime():null;
			let edt = this.endDate?new Date(this.endDate).getTime():null;
			if(type == 'bdt' && this.endDate){
				if(bdt > edt){
					alert('잘못된 날짜입니다.');
					return this.beginDate = null;
				}  
			}else if(type == 'edt' && this.beginDate){
				if(edt < bdt){
					alert('잘못된 날짜입니다.');
					return this.endDate = null;
				}
			}
			console.log('checkDate',target);
			let filterItem = this.filterBase[target]={};
			filterItem['bdt'] = bdt;
			filterItem['edt'] = edt;
			console.log('bdt',bdt);
			console.log('edt',edt);
			this.filter();
		},
		filter(){
			let filterBase = this.filterBase;
			console.log(filterBase);
			let filterData = [];
			Object.keys(filterBase).map(target=>{
				if(filterData.length==0){
					filterData = this.tableData.filter(item=>{
						if(target.includes('date')){
							if(filterBase[target] == null) return item
							let bdt = filterBase[target].bdt;
							let edt = filterBase[target].edt;

							if(bdt && edt){
								console.log('1-1')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return bdt <= new Date(item[target]).setHours(0,0,0,0) && new Date(item[target]).setHours(0,0,0,0) <= edt
							}else if(bdt){
								console.log('1-2')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return bdt <= new Date(item[target]).setHours(0,0,0,0)
							}else if(edt){
								console.log('1-3')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return new Date(item[target]).setHours(0,0,0,0) <= edt
							}
						}else{
							console.log(filterBase[target] , item[target])
							return filterBase[target].includes(item[target]);
						}
					})
				}else{
					filterData = filterData.filter(item=>{
						if(target.includes('date')){
							if(filterBase[target] == null) return item
							let bdt = filterBase[target].bdt;
							let edt = filterBase[target].edt;
							if(bdt && edt){
								console.log('2-1')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return bdt <= new Date(item[target]).setHours(0,0,0,0) && new Date(item[target]).setHours(0,0,0,0) <= edt
							}else if(bdt){
								console.log('2-2')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return bdt <= new Date(item[target]).setHours(0,0,0,0)
							}else if(edt){
								console.log('2-3')
								console.log('bdt = ',new Date(bdt).toFormat('Y-M-D'));
								console.log('edt = ',new Date(edt).toFormat('Y-M-D'));
								console.log('items DATE = ',new Date(item[target]).toFormat('Y-M-D'));
								return new Date(item[target]).setHours(0,0,0,0) <= edt
							}
						}else{
							console.log(filterBase[target] , item[target])
							return filterBase[target].includes(item[target]);
						}
					})
				}
				
			})
			console.log('filterData=',filterData)
			this.items = filterData;
		},
		changeDateBtns(target){
			// date picker 초기화 시켜주기 
			this.beginDate = null;
			this.endDate = null;

			let dateBtns = this.activeBtn = this.dateBtns?this.dateBtns:this.activeBtn;
			let dateBtnsItem = this.dateBtnsItem;
			let now = new Date(new Date().setHours(0,0,0,0));
			let value = dateBtnsItem[dateBtns].value;
			let targetDate={bdt:null,edt:null};

			if(value && value !='all'){
				let bdt = now.setDate(now.getDate() - Number(value));
				targetDate.bdt = bdt;

				// 현재시간으로 설정 해주기 
				targetDate.edt = new Date().setHours(0,0,0,0); 
			}else if(value == 'all') targetDate = null;

			this.filterBase[target] = targetDate;
			console.log('filterBase',this.filterBase[target]);
			this.filter();
		},
		format(date){
			// console.log(date.toFormat('Y-M-D'),);
			if(!date) return
			return date.toFormat('Y-M-D')
		},
		changeBeginDate(date){
			let dateFormat = this.format(date);
			this.beginDate = dateFormat;
		},
		changeEndDate(date){
			let dateFormat = this.format(date);
			this.endDate = dateFormat;
		},
		checkingStatus(v,target){
			this.filterBase[target] = v; 
			this.filter();
		}
	},
	mounted(){
		this.items = this.tableData;
		this.filters.map(filter=>{
			if(filter.type == 'date'){
				this.dateBtns = filter.active;
				this.dateBtnsItem = filter.btns;
			}
		})
		console.log(this.pageWidth)
		
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
		font-size: 14px; white-space: nowrap; 	
	}
	.bg-gray{
		background-color: #eee ;
	}
	.is-active{
		background-color: #000; color: #fff;
	}
</style>