import { FireStoreCouponClient } from './firebaseCouponClient'

export class CouponStatisticClinet {
  constructor() {
    this.repository = new FireStoreCouponClient()
  }
  async readCoupons() {
    const coupons = await this.repository.getEditTargetCoupon()
    return coupons
  }
}
