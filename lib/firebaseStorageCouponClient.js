import firebase from '../plugins/firebase'

export class FirebaseStorageCouponClient {
  constructor() {
    this.storeRootPath = 'coupon/images'
  }
  async uploadCouponImage(image) {
    const path = await this.upload(
      image.fileUrl,
      {
        contentType: 'image/jpg',
        cacheControl: 'public,max-age=300'
      },
      this.storeRootPath + image.fileName
    )
    return path
  }
  async deleteCouponImage(image) {
    await this.delete(this.storeRootPath + image.fileName)
  }
  async upload(fileData, metaData, filePath) {
    try {
      const storageRef = firebase.storage().ref()
      const snapshot = await storageRef.child(filePath).put(fileData, metaData)
      return snapshot.ref.getDownloadURL()
    } catch (err) {
      console.error('upload is fail', err)
      throw err
    }
  }
  async delete(filePath) {
    try {
      const storageRef = firebase.storage().ref()
      await storageRef.child(filePath).delete()
    } catch (err) {
      console.error('delete is fail', err)
      throw err
    }
  }
}
