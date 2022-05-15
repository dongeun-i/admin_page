<template>
	<v-card class="col-12 elevation-0">
		<v-card-title>주문상세</v-card-title>
	</v-card>
</template>
<script>
import ExpansionSection from '@/components/Expansion-panels-section'
import Payload from '@/mixins/Payload.js'
export default {
	layout:'layout',
	mixins:[Payload],
	component:{ExpansionSection},
	data(){
		return{
			orderData:[{
				title:'주문 정보',
				children:[{
					layout:'text',
					label:'주문자 성함',
					target:'orderCode',
					value:null					
				},{
					layout:'text',
					label:'주문자 연락처',
					target:'orderCode',
					value:null					
				},{
					layout:'text',
					label:'주문자 이메일',
					target:'orderCode',
					value:null					
				},{
					layout:'text',
					label:'주문자 번호',
					target:'orderCode',
					value:null					
				},{
					layout:'text',
					label:'결제금액',
					target:'orderCode',
					value:null					
				},{
					layout:'text',
					label:'주문자 번호',
					target:'orderCode',
					value:null					
				}]
			}],
			deliveryData:[{

			}]
		}
	},
}
</script>