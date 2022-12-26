<template>
  <v-col justify="center" align="center">
    <h1 class="font-weight-medium my-10">Signaler l'objet perdu</h1>

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
        <v-select
          ref="category"
          :items="categories"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.category"
          label="A quelle catégorie appartient l'objet?"
          placeholder="Saisir la catégorie auquelle appartient l'objet"
          required
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-select
          ref="pattern"
          :items="patterns"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.pattern"
          label="Quel motif remarquable est sur l'objet?"
          placeholder="Saisir le motif remarquable de l'objet"
          required
          outlined
        ></v-select>
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
          <v-date-picker v-model="form.when" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-select
          ref="size"
          :items="sizes"
          :rules="[(v) => !!v || '(obligatoire)']"
          v-model="form.size"
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
      
      <!-- <v-col cols="12" sm="8" md="6" lg="6">
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
          label="Addresse mail"
          placeholder="votrenom@trouv.com"
          required
          outlined
        ></v-text-field>
      </v-col> -->

      <p class="caption red--text text-right mb-2 error--message">
        {{ errorMessage }}
      </p>

      <v-col cols="12" sm="8" md="6" lg="12">
        <v-card-actions class="pa-0">
          <v-btn block depressed color="primary" @click="submit" class="py-6">
            Signaler l'objet
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
//   import { axios, objectRoute } from '@/config/config'

export default {
  name: 'ObjectAdd',

  data: () => ({
    dialog: false,
    sizes: ['Petit', 'Moyen', 'Grand', 'Enorme'],
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
    form: {
      object: '',
      details: '',
      category: '',
      where: '',
      when: '',
      size: '',
      pattern: '',
      colours: [],
    },
  }),

  methods: {
    async submit() {
      // const json = JSON.stringify(this.form)
      // try {
      //   await axios
      //     .post(`${userRoute}/login`, json, {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     })
      //     .then(async (res) => {
      //       if (res.status == 200) {
      //         if (this.errorMessage) this.errorMessage = ''
      //         localStorage.setItem('tkn', res.data.token)
      //         this.$router.push('/objects')
      //       }
      //     })
      //     .catch((err) => {
      //       if (err)
      //         this.errorMessage = 'Erreur | Email ou mot de passe invalide'
      //     })
      // } catch (err) {
      //   console.log(err)
      // }
    },
  },
}
</script>
