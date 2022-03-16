<template>
	<v-navigation-drawer 
		app
		class="px-2"
		dark
	>
		<v-list-item>
			<v-list-item-content>
			<v-list-item-title class="text-h6">
				ModuMoa
			</v-list-item-title>
			<!-- <v-list-item-subtitle>
				admin page
			</v-list-item-subtitle> -->
			</v-list-item-content>
		</v-list-item>
		<v-divider></v-divider>
		<!-- aside 상단부 -->
		<v-expansion-panels elevation="0">
			<v-expansion-panel v-for="menu in menus" :key="menu.title" color="#363636" class="rounded-0 border-bottom" elevation="0" >
				<v-list v-if="!menu.subMenus">
					<v-list-item class="title-text">
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
					<v-expansion-panel-content class="sub-text" v-for="submenu in menu.subMenus" :key="submenu.title" nuxt :link-to="submenu.url">
						{{submenu.title}}
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
						url:''
					},{
						title:'배송/반품/교환 정보',
						url:''
					},{
						title:'A/S 및 특이사항',
						url:''
					},]
			},{
				icon:'mdi-hanger',
				title:'상품 관리',
				url:'/product'
			},{
				icon:'mdi-truck-fast',
				title:'판매 관리',
				subMenus:[{
					title:'주문 관리',
					url:''
				},{
					title:'교환 관리',
					url:''
				},{
					title:'반품 관리',
					url:''
				},{
					title:'배송 관리',
					url:''
				}
				]
			},{
				icon:'mdi-comment-question-outline',
				title:'문의/리뷰관리',
				subMenus:[{
					title:'자주묻는 질문',
					url:''
				},{
					title:'리뷰 리스트',
					url:''
				},{
					title:'문의 리스트',
					url:''
				}]
			},{
				icon:'mdi-sale',
				title:'기획전',
				url:'',
			},{
				icon:'mdi-poll',
				title:'이벤트',
				url:'',
			},{
				icon:'mdi-ticket-percent',
				title:'쿠폰',
				url:'',
			},{
				icon:'mdi-poll',
				title:'통계',
				subMenus:[{
					title:'방문율',
					url:''
				},{
					title:'판매율',
					url:''
				}]
			},{
				icon:'mdi-calculator',
				title:'정산 관리',
				url:'',
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
</style>
 