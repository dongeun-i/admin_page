<template>
	<v-card class="elevation-0">
		<DataTable :tableHeader="headers" :tableData="data" :filters="filters"/>
	</v-card>
</template>
<script>
import DataTable from '@/components/DataTable.vue'
export default {
	data(){
		return{
			headers: [
				{
					text: 'ID',
					align: 'start',
					filterable: false,
					value: 'id',
				},
				{ text: '상품명', value: 'name' },
				{ text: '판매가', value: 'price' },
				{ text: '할인가', value: 'discountPrice' },
				{ text: '상태', value: 'status' },
				{ text: '수정', value: 'btn'}
       	 	],
			data:[
				{id:'1',
				name:'1번상품',
				price:100,
				discountPrice:50,
				status:'판매중',
				btnIcon:'mdi-pen'
			},{
				id:'2',
				name:'2번상품',
				price:100,
				discountPrice:50,
				status:'품절',
				btnIcon:'mdi-pen'
			},{
				id:'3',
				name:'3번상품',
				price:100,
				discountPrice:50,
				status:'판매중지',
				btnIcon:'mdi-pen'
			},{
				id:'4',
				name:'4번상품',
				price:100,
				discountPrice:50,
				status:'비공개',
				btnIcon:'mdi-pen'
			},{
				id:'5',
				name:'5번상품',
				price:100,
				discountPrice:50,
				status:'판매중',
				btnIcon:'mdi-pen'
			},{
				id:'6',
				name:'6번상품',
				price:100,
				discountPrice:50,
				status:'판매중',
				btnIcon:'mdi-pen'
			},{
				id:'7',
				name:'7번상품',
				price:100,
				discountPrice:50,
				status:'판매중',
				btnIcon:'mdi-pen'
			},
			],
			filters:[{
				type:'checkbox',
				title:'상태',
				values:[{
					text:'판매중',
					value:'판매중'
				},{
					text:'품절',
					value:'품절'
				},{
					text:'비공개',
					value:'비공개'
				},{
					text:'판매중지',
					value:'판매중지'
				},
				]
			},{
				type:'date',
				title:'기간',
				btns:[{
					title:'오늘',
					value:'0'
				},{
					title:'1주일 전',
					value:'7'
				},{
					title:'1개월 전',
					value:'30'
				},{
					title:'3개월 전',
					value:'90'
				},{
					title:'6개월 전',
					value:'180'
				},{
					title:'1년 전',
					value:'365'
				},{
					title:'전체',
					value:'all'
				},
				]
			}]
		}
	},
	layout:'layout',
	components:{
		DataTable
	}
}
</script>