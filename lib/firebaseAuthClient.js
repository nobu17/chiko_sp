import firebase from '../plugins/firebase'

export default {
  async init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    await this.onAuth()
  },
  async onAuth() {
    let user = await new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged(user => resolve(user))
      } catch (err) {
        reject(err)
      }
    })
    console.log('onAuthStateChanged', user)
    user = user || null
    window.$nuxt.$store.commit('auth/setLogginUser', user)
  },
  async login({ userId, password }) {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(userId, password)
      await this.onAuth()
      if (user) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  },
  async logout() {
    console.log('logout st')
    await firebase.auth().signOut()
    await this.onAuth()
    console.log('logout end')
  }
}
