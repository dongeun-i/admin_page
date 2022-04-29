<template>
	<v-card class="col-12 elevation-0">
		<v-sheet class="d-flex justify-space-between align-center">
			<v-card-title>상품등록</v-card-title>
			<v-btn outlined @click="postProductInfo">제출</v-btn>
		</v-sheet>
		<ExpansionPanels :panels="panels"/>
	</v-card>
</template>
<script>
import ExpansionPanels from '@/components/Expansion-panels-form.vue'
import FileUploader from '@/mixins/FileUploader.js'
export default {
	layout:'layout',
	mixins:[FileUploader],
	components:{
		ExpansionPanels
	},
	data(){
		return{
			category:null,
			panels:[{
				title:'상품명',
				model:null,
				layout:'input',
				target:'name'
			},{
				title:"상품 이미지",
				model:null,
				layout:'img',
				target:'thumbnail'
			},{
				title:'카테고리',
				layout:'select',
				values:null,
				model:'선택',
				target:'categotyId',
			},{
				title:'판매가',
				layout:'input',
				model:null,
				target:'price'
			},{
				title:'할인가',
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
			editItems:[{
				target:'name',
				value:null
			},{
				target:'thumbnail',
				value:null
			},{
				target:'categotyId',
				value:null
			},{
				
			}]
		}
	},
	async asyncData({$axios}){
		let responseData = {};
		responseData = await $axios.$get('/api/category/list');
		return{
			categoryInfo : responseData
		}
	},
	created(){
		console.log('크리')
		this.panels.map(p=>{
			if(p.title == '카테고리'){
				this.categoryInfo.unshift({'label':'선택'});
				return p.values = this.categoryInfo;
			}
		})
	},
	watch:{
		
	},
	methods:{
		checkmodels(){
			let exit = false;
			this.panels.map(p=>{
				if(exit) return
				if(p.model =='선택' || p.model == null){
					let message_target = KorUtil.fixPostPositions(`${p.title}을(를)`)
					exit = true;
					return alert(`${message_target} 작성해주세요`);
				}
			})
			return exit
		},
		async postProductInfo(){
			if(!this.checkmodels()){
				let productInfo = this.makePayload(this.panels);
				console.log(productInfo)
				const responseData = await this.$axios.$post('/api/product/register',{
					productInfo:productInfo
				})
				
				console.log(responseData)
			}
		},
		makePayload(data){
			let payload = {}
			data.map(async d=>{
				let target = d.target;
				let value = d.model;
				if(target !='thumbnail'){
					payload[target] = value;
				}else{
					console.log('사진등록',target,value);
					let result = await this.upLoadFile(value,null);
					console.log(result);
				}
			})
			return payload;
		},
	}

}
</script>