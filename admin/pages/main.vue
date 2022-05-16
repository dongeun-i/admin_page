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
				width:30,
				title:'상품',
				counts:[{
					title:'판매중 상품',
					count:3,
				},{
					title:'품절 상품',
					count:5
				},{
					title:'비공개 상품',
					count:1
				},{
					title:'판매중지 상품',
					count:2
				}],
			},{
				layout:null,
				width:70,
				title:null,
				text:'상품들'
			},{
				layout:1,
				width:30,
				title:'주문',
				counts:[{
					title:'결제대기',
					count:3,
				},{
					title:'배송 준비',
					count:5
				},{
					title:'배송중',
					count:1
				},{
					title:'배송완료',
					count:2
				}],
			},{
				layout:1,
				width:30,
				title:'교환 및 반품',
				counts:[{
					title:'교환 요청',
					count:3,
				},{
					title:'반품 요청',
					count:5
				},{
					title:'교환 진행중 ',
					count:1
				},{
					title:'반품 진행중',
					count:2
				}],
			},{
				layout:null,
				width:40,
				title:'진행중인 이벤트',
				text:'배너들'
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


