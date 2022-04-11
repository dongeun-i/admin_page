<template>
    <v-app>
         <v-card light elevation-0 class="col-12 mw-100 mh-100 vh-100 d-flex align-center justify-center flex-column" color="#f1f4f6">
            <v-form class="w-50 d-flex mb-12 flex-column">
                <v-text-field
                    outlined 
                    placeholder="ID"
                    v-model="id"
                    type="text"
                    light
                ></v-text-field>
                <v-text-field
                    outlined
                    light
                    v-model="password"
                    placeholder="PASSWORD"
                    type="password"
                ></v-text-field>
            </v-form>
            <v-btn class="w-50" @click="login" light>로그인</v-btn>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: 'IndexPage',
        data(){
            return{
                id:null,
                password:null,
            }
        },
    methods:{
        async login(){
            let id = this.id
            let password = this.password
            this.$axios.$post('/api/login',{
                user: {
                    id: id,
                    password:password
                }
            }).then(console.log('요청은했다.'))
        }
    },
    
}
</script>
<style scoped>
    .v-text-field ::v-deep fieldset{
        background-color: #fff;
    } 
</style>