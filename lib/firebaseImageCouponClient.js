import firebase from '../plugins/firebase'
import timeUtil from './timeUtil'
// firestore client
export class FirebaseImageCouponClient {
  constructor() {
    this.collectionName = 'imageCoupons'
  }
  async read() {
    const snapShot = await firebase
      .firestore()
      .collection(this.collectionName)
      .limit(100)
      .get()
    if (snapShot) {
      const usage = snapShot.docs.map(m => {
        const temp = m.data({ serverTimestamps: 'estimate' }) // need this after udated time
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
  async edit(coupon) {
    if (coupon.id && coupon.id !== '') {
      console.log('edit')
      await firebase
        .firestore()
        .collection(this.collectionName)
        .doc(coupon.id)
        .update({
          title: coupon.title,
          message: coupon.message,
          password: coupon.password,
          disabled: coupon.disabled,
          img: coupon.img,
          last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    } else {
      console.log('add')
      await firebase
        .firestore()
        .collection(this.collectionName)
        .add({
          title: coupon.title,
          message: coupon.message,
          password: coupon.password,
          disabled: coupon.disabled,
          img: coupon.img,
          last_updated: firebase.firestore.FieldValue.serverTimestamp(),
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
  }
  async delete(id) {
    await firebase
      .firestore()
      .collection(this.collectionName)
      .doc(id)
      .delete()
  }
}
