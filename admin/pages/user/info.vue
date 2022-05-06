<template>
	<v-card class="col-12 elevation-0">
		<v-sheet class="d-flex justify-space-between align-center">
			<v-card-title>판매자 기본정보</v-card-title>
			<v-btn outlined @click="modifyProductInfo">수정하기</v-btn>
		</v-sheet>
		<ExpansionPanels :panels="panels"/>
	</v-card>
</template>
<script>
import ExpansionPanels from '@/components/Expansion-panels-form'
import Payload from '@/mixins/Payload.js'

export default {
	layout:'layout',
	mixins:[Payload],
	async asyncData({$axios}){
		let userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
		if(userId){
			const userInfo = await $axios.$get(`/api/user/${userId}`)
			return {
				userInfo : userInfo
			}
		}
	},
	data(){
		return{
			section1:[{
				title:'아이디',
				model:null,
				layout:'input',
				target:'loginId'
			},{
				
			}]
		}
	}
}
</script>
