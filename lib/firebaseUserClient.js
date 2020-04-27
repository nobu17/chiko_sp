import firebase from '../plugins/firebase'
import timeUtil from './timeUtil'
// firestore client
export class FireStoreUserClient {
  constructor() {
    this.usersCollectionName = 'users'
  }
  async editUser(user) {
    const now = await timeUtil.getServerTime()
    const doc = await firebase
      .firestore()
      .collection(this.usersCollectionName)
      .doc(user.id)
    const data = await doc.get()
    if (data.exists) {
      doc.update({
        name: user.name,
        nickname: user.nickname,
        last_updated: now
      })
    } else {
      // create new
      doc.set({
        name: user.name,
        nickname: user.nickname,
        last_updated: now,
        created: now
      })
    }
  }
}
