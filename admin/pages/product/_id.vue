<template>
	<v-card class="col-12 elevation-0">
		<v-sheet class="d-flex justify-space-between align-center">
			<v-card-title>상품상세</v-card-title>
			<div>
				<v-btn outlined @click="modifyProductInfo">수정하기</v-btn>
				<v-btn outlined @click="deleteProductInfo">삭제하기</v-btn>
			</div>
		</v-sheet>
		<ExpansionPanels :panels="panels"/>
	</v-card>
</template>
<script>
import ExpansionPanels from '@/components/Expansion-panels-form'
import Payload from '@/mixins/Payload.js'
export default {
	layout:'layout',
	components:{
		ExpansionPanels
	},
	mixins:[Payload],
	async asyncData({$axios,params}){
		let productId = params.id
		if(!productId)return
		console.log('router확인',productId)
		let productInfo = await $axios.$get(`/api/product/${productId}`);
		let categoryInfo = await $axios.$get('/api/category/list');
		return{
			productInfo : productInfo,
			categoryInfo : categoryInfo
		}
	},
	data(){
		return{
			panels:[{
				title:'상품명',
				model:null,
				layout:'input',
				target:'name'
			},{
				title:"상품 이미지",
				model:null,
				layout:'img',
				src:null,
				target:'thumbnail'
			},{
				title:'카테고리',
				layout:'select',
				values:null,
				model:'선택',
				target:'categoryId',
			},{
				title:'판매가',
				layout:'input',
				model:null,
				target:'price'
			},{
				title:'할인금액',
				layout:'input',
				model:null,
				target:'discount'	
			},{
				title:'상태',
				layout:'select',
				model:'선택',
				target:'status',
				values:[{
					label:'선택'
				},{
					label:'판매중'
				},{
					label:'품절'
				},{
					label:'비공개'
				},{
					label:'판매중지'
				},]	
			}
			],
			Payload:{}
		}
	},
	created(){
		let category = this.categoryInfo
		let productInfo = this.productInfo[0];
		this.panels.map(p=>{
			if(p.layout =='img'){
				p.src = productInfo[p.target];
			}else{
				if(p.target == 'categoryId'){
					p.values = category;
				}
				p.model = productInfo[p.target];
			}
		})
		console.log(this.panels)	
	},
	methods:{
		modifyProductInfo(){
			let productId = this.productInfo[0].id;
			let productInfo = this.makePayload(this.panels);
			console.log('productInfo',productInfo)
			for (let key of productInfo.keys()) {
				console.log(key, ":", productInfo.get(key));
			}
			try {
				this.$axios({
					method:'put',
					url:`/api/product/${productId}`,
					data:productInfo,
					headers: {
						'Content-Type': 'multipart/form-data',
					}
				}).then(result=>{
					console.log(result);
					alert('상품 수정이 완료되었습니다.')
				})
			} catch (error) {
				console.error(error);
				return alert('상품 수정에 실패하였습니다.')				
			}
			// this.$router.replace('/product/list');

		},
		deleteProductInfo(){
			let message_target = KorUtil.fixPostPositions(`${this.productInfo[0].name}을(를)`)
			let productId = this.productInfo[0].id;
			let thumbnail = this.panels.find(p=>p.target=="thumbnail");
			console.log(productId);
			if(confirm(`${message_target} 삭제하시겠습니까?`)){
				try {
					this.$axios.$delete(`/api/product/delete/${productId}`,{
						data:{
							filename:thumbnail.src
						}
					}).then(result=>{
						console.log(result);
						alert('삭제가 완료되었습니다.');
						this.$router.replace('/product/list');
					})
				} catch (error) {
					console.log(error.message)
					alert('삭제에 실패하였습니다.')
					throw(error)
				}
			}
			
		}
	}
}
</script>