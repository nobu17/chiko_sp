import firebase from '../plugins/firebase'
import timeUtil from './timeUtil'
// firestore client
export class FireStoreUserClient {
  constructor() {
    this.usersCollectionName = 'users'
  }
  async readUsers() {
    const snapShot = await firebase
      .firestore()
      .collection(this.usersCollectionName)
      .orderBy('last_updated', 'desc')
      .limit(50)
      .get()
    if (snapShot) {
      const usage = snapShot.docs.map(m => {
        const temp = m.data()
        temp.id = m.id
        temp.created = timeUtil.getDateStringUntilMinutes(temp.created.toDate())
        temp.last_updated = timeUtil.getDateStringUntilMinutes(
          temp.last_updated.toDate()
        )
        return temp
      })
      return usage
    } else {
      return []
    }
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
