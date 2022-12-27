<template>
  <span class="call--action">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          class="mb-2"
          color="green white--text"
          small
        >
          J'ai retrouvé
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 red--text"> Attention </v-card-title>

        <v-card-text>
          Attention, une fois le bouton cliqué, votre objet sera considéré comme
          retrouvé. Avez vous bien retrouvé
          <span class="red--text">{{ this.$attrs.id[1] }} </span>?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="delObject">
            Oui je l'ai retrouvé!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <nuxt-link
      class="update--btn"
      :to="{ name: 'objects-update-id', query: { id: object_id } }"
      >Modifier</nuxt-link
    >
  </span>
</template>

<script>
import { axios, objectRoute } from '@/config/config'

export default {
  name: 'ObjectCallToAction',
  data: () => ({
    dialog: false,
    object_id: '',
  }),
  async beforeMount() {
    this.object_id = this.$attrs.id[0]
  },
  methods: {
    async delObject() {
      try {
        await axios
          .delete(`${objectRoute}/${this.$attrs.id[0]}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tkn')}`,
            },
          })
          .then(async (res) => {
            if (res.status == 204) {
              this.$emit('deletion', {
                index: this.$attrs.id[1],
                feedback: 'deletion',
              })
              this.dialog = false
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
