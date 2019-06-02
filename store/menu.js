import base64ToBlob from 'b64-to-blob'
import firebaseDbClient from '../lib/firebaseDbClient'
// import firebaseStorageClient from '../lib/firebaseStorageClient'

import uuid from '../lib/uuid'
import firebaseStorageClient from '../lib/firebaseStorageClient'

const menuClient = {
  init(menuType) {
    this.menuType = menuType
  },
  async addImage(image) {
    const path = await firebaseStorageClient.uploadMenuImage(
      this.menuType,
      image
    )
    return path
  },
  async deleteImage(image) {
    await firebaseStorageClient.deleteMenuImage(this.menuType, image)
  },
  async readMenu() {
    let menu = []
    if (this.isEditDinner()) {
      menu = await firebaseDbClient.getDinnerMenu()
    } else if (this.isEditLunch()) {
      menu = await firebaseDbClient.getLunchMenu()
    } else if (this.isEditDrink()) {
      menu = await firebaseDbClient.getDrinkMenu()
    } else {
      throw Error('no match edit type:' + this.menuType)
    }
    // 編集前画像情報を設定して保持させる
    for (const me of menu) {
      me.beforeImg = JSON.parse(JSON.stringify(me.img))
    }
    return menu
  },
  async addMenu(menu) {
    menu.isNewItem = true
    await this.editMenu(menu)
  },
  async editMenu(menu) {
    if (this.isEditDinner()) {
      await firebaseDbClient.updateDinnerMenu(menu)
    } else if (this.isEditLunch()) {
      await firebaseDbClient.updateLunchMenu(menu)
    } else if (this.isEditDrink()) {
      await firebaseDbClient.updateDrinkMenu(menu)
    } else {
      throw Error('no match edit type', this.menuType)
    }
  },
  async deleteMenu(menu) {
    if (this.isEditDinner()) {
      await firebaseDbClient.deleteDinnerMenu(menu)
    } else if (this.isEditLunch()) {
      await firebaseDbClient.deleteLunchMenu(menu)
    } else if (this.isEditDrink()) {
      await firebaseDbClient.deleteDrinkMenu(menu)
    } else {
      throw Error('no match edit type', this.menuType)
    }
  },
  async updateMenuDispOrder(menuList) {
    if (this.isEditDinner()) {
      await firebaseDbClient.updateDinnerMenuOrder(menuList)
    } else if (this.isEditLunch()) {
      await firebaseDbClient.updateLunchMenuOrder(menuList)
    } else if (this.isEditDrink()) {
      await firebaseDbClient.updateDrinkMenuOrder(menuList)
    } else {
      throw Error('no match edit type', this.menuType)
    }
  },
  isEditDinner() {
    if (this.menuType === 'dinner') {
      return true
    }
    return false
  },
  isEditLunch() {
    if (this.menuType === 'lunch') {
      return true
    }
    return false
  },
  isEditDrink() {
    if (this.menuType === 'drink') {
      return true
    }
    return false
  }
}

export const state = () => ({
  lunchMenu: [],
  dinnerMenu: [],
  drinkMenu: [],
  editMenu: [],
  editMenuType: ''
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
  },
  editMenu(state) {
    return state.editMenu
  },
  isEditDinner(state) {
    if (state.editMenuType === 'dinner') {
      return true
    }
    return false
  },
  isEditLunch(state) {
    if (state.editMenuType === 'lunch') {
      return true
    }
    return false
  },
  isEditDrink(state) {
    if (state.editMenuType === 'drink') {
      return true
    }
    return false
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
  },
  setEditMenu(state, { menu, editMenuType }) {
    state.editMenu = menu
    if (editMenuType) {
      state.editMenuType = editMenuType
    }
  },
  setEditMenuWithReDispOrder(state, { editMenu }) {
    state.editMenu = editMenu
    menuUitl.reassingOrderNo(state.editMenu)
  },
  addMenu(state, { item }) {
    // add temp id for list
    item.id = menuUitl.getTempUid()
    state.editMenu.push(item)
    menuUitl.reassingOrderNo(state.editMenu)
  },
  editMenu(state, { index, item }) {
    state.editMenu.splice(index, 1, item)
    menuUitl.reassingOrderNo(state.editMenu)
  },
  deleteMenu(state, { index }) {
    state.editMenu.splice(index, 1)
    menuUitl.reassingOrderNo(state.editMenu)
  },
  setEditMenuType(state, { editMenuType }) {
    state.editMenuType = editMenuType
  }
}

export const actions = {
  async deleteMenuAsync({ commit, dispatch, state }, { index }) {
    const target = state.editMenu[index]
    if (target) {
      menuClient.init(state.editMenuType)
      // 画像削除
      if (target.img.fileName !== '') {
        console.log('delete image start:', target.img)
        await menuClient.deleteImage(target.img)
        console.log('delete image end:')
      }
      // DB削除
      await menuClient.deleteMenu(target)
      commit('deleteMenu', index)
      // オーダー更新
      console.log('update order start')
      await dispatch('updateDispOrderAsync', { menuList: state.editMenu })
      console.log('update order end')
      // reload
      await dispatch('reloadEditMenu')
    } else {
      console.error('no target exists')
    }
  },
  async addMenuAsync({ dispatch, state }, { menu }) {
    menuClient.init(state.editMenuType)
    // 表示順序を設定
    menu.disporder = state.editMenu.length + 1
    console.log('order', menu.disporder)
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
    menuClient.init(state.editMenuType)
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
    console.log('updateList', changedItems)
    if (changedItems.length > 0) {
      await menuClient.updateMenuDispOrder(changedItems)
    }
    console.log('updateEnd')
    // reload
    await dispatch('reloadEditMenu')
  },
  async reloadEditMenu({ commit }) {
    const menu = await menuClient.readMenu()
    commit('setEditMenu', { menu: menu })
  },
  async readEditMenu({ commit }, { editMenuType }) {
    commit('setEditMenuType', { editMenuType: editMenuType })
    menuClient.init(editMenuType)
    const menu = await menuClient.readMenu()
    commit('setEditMenu', { menu: menu })
  },
  async readLunchMenu({ commit }, { isEditMode }) {
    let lunch = await firebaseDbClient.getLunchMenu()
    if (lunch) {
      lunch = imageUtl.getReLocateImage(lunch)
      commit('setLunchMenu', lunch)
    }
    if (isEditMode) {
      commit('setEditMenu', { menu: lunch, editMenuType: 'lunch' })
    }
  },
  async readDinnerMenu({ commit }, { isEditMode }) {
    let dinner = await firebaseDbClient.getDinnerMenu()
    if (dinner) {
      dinner = imageUtl.getReLocateImage(dinner)
      commit('setDinnerMenu', dinner)
    }
    if (isEditMode) {
      commit('setEditMenu', { menu: dinner, editMenuType: 'dinner' })
    }
  },
  async readDrinkMenu({ commit }, { isEditMode }) {
    let drink = await firebaseDbClient.getDrinkMenu()
    if (drink) {
      drink = imageUtl.getReLocateImage(drink)
      commit('setDrinkMenu', drink)
    }
    if (isEditMode) {
      commit('setEditMenu', { menu: drink, editMenuType: 'drink' })
    }
  },
  async readAllMenu({ dispatch }) {
    await dispatch('readLunchMenu')
    await dispatch('readDinnerMenu')
    await dispatch('readDrinkMenu')
  }
}

const imageUtl = {
  getReLocateImage(menu) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].img) {
        menu[i].img = {
          fileName: (i + 1).toString() + '.jpg',
          fileUrl: menu[i].img
        }
      } else {
        menu[i].img = {
          fileName: '',
          fileUrl: ''
        }
      }
    }
    return menu
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
  }
}
