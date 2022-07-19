import { apiClient } from '@/utils/api.js'
import Cookies from 'js-cookie'

export const namespaced = true;

export const state = () => ({
    item: null,
    items: [],
    errors: {},
    current: null,
})

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
    current(state) {
        return state.current
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_ITEM(state, item) {
        state.item = item
    },
    SET_ERRORS(state, items) {
        state.errors = items
    },
    SET_CURRENT(state, item) {
        state.current = item
    }
}

export const actions = {
    async getParticipations({ commit }, roomId) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            const response = await client.apis.participation.getParticipations({
                room_id: roomId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEMS', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    async current({ commit }, roomId) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            const response = await client.apis.participation.my({
                room_id: roomId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_CURRENT', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)
        }
    },
}