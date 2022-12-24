<template>
  <v-col justify="center" align="center">
    <h1 class="font-weight-medium my-10">Me connecter à Trouv</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card ref="form" class="py-10 px-5">
          <v-text-field
            ref="mail"
            v-model="form.mail"
            :rules="[
              (v) => !!v || 'Mail obligaroire',
              (v) => /.+@.+\..+/.test(v) || 'Format du mail invalide',
            ]"
            label="Addresse mail"
            placeholder="votrenom@trouv.com"
            required
            outlined
          ></v-text-field>

          <v-text-field
            class="pt-2"
            v-model="form.password"
            :rules="[(v) => !!v || 'Mot de passe obligatoire']"
            type="password"
            label="Mot de passe"
            required
            outlined
          ></v-text-field>

          <p class="caption red--text text-right mb-2 error--message">
            {{ errorMessage }}
          </p>

          <v-card-actions class="pa-0">
            <v-btn block depressed color="success" @click="submit" class="py-6">
              Me connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <AuthSwitcher />
  </v-col>
</template>

<script>
import { axios, userRoute } from '@/config/config'

export default {
  name: 'IndexPage',

  data: () => ({
    errorMessage: '',
    form: {
      mail: '',
      password: '',
    },
  }),

  methods: {
    async submit() {
      const json = JSON.stringify(this.form)
      try {
        await axios
          .post(`${userRoute}/login`, json, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(async (res) => {
            if (res.status == 200) {
              if (this.errorMessage) this.errorMessage = ''
              localStorage.setItem('tkn', res.data.token)
            }
          })
          .catch((err) => {
            if (err)
              this.errorMessage = 'Erreur | Email ou mot de passe invalide'
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
