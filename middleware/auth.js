import firebaseAuthClient from '../lib/firebaseAuthClient'
export default async ({ store, route, redirect }) => {
  if (['/'].includes(route.path)) {
    return
  }

  const isAuthed = store.getters['auth/isLogined']
  console.log('is', isAuthed)
  if (isAuthed && route.path === '/login') {
    return redirect('/')
  }

  if (isAuthed && route.path === '/logout') {
    await firebaseAuthClient.logout()
    return redirect('/')
  }
  if (route.meta[0]) {
    const requiredAuth = route.meta[0].requiredAuth
    console.log('requiredAuth', requiredAuth)
    if (!isAuthed && requiredAuth && route.path !== '/login') {
      const query = route.path ? '?redirect=' + route.path : ''
      return redirect('/login' + query)
    }
  }
}
