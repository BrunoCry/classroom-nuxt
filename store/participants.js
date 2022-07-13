import { apiClient } from "@/utils/api.js";

export const namespaced = true;

export const state = () => ({
    item: null,
    items: [],
    errors: {},
})

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
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
    }
}

export const actions = {
    async getParticipations({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
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
    }
}