<template>
	<v-expansion-panels
		v-model="expansionPanel"
		multiple 
	>
		<v-expansion-panel class="mb-5" v-for="(section,i) in sections" :key="i">
			<v-expansion-panel-header class="border-bottom font-weight-bold">
				{{section.title}}
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-sheet v-for="(item,j) in section.children" :key="j" class="d-flex align-center">
					<template v-if="item.layout == 'text'">
						<label class="col-4 col-sm-2">{{item.label}}</label>
						<p class="col-8 col-sm-3 mb-0">{{item.value}}</p>
					</template>

					<template v-else-if="item.layout == 'input'">
						<label class="col-4 col-sm-2">{{item.label}}</label>
						<v-text-field
						class="col-8 col-sm-3"
						hide-details
						v-model="item.value">
						</v-text-field>
					</template>

					<template v-else-if="item.layout == 'select'">
						<label class="col-4 col-sm-2">{{item.label}}</label>
						<v-select
							:items="item.values"
							item-text="label"
							item-value= "id"
							v-model="item.value"
							hide-details
							class="col-8 col-sm-3"
							>
						</v-select>
					</template>

					<template v-else-if="item.layout == 'textarea'">
						<label class="col-4 col-sm-2">{{item.label}}</label>
						<v-textarea
						outlined
						v-model="item.value"
						name="input-7-4"
						>
						</v-textarea>
					</template>
					<template v-else-if="item.layout =='btn'">
						<v-btn @click="item.onclick" class="ml-auto">{{item.text}}</v-btn>
					</template>
					<template v-else-if="item.layout =='img'">
						<label class="col-4 col-sm-2">{{item.label}}</label>
						<v-img 
							max-width="200px"
							max-height="200px" 
							:src="item.value"
							:contain="true"
						></v-img>
					</template>
				</v-sheet>

				<!-- 다른 추가하고 싶은것이 있을 경우 slot 활용 -->
				<slot></slot>

			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
<script>
export default {
	props:{
		sections:Array
	},
	data(){
		return{
			showPassword:false,
			expansionPanel:[0]
		}
	}
}
</script>