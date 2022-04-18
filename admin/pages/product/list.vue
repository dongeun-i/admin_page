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
				checked:['판매중',],
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
				active:6,
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
			},{
				type:'select',
				title:'카테고리',
				values:[{
					label:'선택',
					value:null
				},{
					label:'상의',
					value:'top',
				},{
					label:'하의',
					value:'bottom'
				},{
					label:'신발',
					value:'shoes'
				},{
					label:'액세서리',
					value:'acc'
				},{
					label:'가방',
					value:'bag'
				}]
			}]
		}
	},
	layout:'layout',
	components:{
		DataTable
	},
	async asyncData({$axios}){
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		let responseData = await $axios.$get('/api/product/list',{
			headers:{
				userId:userInfo.id
			}
		});
		console.log('responseData',responseData);
		return{
			resdata : responseData
		}
	}
}
</script>