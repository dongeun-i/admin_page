<template>
  <v-container fluid>
    <v-data-iterator
		disable-filtering
		disable-pagination
		disable-sort
		hide-default-footer
		:items="items"
    >
		<template v-slot:header>
			<v-menu
				offset-y
				:close-on-content-click="false"
				max-width="300px"
				min-width="auto"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-text-field
					prepend-icon="mdi-calendar"
					placeholder="날짜 선택"
					v-bind="attrs"
					v-on="on"
					hide-details
					background-color="#fff"
					class="col-5"
					></v-text-field>
				</template>
				<datepicker :minimumView="'month'" :maximumView="'month'" :inline="true" :language="languages[language]"></datepicker>
			</v-menu>
		</template>
		<template v-slot:default="props">
			<v-row>
				<v-col
					v-for="item in props.items"
					:key="item.name"
					cols="12"
				
				>
					<v-card>
					<v-card-title class="subheading font-weight-bold">
						{{ item.name }}
					</v-card-title>

					<v-divider></v-divider>

					<v-list dense>
						<v-list-item>
						<v-list-item-content>Calories:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.calories }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Fat:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.fat }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Carbs:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.carbs }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Protein:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.protein }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Sodium:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.sodium }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Calcium:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.calcium }}
						</v-list-item-content>
						</v-list-item>

						<v-list-item>
						<v-list-item-content>Iron:</v-list-item-content>
						<v-list-item-content class="align-end">
							{{ item.iron }}
						</v-list-item-content>
						</v-list-item>
					</v-list>
					</v-card>
				</v-col>
			</v-row>
		</template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
export default {
	layout:'layout',
	data(){
		return{
			items: [{
				name: null,
				calories: null,
				fat: null,
				carbs: null,
				protein: null,
				sodium: null,
				calcium: null,
				iron: null,
			}],
			language: "ko",
			languages: lang,
		}
	},
	components:{
		Datepicker
	},
}
</script>