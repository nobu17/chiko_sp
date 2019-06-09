import base64ToBlob from 'b64-to-blob'
import { MenuClientFactory } from '../lib/menuClient'
import uuid from '../lib/uuid'

export const state = () => ({
  editMenu: [],
  editCategories: []
})

export const getters = {
  editMenu(state) {
    return state.editMenu
  },
  editCategories(state) {
    return state.editCategories
  }
}

export const mutations = {
  setEditMenu(state, { menu }) {
    state.editMenu = menu
  },
  setEditCategories(state, { editCategories }) {
    state.editCategories = editCategories
  },
  addEditCategory(state, { newItem }) {
    state.editCategories.push(newItem)
  },
  deleteEditCategory(state, { index }) {
    state.editCategories.splice(index, 1)
  },
  setEditCategory(state, { index, editItem }) {
    state.editCategories[index] = editItem
  }
}

let menuClient = {}

export const actions = {
  async readEditMenu({ commit, dispatch }, { editMenuType }) {
    menuClient = MenuClientFactory.getClient(editMenuType)
    const menu = await menuClient.getMenus()
    // 編集前画像情報を設定して保持させる
    for (const me of menu) {
      me.beforeImg = JSON.parse(JSON.stringify(me.img))
    }
    commit('setEditMenu', { menu: menu })
    // read categories
    await dispatch('readEditCategories', { editMenuType: editMenuType })
  },
  async readEditCategories({ commit }, { editMenuType }) {
    menuClient = MenuClientFactory.getClient(editMenuType)
    // read categories
    const categoeirs = await menuClient.getCategories()
    commit('setEditCategories', { editCategories: categoeirs })
  },
  async reloadEditMenu({ commit }) {
    const menu = await menuClient.getMenus()
    commit('setEditMenu', { menu: menu })
  },
  async reloadEditCategories({ commit }) {
    // read categories
    const categoeirs = await menuClient.getCategories()
    commit('setEditCategories', { editCategories: categoeirs })
  },
  async addMenuAsync({ dispatch, state }, { menu }) {
    // 表示順序を設定
    menu.disporder = state.editMenu.length + 1
    // 画像追加
    if (menu.img.fileName !== '') {
      // uuidリネーム
      menu.img.fileName = uuid.getUUID() + '.jpg'
      menu.img.fileUrl = base64ToBlob(
        menu.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      menu.img.fileUrl = await menuClient.addImage(menu.img)
    }
    await menuClient.addMenu(menu)
    // reload
    await dispatch('reloadEditMenu')
  },
  async editMenuAsync({ dispatch, state }, { menu }) {
    // 編集前画像の削除
    if (menu.beforeImg.fileUrl !== menu.img.fileUrl) {
      await menuClient.deleteImage(menu.beforeImg)
    }
    // 画像アップロード
    if (!menu.img.fileUrl.startsWith('http')) {
      // uuidリネーム
      menu.img.fileName = uuid.getUUID() + '.jpg'
      menu.img.fileUrl = base64ToBlob(
        menu.img.fileUrl.replace(/^.*,/, ''),
        'image/jpg'
      )
      menu.img.fileUrl = await menuClient.addImage(menu.img)
    }
    await menuClient.editMenu(menu)
    // reload
    await dispatch('reloadEditMenu')
  },
  async updateDispOrderAsync({ commit, dispatch, state }, { menuList }) {
    commit('setEditMenu', { menu: menuList })
    // オーダー再計算して変更されたものを格納
    const changedItems = menuUitl.reassingOrderNo(
      JSON.parse(JSON.stringify(menuList))
    )
    if (changedItems.length > 0) {
      await menuClient.updateMenusDispOrder(changedItems)
    }
    // reload
    await dispatch('reloadEditMenu')
  },
  async deleteMenuAsync({ commit, dispatch, state }, { index }) {
    const target = state.editMenu[index]
    if (target) {
      // 画像削除
      if (target.img.fileName !== '') {
        await menuClient.deleteImage(target.img)
      }
      // DB削除
      await menuClient.deleteMenu(target)
      // commit('deleteMenu', { index: index })
      // オーダー更新
      await dispatch('updateDispOrderAsync', { menuList: state.editMenu })
      // reload
      await dispatch('reloadEditMenu')
    } else {
      console.error('no target exists')
    }
  },
  async commitEditCategories({ state, dispatch }) {
    await menuClient.updateCategories(state.editCategories)
    await dispatch('reloadEditCategories')
  }
}

const menuUitl = {
  currentNo: 1,
  getTempUid() {
    this.currentNo++
    return 'temp_' + this.currentNo.toString()
  },
  reassingOrderNo(menu) {
    const changedItem = []
    let order = 1
    for (const me of menu) {
      if (me.disporder !== order) {
        me.disporder = order
        changedItem.push(me)
      }
      order++
    }
    return changedItem
  },
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
