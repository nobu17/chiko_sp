import firebase from '../plugins/firebase'

export default {
  async getDrinkMenu() {
    const snapShot = await firebase
      .firestore()
      .collection('drinkMenu')
      .orderBy('disporder', 'desc')
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
      .orderBy('disporder', 'desc')
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
      .orderBy('disporder', 'desc')
      .get()
    return snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
  }
}
