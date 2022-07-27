export default async ({ store, req, app }) => {
    const token = app.$cookies.get('token')

    if (!store.getters['users/checkAuth'] && token) {
        try {
            await store.dispatch('users/getCurrentUser')
        } catch (e) {
            console.error(e)
        }
    }
}