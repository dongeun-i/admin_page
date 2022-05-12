<template>
	<v-card>

	</v-card>
</template>
<script>
import DataTable from '@/components/DataTable.vue'
export default{
	data(){
		return{
			headers:[
				{
					text: 'ID',
					align: 'start',
					filterable: false,
					value: 'id',
				},
				{ text: '상품이미지', value: 'thumbnail'},
				{ text: '상품명', value: 'name' },
				{ text: '판매가', value: 'price' },
				{ text: '할인가', value: 'discount' },
				{ text: '상태', value: 'status' },
				{ text: '카테고리', value : 'label'},
				{ text: '등록일' , value:'regdate'},
				{ text: '기능', value: 'btn'},
			],
			filters:[
			{
				type:'checkbox',
				title:'상태',
				target:'status',
				checked:['판매중','품절','비공개','판매중지'],
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
				target:'regdate',
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
			}],
			data:[],
		}
		
	},
	async asyncData({$axios}){
		let userInfo = this.$store.userInfo;
		let responseData = {};
		responseData['productListset'] = await $axios.$get('/api/product/list',{
			headers:{
				userId:userInfo.id
			}
		});
		responseData['categoryListset'] = await $axios.$get('/api/category/list');
		return{
			resdata : responseData

		}
	},
}
</script>