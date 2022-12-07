import Cookies from 'js-cookie'

export const namespaced = true

export const state = () => ({
    locale: 'ru',
    locales: {
        ru: 'Русский',
        'gb': 'English'
    }
})

export const getters = {
    locale: state => state.locale,
    locales: state => state.locales
}

export const mutations = {
    SET_LOCALE (state, { locale }) {
        state.locale = locale
    }
}

export const actions = {
    setLocale ({ commit }, { locale }) {
        commit('SET_LOCALE', { locale })

        Cookies.set('locale', locale, { expires: 365 })
    }
}