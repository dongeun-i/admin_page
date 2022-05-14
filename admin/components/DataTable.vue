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
							v-model="filter.checked"
							@change="checkingStatus(filter.checked,filter.target)"
							hide-details
						>
							<template v-slot:label>
								<label class="filter-text">{{checkbox.text}}</label>
							</template>
						</v-checkbox>
					</v-row>

					<!-- date picker -->
					<v-row v-else-if="filter.type == 'date'" class="bg-gray flex-nowrap align-center justify-start">
						<!-- date btns -->
						<v-col>
							<v-btn-toggle class="bg-gray" 
								background-color=#eee 
								v-model="dateBtns"
								@change="changeDateBtns(filter.target)"
							>
								<v-btn class="filter-text" v-for="item in filter.btns" :key="item.title"
								max-height="36px">
									{{item.title}}
								</v-btn>
							</v-btn-toggle>
						</v-col>

						<!-- date picker -->
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
									@change="checkDate(filter.target,'bdt')"
									background-color="#fff"
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
									background-color="#fff"
									class="col-5"
									@change="checkDate(filter.target,'edt')"
									></v-text-field>
								</template>
								<datepicker v-model="endDate" :format="chageEndDate" :inline="true" :language="languages[language]"></datepicker>
							</v-menu>
						</v-col>
					</v-row>
					<v-row v-else-if="filter.type == 'select'" class="bg-gray d-flex align-center">
						<v-select
						:items="filter.values"
						item-text="label"
						item-value= "label"
						v-model="filter.choose"
						hide-details
						class="col-3"
						@change="changeSelect(filter.target,filter.choose,filter.values)"
						>
						</v-select>
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
		chageBeginDate(date){
			let dateFormat = this.format(date);
			this.beginDate = dateFormat;
		},
		chageEndDate(date){
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