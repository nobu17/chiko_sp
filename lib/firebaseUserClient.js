import firebase from '../plugins/firebase'
// firestore client
export class FireStoreUserClient {
  constructor() {
    this.usersCollectionName = 'users'
  }
  async editUser(user) {
    const doc = await firebase
      .firestore()
      .collection(this.usersCollectionName)
      .doc(user.id)
    const data = await doc.get()
    if (data.exists) {
      doc.update({
        name: user.name,
        nickname: user.nickname,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
      })
    } else {
      // create new
      doc.set({
        name: user.name,
        nickname: user.nickname,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }
}
