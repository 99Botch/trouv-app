//voir auth.js
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