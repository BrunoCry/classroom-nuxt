import Cookies from 'js-cookie'

export default async ({ store, req }) => {
    const token = Cookies.get('token')

    if (!store.getters['users/checkAuth'] && token) {
        try {
            await store.dispatch('users/getCurrentUser')
        } catch (e) {
            console.error(e)
        }
    }
}