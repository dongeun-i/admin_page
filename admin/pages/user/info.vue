<template>
	<v-card class="bg-gray col-12 elevation-0" height="100%">
		<v-sheet color="#ccc" class="d-flex justify-space-between align-center">
			<v-card-title class="font-weight-bold">판매자 기본정보</v-card-title>
			<v-btn @click="modifyProductInfo">수정하기</v-btn>
		</v-sheet>
		<ExpansionSection class="mb-5" :sections="section1">
			<template>
				<v-sheet class="d-flex align-center">
					<label class="col-2">기존 비밀번호</label>
					<v-text-field
							v-model="oldPassword"
							:append-icon="oldPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
							:type="oldPasswordShow ? 'text' : 'password'"
							class="col-3"
							hide-details
							@click:append="oldPasswordShow = !oldPasswordShow.show"
						></v-text-field>
				</v-sheet>
				<v-sheet class="d-flex align-center">
					<label class="col-2">새 비밀번호</label>
					<v-text-field
							v-model="newPassword"
							:append-icon="newPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
							:type="newPasswordShow ? 'text' : 'password'"
							class="col-3"
							hide-details
							@click:append="newPasswordShow = !newPasswordShow.show"
						></v-text-field>
				</v-sheet>
				<v-sheet class="d-flex align-center">
					<label class="col-2">비밀번호 확인</label>
					<v-text-field
						v-model="verifyPassword"
						:append-icon="verifyPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
						:type="verifyPasswordShow ? 'text' : 'password'"
						class="col-3"
						@click:append="verifyPasswordShow = !verifyPasswordShow.show"
						:rules="[passwordRules]"
					></v-text-field>
				</v-sheet>
				
			</template>		
		</ExpansionSection>
		<ExpansionSection :sections="section2">	
		</ExpansionSection>
	</v-card>
</template>
<script>
import ExpansionSection from '@/components/Expansion-panels-section'
import Payload from '@/mixins/Payload.js'

export default {
	layout:'layout',
	mixins:[Payload],
	components:{ExpansionSection},
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
				title:'로그인 정보',
				model:null,
				children:[{
					layout:'text',
					label:'아이디',
					text:'admin'
				}],
				target:'loginId'
			}],
			oldPassword:null,
			newPassword:null,
			verifyPassword:null,
			oldPasswordShow:false,
			newPasswordShow:false,
			verifyPasswordShow:false,
			passwordRules:v=>{
				if(this.newPassword != v){
					return "비밀번호가 일치하지 않습니다"
				}
			}
		}
	},
	methods:{
		modifyProductInfo(){
			console.log('수정')
		}
	}
}
</script>
<style>
.bg-gray{
	background-color: #ccc ;
}
</style>