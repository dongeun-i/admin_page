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
       	 	],
			data:[
				{id:'1',
				name:'1번상품',
				price:100,
				discountPrice:50,
				status:'판매중'
			},{
				id:'2',
				name:'2번상품',
				price:100,
				discountPrice:50,
				status:'품절'
			},{
				id:'3',
				name:'3번상품',
				price:100,
				discountPrice:50,
				status:'판매중지'
			},{
				id:'4',
				name:'4번상품',
				price:100,
				discountPrice:50,
				status:'비공개'
			},{
				id:'5',
				name:'5번상품',
				price:100,
				discountPrice:50,
				status:'판매중'
			},{
				id:'6',
				name:'6번상품',
				price:100,
				discountPrice:50,
				status:'판매중'
			},{
				id:'7',
				name:'7번상품',
				price:100,
				discountPrice:50,
				status:'판매중'
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
			}]
		}
	},
	layout:'layout',
	components:{
		DataTable
	}
}
</script>