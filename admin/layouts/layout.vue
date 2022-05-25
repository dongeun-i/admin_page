<template>
    <v-app>
		<!-- menus -->
		<Drawer :drawer="drawer" ref="Drawer"/>
		<!-- headers -->
		<v-app-bar width="100%" dark class=" align-center" max-height="65px">
			<v-btn icon class="justify-self-start" @click="setdrawer">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
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
			drawer:null,
			pageWidth:null,
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
		window.addEventListener('resize', this.resize);
        this.resize();
		if(this.pageWidth<=1264){
				return this.drawer = false
			}else{
				return this.drawer = true
			}
	},
	methods:{
		logout(){
			this.$store.userInfo = null;
			this.$router.replace('/login');
		},
		resize() {
            this.pageWidth = window.innerWidth;
        },
		setdrawer(){
			this.$refs.Drawer.changeDrawerActive()
		},
	},

}
</script>
<style scoped>
	.bg-gray{
		background-color: #ccc ;
	}
</style>