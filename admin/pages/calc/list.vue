<template>
  <v-container fluid>
    <v-data-iterator
		disable-filtering
		disable-pagination
		disable-sort
		hide-default-footer
		:items="items"
    >
		<template v-slot:header>
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
						v-model="month"
						hide-details
						background-color="#fff"
						class="col-5"
						></v-text-field>
					</template>
					<datepicker v-model="month" :minimumView="'month'" :maximumView="'month'" :inline="true" :language="languages[language]"></datepicker>
				</v-menu>
				<v-btn>조회</v-btn>
			</v-sheet>
			
		</template>
		<template v-slot:default="props">
			<v-row>
				<v-col
					v-for="item in props.items"
					:key="item.name"
					cols="12"
				
				>
					<v-card>
					<v-card-title class="subheading font-weight-bold">
						{{month?new Date(month).getMonth()+1 +'월 정산대금':''}}
					</v-card-title>

					<v-divider></v-divider>

					<v-list>
						<v-list-item>
							<v-list-item-content>총 매출액 : {{ item.sales }} 원 </v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>총 상품 금액 : {{ item.sales }} 원</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>총 할인 금액 : {{ item.sales }} 원</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>배송비 합계 : {{ item.sales }} 원</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>수수료 합계 : {{ item.sales }} 원</v-list-item-content>
						</v-list-item>
						
					</v-list>
					</v-card>
				</v-col>
			</v-row>
		</template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
export default {
	layout:'layout',
	data(){
		return{
			items: [{
				sales : 0,
				productPrice: 0,
				deliveryPrice: 0,
				charge: 0,
			}],
			month:null,
			salesProductList:[],
			language: "ko",
			languages: lang,
		}
	},
	components:{
		Datepicker
	},
}
</script>
<style scoped>
	.bg-gray{
		background-color: #ccc ;
	}
</style>