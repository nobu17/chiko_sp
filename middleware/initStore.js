import firebaseAuthClient from '../lib/firebaseAuthClient'
import auth0AuthClient from '../lib/auth0AuthClient'
import microcmsClient from '../lib/microcmsClient'

let alreadyDone = false

export default async ({ store, $axios }) => {
  if (alreadyDone) {
    return null
  }
  console.log('init auth')
  await firebaseAuthClient.init()
  await auth0AuthClient.init()
  microcmsClient.init($axios)
  console.log('init auth end')

  alreadyDone = true
  return null
}
