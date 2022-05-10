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
						:rules="[passwordRules]"
						@click:append="verifyPasswordShow = !verifyPasswordShow.show"
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
import { get } from 'http';

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
				children:[{
					layout:'text',
					label:'아이디',
					target:'loginId',
					value:null,
				}],
			}],
			section2:[{
				title:'사용자 정보',
				children:[{
					layout:'input',
					label:'업체명',
					value:null,
					target:'storename',
				},{
					layout:'input',
					label:'담당자성함',
					value:null,
					target:'managername'
				},{
					layout:'btn',
					text:'클릭',
					onclick:this.test
				}]
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
				}else{
					// Rules should return a string or boolean, received 'undefined' instead ERROR 방지
					return ''
				}
			}
		}
	},
	methods:{
		modifyProductInfo(){
			console.log('수정')
		},
		insertModel(child){
			let userInfo = this.userInfo[0];
			let arr = child.map(c=>{
				let target = c.target;
				if(target){
					let value = userInfo[target];
					c.value = value;
					return c
				}
			})
			console.log('완성형',arr);
		},
		test(){
			alert('')
		}
	},
	created(){
		let userInfo = this.userInfo[0];
		this.insertModel(this.section1[0].children);
		this.insertModel(this.section2[0].children);

	}
}
</script>
<style>
.bg-gray{
	background-color: #ccc ;
}
</style>