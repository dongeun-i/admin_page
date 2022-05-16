<template>
	<v-card class="bg-gray col-12 elevation-0">
		<v-card-title>주문상세</v-card-title>
		<ExpansionSection class="mb-5" :sections ="orderInfo"/>
		<ExpansionSection class="mb-5" :sections ="deliveryInfo"/>
		<ExpansionSection class="mb-5" :sections ="payInfo"/>
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
					target:'orderCode',
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
				},{
					layout:'text',
					label:'주문상태',
					target:'status',
					value:null	
				}
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
				children:[{
					layout:'text',
					label:'상품 금액',
					target:'price',
					value:null		
				},{
					layout:'text',
					label:'할인 금액',
					target:'deliveryMemo',
					value:null		
				},{
					layout:'text',
					label:'배송비',
					target:'deliveryCost',
					value:null		

				}]
			}],
			productInfo:[{
				title:'상품정보',
				children:[{
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
					label:'상품이미지',
					target:'thumbnail',
					value:null		
				}]
			}]
		}
	},
	async asyncData({$axios,params}){
		let orderCode = params.orderCode;
		const responseData = await $axios.$get(`/api/order/${orderCode}`);
		return {
			resdata : responseData 
		}
	}
}
</script>
<style scoped>
.bg-gray{
	background-color: #ccc ;
}
</style>