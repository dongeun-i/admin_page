<template>
    <v-app>
		<!-- menus -->
		<Drawer/>
		<!-- headers -->
		<v-app-bar app>

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
