import Cookies from 'js-cookie'

export default async ({ store, req }) => {
    const token = Cookies.get('token')

    if (!store.getters['users/checkAuth'] && (token !== undefined)) {
        await store.dispatch('users/getCurrentUser')
    }
}