/**
 * Vuex me permet de gérer des states edpuis n'importe quel component dans l'application outrepassant les filliations de components
 * Chaque fonction a ici un rôle bien précis
 */
import { axios, userRoute } from '@/config/config'

//  auth est le state qui permets tout au lon de la navigation de gérer l'authentification ou non d'un utilisateur pour aisin protéger les routes
export const state = () => ({
  auth: false,
})

// getAuth sert à retrouver la valeur de auth
export const getters = {
  getAuth: (state) => {
    return state.auth
  },
}

// setAuth permet de modifier la valeur de auth
export const mutations = {
  setAuth(state, _auth) {
    state.auth = _auth
  },
}

// fetchAuth permet aussi de modifier la valeur de auth mais permet surtout de créer une requête pour en modifier la valeur
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
