<!-- Voir la partie script, le html est le même que la page add ou le login -->
<template>
  <v-col justify="center" align="center" v-if="isLoading">
    <h1 class="font-weight-medium my-10">Modifier l'objet perdu</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          ref="object"
          v-model="form.object"
          :rules="[
            (v) => !!v || '(obligatoire)',
            (v) =>
              (!!v && v.length <= 120) ||
              'Le nom ne doit pas avoir plus de 120 caractères',
          ]"
          counter="120"
          label="Quel objet perdu?"
          placeholder="Saisir l'objet perdu"
          required
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-autocomplete
          ref="category"
          :items="categories"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.category"
          label="A quelle catégorie appartient l'objet?"
          placeholder="Saisir la catégorie auquelle appartient l'objet"
          required
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-autocomplete
          ref="pattern"
          :items="patterns"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.pattern"
          label="Quel motif remarquable est sur l'objet?"
          placeholder="Saisir le motif remarquable de l'objet"
          required
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          ref="where"
          v-model="form.where"
          :rules="[(v) => !!v || '(obligatoire)']"
          label="Où l'objet a-t-il été perdu?"
          placeholder="Saisir l'endroit où l'objet aurait été perdu "
          required
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.when"
              label="Quand fut perdu l'objet?"
              placeholder="Saisir la date à laquelle l'objet à été perdu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker
            :allowed-dates="
              (date) => date <= new Date().toISOString().substr(0, 10)
            "
            v-model="form.when"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-select
          v-model="form.size"
          ref="size"
          :items="sizes"
          :rules="[(v) => !!v || '(obligatoire)']"
          label="Quel taille fait-il?"
          placeholder="Saisir la taille de l'objet"
          required
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="8" md="12" lg="12">
        <v-textarea
          label="Comment est l'objet?"
          placeholder="Saisir une description de l'objet"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.details"
          required
          outlined
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="8" md="12" lg="12">
        <label class="align--left">De quelles couleurs est l'objet?</label>
        <span class="check--colours">
          <v-checkbox
            v-model="form.colours"
            label="Blanc"
            color="grey lighten-1"
            value="blanc"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Noir"
            color="black"
            value="noir"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Rouge"
            color="red"
            value="rouge"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Vert"
            color="green"
            value="vert"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Bleu"
            color="blue darken-1"
            value="bleu"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Jaune"
            color="yellow darken-2"
            value="jaune"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Orange"
            color="orange"
            value="orange"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Rose"
            color="pink darken-2"
            value="rose"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Violet"
            color="purple lighten-1"
            value="violet"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.colours"
            label="Marron"
            color="brown darken-1"
            value="marron"
            hide-details
          ></v-checkbox>
        </span>
      </v-col>

      <p
        class="caption red--text text-right mt-4 mb-0 mx-4 error--message d-flex error--form"
      >
        {{ errorMessage }}
      </p>

      <v-col cols="12" sm="8" md="6" lg="12">
        <v-card-actions class="pa-0">
          <v-btn block depressed color="primary" @click="submit" class="py-6">
            Mettre a jour
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { axios, objectRoute } from '@/config/config'

export default {
  name: 'ObjectUpdate',

  beforeMount() {
    this.getObject()
  },

  data: () => ({
    menu2: null,
    isLoading: false,
    dialog: false,
    sizes: ['Petit', 'Moyen', 'Grand', 'Énorme'],
    size: '',
    categories: [
      'Portefeuille & argent',
      'Papiers & documents officiel',
      'Sac & bagages',
      'Electronique',
      "Affaires d'enfants",
      'Bijoux & montres',
      'Vêtements & accésoires',
      'Animaux',
      'Effets personnels',
      'Accéssoires de sport',
      'Divers',
    ],
    patterns: [
      'Couleur unie',
      'Plusieurs couleurs',
      'Rayures',
      'A pois',
      'Image en fond & photo(s)',
    ],
    errorMessage: '',
    object: null,
    form: {},
  }),

  methods: {
    async submit() {
      const json = JSON.stringify(this.form)
      try {
        await axios
          .put(`${objectRoute}/${this.$route.query.id}`, json, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('tkn')}`,
            },
          })
          .then(async (res) => {
            if (res.status == 200) {
              if (this.errorMessage) this.errorMessage = ''
              this.$store.commit('feedback/setFeedback', 'updated')
              this.$router.push('/objects')
            }
          })
          .catch((err) => {
            if (err)
              this.errorMessage = 'Erreur | Le formulaire a été mal remplit'
          })
      } catch (err) {
        console.log(err)
      }
    },
    async getObject() {
      let token = localStorage.getItem('tkn')
      await this.$store.dispatch('auth/fetchAuth', token).then(async () => {
        try {
          await axios
            .get(`${objectRoute}/${this.$route.query.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            /**
             * étant donné que je souhaite updater un objet prééxistant, la première étape consiste à aller chercher l'objet en question
             * dans le hook beforeMount
             * 
             * les attributs de form sont généré autommatiquement avec la loop for...in
             */
            .then(async (res) => {
              if (res.status == 200) {
                for (const key in await res.data) {
                  this.form[key] = res.data[key]
                  this.size = res.data['size']
                }
                this.isLoading = true
              }
            })
            .catch((err) => {
              if (localStorage.getItem('tkn')) {
                localStorage.removeItem('tkn')
                this.$router.push('/')
              } else console.log(err)
            })
        } catch (err) {
          console.log(err)
        }
      })
    },
  },
}
</script>
