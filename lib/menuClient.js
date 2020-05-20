import { FireStoreMenuBaseClient } from './FireStoreMenuBaseClient'
import { FirebaseStorageMenuClient } from './firebaseStorageMenuClient'

export class MenuClientFactory {
  static getClient(menuType) {
    switch (menuType) {
      case 'morning':
        return new MorningMenuClient()
      case 'lunch':
        return new LunchMenuClient()
      case 'dinner':
        return new DinnerMenuClient()
      case 'takeout':
        return new TakeoutMenuClient()
      default:
        throw Error('no support type:' + menuType)
    }
  }
}

class MenuEditClient {
  constructor(repository, storage) {
    this.repository = repository
    this.storage = storage
  }

  async getMenus() {
    const menus = await this.repository.getMenus()
    return menus
  }

  async addMenu(menu) {
    await this.repository.addMenu(menu)
  }

  async updateMenu(menu) {
    await this.repository.updateMenu(menu)
  }

  async updateMenusDispOrder(menus) {
    await this.repository.updateMenusOrder(menus)
  }

  async deleteMenu(menu) {
    await this.repository.deleteMenu(menu)
  }

  async getCategories() {
    const cat = await this.repository.getCategories()
    return cat
  }

  async updateCategories(categories) {
    await this.repository.updateCategories(categories)
  }

  async addImage(image) {
    const path = await this.storage.uploadMenuImage(image)
    return path
  }

  async deleteImage(image) {
    await this.storage.deleteMenuImage(image)
  }
}

class LunchMenuClient extends MenuEditClient {
  constructor() {
    const repository = new FireStoreMenuBaseClient('lunchMenu', 'lunch')
    const storage = new FirebaseStorageMenuClient('menu/lunch')
    super(repository, storage)
  }
}

class DinnerMenuClient extends MenuEditClient {
  constructor() {
    const repository = new FireStoreMenuBaseClient('dinnerMenu', 'dinner')
    const storage = new FirebaseStorageMenuClient('menu/dinner')
    super(repository, storage)
  }
}

class MorningMenuClient extends MenuEditClient {
  constructor() {
    const repository = new FireStoreMenuBaseClient('morningMenu', 'morning')
    const storage = new FirebaseStorageMenuClient('menu/morning')
    super(repository, storage)
  }
}

class TakeoutMenuClient extends MenuEditClient {
  constructor() {
    const repository = new FireStoreMenuBaseClient('takeoutMenu', 'takeout')
    const storage = new FirebaseStorageMenuClient('menu/takeout')
    super(repository, storage)
  }
}
