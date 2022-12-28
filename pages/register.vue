<template>
  <v-col justify="center" align="center">
    <h1 class="font-weight-medium my-10">Créer mon compte Trouv</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card ref="form" class="py-10 px-5">
          <v-text-field
            ref="username"
            v-model="form.username"
            :rules="[(v) => !!v || 'Nom utilisateur obligatoire']"
            label="Nom d'utilisateur"
            placeholder="Jean Charles"
            required
            outlined
          ></v-text-field>

          <v-text-field
            class="pt-2"
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
            :rules="passwordRules"
            type="password"
            label="Mot de passe"
            required
            outlined
          ></v-text-field>

          <p class="caption red--text text-right mb-2 error--message">
            {{ errorMessage }}
          </p>

          <v-card-actions class="pa-0">
            <v-btn block depressed color="primary" @click="submit" class="py-6">
              Créer mon compte
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
  name: 'RegisterPage',
  data: () => ({
    passwordRules: [
      (v) => !!v || 'Mot de passe obligatoire',
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#$%^&*])(?=.{8,})/.test(
          v
        ) ||
        'Le mot de passe doit contenir au minimum une minuscule/majuscule, un chiffre et un charactère spécial',
    ],
    errorMessage: '',
    form: {
      username: '',
      mail: '',
      password: '',
    },
  }),

  beforeMount() {
    if (localStorage.getItem('tkn')) this.$router.push('/objects')
  },

  methods: {
    async submit() {
      const json = JSON.stringify(this.form)
      try {
        await axios
          .post(`${userRoute}/register`, json, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(async (res) => {
            if (res.status == 200) {
              if (this.errorMessage) this.errorMessage = ''
              localStorage.setItem('tkn', res.data.token)
              this.$router.push('/objects')
            }
          })
          .catch((err) => {
            if (err.response.status == 404)
              this.errorMessage = 'Echec | réessayez plus tard'
            else if (err.response.status == 401)
              this.errorMessage = 'Erreur | nom ou email déjà pris'
            else this.errorMessage = 'Erreur | format(s) invalide(s)'
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
