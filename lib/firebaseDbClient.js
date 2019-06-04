import firebase from '../plugins/firebase'

export default {
  async getDrinkMenu() {
    const snapShot = await firebase
      .firestore()
      .collection('drinkMenu')
      .orderBy('disporder', 'asc')
      .get()
    return snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
  },
  async getLunchMenu() {
    const snapShot = await firebase
      .firestore()
      .collection('lunchMenu')
      .orderBy('disporder', 'asc')
      .get()
    return snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
  },
  async getDinnerMenu() {
    const snapShot = await firebase
      .firestore()
      .collection('dinnerMenu')
      .orderBy('disporder', 'asc')
      .get()
    return snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
  },
  async getCategories(menuType) {
    const doc = await firebase
      .firestore()
      .collection('menuCategories')
      .doc(menuType)
      .get()
    if (doc.exists) {
      return doc.data().lists
    } else {
      throw Error(`doc is no exists ${menuType}`)
    }
  },
  async updateDinnerMenuOrder(menuList) {
    const db = await firebase.firestore().collection('dinnerMenu')
    await this.updateOrder(db, menuList)
  },
  async updateLunchMenuOrder(menuList) {
    const db = await firebase.firestore().collection('lunchMenu')
    await this.updateOrder(db, menuList)
  },
  async updateDrinkMenuOrder(menuList) {
    const db = await firebase.firestore().collection('drinkMenu')
    await this.updateOrder(db, menuList)
  },
  async updateOrder(collection, menuList) {
    console.log('update menuList', menuList)
    for (const item of menuList) {
      await collection.doc(item.id).update({
        disporder: item.disporder
      })
    }
  },
  async updateDinnerMenu(menu) {
    const db = await firebase.firestore().collection('dinnerMenu')
    await this.updateMenu(db, menu)
  },
  async updateDrinkMenu(menu) {
    const db = await firebase.firestore().collection('drinkMenu')
    await this.updateMenu(db, menu)
  },
  async updateLunchMenu(menu) {
    const db = await firebase.firestore().collection('lunchMenu')
    await this.updateMenu(db, menu)
  },
  async deleteDinnerMenu(menu) {
    const db = await firebase.firestore().collection('dinnerMenu')
    await this.deleteMenu(db, menu)
  },
  async deleteDrinkMenu(menu) {
    const db = await firebase.firestore().collection('drinkMenu')
    await this.deleteMenu(db, menu)
  },
  async deleteLunchMenu(menu) {
    const db = await firebase.firestore().collection('lunchMenu')
    await this.deleteMenu(db, menu)
  },
  async updateMenu(collection, menu) {
    if (menu.isNewItem) {
      await collection.add({
        comment: menu.comment,
        name: menu.name,
        price: menu.price,
        disporder: menu.disporder,
        img: menu.img,
        category: menu.category
      })
    } else {
      await collection.doc(menu.id).update({
        comment: menu.comment,
        name: menu.name,
        price: menu.price,
        disporder: menu.disporder,
        img: menu.img,
        category: menu.category
      })
    }
  },
  async deleteMenu(collection, menu) {
    console.log('delete item', menu)
    await collection.doc(menu.id).delete()
  }
}
