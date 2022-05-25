<template>
    <v-app>
         <v-card light elevation-0 class="col-12 mw-100 mh-100 vh-100 d-flex align-center justify-center flex-column" dark>
            <v-card-title class="mb-4">
                <v-img
                    src="/img/logo.png"
                    class="logo"
                >
                </v-img>
            </v-card-title> 
            <v-form class="w-50 d-flex mb-12 flex-column">
                <v-text-field
                    outlined 
                    placeholder="ID"
                    v-model="id"
                    type="text"
                    hide-details
                    class="mb-6"
                    light
                ></v-text-field>
                <v-text-field
                    outlined
                    light
                    hide-details
                    v-model="password"
                    placeholder="PASSWORD"
                    type="password"
                    @keydown="enter"
                ></v-text-field>
            </v-form>
            <v-btn class="w-50 font-weight-bold mb-4" height="50" @click="login" light>로그인</v-btn>
            <v-dialog
            v-model="signUp"
            width="60%"
            :fullscreen="width<=600"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="#fff"
                text
                v-bind="attrs"
                v-on="on"
                >
                회원가입
                </v-btn>
            </template>

            <v-card class="p-3 d-flex flex-wrap" height="80vh">
                <v-card-title class="justify-center col-12 font-weight-bold">
                    환영합니다
                </v-card-title>
                <v-card-text class="text-center col-12">ModuMoa를 통해 판매중인 상품을 모두모아서 관리하세요 !</v-card-text>
                 <v-divider class="w-100 mt-0"></v-divider>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3 col-md-3">아이디</label>
                    <v-text-field 
                    v-model="sign_loginId" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3">비밀번호</label>
                    <v-text-field 
                    v-model="sign_pw" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3">비밀번호 확인</label>
                    <v-text-field 
                    v-model="sign_pw2" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3">업체명</label>
                    <v-text-field 
                    v-model="sign_storename" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3">담당자</label>
                    <v-text-field 
                    v-model="sign_managername" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-sheet class="d-flex col-12 flex-wrap justify-center align-center">
                    <label class="col-12 col-md-3">담당자 연락처</label>
                    <v-text-field 
                    v-model="sign_managertel" 
                    class="col-12 col-md-6" 
                    outlined 
                    hide-details 
                    dense 
                    height="20px"
                    >
                    </v-text-field>
                </v-sheet>
                <v-divider class="w-100 d-block"></v-divider>
                <v-card-actions class="col-12 align-self-end">
                <v-spacer></v-spacer>
                <v-btn
                color="#aaa"
                text
                @click="signUp = false"
                >
                    취소
                </v-btn>
                <v-btn
                    class="font-weight-bold"
                    color="primary"
                    text
                    @click="signupForUser"
                >
                    가입하기
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
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
                signUp:false,
                width:null,
                sign_loginId:null,
                sign_pw:null,
                sign_pw2:null,
                sign_storename:null,
                sign_managername:null,
                sign_managertel:null
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
                    sessionStorage.setItem('userInfo',JSON.stringify(userData[0]));
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
        },
        handleResize() {
            this.width = window.innerWidth;
        },
        async signupForUser(){
            if(this.sign_pw == this.sign_pw2){
                try {
                    let payload = {
                    loginId:this.sign_loginId,
                    password:this.sign_pw,
                    storename:this.sign_storename,
                    managername:this.sign_managername,
                    managertel:this.sign_managertel
                }
                payload['regdate']=new Date().toFormat('Y-M-D H:M:S');
                let newUserData = await this.$axios.$post('/api/signUp',{
                    userdata: payload
                })
                if(newUserData){
                    console.log(newUserData)
                    alert('회원가입이 완료되었습니다.');
                    this.signUp = false;
                }
            } catch (err) {
                let status = err.response.status
                if(status == 409){
                    alert('중복된 아이디 입니다.')
                }else{
                    alert('오류가 발생했습니다.');
                }
            }
            }else{
                alert('비밀번호가 다르게 입력되었습니다.')
            }
            
        }
    },
    mounted(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    
    
}
</script>
<style scoped>
    .v-text-field ::v-deep fieldset{
        background-color: #fff;
    }
    .logo{
        filter: invert(1);
    }
</style>