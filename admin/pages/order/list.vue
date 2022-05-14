<template>
	<v-card>
		<DataTable :tableHeader="headers" :tableData="data" :filters="filters"/>
	</v-card>
</template>
<script>
import DataTable from '@/components/DataTable.vue'
export default {
	components:{
		DataTable
	},
	layout:'layout',
	data(){
		return{
			headers:[
				{ text: '주문번호', value: 'orderCode'},
				{ text: '상품이미지', value: 'thumbnail' ,filterable: false,},
				{ text: '상품명', value: 'productName'},
				{ text: '주문상태', value: 'status' },
				{ text: '주문자 성함', value: 'recipientName'},
				{ text: '주문일시', value: 'orderdate'},
				{ text: '기능', value: 'btn'},
			],
			filters:[
			{
				type:'date',
				title:'주문 기간',
				target:'orderdate',
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
	async asyncData({$axios,store}){
		let userInfo = store.userInfo;
		if(userInfo){
			let responseData = {};
			responseData['orderListset'] = await $axios.$get('/api/order/list',{
				headers:{
					userId:userInfo.id
				}
			});
			responseData['orderStatus'] = await $axios.$get('/api/order/status');
			return{
				resdata : responseData

			}
		}
		
	},
	created(){
		// 테이블 데이터 반영하기
		this.resdata.orderListset.map(o=>{
			o.btn = {
				linkTo:`/order/${o.orderCode}`,
				btnText:'상세보기',
			},
			o.orderdate = new Date(o.orderdate).toFormat('Y-M-D H:M');
			this.data.push(o);
		})
		this.resdata.orderStatus.unshift({label:'전체',id:null});
		let orderStatusFilter = {
			type:'select',
			title:'주문상태',
			target:'status',
			choose:null,
			values:this.resdata.orderStatus
		}
		this.filters.push(orderStatusFilter);
	}

}
</script>