<template>
	 <v-expansion-panels
	multiple
	v-model="expansionPanel"
    >
      <v-expansion-panel v-for="(panel,i) in panels" :key="i" class="mb-4">
        <v-expansion-panel-header class="border-bottom">
			{{panel.title}}
		</v-expansion-panel-header>
		<!-- input -->
		<template v-if="panel.layout == 'input'">
			<v-expansion-panel-content :target="panel.target">
				<v-text-field
				v-model="panel.model"
				:hide-details="true"
				></v-text-field>
        	</v-expansion-panel-content>
		</template>
		<!-- select -->
		
		<template v-else-if="panel.layout == 'select'">
			<v-expansion-panel-content :target="panel.target">
				<v-select
				:items="panel.values"
				item-text="label"
				item-value= "label"
				v-model="panel.model"
				hide-details
				class="col-3"
				>
				</v-select>
        	</v-expansion-panel-content>
		</template>

		<!-- img -->
		<template v-else-if="panel.layout == 'img'">
			<v-expansion-panel-content :target="panel.target">
				<v-file-input
				counter
				show-size
				truncate-length="50"
				hide-details
				v-model="panel.model"
				></v-file-input>
       		</v-expansion-panel-content>
		</template>
        
      </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>
export default {
	data(){
		return{
		}
	},
	created(){
		console.log(this.panels);	
	},
	layout:'layout',
	props:{
		panels:Array,
	},
	computed:{
		expansionPanel(){
			console.log('panels length = ',this.panels.length)
			return new Array(this.panels.length).fill(0).map((n,i)=>n+i)
		}
	},
	watch:{
		panels:function(now,old){
			console.log(now,'나우'),
			console.log(old,'올드')
		}
	},
	methods:{
		testCallData(){
			console.log('자식에서 보내준다',this.panels)
		}
	}

}
</script>