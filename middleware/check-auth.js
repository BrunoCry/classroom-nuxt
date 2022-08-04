import { loadLocale } from '~/plugins/i18n'

export default async ({ store, redirect, app, route }) => {
    const token = app.$cookies.get('token')
    if (route.meta.requiresAuth) {
      if (!store.getters['users/checkAuth']) {
        try {
            await store.dispatch('users/getCurrentUser')
        }
        catch {
            app.$cookies.remove('token')
            return redirect('/login')
        }
    }
  }
}