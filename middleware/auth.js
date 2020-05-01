import firebaseAuthClient from '../lib/firebaseAuthClient'
export default async ({ store, route, redirect }) => {
  console.log('meta', route.meta)
  if (['/'].includes(route.path)) {
    return
  }

  const isAuthed = store.getters['auth/isLogined']
  if (isAuthed && route.path === '/login') {
    return redirect('/')
  }

  if (isAuthed && route.path === '/logout') {
    await firebaseAuthClient.logout()
    return redirect('/')
  }
  if (route.meta[0]) {
    // for admin auth
    const requiredAuth = route.meta[0].requiredAuth
    console.log('requiredAuth', requiredAuth)
    if (!isAuthed && requiredAuth && route.path !== '/login') {
      const query = route.path ? '?redirect=' + route.path : ''
      return redirect('/login' + query)
    }
  }

  // for user auth
  const isUserAuthed = store.getters['user_auth/isLogined']
  if (isUserAuthed && route.path === '/user/login') {
    return redirect('/user/coupon')
  }

  if (route.meta[0]) {
    // for admin auth
    const requiredUserAuth = route.meta[0].requiredUserAuth
    console.log('requiredUserAuth', requiredUserAuth)
    if (!isUserAuthed && requiredUserAuth && route.path !== '/user/login') {
      const query = route.path ? '?redirect=' + route.path : ''
      return redirect('/user/login' + query)
    }
  }
}
