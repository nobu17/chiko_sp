import firebase from '../plugins/firebase'

export default {
  async uploadMenuImageList(menuType, imageList) {
    for (const image of imageList) {
      await this.uploadMenuImage(menuType, image)
    }
  },
  async uploadMenuImage(menuType, image) {
    const dir = menuPathUtil.getFileDir(menuType)
    const path = await this.upload(
      image.fileUrl,
      {
        contentType: 'image/jpg',
        cacheControl: 'public,max-age=300'
      },
      dir + image.fileName
    )
    return path
  },
  async deleteMenuImageList(menuType, imageList) {
    for (const image of imageList) {
      await this.deleteMenuImage(menuType, image)
    }
  },
  async deleteMenuImage(menuType, image) {
    const dir = menuPathUtil.getFileDir(menuType)
    await this.delete(dir + image.fileName)
  },
  async upload(fileData, metaData, filePath) {
    try {
      console.log('fileData', fileData)
      console.log('filePath', filePath)
      const storageRef = firebase.storage().ref()
      const snapshot = await storageRef.child(filePath).put(fileData, metaData)
      return snapshot.ref.getDownloadURL()
    } catch (err) {
      console.error('upload is fail', err)
      throw err
    }
  },
  async delete(filePath) {
    try {
      const storageRef = firebase.storage().ref()
      await storageRef.child(filePath).delete()
    } catch (err) {
      console.error('delete is fail', err)
      // throw err
    }
  }
}

const menuPathUtil = {
  getFileDir(menuType) {
    if (menuType === 'dinner') {
      return 'menu/dinner/'
    }
    if (menuType === 'lunch') {
      return 'menu/lunch/'
    }
    if (menuType === 'drink') {
      return 'menu/drink/'
    }
    throw Error('no support type' + menuType)
  }
}
