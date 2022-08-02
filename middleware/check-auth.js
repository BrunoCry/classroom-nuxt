export default async ({ store, req, app }) => {
    const token = app.$cookies.get('token')

    if (!store.getters['users/checkAuth'] && token) {
        store.dispatch('users/getCurrentUser')
    }
}