export const state = () => ({
  feedback: '',
})

export const getters = {
  getFeedback: (state) => {
    return state.feedback
  },
}

export const mutations = {
  setFeedback(state, _feedback) {
    state.feedback = _feedback
  },
}

// export const actions = {
//   async fetchAuth({ commit }, payload) {
//     try {
//       await axios
//         .get(`${userRoute}/session`, {
//           headers: {
//             Authorization: `Bearer ${payload}`,
//           },
//         })
//         .then(async (res) => {
//           if ((await res.status) == 204) commit('setAuth', true)
//           else commit('setAuth', false)
//         })
//         .catch(() => {
//           this.$router.push({ path: `/` })
//         })
//     } catch (err) {
//       console.log(err)
//     }
//   },
// }
