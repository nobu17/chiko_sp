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
        console.error('getServerTime failed')
        reject(err)
      }
    })
  },
  // get yyyy/mm/dd string
  getDateString(dt) {
    const y = dt.getFullYear()
    const m = ('00' + (dt.getMonth() + 1)).slice(-2)
    const d = ('00' + dt.getDate()).slice(-2)
    const result = y + '/' + m + '/' + d
    return result
  },
  // get yyyy/mm string
  getMonthString(dt) {
    const y = dt.getFullYear()
    const m = ('00' + (dt.getMonth() + 1)).slice(-2)
    const result = y + '/' + m
    return result
  }
}
