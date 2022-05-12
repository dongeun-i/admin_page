<template>
    <v-app>
         <v-card light elevation-0 class="col-12 mw-100 mh-100 vh-100 d-flex align-center justify-center flex-column" color="#f1f4f6">
            <v-card-title class="mb-4">
                <v-img
                    src="/img/logo.png"
                >
                </v-img>
            </v-card-title> 
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
                    @keydown="enter"
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
            console.log(this.$store.userInfo);
            let id = this.id
            let password = this.password
            try {
                let userData = await this.$axios.$post('/api/login',{
                    user: {
                        id: id,
                        password:password
                    }
                })
                console.log('userData=',userData);
                if(userData.length == 1){
                    this.$store.userInfo = userData[0];
                    this.$router.replace('/main');
                }else{
                    // callMessage 만들어서 채우기
                    alert('아이디 또는 비밀번호를 확인해주세요.')
                }
            } catch (error) {
                console.error(error);
            }
        },
        enter(e){
            if(e.keyCode == 13){
                this.login();
            }
        }
    },
    
}
</script>
<style scoped>
    .v-text-field ::v-deep fieldset{
        background-color: #fff;
    } 
</style>