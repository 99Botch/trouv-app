<template>
  <div v-if="isLoading">
    <RequestFeedback v-if="feedback" :feedback="feedback ? feedback : null" />

    <Navigation class="px-3 pb-10" />

    <v-data-table
      :headers="headers"
      :items="lObjects"
      :items-per-page="5"
      class="elevation-1"
    >
      <!-- ITEM DETAILS -->
      <template v-slot:item.details="{ item }">
        <transition-group name="list" tag="p">
          <span v-bind:key="item.details">{{
            item.details.length > 50
              ? `${setDetails(item.details)}...`
              : setDetails(item.details)
          }}</span>
        </transition-group>
      </template>
      <!-- CALL TO ACTION -->
      <template v-slot:item.callToAction="{ item }">
        <transition-group name="list">
          <ObjectCallToAction
            class="mb-2"
            v-bind:key="item._id"
            :id="[
              item._id,
              lObjects.indexOf(
                lObjects.find((element) => element._id == item._id)
              ),
            ]"
            @deletion="deletion"
          />
        </transition-group>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { axios, objectRoute } from '@/config/config'
import RequestFeedback from '~/components/RequestFeedback.vue'

export default {
  name: 'ListeIndex',
  data: () => ({
    isLoading: false,
    feedback: null,
    lObjects: [],
    setDetails: (details) => details.substring(0, 50),
    headers: [
      { text: 'Objets perdus', value: 'object' },
      { text: 'Ajouté par', value: 'addedBy' },
      { text: 'Catégorie', value: 'category' },
      { text: 'Couleurs', value: 'colours' },
      { text: 'Détails', value: 'details' },
      { text: 'Pattern', value: 'pattern' },
      { text: 'Taille', value: 'size' },
      { text: 'Quand?', value: 'when' },
      { text: 'Où?', value: 'where' },
      { text: 'Actions', value: 'callToAction' },
    ],
  }),
  beforeMount() {
    this.getObjects()
  },
  methods: {
    async deletion(_attrs) {
      this.lObjects.splice(_attrs.index, 1)
      this.feedback = _attrs.feedback;
      await new Promise(r => setTimeout(r, 3000));
      this.feedback = null;
    },
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
  components: { RequestFeedback },
}
</script>
