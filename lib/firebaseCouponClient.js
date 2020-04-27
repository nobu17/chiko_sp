import firebase from '../plugins/firebase'
import timeUtil from './timeUtil'
// firestore client
export class FireStoreCouponClient {
  constructor() {
    this.couponCollectionName = 'coupons'
    this.couponUsageCollectionName = 'coupon_usage'
    this.couponUsageLogCollectionName = 'coupon_usage_log'
  }
  async getAvailaleCoupons(userId) {
    // get all coupons
    const coupons = await this.getCoupons()
    // get used coupon information
    const usedCoupons = await this.getCouponUsage(userId)
    // add user usage number
    const availabled = []
    for (const coupon of coupons) {
      coupon.used_number = 0
      // 0 means nolimit
      if (coupon.limit_usage !== 0) {
        // check user usage number
        if (usedCoupons[coupon.id]) {
          coupon.used_number = usedCoupons[coupon.id]
        }
        // if over usage limit, should not add
        if (coupon.used_number >= coupon.limit_usage) {
          return
        }
      }
      availabled.push(coupon)
    }
    return availabled
  }
  async useCoupon(userId, couponId) {
    // update usage number
    await this.incrementCouponUsage(couponId)
    // update usage of user
    await this.incrementCouponUsageOfUser(userId, couponId)
    // update usage log
    await this.addCouponUsageLog(userId, couponId)
  }
  async incrementCouponUsage(couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .doc(couponId)
    const coupon = await doc.get()
    if (coupon.exists) {
      doc.update({
        used_number: coupon.used_number + 1
      })
    } else {
      console.error('no update target')
    }
  }
  async incrementCouponUsageOfUser(userId, couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponUsageCollectionName)
      .doc(userId)
    const usage = await doc.get()
    if (usage.exists) {
      const nums = usage.data().used_numbers
      // increment usage number
      if (nums[couponId]) {
        nums[couponId] = nums[couponId] + 1
      } else {
        nums[couponId] = 0
      }
      doc.update({
        used_number: nums
      })
    } else {
      // create new
      const nums = {}
      nums[couponId] = 1
      await firebase
        .firestore()
        .collection(this.couponUsageCollectionName)
        .doc(userId)
        .set({
          used_numbers: nums
        })
    }
  }
  async addCouponUsageLog(userId, coupondId) {
    const timeStamp = await timeUtil.getServerTime()
    await firebase
      .firestore()
      .collection(this.couponUsageLogCollectionName)
      .add({
        coupon_id: coupondId,
        user_id: userId,
        used_time: timeStamp
      })
  }
  async getCoupon(couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .doc(couponId)
      .get()
    if (doc.exists) {
      return doc.data()
    } else {
      return null
    }
  }
  async getCoupons() {
    const snapShot = await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .where('disabled', '==', false)
      .orderBy('disporder', 'asc')
      .get()
    const coupons = snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
    return coupons
  }
  async getCouponUsage(userId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponUsageCollectionName)
      .doc(userId)
      .get()
    if (doc.exists) {
      return doc.data().used_numbers
    } else {
      return {}
    }
  }
}
