export const state = () => ({
  isLogined: false,
  user: null
})

export const getters = {
  isLogined(state) {
    return state.isLogined
  }
}

export const mutations = {
  setLogginUser(state, user) {
    if (user && user.email) {
      state.user = user.email
      state.isLogined = true
    } else {
      state.user = null
      state.isLogined = false
    }
  },
  clearLogginUser(state) {
    state.user = null
    state.isLogined = false
  }
}
