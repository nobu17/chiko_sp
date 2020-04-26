import firebaseAuthClient from '../lib/firebaseAuthClient'
import auth0AuthClient from '../lib/auth0AuthClient'

let alreadyDone = false

export default async ({ store }) => {
  if (alreadyDone) {
    return null
  }
  console.log('init auth')
  await firebaseAuthClient.init()
  await auth0AuthClient.init()
  console.log('init auth end')

  alreadyDone = true
  return null
}
