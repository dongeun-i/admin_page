<template>
	<v-navigation-drawer 
		app
		class="px-2"
		dark
	>
		<v-list-item class="py-2 px-1">
			<v-list-item-title class="text-h6">
				<nuxt-link to="/main">
					<v-img
					class="logo"
					:contain="true"
                    src="/img/logo.png"
              		  >
                	</v-img>
				</nuxt-link>
			</v-list-item-title>
		</v-list-item>
		<v-divider class="my-0"></v-divider>
		<!-- aside 상단부 -->
		<v-expansion-panels elevation="0">
			<v-expansion-panel v-for="menu in menus" :key="menu.title" color="#363636" class="rounded-0 border-bottom" elevation="0" >
				<v-list v-if="!menu.subMenus" >
					<v-list-item class="title-text" nuxt link :to="menu.url">
						<v-icon class="mr-4">
							{{ menu.icon }}
						</v-icon>
						{{menu.title}}
					</v-list-item>
				</v-list>
				<v-expansion-panel-header class="p-0" elevation="5" v-else>
					<v-list>
						<v-list-item class="title-text">
							<v-icon class="mr-4">
								{{ menu.icon }}
							</v-icon>
							{{menu.title}}
						</v-list-item>
					</v-list>
				</v-expansion-panel-header>
				<template v-if="menu.subMenus">
					<v-expansion-panel-content class="sub-text" v-for="submenu in menu.subMenus" :key="submenu.title">
					<nuxt-link :to="submenu.url">
						{{submenu.title}}
					</nuxt-link>
					</v-expansion-panel-content>
				</template>
				
				<!-- submenu -->
			</v-expansion-panel>
		</v-expansion-panels>
	</v-navigation-drawer>
</template>
<script>

export default {
	data(){
		return{
			menus:[{
				icon:'mdi-account',
				title:'판매자 정보',
				subMenus:[{
						title:'기본정보',
						url:'/user/info'
					},{
						title:'배송/반품/교환 정보',
						url:'/user/delivery'
					},{
						title:'A/S 및 특이사항',
						url:'/user/as'
					},]
			},{
				icon:'mdi-hanger',
				title:'상품 관리',
				subMenus:[{
					title:'상품리스트',
					url:'/product/list'
				},{
					title:'상품등록',
					url:'/product/register'
				}]
				
			},{
				icon:'mdi-truck-fast',
				title:'판매 관리',
				subMenus:[{
					title:'주문 관리',
					url:'/order/list'
				},{
					title:'교환 관리',
					url:'/order/exchange'
				},{
					title:'반품 관리',
					url:'/order/return'
				},{
					title:'배송 관리',
					url:'/order/delivery'
				}
				]
			},{
				icon:'mdi-sale-outline',
				title:'이벤트',
				url:'event/list',
			},{
				icon:'mdi-calculator',
				title:'정산 관리',
				url:'/calc/list',
			}]
		}
	}
}
</script>
<style scoped>
	.theme--dark.v-expansion-panels .v-expansion-panel{
		background-color:#363636 ;
	}
	.v-expansion-panel::before,.v-expansion-panel-header:before,.theme--dark.v-expansion-panels .v-expansion-panel:not(:first-child)::after{
		content: none;
	}
	.title-text{
		font-size: 13px;
	}
	.sub-text{
		font-size: 12px;
	}
	.theme--dark.v-navigation-drawer .v-divider{
		border-color: #Fff;
	}
	.border-bottom{
		border-bottom:1px solid rgba(255,255,255,0.12)!important
	}
	.v-expansion-panel--active:not(:first-child){
		margin: 0;
	}
	.v-application a{
		text-decoration: none; color: #fff;
	}
	.logo{
		filter: invert(1);
	}
	.v-image::v-deep .v-image__image{
		width: 150px; height: 100%; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);
	}
</style>
 