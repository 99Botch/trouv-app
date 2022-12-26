<template>
  <div v-if="isLoading">
    <Navigation />

    {{ lObjects }}
  </div>
</template>

<script>
import { axios, objectRoute } from '@/config/config'
import { async } from 'q'

export default {
  name: 'ListeIndex',
  data: () => ({
    merde: '',
    isLoading: false,
    lObjects: [],
    headers: [
      '_id',
      'addedBy',
      'category',
      'colours',
      'details',
      'object',
      'pattern',
      'size',
      'when',
      'where',
    ],
  }),
  beforeCreate() {},

  beforeMount() {
    this.getObjects()
  },

  methods: {
    async getObjects() {
      let token = localStorage.getItem('tkn')

      await this.$store.dispatch('auth/fetchAuth', token).then(async () => {
        try {
          await axios
            .get(`${objectRoute}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(async (res) => {
              if (res.status == 200)
                [this.lObjects, this.isLoading] = [await res.data, true]
            })
            .catch((err) => {
              console.log(err)
            })
        } catch (err) {
          console.log(err)
        }
      })
    },
  },
}
</script>
