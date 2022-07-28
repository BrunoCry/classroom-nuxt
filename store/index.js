import Cookies from 'js-cookie'
import { cookieFromRequest } from '@/utils/utils.js'

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        const token = cookieFromRequest(req, 'token')
        if (token) {
            commit('users/SET_ACCESS_TOKEN', token)
        }

        const locale = cookieFromRequest(req, 'locale')
        if (locale) {
            commit('locale/SET_LOCALE', { locale })
        }
    },

    nuxtClientInit ({ commit, getters }) {
        const token = Cookies.get('token')
        if (token && !getters['users/token']) {
            commit('users/SET_ACCESS_TOKEN', token)
        }

        const locale = Cookies.get('locale')
        if (locale && !getters['locale/locale']) {
            commit('locale/SET_LOCALE', { locale })
        }
    }
}