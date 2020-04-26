import firebase from '../plugins/firebase'

export default {
  async getServerTime() {
    // ダミーのコレクションにサーバー時刻を書き込む
    const ref = await firebase
      .firestore()
      .collection('dummy_for_time_get') // 任意のダミーコレクション名
      .doc('time')
    await ref.set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    return new Promise((resolve, reject) => {
      try {
        // 書き込みが終わったらデータを取得して返す
        ref.onSnapshot(snapshot => {
          const timestamp = snapshot.data().timestamp
          resolve(timestamp.toDate())
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
