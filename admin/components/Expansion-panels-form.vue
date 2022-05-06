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
				item-value= "id"
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
				class="mb-4"
				v-model="panel.model"
				accept="image/*"
				@change="changeImg(panel)"
				></v-file-input>
				<v-img 
				max-width="200px"
				max-height="200px" 
				:src="panel.src"
				:contain="true"
				></v-img>
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
	layout:'layout',
	props:{
		panels:Array,
	},
	computed:{
		expansionPanel:{
			get(){
				return new Array(this.panels.length).fill(0).map((n,i)=>n+i)
			},
			set(length){
				return length
			} 
        }

	},
	methods:{
		changeImg(panel){
			console.log('사진바뀌었고',panel)
			let fileReader = new FileReader();
			fileReader.readAsDataURL(panel.model);
			fileReader.onload = function(e) {
				let img= e.target.result;
				return panel.src = img
			}

		}
	}

}
</script>