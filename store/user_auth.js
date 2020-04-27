export const state = () => ({
  isLogined: false,
  user: null
})

export const getters = {
  isLogined(state) {
    return state.isLogined
  },
  user(state) {
    return state.user
  }
}

export const mutations = {
  setLogginUser(state, user) {
    if (user && user.sub) {
      state.user = { id: user.sub, name: user.name, nickname: user.nickname }
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
