import { apiClient } from '@/utils/api.js'
import Cookies from 'js-cookie'

export const namespaced = true;

export const state = () => ({
    currentUser: undefined,
    items: [],
    registrationErrors: {},
    loginError: undefined,
    errors: {},
    token: null
})

export const getters = {
    currentUser(state) {
        return state.currentUser
    },
    registrationErrors(state) {
        return state.registrationErrors
    },
    loginError(state) {
        return state.loginError
    },
    checkAuth(state) {
        return state.currentUser !== undefined
    },
    token(state) {
        return state.token
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_CURRENT_USER(state, item) {
        state.currentUser = item
    },
    SET_REGISTRATION_ERRORS(state, item) {
        state.registrationErrors = item
    },
    SET_LOGIN_ERROR(state, item) {
        state.loginError = item
    },
    UPDATE_PROFILE_PICTURE(state, profile_picture_path) {
        state.currentUser.profile_picture_path = profile_picture_path
    },
    LOGOUT_USER(state) {
        state.currentUser = undefined
        state.token = null
    },
    SET_ACCESS_TOKEN(state, item) {
        state.token = item
    }
}

export const actions = {
    async registerUser({ commit }, requestBody) {
        const client = await apiClient

        try {
            await client.apis.user.registerUser({}, { requestBody: requestBody })
            commit('SET_REGISTRATION_ERRORS', {})
        } catch (e) {
            //commit('SET_REGISTRATION_ERRORS', e.response.body.detail)
            console.error(e)
            return
        }
    },

    async authenticateUser({ commit }, requestBody) {
        const client = await apiClient

        try {
            var response = await client.apis.user.authenticateUser({}, { requestBody: requestBody })
            this.$cookies.set('token', response.body.access_token)
            commit('SET_ACCESS_TOKEN', response.body.access_token)
            commit('SET_LOGIN_ERROR', undefined)
        } catch (e) {
            console.error(e)
            commit('SET_LOGIN_ERROR', e.response.body.detail)
        }
    },
    async getCurrentUser({ commit }) {
        const client = await apiClient
        const accessToken = this.$cookies.get('token')
        
        try {
            const response = await client.apis.user.currentUserInfo({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
            commit('SET_CURRENT_USER', response.body)
        } catch (e) {
            //Cookies.remove('token')
            throw e
        }
    },
    async updateUser({ commit }, requestBody) {
        const client = await apiClient
        const accessToken = this.$cookies.get('token')

        try {
            const response = await client.apis.authentication.updateCurrentUser({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            commit('SET_CURRENT_USER', response.body)
            commit('SET_REGISTRATION_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_REGISTRATION_ERRORS', e.response.body.detail)
        }
    },
    async updateAvatar({ commit, state }, requestBody) {
        const client = await apiClient
        const accessToken = this.$cookies.get('token')
        
        try {
            const response = await client.apis.user.addProfilePicture({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            commit('UPDATE_PROFILE_PICTURE', response.body.profile_picture_path)
        } catch (e) {
            console.error(e)
        }
    },
    logoutUser({ commit }) {
      this.$cookies.remove('token')
        commit('LOGOUT_USER')
    }
}