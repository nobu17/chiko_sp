import { FirebaseImageCouponClient } from './firebaseImageCouponClient'
import { FirebaseStorageImageCouponClient } from './firebaseStorageImageCouponClient'

export class ImageCouponClient {
  constructor() {
    this.repository = new FirebaseImageCouponClient()
    this.storage = new FirebaseStorageImageCouponClient()
  }
  async readAsync() {
    const coupons = await this.repository.read()
    return coupons
  }
  async editAsync(coupon) {
    await this.repository.edit(coupon)
  }
  async deleteAsync(id) {
    await this.repository.delete(id)
  }
  async addImageAsync(image) {
    const path = await this.storage.uploadCouponImage(image)
    return path
  }
}
