<template>
    <v-app app>
        <router-view>
        </router-view>
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
    },
    mounted(){
        this.$router.push('/login');
    }
}
</script>
