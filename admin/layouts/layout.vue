<template>
    <v-app>
		<!-- menus -->
		<Drawer/>
		<!-- headers -->
		<v-app-bar dark class="d-flex justify-end align-center" max-height="65px">
			<span>
				이동은 님
			</span>
			<v-btn text>
				로그아웃
			</v-btn>
		</v-app-bar>
		<!-- content -->
        <v-main>
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

	}
}
</script>
