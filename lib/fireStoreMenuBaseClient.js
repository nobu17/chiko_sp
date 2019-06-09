import firebase from '../plugins/firebase'

// firestore client
export class FireStoreMenuBaseClient {
  constructor(menuCollectionName, categorKeyName) {
    this.menuCollectionName = menuCollectionName
    this.categorKeyName = categorKeyName
  }
  async getMenus() {
    const snapShot = await firebase
      .firestore()
      .collection(this.menuCollectionName)
      .orderBy('disporder', 'asc')
      .get()
    return snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
  }
  async addMenu(menu) {
    await firebase
      .firestore()
      .collection(this.menuCollectionName)
      .add({
        comment: menu.comment,
        name: menu.name,
        price: menu.price,
        disporder: menu.disporder,
        img: menu.img,
        category: menu.category
      })
  }
  async updateMenu(menu) {
    await firebase
      .firestore()
      .collection(this.menuCollectionName)
      .doc(menu.id)
      .update({
        comment: menu.comment,
        name: menu.name,
        price: menu.price,
        disporder: menu.disporder,
        img: menu.img,
        category: menu.category
      })
  }
  async deleteMenu(menu) {
    await firebase
      .firestore()
      .collection(this.menuCollectionName)
      .doc(menu.id)
      .delete()
  }
  async updateMenusOrder(menus) {
    const collection = await firebase
      .firestore()
      .collection(this.menuCollectionName)
    for (const item of menus) {
      await collection.doc(item.id).update({
        disporder: item.disporder
      })
    }
  }
  async getCategories() {
    const doc = await firebase
      .firestore()
      .collection('menuCategories')
      .doc(this.categorKeyName)
      .get()
    if (doc.exists) {
      return doc.data().lists
    } else {
      throw Error(`doc is no exists ${this.categorKeyName}`)
    }
  }
  async updateCategories(categories) {
    await firebase
      .firestore()
      .collection('menuCategories')
      .doc(this.categorKeyName)
      .update({
        lists: categories
      })
  }
}
