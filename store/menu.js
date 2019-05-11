import firebaseDbClient from '../lib/firebaseDbClient'

export const state = () => ({
  lunchMenu: [],
  dinnerMenu: [],
  drinkMenu: []
})

export const getters = {
  lunchMenu(state) {
    return state.lunchMenu
  },
  dinnerMenu(state) {
    return state.dinnerMenu
  },
  drinkMenu(state) {
    return state.drinkMenu
  }
}

export const mutations = {
  setLunchMenu(state, menu) {
    state.lunchMenu = menu
  },
  setDinnerMenu(state, menu) {
    state.dinnerMenu = menu
  },
  setDrinkMenu(state, menu) {
    state.drinkMenu = menu
  }
}

export const actions = {
  async readAllMeenu({ commit }) {
    const lunch = await firebaseDbClient.getLunchMenu()
    const dinner = await firebaseDbClient.getDinnerMenu()
    const drink = await firebaseDbClient.getDrinkMenu()

    if (lunch) {
      commit('setLunchMenu', lunch)
    }
    if (dinner) {
      commit('setDinnerMenu', dinner)
    }
    if (drink) {
      commit('setDrinkMenu', drink)
    }
  }
}
