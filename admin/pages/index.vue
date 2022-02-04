<template>
    <v-app>
         <v-card light elevation-0 class="col-12 mw-100 mh-100 vh-100 d-flex align-center justify-center flex-column">
            <v-form class="w-50 d-flex mb-12 flex-column">
                <v-text-field 
                    placeholder="ID"
                    type="text"
                ></v-text-field>
                <v-text-field
                    placeholder="PASSWORD"
                    type="password"
                ></v-text-field>
            </v-form>
            <v-btn class="w-50">로그인</v-btn>
        </v-card>
    </v-app>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
