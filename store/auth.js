import { axios, userRoute } from '@/config/config'

export const state = () => ({
  auth: false,
})

export const getters = {
  getAuth: (state) => {
    return state.auth
  },
}

export const mutations = {
  setAuth(state, _auth) {
    state.auth = _auth
  },
}

export const actions = {
  async fetchAuth({ commit }, payload) {
    try {
      await axios
        .get(`${userRoute}/session`, {
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        })
        .then(async (res) => {
          if ((await res.status) == 204) commit('setAuth', true)
          else commit('setAuth', false)
        })
        .catch(() => {
          this.$router.push({ path: `/` })
        })
    } catch (err) {
      console.log(err)
    }
  },
}
