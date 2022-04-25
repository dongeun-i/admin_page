<template>
	<v-card class="elevation-0">
		
		<DataTable :tableHeader="headers" :tableData="data" :filters="filters"/>
		<v-card class="d-flex justify-end col-12 elevation-0" >
			<v-btn outlined nuxt link to="/product/register">상품등록</v-btn>
		</v-card>
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
				{ text: '할인가', value: 'discount' },
				{ text: '상태', value: 'status' },
				{ text: '카테고리', value : 'label'},
				{ text: '등록일' , value:'regdate'},
				{ text: '기능', value: 'btn'},
       	 	],
			data:[],
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
			}]
		}
	},
	layout:'layout',
	components:{
		DataTable
	},
	async asyncData({$axios}){
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
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
	created(){
		// 테이블 데이터 반영
		this.resdata.productListset.map(p=>{
			p.discount = (p.price - p.discount).toComma();
			p.price = p.price.toComma();
			p.btn = {
				linkTo:`/product/${p.id}`,
				btnText:'상세보기',
			},
			p.regdate =new Date(p.regdate).toFormat('Y-M-D');
			this.data.push(p);
		});
		console.log(this.data)
		// 필터영역부 카테고리 추가
		// 기본선택값 넣어주기 
		this.resdata.categoryListset.unshift({label:'선택',id:null});
		let categoryFilter = {
				type:'select',
				title:'카테고리',
				target:'label',
				choose:null,
				values:this.resdata.categoryListset
		}
		this.filters.push(categoryFilter);
	}
}
</script>