import { loadLocale } from '~/plugins/i18n'

export default async ({ store, redirect, app, route, error }) => {
  const token = app.$cookies.get('token')
  const user = store.getters['users/checkAuth']
  if(token && !user){
    await store.dispatch('users/getCurrentUser')
  }
  if(!token && route.meta[0].requiresAuth || route?.meta?.requiresAuth ) {
    return redirect('/login')
  }
  if(!token) {
    await store.commit('users/SET_CURRENT_USER', undefined)
  }
}