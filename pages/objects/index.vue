<template>
  <div v-if="isLoading">

    <RequestFeedback v-if="feedback" :feedback="feedback ? feedback : null" />
    
    <Navigation class="px-3 pb-10" />

    <v-card class="d-flex pa-4 align-center" cols="12" sm="8" md="6" lg="4">
      <v-text-field
        class="mr-4 pt-0 mt-0"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        outlined
      ></v-text-field>
      <AddObjectBtn />
    </v-card>

    <v-layout child-flex>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="lObjects"
        :items-per-page="5"
        :search="search"
        class="elevation-1 mt-4"
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
        <!-- ITEM COLOURS -->
        <template v-slot:item.colours="{ item }">
          <ul class="colours--list">
            <li
              v-for="item in item.colours"
              v-bind:key="item"
              class="mb-1"
              :data-colour="item"
            ></li>
          </ul>
        </template>
        <!-- CALL TO ACTION -->
        <template v-slot:item.callToAction="{ item }">
          <transition-group name="list">
            <ObjectCallToAction
              class="mb-2"
              v-bind:key="item._id"
              :id="[
                item._id,
                item.object,
                lObjects.indexOf(
                  lObjects.find((element) => element._id == item._id)
                ),
              ]"
              @deletion="deletion"
            />
          </transition-group>
        </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import { axios, objectRoute } from '@/config/config'
import AddObjectBtn from '~/components/AddObjectBtn.vue'
import RequestFeedback from '~/components/RequestFeedback.vue'

export default {
  name: 'ListeIndex',
  data: () => ({
    search: '',
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
  async beforeMount() {
    this.getObjects()
    if (this.$store.getters['feedback/getFeedback']) {
      this.feedback = this.$store.getters['feedback/getFeedback']
      await new Promise((r) => setTimeout(r, 3000))
      this.feedback = null
    }
  },
  methods: {
    async deletion(_attrs) {
      this.search = ''
      this.lObjects.splice(_attrs.index, 1)
      this.feedback = _attrs.feedback
      await new Promise((r) => setTimeout(r, 3000))
      this.feedback = null
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
  components: { RequestFeedback, AddObjectBtn },
}
</script>
