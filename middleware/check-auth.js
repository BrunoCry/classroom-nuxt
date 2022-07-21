import Cookies from 'js-cookie'

export default async ({ store, req }) => {
    const token = Cookies.get('token')

    if (!store.getters['users/checkAuth'] && token) {
        await store.dispatch('users/getCurrentUser')
    }
}