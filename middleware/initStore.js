import firebaseAuthClient from '../lib/firebaseAuthClient'

let alreadyDone = false

export default async ({ store }) => {
  if (alreadyDone) {
    return null
  }
  console.log('init auth')
  await firebaseAuthClient.init()
  console.log('init auth end')
  alreadyDone = true
  return null
}
