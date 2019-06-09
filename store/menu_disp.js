import { MenuClientFactory } from '../lib/menuClient'

export const state = () => ({
  morningMenus: [],
  lunchMenus: [],
  dinnerMenus: [],
  takeoutMenus: []
})

export const getters = {
  morningMenus(state) {
    return state.morningMenus
  },
  lunchMenus(state) {
    return state.lunchMenus
  },
  dinnerMenus(state) {
    return state.dinnerMenus
  },
  takeoutMenus(state) {
    return state.takeoutMenus
  }
}

export const mutations = {
  setMorningMenus(state, menu) {
    state.morningMenus = menu
  },
  setLunchMenus(state, menu) {
    state.lunchMenus = menu
  },
  setDinnerMenus(state, menu) {
    state.dinnerMenus = menu
  },
  setTakeoutMenus(state, menu) {
    state.takeoutMenus = menu
  }
}

let menuClient = {}
export const actions = {
  async readAllMenu({ commit }) {
    // morning
    menuClient = MenuClientFactory.getClient('morning')
    const morningMenus = await menuClient.getMenus()
    const morningCategories = await menuClient.getCategories()
    // カテゴリ別に分類
    commit(
      'setMorningMenus',
      menuUitl.getCategorizedMenu(morningMenus, morningCategories)
    )

    // lunch
    menuClient = MenuClientFactory.getClient('lunch')
    const lunchMenus = await menuClient.getMenus()
    const lunchCategories = await menuClient.getCategories()
    // カテゴリ別に分類
    commit(
      'setLunchMenus',
      menuUitl.getCategorizedMenu(lunchMenus, lunchCategories)
    )

    // dinner
    menuClient = MenuClientFactory.getClient('dinner')
    const dinnerMenus = await menuClient.getMenus()
    const dinnerCategories = await menuClient.getCategories()
    // カテゴリ別に分類
    commit(
      'setDinnerMenus',
      menuUitl.getCategorizedMenu(dinnerMenus, dinnerCategories)
    )

    // takeout
    menuClient = MenuClientFactory.getClient('takeout')
    const takeoutMenus = await menuClient.getMenus()
    const takeoutCategories = await menuClient.getCategories()
    // カテゴリ別に分類
    commit(
      'setTakeoutMenus',
      menuUitl.getCategorizedMenu(takeoutMenus, takeoutCategories)
    )
  }
}

const menuUitl = {
  getCategorizedMenu(menuList, categories) {
    const categorizedList = []
    for (const category of categories) {
      const catList = menuList.filter(x => x.category === category)
      if (catList.length > 0) {
        categorizedList.push({ category: category, menu: catList })
      }
    }
    console.log('categorizedList', categorizedList)
    return categorizedList
  }
}
