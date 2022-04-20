<template>
	<div class="d-flex flex-wrap col-12">
		<Section v-for="(section , i ) in sections" :key="i" :section="section"/>
	</div>
</template>
<script>
import Section from '@/components/Section.vue'
export default({
	layout:'layout',
	comments:{
		Section
	},
	data(){
		return{
			sections:[{
				layout:1,
				width:50,
				title:'주문/배송',
				counts:[{
					title:'결제대기',
					count:3,
				},{
					title:'신규주문',
					count:5
				},{
					title:'배송준비',
					count:1
				},{
					title:'배송중',
					count:2
				},{
					title:'배송완료',
					count:3
				}],
			},{
				layout:null,
				width:50,
				title:'text',
				text:'가나다라마바사'
			},{
				layout:null,
				width:50,
				title:'text',
				text:'가나다라마바사'
			}],
			// waitingForPaymentCount:3,// 결제 대기 수 
			// newOrderCount:5, // 신규 주문 수
			// readyToShip: 2, // 배송준비중 수 
			// shippingCount:3, // 배송중 수
			// deliveryComplete : 3, // 배송완료 수
		}
	}
})
</script>
