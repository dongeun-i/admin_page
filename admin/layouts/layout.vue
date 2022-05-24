<template>
    <v-app>
		<!-- menus -->
		<Drawer :drawer="drawer"/>
		<!-- headers -->
		<v-app-bar dark class="d-flex justify-end align-center" max-height="65px">
			<v-btn class="justfity-self-start" @click="drawer=!drawer">toggle</v-btn>
			<span class="mr-2">
				{{this.$store.userInfo.storename}} 님
			</span>
			<v-btn rounded outlined height="auto" class="p-0" nuxt link to="/user/info">내정보</v-btn>
			<v-btn text @click="logout">
				로그아웃
			</v-btn>
		</v-app-bar>
		<!-- content -->
        <v-main class="bg-gray">
            <router-view>
            </router-view>
        </v-main>
    </v-app>
</template>
<script>
import Drawer from '@/components/drawers.vue';
export default {
	components:{
		Drawer,
	},
	data(){
		return{
			userInfo:this.$store.userInfo,
			drawer:true
		}
	},
	created(){
		let userInfo =this.userInfo;
		if(!userInfo){
			alert('잘못된 접근입니다.');
			this.$router.replace('/login');
		}else{
			this.userInfo = userInfo
		}
	},
	methods:{
		logout(){
			this.$store.userInfo = null;
			this.$router.replace('/login');
		}
	},
}
</script>
<style scoped>
	.bg-gray{
		background-color: #ccc ;
	}
</style>