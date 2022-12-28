<!-- la structure de l'app est simple, donc la page d'acceuil est directement le formulaire login
  Celui-ci va prendre deux informations, le mail et le password

  J'utilise tout du lon de l'application les composants de la librairie vuetify
-->
<template>
  <v-col justify="center" align="center">
    <h1 class="font-weight-medium my-10">Me connecter à Trouv</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card ref="form" class="py-10 px-5">
          <!-- Dans chaque composant de vuetify on peut y décrire des règles de fonctionnement
          v-model par exemple va lié l'input au state qui y est declare, ici le state mail dans l'objet form 
          
          Les rules permettent de poser des règles de validation depuis le front avant que le back ne checke la validité de la requête, se qui se traduit*
          par un gain de temps. Dans ce cas, l'input ne peut pas être vide, et doit respecter un certain format, le mail devant avoir un @ et '.'
          outlined est ici un styling de vuetify modifiant l'apparence de l'input-->
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

          <!-- Bon nombre des classes que j'ajoute à des élément viennent directement de vuetify. Toutefois j'ai rajouté des classes 
          que j'ai moi même créé là où je le jugeait nécéssaire-->
          <p class="caption red--text text-right mb-2 error--message">
            {{ errorMessage }}
          </p>

          <!-- lorsque l'utilisateur clique sur le bouton, la fonction 'submit' est trigger-->
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

  //data permet de déclarer les states qui sont utilisé dans le component
  data: () => ({
    errorMessage: '',
    form: {
      mail: '',
      password: '',
    },
  }),

  //beforeMount me permet dans le lifecycle du component de checker si l'utilisateur n'est pas déjà logged in.
  // Si c'est le cas, alors il est amené directement à la page /objects, est ceux avant même que le component ne soit rendered
  beforeMount() {
    if (localStorage.getItem('tkn')) this.$router.push('/objects')
  },

  methods: {
    /**
     * submit est la fonction en charge d'envoyer la requête pour le back avec la librairie axios
     * 
     * la première étape consiste à prendre le 'form' est le changer en format JSON
     * 
     * axios ensuite envoi une requête post avec un fichir JSON dans le body
     * 
     * Si la requete renvvoie un code 200, alors le login est éffectué est une session vient d'être enregistrée dans la collection Session de la BDD
     */
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
              this.$router.push('/objects')
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
