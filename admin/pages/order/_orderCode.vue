<template>
	<v-card class="bg-gray col-12 elevation-0">
		<v-card-title>주문상세</v-card-title>
		<ExpansionSection class="mb-5" :sections ="orderInfo">
			<template>
				<v-sheet class="d-flex align-center">
					<label class="col-2" for="">주문상태</label>
					<v-select
						:items="this.resdata.orderStatus"
						item-text="label"
						item-value= "id"
						v-model="status"
						hide-details
						class="col-3"
						>
					</v-select>
					<v-btn @click="changeStatus">변경하기</v-btn>
				</v-sheet>
			</template>
		</ExpansionSection>
		<ExpansionSection class="mb-5" :sections ="deliveryInfo"/>
		<ExpansionSection class="mb-5" :sections ="payInfo">
			<template>
				<v-sheet class="d-flex align-center">
						<label class="col-2">총 상품 금액 (+)</label>
						<p class="col-3 mb-0">{{price.toComma()}}</p>
				</v-sheet>
				<v-sheet class="d-flex align-center">
						<label class="col-2">총 할인 금액 (-)</label>
						<p class="col-3 mb-0">{{discount.toComma()}}</p>
				</v-sheet>
				<v-sheet class="d-flex align-center">
						<label class="col-2">배송비 (+)</label>
						<p class="col-3 mb-0">{{deliveryCost.toComma()}}</p>
				</v-sheet>
				<v-sheet class="d-flex align-center">
						<label class="col-2">총 결제 금액</label>
						<p class="col-3 mb-0">{{priceTotal.toComma()}}</p>
				</v-sheet>
			</template>
		</ExpansionSection>
		<ExpansionSection class="mb-5" :sections ="productInfo"/>
	</v-card>
</template>
<script>
import ExpansionSection from '@/components/Expansion-panels-section'
import Payload from '@/mixins/Payload.js'
export default {
	layout:'layout',
	mixins:[Payload],
	components:{ExpansionSection},
	data(){
		return{
			orderInfo:[{
				title:'주문 정보',
				children:[{
					layout:'text',
					label:'주문번호',
					target:'orderCode',
					value:null
				},{
					layout:'text',
					label:'주문 일자',
					target:'orderdate',
					value:null					
				},{
					layout:'text',
					label:'주문자 성함',
					target:'ordererName',
					value:null					
				},{
					layout:'text',
					label:'주문자 연락처',
					target:'ordererTel',
					value:null					
				},
			]}],
			deliveryInfo:[{
				title:'배송지정보',
				children:[{
					layout:'text',
					label:'상품 수령인',
					target:'recipientName',
					value:null					
				},{
					layout:'text',
					label:'수령인 연락처',
					target:'recipientTel',
					value:null					
				},{
					layout:'text',
					label:'주소',
					target:'recipientJuso',
					value:null		
				},{
					layout:'text',
					label:'상세주소',
					target:'recipientDetailJuso',
					value:null		
				},{
					layout:'text',
					label:'배송 메시지',
					target:'deliveryMemo',
					value:null		
				}]
			}],
			payInfo:[{
				title:'결제정보',
			}],
			productInfo:[],
			price:0,
			deliveryCost:0,
			discount:0,
			priceTotal:0,
			status:null
		}
	},
	async asyncData({$axios,params}){
		let orderCode = params.orderCode;
		const orderInfo = await $axios.$get(`/api/order/${orderCode}`);
		const status = await $axios.$get('/api/order/status')
		return {
			resdata : {
				orderInfo:orderInfo,
				orderStatus : status
			}

		}
	},
	methods:{
		changeStatus(){
			let orderCode = this.resdata.orderInfo[0].orderCode;
			this.$axios.$put(`/api/order/${orderCode}`,{
				orderInfo:{
					status:this.status
				}
			}).then(result=>{
				if(!result){
					alert('배송상태 변경에 실패하였습니다.');
				}else{
					alert('배송상태 변경이 완료되었습니다.');
				}

			})
		},
		insertModel(child){
			let orderInfo = this.resdata.orderInfo[0];
			child.map(c=>{
			let target = c.target;
			if(target){
				let value = orderInfo[target];
				c.value = value;
				return c
			}
			})		
		},
		/**
		 * @author dongeun
		 * @param data{Object} - resdata[i];
		 * @description 상품정보만 담기위한 함수.
		 * */ 
		makeProductInfo(data){
			let productInfoFormat={
				title:'상품정보',
				children:[{
					layout:'img',
					label:'상품이미지',
					target:'thumbnail',
					value:null		
				},{
					layout:'text',
					label:'상품명',
					target:'productName',
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
				}]
			}
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
	},
	created(){
		this.resdata.orderInfo.map(row=>{
			if(row.discount){
				this.priceTotal -= row.discount;
				this.discount += row.discount;
			}
			if(row.price){
				this.priceTotal += row.price*row.counter;
				this.price += row.price*row.counter;
			}
			if(row.deliveyCost){
				this.priceTotal += row.deliveyCost;
				this.deliveryCost += row.deliveyCost;
			}
			this.status = row.status;
			row.orderdate = new Date(row.orderdate).toFormat('Y-M-D H:M');
			this.productInfo.push(this.makeProductInfo(row));
		})
		this.insertModel(this.orderInfo[0].children);
		this.insertModel(this.deliveryInfo[0].children);
	},
}
</script>
<style scoped>
.bg-gray{
	background-color: #ccc ;
}
</style>