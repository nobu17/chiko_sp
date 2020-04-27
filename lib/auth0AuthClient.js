import createAuth0Client from '@auth0/auth0-spa-js'
import auth0Config from '../plugins/auth0'

let instance

const Auth0AuthClient = {
  async init() {
    instance = await createAuth0Client({
      domain: auth0Config.domain,
      client_id: auth0Config.client_id
    })
    // check auth state
    if (await instance.isAuthenticated()) {
      const user = await instance.getUser()
      window.$nuxt.$store.commit('user_auth/setLogginUser', user)
    }
  },
  async login() {
    await instance.loginWithPopup()
    const user = await instance.getUser()
    return user
  },
  async loginWithRedirect(url) {
    await instance.loginWithRedirect({
      redirect_uri: url
    })
    const user = await instance.getUser()
    return user
  },
  async logout() {
    await instance.logout()
  }
}

export default Auth0AuthClient
