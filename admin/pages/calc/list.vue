<template>
	<v-card class="bg-gray elevation-0">
		<v-sheet class="d-flex align-center bg-gray" height="100px">
				<v-menu
				offset-y
				:close-on-content-click="false"
				max-width="300px"
				min-width="auto"
			>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
						prepend-icon="mdi-calendar"
						placeholder=" 날짜 선택"
						v-bind="attrs"
						v-on="on"
						v-model="date"
						hide-details
						background-color="#fff"
						class="col-5"
						></v-text-field>
					</template>
					<datepicker v-model="date" :minimumView="'month'" :format="changeDate" :maximumView="'month'" :inline="true" :language="languages[language]"></datepicker>
				</v-menu>
				<v-btn @click="getCalcData">조회</v-btn>
		</v-sheet>
		<v-row class="mb-5">
			<v-card>
				<v-card-title class="subheading font-weight-bold">
					{{show?date +'월 정산대금':''}}
				</v-card-title>

				<v-divider class="m-0"></v-divider>
				<v-list>
					<v-list-item>
						<v-list-item-content>총 매출액 : {{ sales.toComma() }} 원 </v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>총 상품 금액 : {{ productPrice.toComma() }} 원</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>총 할인 금액 : {{ discount.toComma() }} 원</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>배송비 합계 : {{ deliveryPrice.toComma() }} 원</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>수수료 합계 : {{ charge.toComma() }} 원</v-list-item-content>
					</v-list-item>
					<v-divider class="m-0"></v-divider>
					<v-list-item>
						<v-list-item-content>총계 : {{ (sales - charge).toComma() }} 원</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-row>
		<ExpansionSection v-if="salesProductList.length>0" :sections ="salesProductList"/> 
  </v-card>
</template>
<script>
import ExpansionSection from '@/components/Expansion-panels-section'
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
export default {
	layout:'layout',
	data(){
		return{
			show:false,
			sales : 0,
			productPrice: 0,
			discount:0,
			deliveryPrice: 0,
			charge: 0,
			date:null,
			salesProductList:[],
			language: "ko",
			languages: lang,
		}
	},
	components:{
		Datepicker,
		ExpansionSection
	},
	methods:{
		async getCalcData(){
			let date = this.date;
			let year = date.replace(/\-.*$/g,'');
			let month = date.replace(/.*\-/,'');
			let bdt = `${date}-1`;
			let edt = new Date(year,month,0).toFormat('Y-M-D');
			const response = await this.$axios.$get('/api/calc',{
				headers:{
					bdt:bdt,
					edt:edt
				}
			})
			this.show = true;
			console.log(response);
			this.setPrice(response);
		},
		changeDate(date){
			this.date = new Date(date).toFormat('Y-M');
		},
		setPrice(arr){
			let productPrice=0;
			let discount=0;
			let deliveryPrice= 0;
			
			arr.map(row=>{
				productPrice += (row.price*row.counter);
				discount += row.discount;
				deliveryPrice += row.deliveryCost;
				let test = this.makeProductInfo(row);
				this.salesProductList.push(test);
				
			})

			this.sales = productPrice - discount + deliveryPrice;
			this.productPrice = productPrice;
			this.discount = discount;
			this.deliveryPrice =deliveryPrice;
			this.charge = productPrice * 0.05;
			
		},
		makeProductInfo(data){
			let productInfoFormat={
				title:'상품정보',
				children:[{
					layout:'text',
					label:'상품명',
					target:'name',
					value:null		
				},{
					layout:'text',
					label:'판매가',
					target:'price',
					value:null		
				},{
					layout:'text',
					label:'수량',
					target:'counter',
					value:null		
				},{
					layout:'text',
					label:'할인금액',
					target:'discount',
					value:null		
				},{
					layout:'text',
					label:'배송비',
					target:'deliveryCost',
					value:null		
				},{
					layout:'text',
					label:'상태',
					target:'statusText',
					value:null	
				}]
			}
			productInfoFormat.title = `${data.orderCode} ${data.name}`
			productInfoFormat.children.map(c=>{
				let target = c.target;
				if(target){
					let value = data[target];
					console.log(typeof(value));
					c.value = typeof(value)=='number'?value.toComma():value;
					return c
				}
			})
			return productInfoFormat;
		}
	}
}
</script>
<style scoped>
	.bg-gray{
		background-color: #ccc ;
	}
</style>