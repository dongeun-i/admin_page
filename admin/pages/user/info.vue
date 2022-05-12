<template>
	<v-card class="bg-gray col-12 elevation-0" height="100%">
		<v-sheet color="#ccc" class="d-flex justify-space-between align-center">
			<v-card-title class="font-weight-bold">판매자 기본정보</v-card-title>
			<!-- <v-btn @click="modifyProductInfo">수정하기</v-btn> -->
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
							@keyup="checkValue('old')"
							@click:append="oldPasswordShow = !oldPasswordShow"
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
							@keyup="checkValue('new')"
							@click:append="newPasswordShow = !newPasswordShow"
						></v-text-field>
				</v-sheet>
				<v-sheet class="d-flex align-center">
					<label class="col-2">비밀번호 확인</label>
					<v-text-field
						v-model="verifyPassword"
						:append-icon="verifyPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
						:type="verifyPasswordShow ? 'text' : 'password'"
						class="col-3"
						hide-details
						@keyup="checkValue('verify')"
						@click:append="verifyPasswordShow = !verifyPasswordShow"
					></v-text-field>
				</v-sheet>
				<v-sheet class="d-flex align-center ">
					<v-btn @click="changePassword" class="ml-auto">비밀번호 변경</v-btn>
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
	async asyncData({$axios,store}){
		let userId = store.userInfo.id;
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
					text:'담당자 정보 변경',
					onclick:this.changeMannagerInfo
				}]
			}],
			oldPassword:null,
			newPassword:null,
			verifyPassword:null,
			oldPasswordShow:false,
			newPasswordShow:false,
			verifyPasswordShow:false,
		}
	},
	methods:{
		checkValue(target){
			switch(target){
				case 'old': return this.oldPassword = this.oldPassword?this.oldPassword.replace(/ /g,''):null;
				
				case 'new': return this.newPassword = this.newPassword?this.newPassword.replace(/ /g,''):null;

				case 'verify': this.verifyPassword = this.verifyPassword?this.verifyPassword.replace(/ /g,''):null;
			}

		},
		changePassword(){
			let userInfo = this.userInfo[0];
			if(userInfo.password != this.oldPassword) return alert('비밀번호를 확인해주세요.');
			if(this.newPassword==null||this.newPassword=='') return alert('새 비밀번호를 입력해주세요.');
			if(this.verifyPassword==null||this.verifyPassword=='') return alert('비밀번호 확인을 입력해주세요.');
			if(this.newPassword !=this.verifyPassword) return alert('새비밀번호를 확인해주세요.');
			
			this.$axios.$put(`/api/user/${userInfo.id}`,{
				userInfo:{
					password:this.newPassword
				}
			}).then(result=>{
				if(!result){
					alert('비밀번호 변경에 실패하였습니다.');
				}else{
					alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.');
					this.$store.userInfo = null;
					this.$router.replace('/login');
				}
			})
			
		},
		insertModel(child){
			let userInfo = this.userInfo[0];
			let arr = child.map(c=>{
				let target = c.target;
				if(target){
					let value = userInfo[target];
					c.value = value;
					return c
				}else{
					return 
				}
			})
		},
		changeMannagerInfo(){
			let payload = this.makePayload(this.section2[0].children);
			if(payload.managername ==''||payload.managername == null) return alert('담당자성함을 입력해주세요.');
			if(payload.storename==''||payload.storename == null) return alert('업체명을 입력해주세요.');
			let userInfo = this.userInfo[0];
			this.$axios.$put(`/api/user/${userInfo.id}`,{
				userInfo:payload
			}).then(result=>{
				if(!result){
					alert('사용자정보 변경에 실패하였습니다.');
				}else{
					alert('사용자정보 변경이 완료되었습니다.');
					let loginInfo = this.$store.userInfo;
					let target = Object.keys(payload);
					target.map(k=>{
						loginInfo[k]= payload[k];
					})
					console.log(this.$store.userInfo);
				}
			})
		}
	},
	created(){
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