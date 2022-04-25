<template>
	<div>
		<ExpansionPanels :panels="panels"/>
	</div>
</template>
<script>
import ExpansionPanels from '@/components/Expansion-panels-form'
export default {
	layout:'layout',
	components:{
		ExpansionPanels
	},
	async asyncData({$axios,params}){
		let productId = params.id
		if(!productId)return
		console.log('router확인',productId)
		let productInfo = await $axios.$get(`/api/product/${productId}`);
		return{
			productInfo : productInfo
		}
	},
	data(){
		return{
			panels:[{
				title:'상품명',
				layout:'input',
			},{
				title:"가격",
				layout:'input'
			},{
				title:'체크박스',
				layout:'checkbox'
			}]
		}
	}
}
</script>