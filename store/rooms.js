import { apiClient } from '@/utils/api.js'
import Cookies from 'js-cookie'

export const namespaced = true;

export const state = () => ({
    item: null,
    items: [],
    errors: {},
    canModerate: false,
})

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
    errors(state) {
        return state.errors
    },
    canModerate(state) {
        return state.canModerate
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
    SET_CAN_MODERATE(state, canModerate) {
        state.canModerate = canModerate
    }
}

export const actions = {
    async getRooms({ commit }) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            const response = await client.apis.room.getCurrentUserRooms({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEMS', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async createRoom({ commit }, requestBody) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            await client.apis.room.createRoom({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    async deleteRoom({ dispatch }, roomId) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            await client.apis.room.deleteRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            dispatch('getRooms')
        } catch (e) {
            console.error(e)
        }
    },
    async getRoom({ commit }, roomId) {
        const client = await apiClient
        const accessToken = Cookies.get('token')

        try {
            const response = await client.apis.room.getRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e.response.body)
        }
    },
    async updateRoom({ commit }, {roomId, requestBody}) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        try {
            const response = await client.apis.room.updateRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody
            })
            commit('SET_ITEM', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e.response.body)
            commit('SET_ERRORS', e.response.body.detail)
        }
    },
    async join({ commit }, joinSlug) {
        const client = await apiClient
        const accessToken = Cookies.get('token')
        
        const response = await client.apis.room.joinBySlug({
            join_slug: joinSlug
        }, {
            requestInterceptor: (request) => {
                request.headers.Authorization = `Bearer ${accessToken}`
            },
        })
        commit('SET_ERRORS', {})
    }
}