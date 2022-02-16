<template>
	<v-navigation-drawer app>
			<v-list-item>
				<v-list-item-content>
				<v-list-item-title class="text-h6">
					ModuMoa
				</v-list-item-title>
				<v-list-item-subtitle>
					admin page
				</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list
				dense
				nav
			>
				<v-list-item
				v-for="item in menus"
				:key="item.title"
				link
				>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
				</v-list-item>
			</v-list>
    	</v-navigation-drawer>
</template>
<script>

export default {
	data(){
		return{
			menus:[{
				icon:'mdi-close',
				title:'menu-sample'
			}]
		}
	}
}
</script>
