<template>
	<v-navigation-drawer 
		app
		class="px-2"
		dark
	>
		<v-list-item class="py-2">
			<v-list-item-title class="text-h6 ">
				<nuxt-link to="/main">
					ModuMoa
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
				url:'/product/list'
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
				icon:'mdi-comment-question-outline',
				title:'문의/리뷰관리',
				subMenus:[{
					title:'자주묻는 질문',
					url:'/faq/list'
				},{
					title:'리뷰 리스트',
					url:'/review/list'
				},{
					title:'문의 리스트',
					url:'/qa/list'
				}]
			},{
				icon:'mdi-sale',
				title:'기획전',
				url:'/exhibition/list',
			},{
				icon:'mdi-poll',
				title:'이벤트',
				url:'event/list',
			},{
				icon:'mdi-ticket-percent',
				title:'쿠폰',
				url:'coupon/list',
			},{
				icon:'mdi-poll',
				title:'통계',
				subMenus:[{
					title:'방문율',
					url:'/rate/visitation'
				},{
					title:'판매율',
					url:'/rate/sales'
				}]
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
</style>
 