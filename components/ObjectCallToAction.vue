<template>
  <span class="call--action">
    <v-btn class="mb-2" color="error" small @click="delObject">Supprimer</v-btn>
    <nuxt-link :to="{ name: 'objects-update-id', query: { id: object_id } }"
      >Actualiser</nuxt-link
    >
  </span>
</template>

<script>
import { axios, objectRoute } from '@/config/config'

export default {
  name: 'ObjectCallToAction',
  data: () => ({
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
