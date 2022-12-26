<template>
  <span class="call--action">
    <v-btn class="mb-2" color="error" small @click="delObject">Supprimer</v-btn>
    <v-btn color="primary" dark small>Actualiser</v-btn>
  </span>
</template>

<script>
import { axios, objectRoute } from '@/config/config'

export default {
  name: 'DeleteObject',
  data: () => ({}),
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
              this.$emit('deletion', {index: this.$attrs.id[1], feedback: 'deletion'});
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
