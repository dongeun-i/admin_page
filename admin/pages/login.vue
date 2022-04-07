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
   async asyncData({ params, $http, error }) {
    try {
      const response = await axios.get(`/api/user`);
      const user = response.data;
      return { user }
    } catch(e) {
      error({ statusCode: 503, message: 'API 요청이 실패했습니다 다시 시도해 주세요' })
    }
  },
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
    created(){
        console.log('크리')
    }
}
</script>
<style scoped>
    .v-text-field ::v-deep fieldset{
        background-color: #fff;
    } 
</style>