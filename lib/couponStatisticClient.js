import { FireStoreCouponClient } from './firebaseCouponClient'

export class CouponStatisticClinet {
  constructor() {
    this.repository = new FireStoreCouponClient()
  }
  async readCouponsAsync() {
    const coupons = await this.repository.getEditTargetCoupon()
    return coupons
  }
  async readCouponsUsageDataAsync(couponId) {
    const usage = await this.repository.getCouponUsageDate(couponId)
    const log = await this.repository.getCouponUsageLog(couponId)
    return { usage: usage, log: log }
  }
  async readCouponUserUsage(userId) {
    const usage = await this.repository.getCouponUsage(userId)
    return usage
  }
}
