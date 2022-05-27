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
			sections:[],

		}
	},
	async asyncData({$axios,store}){
		let userInfo = store.userInfo;
		if(userInfo){
			let responseData = {};
			responseData['productStatusCount'] = await $axios.$get('/api/product/count',{
				headers:{
					userId:userInfo.id
				}
			});
			responseData['orderCount'] = await $axios.$get('/api/order/count',{
				headers:{
					userId:userInfo.id
				}
			});
			
			return{
				resdata : responseData
			}
		}
		
	},
	methods:{
		makeSection(type,data,title,target){
			let section
			switch(type){
				case 1 :
					section = {
						layout:1,
						title:title,
						counts:[],
					}
					Object.entries(data).map(([k,v])=>{
						let countFormat = {
							title:null,
							count:null
						}
						countFormat.title = k;
						countFormat.count = v;
						section.counts.push(countFormat);
					})
				break

				case 2 :
					section = {
						layout:2,
						title:title,
						banners:[]
					}
					data.map(d=>{
						let bannerFormat = {
							title:null,
							src:null,
							linkTo:null
						}
						bannerFormat.title = d.name;
						bannerFormat.src = d.thumbnail;
						bannerFormat.linkTo = `/${target}/${d.id}`
						section.banners.push(bannerFormat)
					})
				break

				default : 
					section = {
						layout:null,
						title:title,
						text:data
					}

				break
				
			}
			return section
		}
	},
	created(){
		console.log(this.resdata)
		let productList = this.resdata.producdtListset;
		let productStatusCount = this.resdata.productStatusCount[0];
		let orderStatusCount = this.resdata.orderCount.orderStatusCount[0];
		let claimStatusCount = this.resdata.orderCount.claimStatusCount[0];

		this.sections.push(this.makeSection(1,productStatusCount,'상품 전시상태 요약'));
		// this.sections.push(this.makeSection(2,productList,'등록 상품','product'));
		this.sections.push(this.makeSection(1,orderStatusCount,'주문 요약'));
		this.sections.push(this.makeSection(1,claimStatusCount,'교환/반품 요약'));
	}
})
</script>


