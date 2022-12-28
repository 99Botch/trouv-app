<!-- Voir addObject -->

<template>
  <v-row class="mt-5 d-flex justify-space-between" align="center" >
    <h1 class="text-uppercase">Trouv</h1>
    <v-btn color="error" @click="logout">Me déconnecter</v-btn>
  </v-row>
</template>

<script>
import { axios, userRoute } from '@/config/config'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'Navigation',
  data: () => ({}),
  
  methods: {
    async logout() {
      let token = localStorage.getItem('tkn')
      let user = VueJwtDecode.decode(token)

      try {
        await axios
          .delete(`${userRoute}/logout/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (res) => {
            if (res) {
              localStorage.removeItem('tkn')
              this.$store.commit('auth/setAuth')
              this.$router.push({ path: `/` })
            }
          })
          .catch((err) => {
            if (err) console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
