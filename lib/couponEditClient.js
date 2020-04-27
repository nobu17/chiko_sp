import { FireStoreCouponClient } from './firebaseCouponClient'
import { FirebaseStorageCouponClient } from './firebaseStorageCouponClient'

export class CouponEditClinet {
  constructor() {
    this.repository = new FireStoreCouponClient()
    this.storage = new FirebaseStorageCouponClient()
  }
  async readEditCoupons() {
    const coupons = await this.repository.getEditTargetCoupon()
    return coupons
  }
  async editCouponAsync(coupon) {
    await this.repository.editCoupon(coupon)
  }
  async updateCouponDispOrderAsync(coupons) {
    await this.repository.updateCouponDispOrder(coupons)
  }
  async deleteCouponAsync(id) {
    await this.repository.deleteCoupon(id)
  }
  async addImage(image) {
    const path = await this.storage.uploadCouponImage(image)
    return path
  }
  async deleteImage(image) {
    await this.storage.deleteCouponImage(image)
  }
}
