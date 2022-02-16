<template>
    <v-app>
         <v-card light elevation-0 class="col-12 mw-100 mh-100 vh-100 d-flex align-center justify-center flex-column">
            <v-form class="w-50 d-flex mb-12 flex-column">
                <v-text-field
                    outlined 
                    placeholder="ID"
                    v-model="id"
                    type="text"
                ></v-text-field>
                <v-text-field
                    outlined
                    v-model="password"
                    placeholder="PASSWORD"
                    type="password"
                ></v-text-field>
            </v-form>
            <v-btn class="w-50" @click="login">로그인</v-btn>
        </v-card>
    </v-app>
</template>

<script>
export default {
    // async asyndata({$axios,param}){
    //     try {
    //         let responseData = await $axios.get('/api/user');
    //         return{
    //             resData:responseData
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         return
    //     }
        
    // },
    name: 'IndexPage',
        data(){
            return{
                id:null,
                password:null,
            }
        },
    methods:{
        login(){
            let id = this.id
            let password = this.password
            if(id == 'admin' && password == 123123){
                alert('로그인 성공 !');
                this.$router.push('/main');
            }else{
                alert('아이디 또는 비밀번호를 확인해주세요.');
            }
        }
    }
}
</script>
