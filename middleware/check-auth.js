export default async ({ store, redirect, app, route, error }) => {
  const token = app.$cookies.get('token')
  const user = store.getters['users/checkAuth']

  if(token && !user){
    try {
      await store.dispatch('users/getCurrentUser')
    } catch(error) {
      app.$cookies.remove('token')
      await store.commit('users/SET_ACCESS_TOKEN', undefined)
      await store.commit('users/SET_CURRENT_USER', undefined)
      redirect('/login')
    }
  }
}