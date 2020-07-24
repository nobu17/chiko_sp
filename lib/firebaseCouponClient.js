import firebase from '../plugins/firebase'
import timeUtil from './timeUtil'
// firestore client
export class FireStoreCouponClient {
  constructor() {
    this.couponCollectionName = 'coupons'
    this.couponUsageCollectionName = 'coupon_usage'
    this.couponUsageLogCollectionName = 'coupon_usage_log'
    this.couponUsageDateCollectionName = 'coupon_usage_date'
  }
  async getAvailableCouponsCount() {
    // get all coupons
    const coupons = await this.getCoupons()
    return coupons.length;
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
          continue
        }
      }
      availabled.push(coupon)
    }
    return availabled
  }
  async useCoupon(user, couponId) {
    // update usage number
    await this.incrementCouponUsage(couponId)
    // update usage of user
    await this.incrementCouponUsageOfUser(user.id, couponId)
    // update per-date,month number
    await this.incrementCouponUsageDate(couponId)
    // update usage log
    await this.addCouponUsageLog(user, couponId)
  }
  async incrementCouponUsage(couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .doc(couponId)
    const coupon = await doc.get()
    if (coupon.exists) {
      doc.update({
        used_number: coupon.data().used_number + 1
      })
    } else {
      console.error('no update target')
    }
  }
  async incrementCouponUsageDate(couponId) {
    const now = await timeUtil.getServerTime()
    const dateStr = timeUtil.getDateString(now)
    const monthStr = timeUtil.getMonthString(now)
    // console.log('current', { dateStr, monthStr })

    const doc = await firebase
      .firestore()
      .collection(this.couponUsageDateCollectionName)
      .doc(couponId)
    const usage = await doc.get()
    if (usage.exists) {
      const data = usage.data()
      console.log('current up', data)
      // increment current number
      let currentD = 0
      if (data.per_date_usage[dateStr]) {
        currentD = data.per_date_usage[dateStr]
      }
      let currentM = 0
      if (data.per_month_usage[monthStr]) {
        currentM = data.per_month_usage[monthStr]
      }
      data.per_date_usage[dateStr] = currentD + 1
      data.per_month_usage[monthStr] = currentM + 1
      doc.update({
        per_date_usage: data.per_date_usage,
        per_month_usage: data.per_month_usage
      })
    } else {
      // create new
      const perDate = {}
      const perMonth = {}
      perDate[dateStr] = 1
      perMonth[monthStr] = 1

      doc.set({
        per_date_usage: perDate,
        per_month_usage: perMonth
      })
    }
  }
  async incrementCouponUsageOfUser(userId, couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponUsageCollectionName)
      .doc(userId)
    const usage = await doc.get()
    if (usage.exists) {
      const nums = usage.data().used_number
      // increment usage number
      if (nums[couponId]) {
        nums[couponId] = nums[couponId] + 1
      } else {
        nums[couponId] = 1
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
          used_number: nums
        })
    }
  }
  async addCouponUsageLog(user, coupondId) {
    await firebase
      .firestore()
      .collection(this.couponUsageLogCollectionName)
      .add({
        coupon_id: coupondId,
        user_id: user.id,
        user_name: user.name,
        used_time: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
  async getCouponUsageLog(couponId) {
    const snapShot = await firebase
      .firestore()
      .collection(this.couponUsageLogCollectionName)
      .where('coupon_id', '==', couponId)
      .orderBy('used_time', 'desc')
      .limit(100)
      .get()
    if (snapShot) {
      const usage = snapShot.docs.map(m => {
        const temp = m.data()
        temp.id = m.id
        temp.used_time = timeUtil.getDateStringUntilMinutes(
          temp.used_time.toDate()
        )
        return temp
      })
      return usage
    } else {
      return []
    }
  }
  async getCouponUsageLogByUser(userId) {
    const snapShot = await firebase
      .firestore()
      .collection(this.couponUsageLogCollectionName)
      .where('user_id', '==', userId)
      .orderBy('used_time', 'desc')
      .limit(100)
      .get()
    if (snapShot) {
      const usage = snapShot.docs.map(m => {
        const temp = m.data()
        temp.id = m.id
        temp.used_time = timeUtil.getDateStringUntilMinutes(
          temp.used_time.toDate()
        )
        return temp
      })
      return usage
    } else {
      return []
    }
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
  async editCoupon(coupon) {
    console.log('editCoupon', coupon)
    if (coupon.id && coupon.id !== '') {
      console.log('edit')
      await firebase
        .firestore()
        .collection(this.couponCollectionName)
        .doc(coupon.id)
        .update({
          title: coupon.title,
          message: coupon.message,
          disabled: coupon.disabled,
          disporder: coupon.disporder,
          limit_usage: coupon.limit_usage,
          img: coupon.img
        })
    } else {
      console.log('add')
      await firebase
        .firestore()
        .collection(this.couponCollectionName)
        .add({
          title: coupon.title,
          message: coupon.message,
          disabled: coupon.disabled,
          disporder: coupon.disporder,
          limit_usage: coupon.limit_usage,
          img: coupon.img,
          used_number: 0
        })
    }
  }
  async getEditTargetCoupon() {
    const snapShot = await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .orderBy('disporder', 'asc')
      .get()
    const coupons = snapShot.docs.map(m => {
      const temp = m.data()
      temp.id = m.id
      return temp
    })
    return coupons
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
  async deleteCoupon(id) {
    await firebase
      .firestore()
      .collection(this.couponCollectionName)
      .doc(id)
      .delete()
  }
  async updateCouponDispOrder(coupons) {
    const collection = await firebase
      .firestore()
      .collection(this.couponCollectionName)
    for (const coupon of coupons) {
      await collection.doc(coupon.id).update({
        disporder: coupon.disporder
      })
    }
  }
  async getCouponUsage(userId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponUsageCollectionName)
      .doc(userId)
      .get()
    if (doc.exists) {
      return doc.data().used_number
    } else {
      return {}
    }
  }
  async getCouponUsageDate(couponId) {
    const doc = await firebase
      .firestore()
      .collection(this.couponUsageDateCollectionName)
      .doc(couponId)
      .get()
    if (doc.exists) {
      return doc.data()
    } else {
      return {}
    }
  }
}
